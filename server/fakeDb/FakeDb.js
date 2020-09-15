

const { portfolios, users, forumCategories, topics } = require('./data');
const Portfolio = require('../db/models/portfolio');
const User = require('../db/models/user');
const ForumCategory = require('../db/models/forumCategory');
const Topic = require('../db/models/topic');

class FakeDb {
  async clean() {
    await User.deleteMany({});
    await Portfolio.deleteMany({});
    await ForumCategory.deleteMany({});
    await Topic.deleteMany({});
  }

  async addData() {
    await User.create(users);
    await Portfolio.create(portfolios);
    await ForumCategory.create(forumCategories);
    await Topic.create(topics);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDb();