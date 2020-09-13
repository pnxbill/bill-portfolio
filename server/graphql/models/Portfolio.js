


class Portfolio {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ['instructor', 'admin'];
  }

  getAll() {
    return this.Model.find({});
  }

  getAllByUser() {
    return this.Model.find({ user: this.user._id }).sort({ startDate: 'desc' });
  }

  getById(id) {
    return this.Model.findById(id);
  }

  create(input) {
    if (!this.user || !this.writeRights.includes(this.user.role)) throw new Error('Not Authorized!')

    input.user = this.user;
    return this.Model.create(input);
  }

  findAndUpdate(id, input) {
    return this.Model.findOneAndUpdate({ _id: id }, input, { new: true, runValidators: true });
    // Need to set runValidatos to true to check required paths properly.
  }

  findAndDelete(id) {
    return this.Model.findByIdAndRemove({ _id: id });
  }
}

module.exports = Portfolio;