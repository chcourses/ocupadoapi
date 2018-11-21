const Conc = require('../models/Concessionaria');
const mongoose = require('mongoose');
// (C) CREATE
module.exports.create = async (req, res, next) => {
  const { nome, lote, etapa, razao_social, grupo, sede, rodovias } = req.body;
  try {
    const conc = new Conc({
      nome,
      lote,
      etapa,
      razao_social,
      grupo,
      sede,
      rodovias
    });
    const concCreated = await conc.save();
    return res
      .status(201)
      .json({ message: 'Concessionária criada com sucesso' });
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'Já existe uma concessionária com este nome ou lote';
    } else {
      error.message = 'Erro ao criar nova concessionária.';
    }
    next(error);
  }
};

// (R) READ
module.exports.read = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    try {
      const conc = await Conc.findById(id);
      return res.status(200).json({ conc });
    } catch (error) {
      //res.status(404).json({ message: 'Concessionária não encontrada' });
      //console.log(error);
      error = new Error('Concessionária não encontrada');
      //error.message = 'Concessionária não encontrada.';
      error.statusCode = 404;
      next(error);
    }
  }
  try {
    const concs = await Conc.find();
    return res.status(200).json({ concs });
  } catch (error) {
    error.message = 'Erro ao solicitar a listagem das concessionárias';
    next(error);
  }
};

// (U) UPDATE
module.exports.update = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(500).json({ message: 'O identificador é inválido' });
  }
  const updatedValues = {};
  if (req.body.nome) updatedValues.nome = req.body.nome;
  if (req.body.lote) updatedValues.lote = req.body.lote;
  if (req.body.etapa) updatedValues.etapa = req.body.etapa;
  if (req.body.razao_social) updatedValues.razao_social = req.body.razao_social;
  if (req.body.grupo) updatedValues.grupo = req.body.grupo;
  if (req.body.sede) updatedValues.sede = req.body.sede;
  if (req.body.rodovias) updatedValues.rodovias = req.body.rodovias;
  if (req.body.colaboradores)
    updatedValues.colaboradores = req.body.colaboradores;
  updatedValues.atualizado_em = Date.now();
  try {
    const conc = await Conc.findByIdAndUpdate(id, updatedValues);
    return res
      .status(204)
      .json({ message: 'Concessionária atualizada com sucesso' });
  } catch (error) {
    error = new Error('Concessionária não encontrada');
    error.statusCode = 404;
    next(error);
  }
};

// (D) DELETE
exports.delete = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(500).json({ message: 'O identificador é inválido' });
  }
  try {
    const conc = await Conc.findById(id);
    conc.delete();
    return res.status(204).json({ message: 'Concessionária apagada' });
  } catch (error) {
    error = new Error('Concessionária não encontrada');
    error.statusCode = 404;
    next(error);
  }
};
