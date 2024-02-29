

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model('User', UserSchema);

export default  UserModel;
