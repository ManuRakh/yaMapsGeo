

const get_coords = require("./modules/get_coords.js")
const add_coords = require("./modules/add_coords.js")
const edit_coords = require("./modules/edit.coords.js")
//** Данный контроллер осуществляет распределение функций
// * и модулей по мере их вызовов
// * В данном случае не нужно импортировать  100 модулей в файл для роутов 
// * Достаточно импортировать контроллер, который и будет заниматься своими прямыми обязанностями
// */
exports.add_coords = (req, res) =>{
    add_coords(req, res)
}
exports.get_coords = (req, res) =>{
    get_coords(req, res)
}
exports.edit_coords = (req, res) =>{
    edit_coords(req, res)
}