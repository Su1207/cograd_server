// // // import { createRequire } from 'module';
// // // import AddressModel from './Address';
// // // const require = createRequire(import.meta.url);

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Define a function to validate the password
// function validatePassword(password) {
//     // Add your password validation logic here
//     // Example: Password must be at least 8 characters long
//     return password.length >= 3;
// }

// const UserSchema = new Schema({
//     // userName: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     password: {
//         type: String,
//         required: true,
//         validate: [validatePassword, 'Password must be at least 3 characters long'], // Example validation
//     },
//     // phoneNumber: { type: String, required: true },
//     // gender: String, // Not required
//     // dob: { type: Date, required: true },
//     // address: { type: Schema.ObjectId, ref: 'Address' }, // Reference to the Address model
// });
// module.exports = mongoose.model('Users', UserSchema);
// // const UserModel = mongoose.model('User', UserSchema);

// // export default UserModel;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  role: { type: String, required: true, default: "user" },
  userName: { type: String, required: [true, "Username is Required"] },
  phoneNumber: { type: String, required: [true, "Phone Number is Required"] },
  gender: String,
  // dob: { type: Date, required: [true, "Date of Birth is Required"] },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("Users", userSchema);
