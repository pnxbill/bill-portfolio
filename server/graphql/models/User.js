

class User {
  constructor(model) {
    this.Model = model;
  }

  async signUp(data) {
    const { password, passwordConfirmation } = data;
    if (password !== passwordConfirmation) {
      throw new Error("Passwords don't match");
    }

    try {
      return await this.Model.create(data);
    } catch (e) {
      if (e.code && e.code === 11000)
        throw new Error('User with provided email already exists')

      throw e;
    }


  }

  async signIn(data, ctx) {
    try {
      const user = await ctx.authenticate(data);
      return user;
    }
    catch (err) {
      return err;
    }
  }


  signOut(ctx) {
    try {
      // console.log('---BEFORE LOGOUT---');
      // console.log('user', ctx.getUser());
      // console.log('AUTH:', ctx.isAuthenticated());
      ctx.logout();
      // console.log('---AFTER LOGOUT---');
      // console.log('user', ctx.getUser());
      // console.log('AUTH:', ctx.isAuthenticated());
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = User;