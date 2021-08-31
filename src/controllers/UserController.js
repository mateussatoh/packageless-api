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
      response.writeHead(200, { "Content-type": "application/json" });
      response.end(JSON.stringify(sortedUsers));
   },
   getUsersById(request, response) {
      const { id } = request.params;
      const user = users.find(user => user.id === parseInt(id))
      if(!user){     
         response.writeHead(400, { "Content-type": "application/json" });
         response.end(JSON.stringify({error: 'Invalid user id'}));
      } else {

         response.writeHead(200, { "Content-type": "application/json" });
         response.end(JSON.stringify(user));
      }
   },
};
