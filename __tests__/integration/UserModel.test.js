const { default: mongoose } = require("mongoose");
const UserModel = require("../../src/models/UserModel");
const User = require("../../src/entities/User");
const request = require("supertest");
const makeApp = require("../../server");
const database = mongoose.connect(
  "mongodb://root:root@127.0.0.1:27017/agendas?authSource=admin"
);

let user = new User({
  name: "Jane Doe",
  email: "janedoe@gmail.com",
  password: "1Aa#asdfasdf",
});

describe("It should be a valid user", () => {
  it("Should throw error for empty name", () => {
    expect(() => (user.name = "")).toThrow("You must provide a name");
  });

  it("Should include a name", () => {
    expect(user.name).toEqual("Jane Doe");
  });

  it("should return invalid email", () => {
    expect(() => (user.email = "e@.com")).toThrow("Email must be valid");
  });

  it("should be invalid password", () => {
    expect(() => (user.password = "oioiaoia")).toThrow(
      "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number and one symbol"
    );
  });

  it("Shouldn't create user in db when accessing /login/register", async () => {
    user = new User({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "JoDo1@90",
    });
    const app = makeApp(database);
    let response = await request(app)
      .post("/login/register")
      .send(user.getInfo());
    expect(response.statusCode).toEqual(500);
  });

  afterAll(() => {
    UserModel.deleteMany();
    mongoose.disconnect();
  });
});
