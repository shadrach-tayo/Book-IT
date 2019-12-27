const makeAdminDb = AdminDB => {
  const insert = async admin => {
    const inserted = await AdminDB.newAdmin(admin);

    return inserted;
  };

  findByEmail = async email => {
    const user = await AdminDB.findByEmail(email);

    return user;
  };

  return { insert, findByEmail };
};

module.exports = makeAdminDb;
