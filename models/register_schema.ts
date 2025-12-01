import { Schema, models, model } from "mongoose";
let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')

const registerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//hash password
registerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//Genereate Token
registerSchema.methods.generateAuthToken = async function () {
    //removes old token
     if(this.tokens.length > 0){
       this.tokens =[]
     }
  try {
    let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: generatedToken });
    await this.save();
    return generatedToken;
  } catch (error) {
    console.log(error);
  }
};


const Register = models.register || model("register", registerSchema);

export default Register;