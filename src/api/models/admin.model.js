const mongoose = require('mongoose')
const { Schema } = mongoose
const {hashPassword} = require("../utils/password.helper")

const adminSchema = new Schema(
    {
      fullname: {
        type: String,
        required: true,
      },
      username: {
          type: String,
          required: true,
          unique: true,
          trim:true
      },  
      email: {
          type: String,
          required: true,
          unique: true,
        }, 
        password:{
          type: String,
          required:true,
        }
    },
    {
      timestamps: true,
    }
  );

  adminSchema.pre("save", function (next) {
    const admin = this;
    if(!admin.isModified('password')) {
      return next ();
    }
  const hash = hashPassword(admin.password)
  admin.password = hash
    next();
  });

  module.exports = mongoose.model('Admin', adminSchema)