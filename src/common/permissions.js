const CAN_VIEW = 1;
const CAN_EDIT_USER = 2;
const CAN_DELETE_USER = 4;
const ADD_HOTEL = 16;
const CAN_EDIT_ALL = 32;

const FREE = CAN_VIEW | CAN_EDIT_USER;
const ADMIN =
  CAN_VIEW | ADD_HOTEL | CAN_DELETE_USER | CAN_EDIT_USER | CAN_EDIT_ALL;
console.log("free ", FREE, " admin ", ADMIN);
module.exports = Object.freeze({
  FREE,
  CAN_VIEW,
  CAN_DELETE_USER,
  CAN_EDIT_USER,
  CAN_DELETE_USER,
  CAN_EDIT_ALL,
  ADMIN
});
