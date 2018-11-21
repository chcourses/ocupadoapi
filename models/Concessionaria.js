const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const concSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  lote: {
    type: Number,
    required: true,
    unique: true
  },
  etapa: {
    type: Number
  },
  razao_social: {
    type: String
  },
  grupo: {
    type: String
  },
  sede: {
    type: String
  },
  rodovias: {
    type: [String]
  },
  criado_em: {
    type: Date,
    default: Date.now()
  },
  atualizado_em: {
    type: Date,
    default: null
  },
  colaboradores: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colab'
  }
});

module.exports = Conc = mongoose.model('Conc', concSchema);
