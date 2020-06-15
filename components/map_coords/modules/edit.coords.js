const config = require("../../config/config.js");
const client = config.get_db_connection();


var edit_coords = async (req, res) => {
    res.header('Content-Type', 'application/json');
    let body = req.body;
    let x_coord = body.x_coord;
    let y_coord = body.y_coord;
    let name = body.name;
    let description = body.description
    let query = 'SELECT * from map_points WHERE x_coord = ' + x_coord + ' AND y_coord = ' + y_coord
    let find_coords = await client.query(query);
    if(find_coords.rows.length>0){
        let values = [x_coord, y_coord, name, description]
        query = "UPDATE map_points "+
        "SET x_coord = ($1), y_coord = ($2), name = ($3), description = ($4) "+
        "WHERE x_coord = " + x_coord + " AND y_coord = " + y_coord   
        console.log(query)
        let resp = await client.query(query, values);
        if(resp.rowCount>0){
            res.send(JSON.stringify(resp))
            return
        }
        res.send(JSON.stringify({success:false}))
        return
    }
    res.send(JSON.stringify({success:false}))
};
module.exports = edit_coords