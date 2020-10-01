const { Ratings } = require("../db");

//-----controlador para crear un score, echo con promesas--------\\ 

const createRatings = async (score) => {
	 const create = Ratings.create({score})
    return create;
};


module.exports = {
   createRatings
}