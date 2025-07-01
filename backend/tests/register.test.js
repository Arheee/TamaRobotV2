const request = require('supertest');
const express = require('express');
const registerRouter = require('../src/routes/register');

//Remplacer une vraie fonction par une fausse version contrôlable : interargit avec une fausse bdd
jest.mock('../src/models/registerModel.js', () => ({
  verifierUtilisateurExiste: jest.fn(),
  creerUtilisateur: jest.fn(),
  creerTamarobot: jest.fn()
}));

const {
  verifierUtilisateurExiste,
  creerUtilisateur,
  creerTamarobot
} = require('../src/models/registerModel');

const app = express();
app.use(express.json());
app.use('/register', registerRouter);

describe('Test de la route /register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("refuse l'inscription si des champs sont manquants", async () => {
    const res = await request(app).post('/register').send({
      nom_utilisateur: 'Alice',
      mot_de_passe: '' // champ manquant volontairement
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Champs manquants");
  });

  test("refuse l'inscription si le honeypot est rempli", async () => {
    const res = await request(app).post('/register').send({
      nom_utilisateur: 'Bob',
      mot_de_passe: 'secret',
      nom_tama: 'TamaBot',
      t_pot: 'piège'
    });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe("Accès refusé");
  });

  test("refuse si l'utilisateur existe déjà", async () => {
    verifierUtilisateurExiste.mockResolvedValue(true); // Simule qu'il existe déjà

    const res = await request(app).post('/register').send({
      nom_utilisateur: 'Bob',
      mot_de_passe: 'secret',
      nom_tama: 'TamaBot'
    });

    expect(verifierUtilisateurExiste).toHaveBeenCalledWith('Bob');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Nom d'utilisateur déjà pris");
  });

  test("crée un utilisateur et son tamarobot si tout est OK", async () => {
    verifierUtilisateurExiste.mockResolvedValue(false);
    creerUtilisateur.mockResolvedValue(42); // Simule un ID retourné
    creerTamarobot.mockResolvedValue();

    const res = await request(app).post('/register').send({
      nom_utilisateur: 'Charlie',
      mot_de_passe: 'password',
      nom_tama: 'TamaTest'
    });

    expect(verifierUtilisateurExiste).toHaveBeenCalledWith('Charlie');
    expect(creerUtilisateur).toHaveBeenCalledWith('Charlie', 'password');
    expect(creerTamarobot).toHaveBeenCalledWith('TamaTest', 42);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Tamarobot créé avec succès !");
  });
});