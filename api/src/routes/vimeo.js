const router = require("express").Router();

const {
    // asignarClase,
    getAllClases
} = require("../controllers/vimeoController");

router
   .route("/")
   .get((req, res) => {
       try{
        res.json(getAllClases())
       }
       catch{
           res.json("hola")
       }
   })

module.exports = router;