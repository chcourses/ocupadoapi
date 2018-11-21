const User = require('../models/User');
const bcrypt = require('bcryptjs');

// (C) Create user
exports.create = (req, res, next) => {
  const { name, email, password } = req.body;
  // verify if email already exists
  User.findOne({ email })
    .then(user => {
      if (!user) {
        //create user
        bcrypt.genSalt(12, (err, salt) => {
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
            } else {
              const user = new User({ name, email, password: hashedPassword });
              user.save();
              return res
                .status(201)
                .json({ message: 'Usuário criado com sucesso' });
            }
          });
        });
      } else {
        const error = new Error('Usário com este e-mail já existe.');
        error.statusCode = 409;
        throw error;
      }
    })
    .catch(err => next(err));
};

// (R) Read user
exports.getAll = (req, res, next) => {
  User.find()
    .select('_id name email')
    .then(data => {
      return res.status(200).json({
        data
      });
    })
    .catch(err => console.log(err));
};

// (U) Update user
exports.updatePasswordOrName = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = {};
  if (req.body.password) password.current = req.body.password;
  if (req.body.password) password.new = null;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        const error = new Error(
          'Não existe um usuário com este e-mail em nossa base de dados'
        );
        error.statusCode = 404;
        throw error;
      }
      if (!password.current) {
        User.findOneAndUpdate({ email }, { name })
          .then(result => {
            return res.status(204).json({ message: 'Nome atualizado' });
          })
          .catch(err => {
            const error = new Error(
              'Houve um erro ao tentar atualizar o nome.'
            );
            throw error;
          });
      } else {
        bcrypt.genSalt(12, (err, salt) => {
          if (err) {
            const error = new Error(
              'Houve um erro ao gerar o salt do password.'
            );
            throw error;
          } else {
            bcrypt.hash(password.current, salt, (err, hashedPassword) => {
              if (err) {
                const error = new Error(
                  'Houve um erro ao gerar o hash do password.'
                );
                throw error;
              } else {
                password.new = hashedPassword;
                User.findOneAndUpdate(
                  { email },
                  { name: name, password: password.new }
                )
                  .then(result => {
                    return res
                      .status(204)
                      .json({ message: 'Nome/senha atualizados' });
                  })
                  .catch(err => {
                    const error = new Error(
                      'Houve um erro ao tentar atualizar nome e/ou senha.'
                    );
                    throw error;
                  });
              }
            });
          }
        });
      }
    })
    .catch(err => next(err));
};

// (D) Delete user

module.exports.deleteById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user) {
        const error = new Error('Usuário não encontrado.');
        error.statusCode = 404;
        throw error;
      }
      user.delete();
      return res.status(204).json({ message: 'deleted' });
    })
    .catch(err => {
      next(err);
    });
};
