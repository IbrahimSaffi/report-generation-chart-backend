const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
    {
        doctorName: {
            type: String,
            required: true
        },
        patientName: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
           required:true
        },
    },
)

const reportModel = mongoose.model("report", reportSchema)
module.exports = reportModel