var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var mysql = require('mysql');


var schema = buildSchema(`
  type Questao {
    ID: String
    PERGUNTA: String
    ALTERNATIVAA: String
    ALTERNATIVAB: String
    ALTERNATIVAC: String
    ALTERNATIVAD: String
  }
  type Query {
    getQuestoes: [Questao],
    getQuestaoInfo(ID: Int) : Questao
  }
  type Mutation {
    updateQuestaoInfo(ID: Int, PERGUNTA: String, ALTERNATIVAA: String, ALTERNATIVAB: String,
    			 ALTERNATIVAC: String, ALTERNATIVAD: String): Boolean
    createQuestao(PERGUNTA: String, ALTERNATIVAA: String, ALTERNATIVAB: String,
    			 ALTERNATIVAC: String, ALTERNATIVAD: String): Boolean
    deleteQuestao(ID: Int): Boolean
  }

`);

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

var root = {
  //Querys:
  getQuestoes: (args, req) => queryDB(req, "select * from QUESTAO").then(data => data),
  getQuestaoInfo: (args, req) => queryDB(req, "select * from QUESTAO where ID = ?", [args.ID]).then(data => data[0]),
  //Mutations:
  updateQuestaoInfo: (args, req) => queryDB(req, "update QUESTAO SET ? where ID = ?", [args, args.ID]).then(data => data),
  createQuestao: (args, req) => queryDB(req, "insert into QUESTAO SET ?", args).then(data => data),
  deleteQuestao: (args, req) => queryDB(req, "delete from QUESTAO where ID = ?", [args.ID]).then(data => data)
};

var app = express();

app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'questoesapp'
  });
  req.mysqlDb.connect();
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3309);

console.log('Running a GraphQL API server at localhost:3309/graphql');