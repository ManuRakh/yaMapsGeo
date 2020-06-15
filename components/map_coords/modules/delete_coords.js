const config = require("../../config/config.js");
const client = config.get_db_connection();


var delete_coords = async (req, res) => { //добавляем координаты в бд
    res.header('Content-Type', 'application/json');
    let body = req.body;
    const values = [body.x_coord, body.y_coord];
    let query = 'DELETE FROM map_points	WHERE x_coord = ($1) AND y_coord = ($2)';
    await client.query(query, values);
    console.log("deletes")
    res.send(query);
};
module.exports = delete_coords

