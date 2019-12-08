const makeUserDb = UserModel => {
  const insert = async user => {
    const inserted = await new UserModel(user);
    console.log("insert ", inserted);
    inserted.save();
    return inserted;
  };

  findAll = () => {
    return UserModel.find()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("eer ", err);
        return null;
      });
  };

  findById = id => {
    return UserModel.findById(id)
      .then(found => {
        // console.log("err ", err);
        console.log("user ", found, " id ", id);
        return found;
      })
      .catch(err => {
        console.log("err ", err);
        return null;
      });
  };

  findByEmail = email => {
    return UserModel.find({ email })
      .then(results => {
        const found = results[0];
        // console.log("err ", err);
        console.log("user ", found, " email ", email);
        return found;
      })
      .catch(err => {
        console.log("err ", err);
        return null;
      });
  };

  findByIdAndUpdate = async (id, update) => {
    if (!id) throw new Error("Id must be supplied");

    const found = await UserModel.findByIdAndUpdate(id, update);
    if (!found) throw new Error("user doesn't exists");

    const updated = await UserModel.findById(id);
    console.log("update ", updated);
    return updated;
  };

  findByIdAndDelete = async id => {
    if (!id) throw new Error("Id must be supplied");

    const deleted = await UserModel.findByIdAndDelete(id);

    return deleted;
  };

  return {
    insert,
    findAll,
    findById,
    findByEmail,
    findByIdAndUpdate,
    findByIdAndDelete
  };
};

module.exports = makeUserDb;
