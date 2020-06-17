
                  require('dotenv').config()
  const graphql = require("graphql");
  const express = require("express");
  var app = express()
  const expressGraphQl = require("express-graphql");
  const { GraphQLSchema } = graphql;
  const { query } = require("./components/graphql/get_coords/queries");
  const { mutation } = require("./components/graphql/mutations/mutations");
  const port = process.env.APP_PORT

  const schema = new GraphQLSchema({
      query,
      mutation
  });
  require("./components/routes/map_routes.js").set_map_routes(app, __dirname);//роуты касающиеся карт - будут присылаться исключительно сюда
  require("./components/routes/main_routes.js").set_main_routes(app, __dirname);//все остальные роуты, которые не попали в остальные - будут прописываться здесь

  app.use('/graph',
  expressGraphQl({
      schema:schema,
      graphiql:true
  }))

  app.listen(port)
  console.log('API server running at localhost:' + port);
