const config = require("../config/config.js");
const client = config.get_db_connection();

var get_coords = async (req, res) =>{
    res.header('Content-Type', 'application/json');
        let coords = await client.query('SELECT * from map_points');
        coords = set_centers(coords)
        let groups = []
        let group = {
            style: "islands#greenIcon",
            items: coords.rows
        };
        groups.push(group)
        console.log(groups)
        res.send(groups);
}
function set_centers(coords){
    coords.rows.forEach(element => {
        element.center = []
        element.center.push(element.x_coord)
        element.center.push(element.y_coord)
        delete x_coord
        delete y_coord
    });
    return coords
}
module.exports = get_coords