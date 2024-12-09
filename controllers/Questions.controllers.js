const { PrimaryQuestions, CounterQuestions, options } = require("../models/Questions.model");
const ErrorHandler = require("../utils/ErrorCLass")



const AddQuestion = async (req, res, next) => {
    try {
        const { primary, counter, option } = req.body
        if (!primary || !counter || !option) {
            return next(new ErrorHandler(400, "Please Provide Primary questions and Counter questions options with their Priority"))
        }

        const primaryQuestion = await PrimaryQuestions.create({ primaryQuestion: primary })

        const counterQuestion = await CounterQuestions.create({
            primaryQuestion: primaryQuestion?._id,
            counterQuestion: counter
        })
        // let opt;
        for (const element of option) {
            opt = await options.create({
                counterQuestion: counterQuestion._id,
                option: element.option,
                priority: element.priority
            })
        }


        res.status(200).json({
            success: true,
            question: {
                primaryQuestion: primary,
                counterQuestion: counter,
                options: option
            }
        })
    } catch (error) {
        return next(new ErrorHandler(error.status, error))
    }
}

const AddCounterQuestion = async (req, res, next) => {
    const { _id, counterQues, option } = req.body

    if (!_id || !counterQues || !option) {
        return next(new ErrorHandler(400, "Please Provide Primary questions ID and Counter questions with their options"))
    }

    const findQuest = await PrimaryQuestions.findById(_id)

    const CreatecounterQuestion = await CounterQuestions.create({
        primaryQuestion: _id,
        counterQuestion: counterQues
    })

    for (const element of option) {
        await options.create({
            counterQuestion: CreatecounterQuestion._id,
            option: element.option,
            priority: element.priority
        })
    }

    res.status(200).json({
        success: true,
        question: {
            primaryQuestion: findQuest.primaryQuestion,
            counterQuestion: counterQues,
            options: option
        }
    })
}
module.exports = { AddQuestion, AddCounterQuestion }