pipeline {
    agent any
    triggers {
        githubPush()
    }
    environment {
        DOCKER_IMAGE_NAME = 'yakovperets/erp-server'
        DOCKER_REGISTRY_CREDENTIALS = credentials('barakuni')
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url:'https://github.com/yosytuvy/forKobi.git']]])
                }
            }
        }
        stage('Build and Test') {
            steps {
                script {
                    // Create the network if it doesn't exist
                    sh 'npm install'
                    sh 'docker network ls | grep -q app-network || docker network create app-network'
                    
                    // Install Jest globally (if not already installed)
                    // sh 'npm install -g jest'
                    
                    // Run unit tests
                    sh 'npm run jest'
                    
                    // Build the Docker image for Node.js server
                    sh 'docker build -t $DOCKER_IMAGE_NAME .'
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'barakuni', usernameVariable: 'DOCKER_REGISTRY_CREDENTIALS_USR', passwordVariable: 'DOCKER_REGISTRY_CREDENTIALS_PSW')]) {
                        sh "docker login -u $DOCKER_REGISTRY_CREDENTIALS_USR -p $DOCKER_REGISTRY_CREDENTIALS_PSW"
                    }
                    // Push the Docker image to Docker Hub
                    sh "docker tag $DOCKER_IMAGE_NAME:latest $DOCKER_IMAGE_NAME:$BUILD_NUMBER"
                    sh "docker push $DOCKER_IMAGE_NAME:$BUILD_NUMBER"
                    sh "docker push $DOCKER_IMAGE_NAME:latest"
                }
            }
        }
    }
    post {
        always {
            script {
                // Cleanup
                sh 'docker network ls | grep -q app-network && docker network rm app-network || true'
                sh 'docker system prune '
                cleanWs()
            }
        }
    }
}
