require("dotenv").config();
const { Sequelize, DataTypes, Op } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// ========================= Importación de modelos =========================
const cohorteModel = require("./models/cohorteModel");
const userModels = require("./models/userModels");
const rolesModels = require("./models/rolesModels");
const userRolesModels = require("./models/userRoles");
const modulesModels = require("./models/modulesModels");
// ======================= FIN Importación de modelos =======================

// ==========================================================================

// ============================ Conexion a la BD ============================

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);

// ========================== FIN Conexion a la BD ==========================

// ==========================================================================

// ===================== Creación de entidades en la BD =====================
const Cohorte = cohorteModel(sequelize, DataTypes);
const User = userModels(sequelize, DataTypes);
const Roles = rolesModels(sequelize, DataTypes);
const UserRoles = userRolesModels(sequelize, DataTypes);
const Modules = modulesModels(sequelize, DataTypes);
// =================== FIN Creación de entidades en la BD ===================

// ==========================================================================

// ===================== Relaciones entre las enteidades ====================

User.belongsToMany(Roles, { through: UserRoles });
Roles.belongsToMany(User, { through: UserRoles });

// =================== FIN Relaciones entre las enteidades ==================

// ==========================================================================

// CREACIÓN DE LOS ROLES


const createRoles = async () => {

const staffRole = await Roles.findOne({ where: { role: "staff" } });
const instructorRole = await Roles.findOne({ where: { role: "instructor" } });
const pmRole = await Roles.findOne({ where: { role: "pm" } });
const alumnoRole = await Roles.findOne({ where: { role: "alumno" } });

if (!staffRole) {
  await Roles.create({ role: "staff" });
}
if (!instructorRole) {
 await  Roles.create({ role: "instructor" });
}
if (!pmRole) {
 await  Roles.create({ role: "pm" });
}
if (!alumnoRole) {
 await  Roles.create({ role: "alumno" });
}

}


module.exports = {
   conn: sequelize,
   Op,
   DataTypes,
   Cohorte,
   User,
   Roles,
   createRoles,
   Modules
};
