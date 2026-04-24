const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./phonebook.db');

app.use(cors());
app.use(bodyParser.json());

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        gender TEXT,
        dob TEXT
    )`);
});

app.get('/api/contacts', (req, res) => {
    db.all("SELECT * FROM contacts", [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/contacts', (req, res) => {
    const { name, phone } = req.body;
    db.run(`INSERT INTO contacts (name, phone) VALUES (?, ?)`, [name, phone], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID, name, phone });
    });
});

app.put('/api/contacts/:id', (req, res) => {
    const { name, phone } = req.body;
    db.run(`UPDATE contacts SET name = ?, phone = ? WHERE id = ?`, [name, phone, req.params.id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "updated" });
    });
});

app.delete('/api/contacts/:id', (req, res) => {
    db.run(`DELETE FROM contacts WHERE id = ?`, req.params.id, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "deleted" });
    });
});

app.post('/api/register', (req, res) => {
    const { name, email, password, gender, dob } = req.body;
    db.run(`INSERT INTO users (name, email, password, gender, dob) VALUES (?, ?, ?, ?, ?)`, 
    [name, email, password, gender, dob], function(err) {
        if (err) return res.status(400).json({ error: "Email already in use" });
        res.json({ id: this.lastID, name, email, gender, dob });
    });
});

app.get('/api/login', (req, res) => {
    const { email, password } = req.query;
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, user) => {
        if (err || !user) return res.status(401).json({ error: "Incorrect email or password" });
        res.json(user);
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));