import express from "express";

const massegerouter = express.Router();


app.get("signup", (req,res) => {
    res.send("signup endpoint")
})

app.get("/login", (req,res) => {
    res.send("login endpoint")
})


app.get("/logout", (req,res) => {
    res.send("logout endpoint")
})

app.get("/forgot", (req,res) => {
    res.send("update endpoint")
})

export default massegerouter;