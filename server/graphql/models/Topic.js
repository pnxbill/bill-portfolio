
const slugify = require('slugify');
const uniqueSlug = require('unique-slug');

class Topic {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }


  getBySlug(slug) {
    return this.Model.findOne({ slug }).populate('user').populate('forumCategory');
  }

  getAllByCategory(forumCategory) {
    return this.Model
      .find({ forumCategory })
      .populate('user')
      .populate('forumCategory');
  }

  async _create(data) {
    const createdTopic = await this.Model.create(data);
    return this.Model.findById(createdTopic._id).populate('user').populate('forumCategory')
  }

  async create(data) {
    if (!this.user) throw new Error('You need to authenticate in order to create a topic!');
    data.user = this.user;
    // Generate slug
    data.slug = slugify(data.title, { lower: true });

    try {
      const topic = await this._create(data);
      return topic;
    } catch (err) {
      if (err.code == 11000 && err.keyPattern && err.keyPattern.slug) {
        data.slug += `-${uniqueSlug()}`
        const topic = await this._create(data);
        return topic;
      }
      return null;
    }

  }
}

module.exports = Topic;