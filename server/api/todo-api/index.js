const router       = require("express").Router();
const mysql        = require("mysql");
const async        = require("async");
const database     = require("../../DB").getConnection();
const getTimestamp = require("../../helpers").getTimestamp;

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});


router.get("/retive_todos", (req, res, next) => {
    let query = `SELECT * FROM TODOS`;
    database.query(query, (error, result) => {
        if(error){
            next(error);
        }else {
            res.status(200).json(result);
        }
    });
});

router.post("/add_todo", (req, res, next) => {
    let todo  = req.body.todo;
    let time = getTimestamp();
    let todoItem = {todo, time};

    let query_1 = `SELECT * FROM TODOS`;   
    
    let promise_1 = new Promise((resolve, reject) => {
        database.query('INSERT INTO TODOS SET ?', todoItem, function(err, result) {
            if(err){
                console.log(`Server Add Todo Error => ${err}`);
            }else {
                resolve();
            }
        });
    }); 

    promise_1.then(() => {
        database.query(query_1, (error, result) => {
            if(error){
                next(error);
            }else {
                res.status(200).json(result);
            }
        });
    })
    .catch(error => console.log(error));
    
});

router.delete("/delete_todo/:id", (req, res, next) => {
    let query_1 = `DELETE FROM TODOS WHERE _id = ${req.params.id}`;
    let query_2 = `SELECT * FROM TODOS`;
    
    let promise_1 = new Promise((resolve, reject) => {
        database.query(query_1, (err) => {
            if(err){
                next(err);
            }else {
                resolve();
            }
        });
    });

    promise_1.then(() => {
        database.query(query_2, (err, result) => {
            if(err){
                next(err);
            }else {
                res.status(200).json(result);
            }
        });
    })
    .catch(error => console.log(error));
});

router.put("/update_todo/:id", (req, res, next) => {
    
    let query_1 = `UPDATE TODOS SET todo = '${req.body.newText}' WHERE _id = ${req.params.id}`;
    let query_2 = `SELECT * FROM TODOS`;
    
    let promise_1 = new Promise((resolve, reject) => {
        
        database.query(query_1, (err) => {
            if(err){
                next(err);
            }else {
                resolve();
            }
        });
    });
    
    promise_1.then(() => {
        database.query(query_2, (err, result) => {
            if(err){
                next(err);
            }else {
                res.status(200).json(result);
            }
        });
    })
    .catch(err => next(err));
});

module.exports = router;