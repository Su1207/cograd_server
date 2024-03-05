
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    contactCountry: { type: String, },
    billingAddress: { type: String, },
    landmark: { type: String, },
    pincode: { type: String, },
    district: { type: String, },
    state: { type: String, },
});

const AddressModel = mongoose.model('Address', AddressSchema);

export default AddressModel;
