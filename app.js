  var express = require('express');
  var app = express();
  const config = require("./components/config/config.js"); //здесь находятся конфигурационные данные, которые распространяются на весь проект
  const port = config.get_port();
  config.run_db_server() //запускает постоянное соединение с базой данных PostgeSQL
  require("./components/routes/map_routes.js").set_map_routes(app, __dirname);//роуты касающиеся карт - будут присылаться исключительно сюда
  require("./components/routes/main_routes.js").set_main_routes(app, __dirname);//все остальные роуты, которые не попали в остальные - будут прописываться здесь
  app.listen(port);
  console.log('API server running at localhost:' + port);

