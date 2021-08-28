const products = require("../mocks/products.js");

module.exports = {
   listProducts(request, response) {
      response.writeHead(200, { "Content-type": "application/json" });
      response.end(JSON.stringify(products));
   },
};
