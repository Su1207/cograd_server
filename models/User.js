import { createRequire } from 'module';
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
  userName: String,
  email: { type: String, unique: true },
  password: {
    type: String,
    validate: [validatePassword, 'Password must be at least 3 characters long'], // Example validation
  },
  phoneNumber: String,
  gender: String,
  dob: Date,
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
