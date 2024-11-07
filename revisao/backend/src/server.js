const express = require('express');
const cors = require ('cors');
const connection = require ('./db_config.js');
const app = express();

app.use(cors());
app.use(express.json());

const port = 3030;

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro no servidor.'});
        }
    })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));