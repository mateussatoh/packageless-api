const http = require("http");
const { URL } = require("url");
const routes = require("./routes");

const server = http.createServer((request, response) => {
   const parsedUrl = new URL(`http://localhost:3000${request.url}`);

   let { pathname } = parsedUrl;
   let id = null;

   const splitEndpoint = pathname.split("/").filter(Boolean);

   if (splitEndpoint.length > 1) {
      pathname = `/${splitEndpoint[0]}/:id`;
      id = splitEndpoint[1];
   }

   const route = routes.find(
      (routeObj) =>
         routeObj.endpoint === pathname && routeObj.method === request.method
   );
   console.log(`Request method: ${request.method} | Endpoint: ${pathname}`);

   if (route) {
      request.query = Object.fromEntries(parsedUrl.searchParams);
      request.params = { id };

      route.handler(request, response);
   } else {
      response.writeHead(404, { "Content-type": "text/html" });
      response.end(`Cannot ${request.method} ${pathname}`);
   }
});

server.listen(3000, () =>
   console.log("Server started at http://localhost:3000")
);
