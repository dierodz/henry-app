const { Ratings } = require("../db");

const createRatings = (score) => {
	
    return new Promise((resolve, reject) => {
        Ratings.create({
            score
        })
            .then((rating) => resolve(rating))
            .catch((err) =>
                reject({
                    error: err,
                })
            );
    });
};


module.exports = {
   createRatings
}