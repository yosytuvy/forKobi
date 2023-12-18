import { compareSync } from "bcryptjs";
import request from "supertest";

const server = request(`http://localhost:3000`);
describe("handleLogin test", () => {
  test("login new user", async () => {
    const loginUser = {
      email: "testUser@gmail.com",
      password: "aA12345!",
    };

    const res = await server
      .post("/users/login")
      .send(loginUser)
      .timeout(10000)
      .expect(200);

    expect(res.body).toBeDefined();
    const { resData } = res.body;
    const { user } = resData;

    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(user.email).toEqual(loginUser.email);
    expect(compareSync(loginUser.password, user.password)).toBeTruthy();
  });
});

describe("handleUserRegistration test", () => {
  test("register new user", async () => {
    const newUser = {
      email: "testUser1668@gmail.com",
      password: "aA12345!",
    };

    const res = await server
      .post("/users/signup")
      .send(newUser)
      .timeout(10000)
      .expect(201);

    expect(res.body).toBeDefined();
    const { email, password, _id } = res.body;

    expect(email).toEqual(newUser.email);
    expect(compareSync(newUser.password, password)).toBeTruthy();

    await server.delete(`/users/delete`).send({ id: _id }).expect(200);
  });
});
