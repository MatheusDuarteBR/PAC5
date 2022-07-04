var express = require('express')
var router = express.Router()

/* GET home page. */

/*router.get('/', function(req, res, next) {
  res.render('index');
})*/

router.get('/', async function(req, res) {
  try
  {
    if (!global.usuariocodigo || global.usuariocodigo == 0)
    {
      res.redirect('/login')
    }

    const registros = await global.db.listarAnimal()
    const usu = global.usuarioemail
    res.render('telaPrincipal', { registros, usu })
  }
  catch(error)
  {
    res.redirect('/?erro='+error);
  }
  
})

router.get('/login', function(req, res){
  res.render('login')
})


router.post('/login', async function(req, res){
  const usuario = req.body.edtEmail 
  const senha   = req.body.edtSenha
  
  const user = await global.db.buscarUsuario({usuario,senha})

  global.usuariocodigo = user.usucodigo
  global.usuarioemail  = user.usuemail
  res.redirect('/')
})

router.get('/sair', function(req, res){

  global.usuariocodigo = 0
  global.usuarioemail  = 0

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
  const nome = req.body.edtNome 
  const idade = !req.body.edtIdade ? null : parseInt(req.body.edtIdade)
  const cor    = req.body.edtCor 
  const genero = !req.body.cmbGenero ? null : parseInt(req.body.cmbGenero)

  try
  {
    await global.db.inserirAnimal({nome, idade, cor, genero})
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
  const senha          = req.body.edtSenha
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
    await global.db.CadastroUsuario({nome,sobrenome, sexo, idade, telefone, celular, cpf, nasc, senha, email, cep, rua, numero, complemento, referencia, bairro, cidade, estado})
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

router.get('/petshop', function(req, res){
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

var logado = false;

module.exports = router;
