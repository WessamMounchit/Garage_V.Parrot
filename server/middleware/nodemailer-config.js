const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Utilisez la variable d'environnement pour l'e-mail
    pass: process.env.EMAIL_PASSWORD, // Utilisez la variable d'environnement pour le mot de passe
  },
});
// ...

// Fonction pour envoyer l'e-mail
const sendEmail = async (subject, email, message) => {
  const mailOptions = {
    from: "votre_email@gmail.com", // Votre adresse e-mail
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail : ", error);
  }
};

// Utilisez la fonction sendEmail pour envoyer un e-mail après la soumission du formulaire
