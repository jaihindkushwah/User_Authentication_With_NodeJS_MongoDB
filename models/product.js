const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    category:{
        type:String
    },
});
const Product=mongoose.model("product",productSchema);
module.exports = {
    Product
};
