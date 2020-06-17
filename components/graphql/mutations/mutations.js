
const graphql = require("graphql");
const db = require("../connection/adaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { MapType } = require("../types/types");
const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addProject: {
            type: MapType,
            args: {
                creatorId: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const query = `INSERT INTO project(creator_id, created, title, description) VALUES ($1, $2, $3, $4) RETURNING title`;
                const values = [
                    args.creatorId,
                    new Date(),
                    args.title,
                    args.description
                ];

                return db
                    .one(query, values)
                    .then(res => res)
                    .catch(err => err);
            }
        }
    }
});
exports.mutation = RootMutation;