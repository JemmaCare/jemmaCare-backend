import { UserModel } from "../models/user_model.js";
import { ArticleModel } from "../models/article_model.js";



// Upload an article
export const uploadArticle = async (req, res, next) => {
    try {
        // Find if user is authenticated to upload an article
        const userId = req.user.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Upload article
        const article = new ArticleModel({
            ...value,
            uploadedBy: userId,
        });
        await article.save();

        res.status(201).json({ message: 'Article uploaded successfully', article });
    } catch (error) {
        next(error);
    }
};


// get all articles
export const getAllArticles = async (req, res, next) => {
    try {
    const articles = await ArticleModel.find().populate('uploadedBy', 'firstName lastName')
    res.status(200).json({ articles });
    } catch (error) {
        next(error)
    }
};


// Get  one article
export const getArticleById = async (req, res, next) => {
    try {
        // Retrieve the specific article and populate the `uploadedBy` field
        const article = await ArticleModel.findById(req.params.id).populate('uploadedBy', 'firstName lastName email');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};

// Delete an article
export const deleteArticle = async (req, res, next) => {
    try {
       const article = await ArticleModel.findByIdAndDelete(req.params.id); 
    //    Check if the article is available to be deleted
    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully', article });
    } catch (error) {
        next(error)
    }
}
