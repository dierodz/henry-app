var fs = require("fs")
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_SECRET || 'secret';

const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN
} = process.env;

var auth = {
  auth: {
    api_key: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN
  }
}
var nodemailerMailgun = nodemailer.createTransport(mg(auth));


function sendEmail(user, type, data) {

  var modelEmail = fs.readFileSync("./src/mailModels/basicModel.html", 'utf8', function (err, data) {
    if (err) console.error(err);
    return data
  })
  let subjectEmail;
  let messageTemplate;
  let linkTemplate;

  if (type === "passwordReset") {
    subjectEmail = "Cambio de contraseña";
    const token = jwt.sign({ uid: user.id, action: 'password_reset' }, secret)
    messageTemplate = `<p style="margin-top: 2rem;border-radius:1rem;color: #000;font-weight: 800;margin-bottom: 0;padding:1em;">Hola ${user.name}! recibimos una petición de cambio de contraseña, hacé click en el siguiente enlace para restablecerla</p>`
    linkTemplate = `<a class="boton" style="background-color: #000;font-weight: bold;color:#fff;box-shadow: 0 0 4px 1px #fafc01" href="${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/reset?token=${token}">CAMBIAR</a>`
  } else if (type === "userInivitation") {
    subjectEmail = "Únete a HenryApp";
    const token = jwt.sign({ email: user.email, role: data }, secret)
    messageTemplate = `<p style="margin-top: 2rem;border-radius:1rem;color: #000;font-weight: 800;margin-bottom: 0;padding:1em;"> Te invitamos a unirte a nuestra app!. Hacé click en el siguiente enlace</p>`
    linkTemplate = `<a class="boton" style="background-color: #000;font-weight: bold;color:#fff;box-shadow: 0 0 4px 1px #fafc01" href="${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/auth/signup?token=${token}">ÚNETE</a>`
  }
  modelEmail = modelEmail.replace("%message%", messageTemplate)
  modelEmail = modelEmail.replace("%link%", linkTemplate)

  nodemailerMailgun.sendMail({
    from: 'noreply@soyhenry.com',
    to: user.email,
    subject: subjectEmail,
    html: modelEmail
  }, function (err, info) {
    if (err) {
      console.error('Error: ' + err);
    } else {
      console.error('Response: ' + info);
    }
  });

  return modelEmail;
}
module.exports = {
  sendEmail
}