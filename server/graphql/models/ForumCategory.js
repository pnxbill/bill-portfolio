


class ForumCategory {
  constructor(model) {
    this.Model = model;
  }

  getOneBySlug(slug) {
    return this.Model.findOne({ slug }).populate('user');
  }

  getAll() {
    return this.Model.find({});
  }
}

module.exports = ForumCategory;