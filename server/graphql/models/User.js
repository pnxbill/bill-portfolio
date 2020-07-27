

class User {
  constructor(model) {
    this.Model = model;
  }

  signUp(data) {
    const { password, passwordConfirmation } = data;
    if (password !== passwordConfirmation) {
      throw new Error("Passwords don't match");
    }

    return this.Model.create(data);
  }

  signIn() {
    return 'Signing in'
  }


  signOut() {
    return 'Signing out'
  }
}

module.exports = User;