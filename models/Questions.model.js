const mongoose = require('mongoose');

const PrimaryQuestionsSchema = new mongoose.Schema({
    primaryQuestion: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true })

const PrimaryQuestions = mongoose.model("PrimaryQuestions", PrimaryQuestionsSchema)

const CounterQuestionsSchema = new mongoose.Schema({
    primaryQuestion: {
        type: mongoose.Types.ObjectId,
        ref: "PrimaryQuestions",
        required: true
    },
    counterQuestion: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true })


const CounterQuestions = mongoose.model('CounterQuestions', CounterQuestionsSchema);

const optionsSchema = new mongoose.Schema(
    {
        counterQuestion: {
            type: mongoose.Types.ObjectId,
            ref: "CounterQuestions",
            required: true
        },
        option: {
            type: String,
            required: true
        },
        priority: {
            type: Number,
            required: true,
            enum: [2, 1, 0, -1]
        }
    }
    , { timestamps: true })


const options = mongoose.model('options', optionsSchema);


module.exports = { PrimaryQuestions, CounterQuestions, options }