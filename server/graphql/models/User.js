

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

  async signIn(data, ctx) {
    try {
      const user = await ctx.authenticate(data);
      // return user;
      console.log(user);
      return `User: ${user.username}`;
    }
    catch (err) {
      return err;
    }
  }


  signOut() {
    return 'Signing out'
  }
}

module.exports = User;