const makeTodoDb = TodoModel => {
  const insert = async todo => {
    const inserted = await new TodoModel(todo);
    console.log("insert ", inserted);
    inserted.save();
    return inserted;
  };

  findAll = () => {
    return TodoModel.find()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("eer ", err);
        return null;
      });
  };

  findByText = text => {
    return TodoModel.findOne({ text })
      .then(result => {
        return result;
      })
      .catch(err => null);
  };

  findById = id => {
    return TodoModel.findById(id)
      .then(found => {
        // console.log("err ", err);
        console.log("todo ", found, " id ", id);
        return found;
      })
      .catch(err => {
        console.log("err ", err);
        return null;
      });
  };

  findByIdAndDelete = async id => {
    const found = await TodoModel.findByIdAndDelete(id);
    if (!found) return null;

    return found;
  };

  findByIdAndUpdate = async (id, update) => {
    if (!id) throw new Error("Id must be supplied");

    const found = await TodoModel.findByIdAndUpdate(id, update);
    if (!found) throw new Error("Todo doesn't exists");

    const updated = await TodoModel.findById(id);
    console.log("update ", updated);
    return updated;
  };

  return {
    insert,
    findAll,
    findByText,
    findById,
    findByIdAndDelete,
    findByIdAndUpdate
  };
};

module.exports = makeTodoDb;
