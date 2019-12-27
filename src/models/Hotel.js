const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  street: String,
  city: String,
  zip: Number,
  phone: Number,
  hotelName: String,
  suspended: Boolean
});

HotelSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
HotelSchema.set("toJSON", {
  virtuals: true
});

HotelSchema.methods.toJSON = function() {
  let obj = this.toObject();

  delete obj.__v;
  obj.id = obj._id;
  delete obj._id;
  return obj;
};

const HotelModel = mongoose.model("Hotel", HotelSchema);

const newHotel = async hotelData => {
  const hotel = new HotelModel(hotelData);
  return hotel.save();
};

const findByName = async hotelName => {
  return HotelModel.find({ hotelName })
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
  const result = await HotelModel.findById(id)
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

const findAll = async id => {
  return HotelModel.find({})
    .then(results => {
      const found = results;

      return found;
    })
    .catch(err => {
      console.log("err ", err);
      return null;
    });
};

const update = async (id, update) => {
  const found = await HotelModel.findByIdAndUpdate(id, update);
  if (!found) throw new Error("Hotel doesn't exists");

  const updated = await HotelModel.findById(id);
  return updated;
};

const remove = async id => {
  if (!id) throw new Error("Id must be supplied");

  const deleted = await HotelModel.findByIdAndDelete(id);

  return deleted;
};

module.exports = { newHotel, findByName, update, findById, findAll, remove };
