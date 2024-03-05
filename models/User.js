import { createRequire } from 'module';
// import AddressModel from './Address';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a function to validate the password
function validatePassword(password) {
  // Add your password validation logic here
  // Example: Password must be at least 8 characters long
  return password.length >= 3;
}

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    validate: [validatePassword, 'Password must be at least 3 characters long'], // Example validation
  },
  phoneNumber: { type: String, required: true },
  gender: String, // Not required
  dob: { type: Date, required: true },
  address: { type: Schema.ObjectId, ref: 'Address' }, // Reference to the Address model
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
