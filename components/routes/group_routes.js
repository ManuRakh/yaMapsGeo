const config = require("../config/config.js");
const client = config.get_db_connection();
exports.set_group_routes = async (app, dir_name) => {
    const bodyParser = require("body-parser");
    const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
    const urlencodedParser = bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 });

    app.get("/", (req, res) => {
        res.sendFile(dir_name + "/components/layouts/index.html");
    });
    app.get('/api/1.0/get_coords', async (req, res) => {
        res.header('Content-Type', 'application/json');
        let coords = await client.query('SELECT * from map_points');
        coords.rows.forEach(element => {
            element.center = []
            element.center.push(element.x_coord)
            element.center.push(element.y_coord)
            delete x_coord
            delete y_coord
        });
        let groups = []
        let group = {
            style: "islands#greenIcon",
            items: coords.rows
        };
        groups.push(group)
        console.log(groups)
        res.send(groups);
    });

    app.post('/add_coord', urlencodedParser, jsonParser, async (req, res) => {
        res.header('Content-Type', 'application/json');
        let body = req.body;
        const values = [body.x, body.y, body.name];
        let query = 'INSERT INTO map_points(x_coord, y_coord, name) VALUES($1, $2, $3)';
        await client.query(query, values);
        res.send(query);
    });
    app.get('/api/1.0/external/js/groups.js', (req, res) => {
        res.sendFile(dir_name + "/components/layouts/ext_js/groups.js");
    });
    app.get('/api/1.0/external/js/main.js', (req, res) => {
        res.sendFile(dir_name + "/components/layouts/ext_js/main.js");
    });
    app.get('/api/1.0/get/posts/:id', (req, res) => {
        res.sendFile(dir_name + "/components/layouts/ext_js/main.js");
    });
};
