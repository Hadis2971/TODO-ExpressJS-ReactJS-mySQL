const express = require("express");

const todoRouter = require("./api/todo-api");

require("./DB").setConnection();


const app  = express();
const port = (process.env.PORT || 3000);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/todo", todoRouter);

app.use((req, res, next) => {
    res.status(404).send(`<h1>Content Not Found!!!</h1>`);
})

app.use((err, req, res, next) => {
    res.status(500).send(`<h1>Internal Server Error => ${err}</h1>`);
});

app.listen(port, () => console.log(`Server Started On Port ${port}`));
