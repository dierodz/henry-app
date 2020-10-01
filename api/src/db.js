require("dotenv").config();
const { Sequelize, DataTypes, Op } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// ========================= Importación de modelos =========================
const cohorteModel = require("./models/cohorteModel");
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

// =================== FIN Creación de entidades en la BD ===================

// ==========================================================================

// ===================== Relaciones entre las enteidades ====================

// =================== FIN Relaciones entre las enteidades ==================

// ==========================================================================

module.exports = {
   conn: sequelize,
   Op,
   DataTypes,
   Cohorte
};
