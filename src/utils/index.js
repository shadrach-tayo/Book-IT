function sanitizeUserData(userObj) {
  const obj = userObj.toObject();
  delete obj.password;
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
}

module.exports = { sanitizeUserData };
