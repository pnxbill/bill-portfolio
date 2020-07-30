

const { Strategy } = require('passport-strategy');

// Strategy get options(email, password) needed to authenticate user
// Strategy gets callback func that will contatin functionality to verify an user
// Strategy has to have "authenticate" function  
// Strategy has access to "error" "fail" and "success" functions
class GraphqlStrategy extends Strategy {
  constructor(verify) {
    super();

    if (!verify) throw new Error('Graphql strategy requires a verify callback');

    this.verify = verify;
    this.name = 'graphql';
  }

  authenticate(_, options) {
    console.log('Calling authenticate in strategy');

    // in done we receive "error", "user", "info"
    const done = () => {
      if (true) {
        // this.success('LoggedInUser');
        this.error('Some nasty err')
      }
      // if has user then call success, otherwise call "fail" or "error"
    }

    this.verify(options, done)
  }
}

module.exports = GraphqlStrategy;