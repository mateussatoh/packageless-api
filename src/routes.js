const UserController = require("./controllers/UserController");

module.exports = [
   {
      endpoint: "/users",
      method: "GET",
      handler: UserController.getUsers,
   },
   {
      endpoint: "/users/:id",
      method: "GET",
      handler: UserController.getUsersById,
   },
   {
      endpoint: "/users",
      method: "POST",
      handler: UserController.createUser,
   },

];
