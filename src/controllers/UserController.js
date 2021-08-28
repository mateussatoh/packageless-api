const users = require("../mocks/users");

module.exports = {
   listUsers(request, response) {
      const { order } = request.query;
      const sortedUsers = users.sort((userA, userB) => {
         if (order === "asc") {
            return userA.id > userB.id ? 1 : -1;
         } else if (order === "desc") {
            return userA.id < userB.id ? 1 : -1;
         } else return users;
      });
      response.writeHead(200, { "Content-type": "application/json" });
      response.end(JSON.stringify(users));
   },
};
