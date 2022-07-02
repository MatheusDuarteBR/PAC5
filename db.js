const mysql = require('mysql2/promise'); 

async function conectarBD()
{ 
    if(global.connection && global.connection.state !== 'disconnected') 
    {
        return global.connection
    }
    
    /*
    const connectionString = 'mysql://root:senha@localhost:3306/petshop' 
    const connection= await mysql.createConnection(connectionString)
    */
    
    const connection = await mysql.createConnection(
        { 
            host     : 'localhost', 
            port     : 3306, 
            user     : 'root',
            password : '', 
            database : 'petshop' 
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
    const sql = "insert into animal (aninome, aniidade, anicor, gencodigo) values (?,?,?,?);"
    return await conn.query(sql,[animal.nome, animal.idade, animal.cor, animal.genero])
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
    const sql = "update animal set aninome=?, aniidade=?, anicor=?, gencodigo=? where anicodigo=?;"
    return await conn.query(sql,[animal.nome, animal.idade, animal.cor, animal.genero, animal.codigo])
}


async function apagarAnimal(codigo)
{
    const conn = await conectarBD()
    const sql = "delete from animal where anicodigo=?;"
    return await conn.query(sql,[codigo])
}


async function buscarUsuario(us)
{
    const conn = await conectarBD()
    const sql = "select * from usuario where usulogin=? and ususenha=?;"
    const [usuarioEcontrado] = await conn.query(sql,[us.usuario, us.senha])
    return usuarioEcontrado && usuarioEcontrado.length>0 ? usuarioEcontrado[0] : {}
}


conectarBD()

module.exports = { listarAnimal , inserirAnimal, selecionarAnimal, alterarAnimal, apagarAnimal, buscarUsuario }



