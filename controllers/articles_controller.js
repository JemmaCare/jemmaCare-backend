import { UserModel } from "../models/user_model.js";
import { ArticleModel } from "../models/article_model.js";

// Upload an article
export const uploadArticle = async (req, res) => {
    try {
        // Find if user is authenticated to upload an article
        const userId = req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract article data from request body
        const { title, contentLink, source } = req.body;

        // Check if required fields are present
        if (!title || !contentLink) {
            return res.status(400).json({ message: 'Title and contentLink are required' });
        }

        // Upload article
        const article = new ArticleModel({
            title,
            contentLink,
            source,
            uploadedBy: userId,
        });
        await article.save();

        res.status(201).json({ message: 'Article uploaded successfully', article });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all articles
export const getAllArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.find().populate('uploadedBy', 'firstName lastName');
        res.status(200).json({ articles });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one article
export const getArticleById = async (req, res) => {
    try {
        // Retrieve the specific article and populate the `uploadedBy` field
        const article = await ArticleModel.findById(req.params.id).populate('uploadedBy', 'firstName lastName email');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete an article
export const deleteArticle = async (req, res) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id);
        // Check if the article is available to be deleted
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully', article });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

