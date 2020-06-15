const maps_controller = require("../map_coords/maps_controller.js")


exports.set_map_routes = async (app, dir_name) => {
    const bodyParser = require("body-parser");
    const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
    const urlencodedParser = bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 });
    app.get("/", (req, res) => {
        res.sendFile(dir_name + "/components/layouts/index.html");
    });
    app.get('/api/1.0/get_coords', async (req, res) => {
        maps_controller.get_coords(req, res)
    });
    app.post('/api/1.0/add_coords', urlencodedParser, jsonParser, async (req, res) => {
        maps_controller.add_coords(req, res);
    });
    app.post('/api/1.0/edit_coords', urlencodedParser, jsonParser, async (req, res) => {
        maps_controller.edit_coords(req, res)
    });
    app.post('/api/1.0/delete_coords', urlencodedParser, jsonParser, async (req, res) => {
        maps_controller.delete_coords(req, res)
    });
    app.get('/api/1.0/get/posts/:id', (req, res) => {
        res.sendFile(dir_name + "/components/layouts/ext_js/main.js");
    });
};
