


class Portfolio {
  constructor(model) {
    this.Model = model;

  }

  getAll() {
    return this.Model.find({});
  }

  getById(id) {
    return this.Model.findById(id);
  }

  create(input) {
    return this.Model.create(input);
  }

  findAndUpdate(id, input) {
    return this.Model.findOneAndUpdate({ _id: id }, input, { new: true });
  }

  findAndDelete(id) {
    return this.Model.findByIdAndRemove({ _id: id });
  }
}

module.exports = Portfolio;