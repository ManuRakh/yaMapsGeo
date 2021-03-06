const config = require("../../config/config.js");
const client = config.get_db_connection();


var add_coords = async (req, res) => { //добавляем координаты в бд
    res.header('Content-Type', 'application/json');
    let body = req.body;
    const values = [body.x_coord, body.y_coord, body.name, body.description];
    let query = 'INSERT INTO map_points(x_coord, y_coord, name, description) VALUES($1, $2, $3, $4)';
    await client.query(query, values);
    res.send(query);
};
module.exports = add_coords

