const get_coords = require("../map_coords/get_coords.js")
const add_coords = require("../map_coords/add_coords.js")


exports.set_group_routes = async (app, dir_name) => {
    const bodyParser = require("body-parser");
    const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
    const urlencodedParser = bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 });
    app.get("/", (req, res) => {
        res.sendFile(dir_name + "/components/layouts/index.html");
    });
    app.get('/api/1.0/get_coords', async (req, res) => {
        get_coords(req, res)
    });
    app.post('/add_coord', urlencodedParser, jsonParser, async (req, res) => {
        add_coords(req, res);
    });
    app.post('/edit_coord', urlencodedParser, jsonParser, async (req, res) => {
        
    });
    app.get('/api/1.0/get/posts/:id', (req, res) => {
        res.sendFile(dir_name + "/components/layouts/ext_js/main.js");
    });
};
