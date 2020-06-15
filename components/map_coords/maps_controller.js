

const get_coords = require("../map_coords/get_coords.js")
const add_coords = require("../map_coords/add_coords.js")
const edit_coords = require("../map_coords/edit.coords.js")

exports.add_coords = (req, res) =>{
    add_coords(req, res)
}
exports.get_coords = (req, res) =>{
    get_coords(req, res)
}
exports.edit_coords = (req, res) =>{
    edit_coords(req, res)
}