const { CohorteModels  } = require("../db");

createCohorte = async ({
    cohorteName,
    cohorteNumber
 }) => {
    let cohorte = await CohorteModels.create({cohorteName,cohorteNumber})

    return cohorte

 };

module.exports = {
    createCohorte
 };