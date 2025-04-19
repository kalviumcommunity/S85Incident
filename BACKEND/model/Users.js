const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required: [true, "Please enter your name!"],
    },
    email:{
        type: String,
        required: [true, "Please enter your email!"],
    },
     phoneNumber:{
        type:Number,
        required:[true,"Please enter your email"]
    },  
    password:{
        type:String
       }
    
   

})

module.exports=mongoose.model("user",UserSchema);
