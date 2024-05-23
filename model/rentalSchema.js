
const {  mongoose } = require("mongoose");

const rentalSchema = new mongoose.Schema({
    fullName : String,
    streetAddress : String,
    city : String,
    postalCode : String,
    phone : Number,
    email : String,
    orderDate : String,
    rentalDate : String,
    startTime : String,
    endTime : String,
    boatType1 : String,
    boatType2 : String,
    hours : Number,
    amountPaid : Number,
    balanceDue : Number,

})

module.exports = mongoose.model('Rental', rentalSchema);

