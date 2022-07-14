class User {
  constructor(body) {
    this.body = body;
  }

  cleanUp() {
    this.body = {
      username: this.body.username,
      password: this.body.password,
    };
  }

  register() {
    this.cleanUp();
  }
}

module.exports = { User };
