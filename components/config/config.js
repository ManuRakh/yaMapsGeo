const { Pool, Client } = require('pg')
const user = 'owner'
const host = 'localhost'
const database = 'ya_maps_geo'
const password = '123456'
const client = new Client({
    user: user,
    host: host,
    database: database,
    password: password,
  })

exports.get_db_name = ()=>{
    //вернуть имя бд
}
exports.get_db_uname = ()=>{
    //вернуть имя бд
}
exports.get_db_pass = ()=>{
    //вернуть имя бд
}
exports.get_host_name = ()=>{
    //вернуть имя бд
}
exports.get_port = () =>{
    return 3000
}
exports.run_db_server =async () =>{
    client.connect()
    console.log("DB runned")
}
exports.get_db_connection = () =>{
    return client
}