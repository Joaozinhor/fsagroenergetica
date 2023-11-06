const express = require('express');
const mysql = require('mysql2');
const app = express();

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fsagro',
  database: 'fsagro',
});


// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o banco de dados: ' + err);
    return;
  }
  console.log('Conexão bem-sucedida com o banco de dados MySQL');
});

// Configurar o Express para analisar solicitações JSON e x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Estilo
app.use(express.static('css')); 

// Imagens
app.use(express.static('img')); 
app.use(express.static('usina')); 

// Rota para a página do formulário
app.get('/', (req, res) => {
  res.sendFile('C:/Users/PORTARIA/Documents/Site usina/index.html');
});

app.get('/curriculo', (req, res) => {
  res.sendFile('C:/Users/PORTARIA/Documents/Site usina/curriculo.html');
});

// Rota para inserir dados no banco de dados
app.post('/curriculo', (req, res) => {
  const { nome, email, idade, endereco, celular, nacionalidade, estadocivil, cargoareadeinteresse, experiencias, formacao, arqcurriculo } = req.body;
  const sql = 'INSERT INTO curriculo (nome, email, idade, endereco, celular, nacionalidade, estadocivil, cargoareadeinteresse, experiencias, formacao, arqcurriculo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [nome, email, idade, endereco, celular, nacionalidade, estadocivil, cargoareadeinteresse, experiencias, formacao, arqcurriculo], (err, result) => {
    if (err) {
      console.error('Erro na consulta SQL: ' + err);
      return;
    }
    console.log('Dados inseridos com sucesso');
  });
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Node.js está ouvindo na porta ${port}`);
});
