const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  photo: {
    type: string
  },
  phone: {
    type: string
  },
  profissão: {
    type: string
  },
  bio: {
    bio: string
  }
});
