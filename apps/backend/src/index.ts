import express from "express";
import { User } from "@shared/types";

const Chris: User = {
    id: "string",
    username: "5",
    password: "12345",
};

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

app.listen(3000, () => {
    console.log("Server running on PORT 3000");
});
