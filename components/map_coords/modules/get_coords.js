const config = require("../../config/config.js");
const client = config.get_db_connection();

var get_coords = async (req, res) =>{ //получение меток
    res.header('Content-Type', 'application/json');
        let coords = await client.query('SELECT * from map_points');
        // ** установка меток, берется х и у 
        // *  из них создается 1 единый массив с 2 элементами для создания координат для метки
        coords = set_centers(coords) 
        let groups = []
        let group = {//устанавливаем стили для меток
            style: "islands#greenIcon",
            items: coords.rows//устанавливаем сами метки
        };
        groups.push(group)
        res.send(groups);
}
function set_centers(coords){//функция создания координат
    coords.rows.forEach(element => {
        element.center = []
        element.center.push(element.x_coord)
        element.center.push(element.y_coord)
        delete x_coord//удаляем ненужные переменные
        delete y_coord
    });
    return coords
}
module.exports = get_coords