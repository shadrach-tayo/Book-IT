const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RoomSchema = mongoose.Schema({
  roomNumber: Number,
  phone: Number,
  roomName: {
    type: String,
    index: true
  },
  type: String,
  roomLock: {
    type: String,
    index: true
  },
  hotelId: Schema.ObjectId,
  price: Number,
  suspended: Boolean,
  reserved: Boolean,
  booked: Boolean
});

RoomSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
RoomSchema.set("toJSON", {
  virtuals: true
});

RoomSchema.methods.toJSON = function() {
  let obj = this.toObject();

  delete obj.__v;
  delete obj.roomLock;
  obj.id = obj._id;
  delete obj._id;
  return obj;
};

const RoomModel = mongoose.model("Room", RoomSchema);

const newRoom = async roomData => {
  const room = new RoomModel(roomData);
  return room.save();
};

const findByName = async roomName => {
  return RoomModel.find({ roomName })
    .then(results => {
      const found = results[0];
      return found;
    })
    .catch(err => {
      console.log("err ", err);
      return null;
    });
};

const findById = async id => {
  const result = await RoomModel.findById(id)
    .then(result => {
      // console.log("results ", result);
      return result;
    })
    .catch(err => {
      console.log("err ", err);
      return null;
    });
  return result;
};

const findAll = async _ => {
  return RoomModel.find({})
    .then(results => {
      const found = results;

      return found;
    })
    .catch(err => {
      console.log("err ", err);
      return null;
    });
};
const find = async query => {
  return RoomModel.find(query)
    .then(results => {
      const found = results;

      return found;
    })
    .catch(err => {
      console.log("err ", err);
      return null;
    });
};

const findCommonRoom = async ({ hotelId, roomName, roomNumber }) => {
  const query = RoomModel.find();
  query.and([{ hotelId }]);
  query.or([{ roomName }, { roomNumber }]);

  return query
    .exec()
    .then(results => {
      // console.log("rooms ", results);
      return results[0];
    })
    .catch(err => {
      console.log("err ", err);
      return null;
    });
};

const update = async (id, update) => {
  const found = await RoomModel.findByIdAndUpdate(id, update);
  if (!found) throw new Error("Room doesn't exists");

  const updated = await RoomModel.findById(id);
  return updated;
};

const remove = async id => {
  if (!id) throw new Error("Id must be supplied");

  const deleted = await RoomModel.findByIdAndDelete(id);

  return deleted;
};

module.exports = {
  newRoom,
  find,
  findByName,
  update,
  findById,
  findAll,
  remove,
  findCommonRoom
};
