import faqsModel from "../models/faqs.js";

const faqsController = {};

faqsController.getFaqs = async (req, res) => {
    const faqs = await faqsModel.find()
    res.json(faqs);
}

faqsController.insertFaqs = async (req, res) => {
    /*Solicitamos los campos del producto*/
    const { question, answer, isActive } = req.body;

    /* creamos una constante para guardar los campos*/
    const newFaq = new faqsModel({question, answer, isActive})

    await newFaq.save()

    res.json({message: "Pregunta frecuente insertada correctamente"});
}

faqsController.updateFaqs = async (req, res) => {
    //Solicitamos los campos del producto
    const { question, answer, isActive } = req.body;

    //Promesa de buscar el producto por su id y actualizarlo con los nuevos datos
    await faqsModel.findByIdAndUpdate(req.params.id, {question, answer, isActive}, {new: true})

    res.json({message: "Pregunta frecuente actualizada correctamente"});
}

faqsController.deleteFaqs = async (req, res) => {  
    await faqsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Pregunta frecuente eliminada correctamente"});
}

export default faqsController;