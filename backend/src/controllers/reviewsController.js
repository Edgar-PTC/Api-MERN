const reviewsController = [];

import reviews from "../models/reviews.js";
import reviewsModel from "../models/reviews.js"
import employeeController from "./employeeController";

reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find();
    res.json(reviews);
};

reviewsController.insertReviews = async (req, res) => {

};

reviewsController.deleteReviews = async (req, res) => {

};

reviewsController.updateReviews = async (req, res) => {

}

export default employeeController;