//configurando o servidor
const express = require("express")
const server = express()

//configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//Habilitar body do formulario
server.use(express.urlencoded({ extended: true }))


// configurar a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'Ri080203',
    host: 'localhost',
    port: 5432,
    //nome do banco
    database: 'doe'

})



//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, //boolean ou booleano aceita 2 valores, verdadeiro ou falso
})


//configurar a apresentação da página

// Código Com o Banco de dados rodando
/*server.get("/", function(req, res) {
    
    db.query("SELECT * FROM donors", function(err, result) {
        if (err) return res.send("Erro de banco de dados")
    
        const donors = result.rows
        return res.render("index.html", { donors })
    })
*/
//})

// Código Com o Banco de Dados não rodando
server.get("/", function(req, res) {
    const donors = []
    return res.render("index.html", { donors })
})

server.post("/", function(req, res) {
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // Se o name igual a vazio
    // Ou o email igual a vazio
    // Ou se o blood igual a vazio
    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

    // coloco valores dentro do Array
    /*donors.push({
        name: name,
        blood: blood,
    })*/

    // Colocando valores dentro do banco de dados
    const query = `
        INSERT INTO donors ("name", "email", "blood")
        VALUES ($1, $2, $3)`

        const values = [name, email, blood]
    
        db.query(query, values, function(err) {
            // Fluxo de erro
            if (err) return res.send("Erro no Banco de Dados")

            // Fluxo ideal da página
            return res.redirect("/")
        })



})

// ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function() {
    console.log("iniciei o servidor.")
})