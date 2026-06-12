const bcrypt = require('bcrypt');

const {
    Usuario
} = require('../models');

exports.loginPage = (req, res) => {

    res.render('auth/login');
};

exports.cadastroPage = (req, res) => {

    res.render('auth/cadastro');
};

exports.cadastro = async (req, res) => {

    try {

        const {
            login,
            senha
        } = req.body;

        const existe =
            await Usuario.findOne({
                where: {
                    Login: login
                }
            });

        if (existe) {

            return res.render(
                'auth/cadastro',
                {
                    erro:
                        'Usuário já cadastrado'
                }
            );
        }

        const hash =
            await bcrypt.hash(
                senha,
                10
            );

        await Usuario.create({

            Login: login,

            Senha: hash,

            StatusADM: false
        });

        res.redirect('/login');

    } catch (erro) {

        console.log(erro);

        res.render(
            'auth/cadastro',
            {
                erro:
                    'Erro ao cadastrar usuário'
            }
        );
    }
};

exports.login = async (req, res) => {

    try {

        const {
            login,
            senha
        } = req.body;

        const usuario =
            await Usuario.findOne({
                where: {
                    Login: login
                }
            });

        if (!usuario) {

            return res.render(
                'auth/login',
                {
                    erro:
                        'Usuário não encontrado'
                }
            );
        }

        const senhaValida =
            await bcrypt.compare(
                senha,
                usuario.Senha
            );

        if (!senhaValida) {

            return res.render(
                'auth/login',
                {
                    erro:
                        'Senha incorreta'
                }
            );
        }

        req.session.usuario = {

            id: usuario.IdUser,

            login: usuario.Login,

            admin: usuario.StatusADM
        };

        res.redirect('/');

    } catch (erro) {

        console.log(erro);

        res.render(
            'auth/login',
            {
                erro:
                    'Erro interno'
            }
        );
    }
};

exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect('/login');
    });
};
