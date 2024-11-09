const express = require('express');
const cors = require ('cors');
const connection = require ('./db_config');
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

        if (results.length > 0) {
            res.json({succes: true, message: 'Login bem-sucedido.'})
        } else {
            res.json({succes: false, message: 'Usuário ou senha incorretos.'})
        }

    })
})

// Criar um produto:
app.post('/products', (req, res) => {
    const {name, quantity, price} = req.body
    const query = 'INSERT INTO products(name, quantity, price) VALUES(?, ?, ?)'
    connection.query(query, [name, quantity, price], (err, result) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro ao inserir produto.'});
        }
        res.json({succes: true, message: 'Produto inserido com sucesso!', id:result.insertId})
    })
})

// Buscar os produtos no banco:
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products'
    connection.query(query, (err, results) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro ao buscar produto.'});
        }
        res.json({succes: true, products: results})
    })
})

// Editar produto:
app.put('/products/:id', (req, res) => {
    const {id} = req.params
    const {name, quantity, price} = req.body
    const query = 'UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?'
    connection.query(query, [name, quantity, price, id], (err) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro ao atualizar produto.'});
        }
        res.json({succes: true, message: 'Produto atualizado com sucesso!'})
    })
})

// Deletar produto:
app.delete('products/:id', (req, res) => {
    const {id} = req.params
    const query = 'DELETE FROM products WHERE id = ?'
    connection.query(query, [id], (err) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro ao deletar produto.'});
        }
        res.json({succes: true, message: 'Produto deletado com sucesso!'})
    })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));