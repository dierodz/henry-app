require("dotenv").config();
const { Sequelize, DataTypes, Op } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// ========================= Importación de modelos =========================
const cohorteModel = require("./models/Cohorte");
const userModels = require("./models/User");
const rolesModels = require("./models/Role");
const scoresModels = require("./models/Score");
const contentModels = require("./models/Content");
const checkPointModels = require("./models/CheckPoint");
const modulesModels = require("./models/Module");
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
const Roles = rolesModels(sequelize, DataTypes);
const Scores = scoresModels(sequelize, DataTypes);
const Content = contentModels(sequelize, DataTypes);
const CheckPoint = checkPointModels(sequelize, DataTypes);
const Modules = modulesModels(sequelize, DataTypes);
const Group = groupModels(sequelize, DataTypes);
// =================== FIN Creación de entidades en la BD ===================

// ==========================================================================

// ===================== Relaciones entre las enteidades ====================

// Relacion Usuarios y Roles
User.belongsToMany(Roles, { through: "users_role" });
Roles.belongsToMany(User, { through: "users_role" });

// Relaciones de Usuario y Cohorte
User.belongsToMany(Cohorte, { through: "users_cohorte" });
Cohorte.belongsToMany(User, { through: "users_cohorte" });

// Relaciones Usuarios  y Notas
User.hasMany(Scores);
Scores.belongsTo(User);

// Relacion Cohorte y Modulos
Cohorte.belongsToMany(Modules, { through: "modules_cohorte" });
Modules.belongsToMany(Cohorte, { through: "modules_cohorte" });

// Relacion Contenidos y Modulos
Modules.hasMany(Content);
Content.belongsTo(Modules);

// Relacion CheckPoint y Modulos
Modules.belongsTo(CheckPoint);
CheckPoint.hasMany(Modules);

// Relacion Usuarios y Grupos
User.belongsToMany(Group, { through: "groups_user" });
Group.belongsToMany(User, { through: "groups_user" });

// =================== FIN Relaciones entre las enteidades ==================

// ==========================================================================

// CREACIÓN DE LOS ROLES

const createRoles = async () => {
   const staffRole = await Roles.findOne({ where: { role: "staff" } });
   const instructorRole = await Roles.findOne({
      where: { role: "instructor" },
   });
   const pmRole = await Roles.findOne({ where: { role: "pm" } });
   const alumnoRole = await Roles.findOne({ where: { role: "student" } });

   if (!staffRole) {
      await Roles.create({ role: "staff" });
   }
   if (!instructorRole) {
      await Roles.create({ role: "instructor" });
   }
   if (!pmRole) {
      await Roles.create({ role: "pm" });
   }
   if (!alumnoRole) {
      await Roles.create({ role: "student" });
   }
};

module.exports = {
   conn: sequelize,
   Op,
   DataTypes,
   Cohorte,
   User,
   Roles,
   createRoles,
   Scores,
   Content,
   CheckPoint,
   Modules,
   Group,
};
