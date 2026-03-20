const reviewsController = [];

import reviewsModel from "../models/reviews.js"

reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find();
    res.json(reviews);
};

reviewsController.insertReviews = async (req, res) => {
    const {employeeId, productId, rating, comment} = req.body;
    const newReview = new reviewsModel({
        employeeId,
        productId,
        rating,
        comment
    });

    await newReview.save();

    res.json({message: "Review saved"})
};

reviewsController.deleteReviews = async (req, res) => {
    await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Review deleted"})
};

reviewsController.updateReviews = async (req, res) => {
    const {employeeId, productId, rating, comment} = req.body;
    await reviewsModel.findByIdAndUpdate(req.params.id, {
        employeeId,
        productId,
        rating,
        comment
    },{
        new: true
    },
);

    res.json({message: "Review updated"})
}

export default reviewsController;