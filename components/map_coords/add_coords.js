const config = require("../config/config.js");
const client = config.get_db_connection();


var add_coords = async (req, res) => {
    res.header('Content-Type', 'application/json');
    let body = req.body;
    const values = [body.x, body.y, body.name];
    let query = 'INSERT INTO map_points(x_coord, y_coord, name) VALUES($1, $2, $3)';
    await client.query(query, values);
    res.send(query);
};
module.exports = add_coords

