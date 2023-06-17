const mongoose = require("mongoose");
0
const { Schema } = mongoose;

const userSchema = new Schema({
    agencia: {
      type: String,
      required: true
    },
    conta: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true
    },
    dataNascimento: {
      type: Date,
      required: true
    },
    nomeCompleto: {
      type: String,
      required: true
    },
    nomeCartao: {
      type: String,
      required: true
    },
    numCartao: {
      type: String,
      required: true
    },
    bandeiraCartao: {
      type: String,
      enum: ['Mastercard', 'Visa'],
      required: true
    },
    tipoCartao: {
      type: String,
      enum: ['PLATINUM', 'GOLD', 'BLACK DIAMOND'],
      required: true
    },
    dataVencimento: {
      type: Number,
      required: true
    },
    senha: {
      type: String,
      required: true
    },
    statusCartao: {
      type: String,
      enum: ['SOLICITADO', 'ENTREGUE', 'ATIVO', 'CANCELADO'],
      default: 'SOLICITADO'
    }
  });

  module.exports = mongoose.model('User', userSchema);
