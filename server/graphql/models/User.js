

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

  signIn(data, ctx) {
    const isAuthenticated = ctx.authenticate(data);

    if (isAuthenticated) {
      console.log('User is authenticated');
    }

    return `Signin In user: output`
  }


  signOut() {
    return 'Signing out'
  }
}

module.exports = User;