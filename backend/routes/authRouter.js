import express from "express";
import { AuthController } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
    let isAuthenticated = await AuthController.checkCredentials(req, res);
    
    if (!isAuthenticated) {
        return res.status(401).json({error: "Invalid credentials"});
    }

    res.json(AuthController.issueToken(req.body.username));
});

authRouter.post("/signup", (req, res) => {
    AuthController.saveUser(req, res).then((user) => {
        res.status(201).send();
    }).catch((err) => {
        res.json({error: err.message});
    });
});