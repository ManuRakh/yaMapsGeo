
const graphql = require("graphql");
const db = require("../connection/adaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql;
const { MapType } = require("../types/types");
const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        add_coords: {
            type: MapType,
            args: {
                id: {type: graphql.GraphQLInt},
                x_coord: { type: GraphQLFloat },
                y_coord: { type: GraphQLFloat },
                name: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            async resolve(parentValue, args) {
                const query = 'INSERT INTO map_points(id, x_coord, y_coord, name, description) VALUES($1, $2, $3, $4, $5)';
                const values = [
                    args.id,
                    args.x_coord,
                    args.y_coord,
                    args.name,
                    args.description
                ];
                let res =  await db
                    .none(query, values)
                    .then(res => res)
                    .catch(err => err);
                    return res
            }
        },
        delete_coords:{
            type: MapType,
            args:{ 
                x_coord: {type:GraphQLFloat}, 
                y_coord: {type:GraphQLFloat}},
            async resolve(parentValue, args){
                let query = 'DELETE FROM map_points	WHERE x_coord = ($1) AND y_coord = ($2)'
                let values = [
                    args.x_coord, 
                    args.y_coord
                ];
                let res =  await db.none(query, values)
                .then(res => res)
                .catch(err => err)
                console.log(res)
                return res
            }
        }
    }
});
exports.mutation = RootMutation;