exports.set_main_routes = (app, dir_name)=>{
    const bodyParser = require("body-parser");
    const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
    const urlencodedParser = bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 });
    
    app.get('/api/1.0/external/js/main.js', (req, res) => {
        res.sendFile(dir_name + "/components/layouts/ext_js/main.js");
    });
}