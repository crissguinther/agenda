const { User } = require("../src/models/UserModel");

const userBody = {
  name: "Jane Doe",
  username: "janedoe",
  email: "janedoe@gmail.com",
  password: "1Aa#asdfasdf",
};

describe("It should be a valid user", () => {
  const user = new User(userBody);

  it("Should include a name", () => {
    expect(user.name).toEqual("Jane Doe");
  });

  it("Should include a username", () => {
    expect(user.username).toEqual("janedoe");
  });

  it("Should return invalid username length", () => {
    expect(() => (user.username = "12")).toThrow(
      "Username must be between 3 and 12 characters long"
    );
  });

  it("Should return invalid username type", () => {
    expect(() => (user.username = 12)).toThrow("Username must be a string");
  });

  it("Should return valid username", () => {
    user.username = "kassa";
    expect(user.username).toEqual("kassa");
  });

  it("should return invalid email", () => {
    expect(() => (user.email = "e@.com")).toThrow("Email must be valid");
  });

  it("should be invalid password", () => {
    expect(() => (user.password = "oioiaoia")).toThrow(
      "Password must be at least 8 characters longe, contain one uppercase letter, one lowercase letter, one number and one symbol"
    );
  });
});
