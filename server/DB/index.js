const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwe1990",
    database: "express_mysql_1"
});

module.exports = {
    setConnection: () => connection.connect((error) => {
        if(error){
            console.log(`Database Error => ${error}`);
        }else {
            console.log("mySQL Connected!!!");
        }
    }),
    getConnection: () => connection
}