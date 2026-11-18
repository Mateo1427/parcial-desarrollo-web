const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");
const app = express();
const SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// REGISTRO
app.post("/api/usuarios", (req, res) => {
    const { name, lastName, age, email, phone, date, password } = req.body;

    if (!name || !lastName || !age || !email || !phone || !date || !password) {
        return res.status(400).json({
            mensaje: "Complete los campos obligatorios"
        });
    }

    try {
        const hash = bcrypt.hashSync(password, 10);

        const resultado = db.prepare(`
            INSERT INTO usuarios (name, lastName, age, email, phone, date, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(name, lastName, age, email, phone, date, hash || "");

        res.status(201).json({
            mensaje: "Usuario registrado",
            id: resultado.lastInsertRowid
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            mensaje: "No fue posible registrar. Verifique si el correo ya existe."
        });
    }
});

// LOGIN
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    console.log(req.body)
    console.log(email)
    console.log(password)

    if (!email || !password) {

        return res.status(400).json({
            mensaje: "Ingrese email y contraseña"
        });
    }

    const usuario = db.prepare(
        "SELECT * FROM usuarios WHERE email = ?"
    ).get(email);

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({
            mensaje: "Correo o contraseña incorrectos"
        });
    }

    const token = jwt.sign(
        { id: usuario.id },
        SECRET,
        { expiresIn: "2h" }
    );

    res.json({
        mensaje: "Inicio de sesión exitoso",
        token,
        usuario: {
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
        }
    });
});

// MIDDLEWARE PARA VALIDAR TOKEN -> Extrae la información
function verificarToken(req, res, next) {
    const autorizacion = req.headers.authorization;

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
        return res.status(401).json({
            mensaje: "Debe iniciar sesión"
        });
    }

    const token = autorizacion.split(" ")[1];

    try {
        req.usuario = jwt.verify(token, SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o vencido"
        });
    }
}

// CONSULTAR
app.get("/api/usuarios", verificarToken, (req, res) => {
    const usuarios = db.prepare(`
        SELECT id, name, lastName , age, email, phone, date, password 
        FROM usuarios
    `).all();

    res.json(usuarios);
});

// CONSULTAR ID
app.get("/api/perfil", verificarToken, (req, res) => {

    console.log("ID buscado:", req.usuario.id);

    const usuario = db.prepare(`
        SELECT id, name, lastName , age, email, phone, date 
        FROM usuarios
        WHERE id = ?
    `).get(req.usuario.id);

    res.json(usuario);
});

// ACTUALIZAR
app.put("/api/usuarios/update", verificarToken, (req, res) => {
    const { name, lastName , age, email, phone, date, password } = req.body;

    if (!name) {
        return res.status(400).json({
            mensaje: "El nombre es obligatorio"
        });
    }

    let resultado;

    // Si el usuario escribió una nueva contraseña, la encriptamos y actualizamos
    if (password && password.trim() !== "") {

        const hashedPassword = bcrypt.hashSync(password, 10);

        resultado = db.prepare(`
            UPDATE usuarios
            SET name = ?, lastName = ?, age = ?, email = ?, phone = ?, date = ?, password = ?
            WHERE id = ?
        `).run(name, lastName, age, email, phone, date, hashedPassword, req.usuario.id);

    } else {
        // Si lo dejó vacío, conservamos la contraseña que ya tenía en la base de datos
        resultado = db.prepare(`
            UPDATE usuarios
            SET name = ?, lastName = ?, age = ?, email = ?, phone = ?, date = ?
            WHERE id = ?
        `).run(name, lastName, age, email, phone, date, req.usuario.id);
    }

    if (resultado.changes === 0) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario actualizado correctamente" });
});

// ELIMINAR
app.delete("/api/usuarios/delete", verificarToken, (req, res) => {
    const resultado = db.prepare(
        "DELETE FROM usuarios WHERE id = ?"
    ).run(req.usuario.id);

    if (resultado.changes === 0) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    res.json({ mensaje: "Usuario eliminado" });
});

app.listen(3000, () => {
    console.log("API funcionando en http://localhost:3000");
});
