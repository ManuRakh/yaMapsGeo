  var express = require('express');
  var app = express();
  const config = require("./components/config/config.js");
  const port = config.get_port();
  config.run_db_server() //запускает постоянное соединение с базой данных PostgeSQL
  require("./components/routes/map_routes.js").set_map_routes(app, __dirname);
  require("./components/routes/main_routes.js").set_main_routes(app, __dirname);

  app.listen(port);
  console.log('GraphQL API server running at localhost:' + port);

