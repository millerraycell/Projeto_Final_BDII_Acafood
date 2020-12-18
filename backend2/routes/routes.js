const express = require('express');
const router = express.Router();

//Configuração neo4j -- https://adamcowley.co.uk/javascript/using-the-neo4j-driver-with-nodejs/
const neo4j = require('neo4j-driver');
const driver = new neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j","neo4j"));


//comida + assistidos, usuario novo sem curtidas
router.get('/neo4j/recomendados', async function(req, res, next){

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    })


    const node_res = await session.run(
        `MATCH (:Person)-[l:LIKED]->(m:Food)
        WITH m, count(l) as quant_atores
        RETURN m.name, quant_atores
        ORDER BY quant_atores DESC
        LIMIT 3`
    , {});
    session.close();
    
    console.log({comida: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

    res.send({comida: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

}); 

 //comida + assistidos, usuario ja existente e ja curtiu um foode
router.get('/neo4j/:name', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    })

    console.log(req.params.name);

    const node_res = await session.run(
        `MATCH
        (p:Person)-[:LIKED]->(m:Food)<-[:LIKED]-(p2:Person)-[:LIKED]->(m2:Food)
        WHERE p.name = "${req.params.name}"
        WITH m2
        WHERE NOT (p)-[:LIKED]->(m2)
        RETURN m2.name, COUNT(m2) as m2_t
        ORDER BY m2_t DESC LIMIT 3`
    , {});
    session.close();
    
    console.log({comida: node_res["records"].map((name)=>{
        
        return name["_fields"][0]
    })});

    res.send({comida: node_res["records"].map((name)=>{

        return name["_fields"][0]
    })});

});

//CRIAR NODO PESSOA
router.post('/neo4j/create/', async function(req, res, next){

    let {name} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `CREATE (n:Person {name:"${name}"}) return n`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({comida: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

router.post('/neo4j/create_food/', async function(req, res, next){

    let {food} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `CREATE (m:Food {name:"${food}"}) return m`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({comida: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

// CRIAR RELACAO PESSOA -- GOSTA -- foodE
router.post('/neo4j/', async function(req, res, next){

    let {name, food} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `MATCH (a: Person), (b:Food)
        WHERE a.name = '${name}' AND b.name = '${food}'
        CREATE (a)-[r:LIKED]->(b)
        RETURN a.name, b.name`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({comida: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

//DELETA RELACAO PESSOA -- GOSTA -- foodE
router.delete('/neo4j', async function(req, res, next){

    let {name, food} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });
    const node_res = await session.run(
        `MATCH (a: Person)-[r:LIKED]->(b:Food)
        WHERE a.name = '${name}' AND b.name = '${food}'
        DELETE r
        RETURN a.name, b.name`, {});
    session.close();
    
    res.send({comida: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
});

//checa se o nodo com o food ja existe
router.get('/neo4j/:name/verifica', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database myclient
    })

    const node_res = await session.run(
        `MATCH (m:Food {name: "${req.params.name}"}) RETURN m.name`
    , {});
    session.close();

    // console.log("RESULT", node_res);
    res.send({comida: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

});

//devolve os comida que a pessoa curtiu
router.get('/neo4j/:name/comida', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database myclient
    })

    const node_res = await session.run(
        `MATCH (p:Person {name: "${req.params.name}"})-[:LIKED]->(m:Food) RETURN m.name` 
    , {});
    session.close();

    // console.log("RESULT", node_res);
    res.send({comida: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

});
module.exports = router;