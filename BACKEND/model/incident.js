const mongoose=require('mongoose');
const incidentSchema=mongoose.Schema({
    
    description:{
        type:String,
        minlength:30,
        maxlength:300,
    },
    photo: {
        type: String,
        default: null
      }


})
module.exports=mongoose.model("inci",incidentSchema);
       