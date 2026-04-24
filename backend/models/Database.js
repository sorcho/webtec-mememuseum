import { Sequelize } from "sequelize";
import 'dotenv/config.js';

import { createModel as createUserModel } from "./User.js";
import { createModel as createPostModel } from "./Post.js";
import { createModel as createCommentModel } from "./Comment.js";
import { createModel as createVoteModel } from "./Vote.js";


export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT
});

createUserModel(database);
createPostModel(database);
createCommentModel(database);
createVoteModel(database);

export const User = database.model('User');
export const Post = database.model('Post');
export const Comment = database.model('Comment');
export const Vote = database.model('Vote');

User.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Comment, {foreignKey: 'userId'});
Post.hasMany(Comment, {foreignKey: 'postId'});
Comment.belongsTo(Post, {foreignKey: 'postId'});
Comment.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Vote, {foreignKey: 'userId'});
Post.hasMany(Vote, {foreignKey: 'postId'});
Vote.belongsTo(User, {foreignKey: 'userId'});
Vote.belongsTo(Post, {foreignKey: 'postId'});

export function syncDB() {
    database.sync({ alter: true }).then( () => {
        console.log("Database created successfully!");
    }).catch(err => {
        console.log("Error during sinchronization: " + err.message);
    });
}