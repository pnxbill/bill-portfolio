
const slugify = require('slugify');

class Topic {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByCategory(forumCategory) {
    return this.Model
      .find({ forumCategory })
      .populate('user')
      .populate('forumCategory');
  }

  async create(data) {
    if (!this.user) throw new Error('You need to authenticate in order to create a topic!');
    data.user = this.user;
    // Generate slug
    data.slug = slugify(data.title, { lower: true });

    const createdTopic = await this.Model.create(data);

    return this.Model.findById(createdTopic._id).populate('user').populate('forumCategory')
  }
}

module.exports = Topic;