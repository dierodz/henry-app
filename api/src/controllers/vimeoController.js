const { Lesson } = require("../db");


//Vimeo Api
let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("cd76cadcc03e452c4fe561aa8401dcbba33d5f1c", "UMKTV+hzJ/UjgD6JuFZoIM+HuF9YYRPnNwRl7qVKW0zdI8oSun1pS7fwF+zxbvekxns+DZnnWZ1fb2gJIu1QmfI0OTv20hcFoT1iwp6hcRKlM82vSL5H8ruJulpWdphE", "9af52953fb7efad0cd1ce43791d300ce");


const getAllClases = () => {
    client.request('https://api.vimeo.com/users/112886970/projects/2174805/videos',function (err, json){
        if(err){
           return err
        }
        console.log(json)
    })
}

// const asignarClase = async ({ name, description }) => {
//     const clases = fetch('https://api.vimeo.com/users/112886970/projects/2174805/videos')
//         .then(response => response.json())
//         .then(data => console.log(data));

//     console.log(clases)
//     const module = await Lesson.create({ name, description });
//     return module;
//  };

 module.exports = {
    // asignarClase,
    getAllClases
 };
 