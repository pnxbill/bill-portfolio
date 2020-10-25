const moment = require('moment');
const uniqueSlug = require('unique-slug');

class Post {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByTopic(topic) {
    return this.Model
      .find({ topic })
      .sort('createdAt')
      .populate('topic')
      .populate('user')
      .populate({ path: 'parent', populate: 'user' })
  };

  async create(post) {
    if (!this.user) {
      throw new Error('You must be signed in to create a post!')
    }
    post.user = this.user;

    const createdAt = moment().toISOString();
    const slugPart = uniqueSlug();
    const fullSlug = createdAt + ':' + slugPart;

    if (post.parent) {
      const parent = await this.Model.findById(post.parent);
      post.slug = parent.slug + '/' + slugPart;
      post.fullSlug = parent.fullSlug + '/' + fullSlug;
    } else {
      post.slug = slugPart;
      post.fullSlug = fullSlug;
    }

    const createdPost = await this.Model.create(post);
    return this.Model
      .findById(createdPost._id)
      .populate('topic')
      .populate('user')
      .populate({ path: 'parent', populate: 'user' })
  }
}

module.exports = Post;