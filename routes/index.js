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
    const usu = global.usuariologin
    res.render('index', { registros, usu })
  }
  catch(error)
  {
    res.redirect('/?erro='+error);
  }
  
})


router.get('/sair', function(req, res){
  global.usuario = 0
  res.redirect('/login')
})

router.get('/login', function(req, res){
  res.render('login')
})


router.post('/login', async function(req, res){
  const usuario = req.body.edtUsuario 
  const senha   = req.body.edtSenha
  
  const user = await global.db.buscarUsuario({usuario,senha})

  global.usuariocodigo = user.usucodigo
  global.usuariologin  = user.usulogin
  res.redirect('/')
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
  const nome       = req.body.edtNome 
  const idade      = !req.body.edtIdade ? null : parseInt(req.body.edtIdade)
  const telefone   = !req.body.edtTelefone ? null : parseInt(req.body.edtTelefone)
  const cpf        = req.body.edtCpf
  const nasc       = req.body.edtNasc
  const senha      = req.body.edtSenha
  const login    = req.body.edtLogin

  try
  {
    await global.db.CadastroUsuario({nome, idade, telefone, cpf, nasc, senha, login})
    res.redirect('/')
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
})

router.get('/usuarioNovo', function(req, res){
  res.render('formCadastro', { title: "Crud de Usuario", usuario:{}, action: "/usuarioNovo" })
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

module.exports = router;
