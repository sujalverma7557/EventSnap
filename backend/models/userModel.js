import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return value !== ''; // Custom validation to check if the value is not empty
          },
          message: 'Image field cannot be empty',
        },
      },
    
    contact_no: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}) 

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model('User' , userSchema)

export default User
