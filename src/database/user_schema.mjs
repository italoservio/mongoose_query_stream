import mongoose from 'mongoose';

const user_schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  password: String,
  address: {
    zip: String,
    city: String,
    state: String,
    country: String,
  },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  deleted_at: {type: Date, default: null},
}, {collection: 'users'});

export default mongoose.model('users', user_schema);
