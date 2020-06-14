  var express = require('express');
  var app = express();
  const config = require("./components/config/config.js");
  const port = config.get_port();
  config.run_db_server() //запускает постоянное соединение с базой данных PostgeSQL
  require("./components/routes/group_routes.js").set_group_routes(app, __dirname);
  app.listen(port);
  console.log('GraphQL API server running at localhost:' + port);

