require("dotenv").config();
const { Sequelize, DataTypes, Op } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// ========================= Importación de modelos =========================
const cohorteModel = require("./models/Cohorte");
const userModels = require("./models/User");
const roleModels = require("./models/Role");
const scoreModels = require("./models/Score");
const contentModels = require("./models/Content");
const checkPointModels = require("./models/CheckPoint");
const moduleModels = require("./models/Module");
const groupModels = require("./models/Group");

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
const Role = roleModels(sequelize, DataTypes);
const Score = scoreModels(sequelize, DataTypes);
const Content = contentModels(sequelize, DataTypes);
const CheckPoint = checkPointModels(sequelize, DataTypes);
const Module = moduleModels(sequelize, DataTypes);
const Group = groupModels(sequelize, DataTypes);
// =================== FIN Creación de entidades en la BD ===================

// ==========================================================================

// ===================== Relaciones entre las enteidades ====================

// Relacion Usuarios y Roles
User.belongsToMany(Role, { through: "users_role" });
Role.belongsToMany(User, { through: "users_role" });

// Relaciones de Usuario y Cohorte
User.belongsToMany(Cohorte, { through: "users_cohorte" });
Cohorte.belongsToMany(User, { through: "users_cohorte" });

// Relaciones Usuarios  y Notas
User.hasMany(Score);
Score.belongsTo(User);

// Relacion Cohorte y Modulos
Cohorte.belongsToMany(Module, { through: "modules_cohorte" });
Module.belongsToMany(Cohorte, { through: "modules_cohorte" });

// Relacion Contenidos y Modulos
Module.hasMany(Content);
Content.belongsTo(Module);

// Relacion CheckPoint y Modulos
Module.belongsTo(CheckPoint);
CheckPoint.hasMany(Module);

// Relacion Usuarios y Grupos
User.belongsToMany(Group, { through: "groups_user" });
Group.belongsToMany(User, { through: "groups_user" });

// =================== FIN Relaciones entre las enteidades ==================

// ==========================================================================

// CREACIÓN DE LOS ROLES

const createRoles = async () => {
   const staffRole = await Role.findOne({ where: { name: "staff" } });
   const instructorRole = await Role.findOne({
      where: { name: "instructor" },
   });
   const pmRole = await Role.findOne({ where: { name: "pm" } });
   const alumnoRole = await Role.findOne({ where: { name: "student" } });

   if (!staffRole) {
      await Role.create({ name: "staff" });
   }
   if (!instructorRole) {
      await Role.create({ name: "instructor" });
   }
   if (!pmRole) {
      await Role.create({ name: "pm" });
   }
   if (!alumnoRole) {
      await Role.create({ name: "student" });
   }
};

module.exports = {
   conn: sequelize,
   Op,
   DataTypes,
   Cohorte,
   User,
   Role,
   createRoles,
   Score,
   Content,
   CheckPoint,
   Module,
   Group,
};
