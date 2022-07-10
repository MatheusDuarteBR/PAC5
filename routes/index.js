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
      res.redirect('/loginFuncionario')
    }
    const registros = await global.db.listarAnimal()
    const usu = global.usuariofuncionario
  
    res.render('listaAnimal', { registros, usu })
  
})

router.get('/loginFuncionario', function(req, res){
  res.render('loginFuncionario')
})


router.post('/loginFuncionario', async function(req, res){
  const funcionario = req.body.edtFuncionario
  const senha       = req.body.edtFuncionarioSenha
  
  const user = await global.db.buscarFuncionario({funcionario,senha})
  console.log("Login global.. " + user.usucodigo + "Funcionario:" + user.funcionario)
  global.usuariocodigo       = user.usucodigo
  global.usuariofuncionario  = user.usuariofuncionario
  res.redirect('/listaDeAnimal')
})

router.get('/sair', function(req, res){

  global.usuariocodigo       = 0
  global.usuariofuncionario  = 0

  res.redirect('/loginFuncionario')
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
    res.redirect('/listaDeAnimal')
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
  const nomeAnimal = req.body.edtNomeAnimal
  const idade = !req.body.edtIdade ? null : parseInt(req.body.edtIdade)
  const cor    = req.body.edtCor 
  const genero = !req.body.cmbGenero ? null : parseInt(req.body.cmbGenero)
  const imagem = req.body.edtImagem
  const descricao = req.body.edtDescricao

  try
  {
    console.log("Ação: ")
    await global.db.inserirAnimal({nomeAnimal, idade, cor, genero, imagem, descricao})
    res.redirect('/listaDeAnimal')
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
  const senha          = req.body.edtSenha

  try
  {
    await global.db.CadastroUsuario({nome, sobrenome, sexo, cpf, telefone, celular, nasc, email, idade, cep, rua, numero, complemento, referencia, bairro, cidade, estado, senha })
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
  const imagem    = req.body.edtImagem
  const descricao    = req.body.edtDescricao

  try
  {
    await global.db.alterarAnimal({nome, idade, cor, genero, codigo, imagem, descricao})
    res.redirect('/listaDeAnimal')
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


router.get('/funcionarioNovo', function(req, res){
  res.render('formCadastroFuncionario', { title: "Crud de Funcionario", funcionario:{}, action: "/funcionarioNovo" })
})

router.post('/funcionarioNovo', async function(req, res) {
  const nomeFuncionario  = req.body.edtNomeFuncionario
  const senhaFuncionario = req.body.edtSenhaFuncionario
  const usufuncionario      = req.body.edtUsuFuncionario 


  try
  {
    console.log("Ação: ")
    await global.db.CadastroFuncionario({nomeFuncionario, senhaFuncionario, usufuncionario})
    res.redirect('/listaDeAnimal')
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
})


router.get('/loginUsuario', function(req, res){
  res.render('loginUsuario')
})


router.post('/loginUsuario', async function(req, res){
  const emailUsuario  = req.body.edtEmailUsuario
  const senhaUsuario  = req.body.edtsenhaUsuario
  
  const user = await global.db.buscarUsuario({emailUsuario,senhaUsuario})
  console.log("Login global.. " + user.usucodigo + "Funcionario:" + user.funcionario)
  global.usuariocodigo       = user.usucodigo
  global.usuariofuncionario  = user.usuariofuncionario
  res.redirect('/')
})




module.exports = router;
