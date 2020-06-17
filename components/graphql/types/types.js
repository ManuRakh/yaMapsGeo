const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name:"User",
    type:"Query",
    fields:{
        id:{type: GraphQLString},
        username:{type:GraphQLString},
        email: {type: GraphQLString},
        joined:{type: GraphQLString},
        last_logged_in:{type:GraphQLString}
    }
});
const MapType = new GraphQLObjectType({
    name:"Map",
    type:"Query",
    fields:{
        id:{type: GraphQLInt},
        x_coord:{type:GraphQLFloat},
        y_coord: {type: GraphQLFloat},
        name:{type: GraphQLString},
        description:{type:GraphQLString}
      
       
    }
});
exports.UserType = UserType
exports.MapType = MapType