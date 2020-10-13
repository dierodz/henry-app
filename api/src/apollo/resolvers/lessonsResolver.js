const { getAllClases } = require("../../controllers/vimeoController");

const lessons = async (_, {}) => {
   return await getAllClases();
 };


 module.exports = {
    lessons
 };