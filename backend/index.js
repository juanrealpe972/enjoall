import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import routerUser from "./src/routes/user.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.use("/v1", routerUser);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});