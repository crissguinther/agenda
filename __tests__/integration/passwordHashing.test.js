const { genHash, compareHash } = require("../../src/utils/passwordHashing");

describe("It will test compare and generation", () => {
  const password = "a9#akSlax";

  it("Should generate a hash", async () => {
    let generatedHash = await genHash(password);
    expect(generatedHash).not.toEqual(password);
  });

  it("Should compare the values", async () => {
    let generatedHash = await genHash(password);
    let isEqual = await compareHash(generatedHash, password);
    expect(isEqual).toEqual(true);
  });
});
