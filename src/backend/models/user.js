const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required :true,
        maxlength:[6,"Name shouldn't be > 6 characters."]
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please Provide a valid email"]
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
});

module.exports = mongoose.model("user",UserSchema);