const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colabSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  foto: {
    type: String
  },
  conc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conc'
  }
});

module.exports = Colab = mongoose.model('Colab', colabSchema);
