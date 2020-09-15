

const { portfolios, users, forumCategories } = require('./data');
const Portfolio = require('../db/models/portfolio');
const User = require('../db/models/user');
const ForumCategory = require('../db/models/forumCategory');

class FakeDb {
  async clean() {
    await User.deleteMany({});
    await Portfolio.deleteMany({});
    await ForumCategory.deleteMany({});
  }

  async addData() {
    await User.create(users);
    await Portfolio.create(portfolios);
    await ForumCategory.create(forumCategories);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDb();