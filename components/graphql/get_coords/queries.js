const { db } = require("../connection/adaptor");
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLFloat } = require("graphql");
const { UserType, MapType } = require("../types/types");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    type: "Query",
    fields:{
    get_points:{
       type: GraphQLList(MapType),//это чтобы вывести массив записей
    //    type: MapType //если захочу вывести единую запись по айди
       //args:{id:{type: GraphQLID} },
       async resolve(){
            const query = 'SELECT * from map_points';
            //const values = [args.id]
            let res = await db
            .many(query)
            .then(res =>res)
            .catch(err=>err)
            return res
       }
    },
    user:{
        type:UserType,
        args: {id:{type: GraphQLID}},
        resolve(parentValue, args){
            const query = 'Select * from users where id=$1';
            const values = [args.id]
            return db
            .one(query, values)
            .then(res=>res)
            .catch(err=>err)
        }
    }
    }   
    
})
function set_centers(coords){//функция создания координат
    coords.forEach(element => {
        element.center = []
        element.center.push(element.x_coord)
        element.center.push(element.y_coord)
        delete x_coord//удаляем ненужные переменные
        delete y_coord
    });
   // console.log(coords)
    return coords
}
exports.query = RootQuery