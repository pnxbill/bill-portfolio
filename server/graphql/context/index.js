const passport = require("passport");

// options == { email, password }
const authenticateUser = (options) => {
  console.log(`Calling authenticateUser`);

  const done = () => {
    // Here we will get user if is authenticated
    // If we get user here we can save session to DB
    console.log('Calling done of authenticateUser');
  }

  const authFn = passport.authenticate('graphql', options, done);
  authFn();

  return true;
}


exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options)
  }

  return auth;
}