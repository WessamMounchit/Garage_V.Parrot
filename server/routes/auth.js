const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware pour parser le corps des requêtes
router.use(express.json());

// Données fictives pour les utilisateurs
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$naee1XZ2COJ0n32R7PMLOOc6.l4t64uJMM6JAP.TbnkAhZqgNbz9S', // Mot de passe : "admin123"
    role: 'admin',
  },
  {
    id: 2,
    username: 'employee1',
    password: '$2a$10$naee1XZ2COJ0n32R7PMLOOc6.l4t64uJMM6JAP.TbnkAhZqgNbz9S', // Mot de passe : "employee123"
    role: 'employee',
  },
];

// Configuration du secret JWT
const SECRET_KEY = 'ma_cle_secrete';

// Route de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérification des identifiants de connexion
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Identifiants de connexion invalides' });
  }

  // Génération du token JWT
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

  // Renvoi du token dans la réponse
  res.json({ token });
});

// Middleware d'authentification
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token d\'authentification manquant' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token d\'authentification invalide' });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};

// Route protégée pour les admins
router.get('/admin/protected', authenticate, (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Accès interdit' });
  }

  res.json({ message: 'Accès autorisé pour l\'administrateur' });
});

// Route protégée pour les employés
router.get('/employee/protected', authenticate, (req, res) => {
  if (req.userRole !== 'employee') {
    return res.status(403).json({ error: 'Accès interdit' });
  }

  res.json({ message: 'Accès autorisé pour l\'employé' });
});

module.exports = router;
