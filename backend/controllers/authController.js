import { User } from "../models/Database.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export class AuthController {
    static saveUser(req, res){
        return User.create({
            username: req.body.username,
            password: req.body.password
        });
    };

    static async checkCredentials(req, res) {
        let found = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!found) return false;

        return bcrypt.compareSync(found.password, req.body.password);
    };

    static issueToken(username) {
        return Jwt.sign({user: username}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
    };

    static isTokenValid(token, callback){
        Jwt.isTokenValid(token, process.env.TOKEN_SECRET, callback);
    };

    // TODO implement once everything works
    //static resetPassword() {};
}