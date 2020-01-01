const createRoomRoutes = ({
  multer,
  makeCallback,
  roomController,
  authValidationMiddleware,
  permissionsMiddleware
}) => {
  const upload = multer();

  return function(router) {
    // add new room
    router.post(
      "/rooms",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "room")
      ],
      makeCallback(roomController.addNewRoom)
    );

    // edit room
    router.put(
      "/rooms/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "room")
      ],
      makeCallback(roomController.editRoom)
    );

    // get all rooms
    router.get(
      "/rooms",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readAny", "room")
      ],
      makeCallback(roomController.getAllUnsuspended)
    );

    // get all rooms including suspended rooms
    router.get(
      "/rooms/all",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "room")
      ],
      makeCallback(roomController.getAllRooms)
    );

    // get room by id
    router.get(
      "/rooms/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readAny", "room")
      ],
      makeCallback(roomController.getRoomById)
    );

    // delete room by id
    router.delete(
      "/rooms/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("deleteAny", "room"),
        permissionsMiddleware.isAdmin
      ],
      makeCallback(roomController.deleteRoom)
    );

    // suspend room
    router.put(
      "/rooms/:id/suspend",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("updateAny", "room")
      ],
      makeCallback(roomController.suspendRoom)
    );
  };
};

module.exports = createRoomRoutes;
