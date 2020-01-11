const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RerservationSchema = mongoose.Schema({
  hotelId: Schema.ObjectId,
  userId: Schema.ObjectId,
  roomNumber: Number,
  roomId: Schema.ObjectId,
  roomPrice: Number,
  checkIn: Date,
  checkOut: Date,
  paid: Boolean,
  reservationDate: Date,
  suspended: Boolean
});

// add total cost in pre save hook -----------------------------------------

RerservationSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
RerservationSchema.set("toJSON", {
  virtuals: true
});

RerservationSchema.methods.toJSON = function() {
  let obj = this.toObject();

  delete obj.__v;
  obj.id = obj._id;
  delete obj._id;
  return obj;
};

const RerservationModel = mongoose.model("Reservation", RerservationSchema);

const newReservation = async roomData => {
  const room = new RerservationModel(roomData);
  return room.save();
};

const findByName = async roomName => {
  return RerservationModel.find({ roomName })
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
  const result = await RerservationModel.findById(id)
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
  return RerservationModel.find({})
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
  return RerservationModel.find(query)
    .then(results => {
      const found = results;

      return found;
    })
    .catch(err => {
      console.log("err ", err);
      return null;
    });
};

const findCommonReservation = async ({ hotelId, roomId }) => {
  const query = RerservationModel.find();
  query.and([{ hotelId }]);
  query.or([{ roomId }]);

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
  const found = await RerservationModel.findByIdAndUpdate(id, update);
  if (!found) throw new Error("Reservation doesn't exists");

  const updated = await RerservationModel.findById(id);
  return updated;
};

const remove = async id => {
  if (!id) throw new Error("Id must be supplied");

  const deleted = await RerservationModel.findByIdAndDelete(id);

  return deleted;
};

module.exports = {
  newReservation,
  find,
  findByName,
  update,
  findById,
  findAll,
  remove,
  findCommonReservation
};
