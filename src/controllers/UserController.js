const { send } = require("process");
let users = require("../mocks/users");

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
   createUser(request, response) {
      const { body } = request;
      const lastUserId = users[users.length - 1].id;
      const newUser = {
         id: lastUserId + 1,
         name: body.name,
      };
      users.push(newUser);
      response.send(200, newUser);
   },

   updateUser(request, response) {
      let { id } = request.params;
      const { name } = request.body;

      id = Number(id);

      const userExists = users.find((user) => user.id === id);

      if (!userExists) {
         return response.send(400, { error: "User not found" });
      }
      users.map((user) => {
         if (user.id === id) {
            user.name = name;
            response.send(200, user);
         }
      });
   },
   deleteUser(request, response) {
      let { id } = request.params;
      id = Number(id);

      const userExists = users.find((user) => user.id === id);
      if (!userExists) {
         return response.send(400, { error: "User not found" });
      }
      users = users.filter((user) => user.id !== id);
      response.send(200, { deleted: true });
   },
};
