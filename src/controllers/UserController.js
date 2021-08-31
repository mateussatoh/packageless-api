const { send } = require("process");
const users = require("../mocks/users");

module.exports = {
   getUsers(request, response) {
      const { order } = request.query;
      const sortedUsers = users.sort((userA, userB) => {
         if (order === "asc") {
            return userA.id > userB.id ? 1 : -1;
         } else if (order === "desc") {
            return userA.id < userB.id ? 1 : -1;
         } else return users;
      });
      response.send(200, sortedUsers);
   },
   getUsersById(request, response) {
      const { id } = request.params;
      const user = users.find((user) => user.id === parseInt(id));
      if (!user) {
         return response.send(400, { error: "Invalid user id" });
      }
      response.send(200, user);
   },
};
