const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("basic")
    .readOwn("profile")
    .updateOwn("profile")
    .updateOwn("reservation")
    .readAny("hotel")
    .readAny("room")
    .readAny("reservation");

  ac.grant("agent")
    .extend("basic")
    .readAny("profile");

  ac.grant("admin")
    .extend("basic")
    .extend("agent")
    .readAny("profiles")
    .updateAny("profile")
    .deleteAny("profile")
    .updateAny("hotel")
    .deleteAny("hotel")
    .updateAny("room")
    .deleteAny("room")
    .updateAny("reservation")
    .deleteAny("reservation");

  return ac;
})();
