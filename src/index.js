const http = require("http");
const { URL } = require("url");
const routes = require("./routes");

const server = http.createServer((request, response) => {
   const parsedUrl = new URL(`http://localhost:3000${request.url}`);
   request.query = Object.fromEntries(parsedUrl.searchParams);

   const route = routes.find(
      (routeObj) =>
         routeObj.endpoint === parsedUrl.pathname &&
         routeObj.method === request.method
   );
   console.log(
      `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
   );

   if (route) {
      route.handler(request, response);
   } else {
      response.writeHead(404, { "Content-type": "text/html" });
      response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
   }
});

server.listen(3000, () =>
   console.log("Server started at http://localhost:3000")
);
