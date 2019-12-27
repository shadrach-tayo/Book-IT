const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("basic")
    .readOwn("profile")
    .updateOwn("profile")
    .readAny("hotel");

  ac.grant("agent")
    .extend("basic")
    .readAny("profile");

  ac.grant("admin")
    .extend("basic")
    .extend("agent")
    .readAny("profiles")
    .updateAny("profile")
    .deleteAny("profile")
    .updateAny("hotel");

  return ac;
})();
