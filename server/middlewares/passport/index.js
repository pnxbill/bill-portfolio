

const GraphqlStrategy = require('./strategies');
const User = require('../../db/models/user');

exports.init = (passport) => {

  passport.use('graphql', new GraphqlStrategy((options, done) => {
    // Find user in DB and if user exists verify user password
    // If user is verified call "done"
    const { email, password } = options;
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false); // First parameter of done = error, second = user;

      // TODO: Verify user password, if it's matching password from options;
      // return done(null, user);
      user.validatePassword(password, (err, isMatching) => {
        if (err) return done(err);
        if (!isMatching) done(null, false);

        return done(null, user);
      })
    })
  }));
}