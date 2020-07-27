

class User {
  constructor(model) {
    this.Model = model;
  }


  signIn() {
    return 'Signing in'
  }

  signUp() {
    return 'Signing up'
  }

  signOut() {
    return 'Signing out'
  }
}

module.exports = User;