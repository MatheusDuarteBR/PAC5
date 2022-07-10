const mysql = require('mysql2/promise'); 

async function conectarBD()
{ 
    if(global.connection && global.connection.state !== 'disconnected') 
    {
        return global.connection
    }
    
    /*
    const connectionString = 'mysql://root:senha@localhost:3306/frada' 
    const connection= await mysql.createConnection(connectionString)
    */
    
    const connection = await mysql.createConnection(
        { 
            host     : 'localhost', 
            port     : 3306, 
            user     : 'root',
            password : '', 
            database : 'frada' 
        }); 
        
    console.log('Conectou no MySQL!'); 
    
    global.connection = connection; 

    return global.connection; 
} 


async function listarAnimal()
{
    const conn = await conectarBD()
    const [registros] = await conn.query('SELECT * FROM animal;')
    return registros
}


async function inserirAnimal(animal)
{
    const conn = await conectarBD()
    const sql = "insert into animal (aninome, aniidade, anicor, gencodigo, aniimagem, anidescricao) values (?,?,?,?,?,?);"
    return await conn.query(sql,[animal.nome, animal.idade, animal.cor, animal.genero, animal.imagem, animal.descricao])
}


async function selecionarAnimal(codigo)
{
    const conn = await conectarBD()
    const sql = "select * from animal where anicodigo=?;"
    const [registro] = await conn.query(sql,[codigo])
    return registro && registro.length>0 ? registro[0] : {}
    /**
     * 
     * if(rows && rows.length > 0) 
     *   return rows[0] 
     * else 
     *   return {}
     */
}

async function alterarAnimal(animal)
{
    const conn = await conectarBD()
    const sql = "update animal set aninome=?, aniidade=?, anicor=?, gencodigo=?, aniimagem=?, anidescricao=? where anicodigo=?;"
    return await conn.query(sql,[animal.nome, animal.idade, animal.cor, animal.genero, animal.imagem, animal.descricao, animal.codigo ])
}


async function apagarAnimal(codigo)
{
    const conn = await conectarBD()
    const sql = "delete from animal where anicodigo=?;"
    return await conn.query(sql,[codigo])
}


async function buscarFuncionario(fu)
{
    const conn = await conectarBD()
    const sql = "select * from usuarioFuncionario where usuFuncionario=? and ususenha=?;"
    const [usuarioEcontrado] = await conn.query(sql,[fu.funcionario, fu.senha])
    return usuarioEcontrado && usuarioEcontrado.length>0 ? usuarioEcontrado[0] : {}
}

async function cadastroUsuario(usuario)
{
    const conn = await conectarBD();
    console.log("Teste de cadastro de usuário..." + usuario.nome, usuario.sobrenome, usuario.sexo, usuario.cpf, usuario.telefone, usuario.celular, usuario.nasc, usuario.email, usuario.idade, usuario.cep, usuario.numero, usuario.complemento, usuario.referencia, usuario.bairro, usuario.cidade, usuario.estado)
    const sql = "insert into usuario (usunome, ususobrenome, usosexo, usucpf, usutelefone, usucelular, usunasc, usuemail, usuidade, endcep, endrua, endnumero, endcomplemento, endreferencia, endbairro, endcidade, endestado, ususenha) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    return await conn.query(sql, [usuario.nome, usuario.sobrenome, usuario.sexo, usuario.cpf, usuario.telefone, usuario.celular, usuario.nasc, usuario.email, usuario.idade, usuario.cep, usuario.rua,usuario.numero, usuario.complemento, usuario.referencia, usuario.bairro, usuario.cidade, usuario.estado, usuario.senha]);
    //console.log("Realizou inserção...")
    //return resultado
    //return await conn.query(sql,[usuario.nome, usuario.sobrenome, usuario.sexo, usuario.cpf, usuario.telefone, usuario.celular, usuario.nasc, usuario.senha, usuario.email, usuario.idade, usuario.cep, usuario.numero, usuario.complemento, usuario.referencia, usuario.bairro, usuario.cidade, usuario.estado])
}


async function cadastroFuncionario(funcionario)
{
    const conn = await conectarBD();
    console.log("Teste de cadastro de funcionario..." + funcionario.nome, funcionario.senha, funcionario.funcionario)
    const sql = "insert into usuariofuncionario (usunome, ususenha, usuFuncionario) values (?,?,?);"
    return await conn.query(sql, [funcionario.nome, funcionario.senha, funcionario.funcionario]);
}

async function buscarUsuario(us1)
{
    const conn = await conectarBD()
    const sql = "select * from usuario where usuemail=? and ususenha=?;"
    const [usuarioEcontrado] = await conn.query(sql,[us.funcionario, us.senha])
    return usuarioEcontrado && usuarioEcontrado.length>0 ? usuarioEcontrado[0] : {}
}

conectarBD()

module.exports = { listarAnimal , inserirAnimal, selecionarAnimal, alterarAnimal, apagarAnimal, buscarUsuario, cadastroUsuario, cadastroFuncionario, buscarFuncionario }



