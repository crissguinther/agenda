const validatePassword = require("../src/utils/validatePassword.js");

describe("Should test scenarios for validate password", () => {
  it("Should return invalid for less than 8 characters", () => {
    let pass = "1234";
    let isValid = validatePassword(pass);
    expect(isValid).toEqual(false);
  });

  it("Should return invalid for no letters", () => {
    let pass = "12346789";
    let isValid = validatePassword(pass);
    expect(isValid).toEqual(false);
  });

  it("Should return invalid for no numbers", () => {
    let pass = "asdfgasdfga";
    let isValid = validatePassword(pass);
    expect(isValid).toEqual(false);
  });

  it("Should return invalid for no symbols", () => {
    let pass = "asdfgasd1ga";
    let isValid = validatePassword(pass);
    expect(isValid).toEqual(false);
  });

  it("Should return valid", () => {
    let pass = "aSdfg@#d1ga";
    let isValid = validatePassword(pass);
    expect(isValid).toEqual(true);
  });
});
