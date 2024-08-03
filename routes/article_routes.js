import { Router } from "express";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import { deleteArticle, getAllArticles, getArticleById, uploadArticle } from "../controllers/articles_controller.js";


export const articleRouter = Router ();


articleRouter.post('/users/articles', isAuthenticated, hasPermission('upload_article'), uploadArticle);

articleRouter.get('/users/articles', getAllArticles);

articleRouter.get('/users/articles/:id', getArticleById);

articleRouter.delete('/users/articles/:id', isAuthenticated, hasPermission('delete_article'), deleteArticle);