var express = require('express')
var router = express.Router()
const multer = require('multer')
const multerConfig = require("./config/multer");

/* GET home page. */

/*router.get('/', function(req, res, next) {
  res.render('index');
})*/

router.get('/listaDeAnimal', async function(req, res) {

  
    if (!global.usuariocodigo || global.usuariocodigo == 0)
    {
      res.redirect('/login')
    }
    const registros = await global.db.listarAnimal()
    const usu = global.usuariofuncionario
  
    res.render('listaAnimal', { registros, usu })
  
})

router.get('/login', function(req, res){
  res.render('login')
})


router.post('/login', async function(req, res){
  const funcionario = req.body.edtFuncionario
  const senha       = req.body.edtFuncionarioSenha
  
  const user = await global.db.buscarUsuario({funcionario,senha})
  console.log("Login global.. " + user.usucodigo + "Funcionario:" + user.funcionario)
  global.usuariocodigo       = user.usucodigo
  global.usuariofuncionario  = user.usuariofuncionario
  res.redirect('/listaDeAnimal')
})

router.get('/sair', function(req, res){

  global.usuariocodigo       = 0
  global.usuariofuncionario  = 0

  res.redirect('/login')
})

router.get('/animalNovo', function(req, res){
  //res.render('formAnimal', { title: "Cadastro de Animal", action: "/animalNovo" })
  res.render('formAnimal', { title: "Cadastro de Animal", registro:{}, action: "/animalNovo" })
})


router.get('/animalApaga/:id', async function(req,res){
  const codigo = parseInt(req.params.id)
  try
  {
    await global.db.apagarAnimal(codigo)
    res.redirect('/')
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
})


router.get('/animalAltera/:id', async function(req,res){
  const codigo = parseInt(req.params.id)
  try
  {
    const registro = await global.db.selecionarAnimal(codigo)
    res.render('formAnimal', {title: "Alteração de Animal", registro, action: "/animalAltera/"+codigo })
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
})


router.post('/animalNovo', async function(req, res) {
  const aninome = req.body.edtAninome
  const idade = !req.body.edtIdade ? null : parseInt(req.body.edtIdade)
  const cor    = req.body.edtCor 
  const genero = !req.body.cmbGenero ? null : parseInt(req.body.cmbGenero)
  const descricao    = req.body.edtDescricao
  
  console.log("passou  aqui")

  try
  {
    await global.db.inserirAnimal({aninome, idade, cor, genero, descricao})
    res.redirect('/')
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
})

router.post('/usuarioNovo', async function(req, res) {

  console.log("Ação: ")
  const nome           = req.body.edtNome 
  const sobrenome      = req.body.edtSobrenome 
  const sexo           = req.body.edtSexo  
  const cpf            = req.body.edtCpf
  const telefone       = req.body.edtTelefone
  const celular        = req.body.edtCelular
  const nasc           = req.body.edtNasc
  const email          = req.body.edtEmail
  const idade          = !req.body.edtIdade ? null : parseInt(req.body.edtIdade)
  const cep            = req.body.edtCep
  const rua            = req.body.edtRua
  const numero         = req.body.edtNumero
  const complemento    = req.body.edtComplemento
  const referencia     = req.body.edtReferencia
  const bairro         = req.body.edtBairro
  const cidade         = req.body.edtCidade
  const estado         = req.body.edtEstado

  try
  {
    await global.db.CadastroUsuario({nome, sobrenome, sexo, cpf, telefone, celular, nasc, email, idade, cep, rua, numero, complemento, referencia, bairro, cidade, estado})
    res.redirect('/')
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
})

router.get('/usuarioNovo', function(req, res){
  res.render('formCadastro1', { title: "Crud de Usuario", usuario:{}, action: "/usuarioNovo" })
})

router.get('/', function(req, res){
  res.render('telaPrincipal', { title: "Frada joinville"})
})

router.post('/animalAltera/:id', async function(req, res) {
  const codigo = parseInt(req.params.id)
  const nome = req.body.edtNome 
  const idade    = !req.body.edtIdade ? null : parseInt(req.body.edtIdade)
  const cor    = req.body.edtCor 
  const genero = !req.body.cmbGenero ? null : parseInt(req.body.cmbGenero)

  try
  {
    await global.db.alterarAnimal({nome, idade, cor, genero, codigo})
    res.redirect('/')
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
})

router.post("/posts", multer(multerConfig).single("file"), async (req, res) => {

  return res.json(res.render('telaPrincipal', { title: "Frada joinville"}));

})

router.get('/posts', function(req, res){
  res.render('foto', { title: "Frada joinville"})
})

module.exports = router;
