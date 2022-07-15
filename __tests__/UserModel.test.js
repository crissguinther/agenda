const { default: mongoose } = require("mongoose");
const { User, UserModel } = require("../src/models/UserModel");
const request = require("supertest");
const app = require("../server");

const userBody = {
  name: "Jane Doe",
  email: "janedoe@gmail.com",
  password: "1Aa#asdfasdf",
};

describe("It should be a valid user", () => {
  beforeAll(() => {
    mongoose.connect(
      "mongodb://root:root@127.0.0.1:27017/agendas?authSource=admin"
    );
  });

  const user = new User(userBody);

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

  it("Should create user in db", async () => {
    let user = new User({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "JoDo1@90",
    });
    const found = await UserModel.create(user.getInfo());
    console.log(found);
    await expect(found.name).toBeDefined();
  });

  it("Should create user in db when accessing /login/register", async () => {
    let user = new User({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "JoDo1@90",
    });
    let response = await request(app)
      .post("/login/register")
      .send(user.getInfo);
    expect(response).statusCode().toEqual(200);
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
