const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/database');

const authRoutes = require('./routes/auth.routes');
const laboratorioRoutes = require('./routes/laboratorio.routes');
const equipamentoRoutes = require('./routes/equipamento.routes');
const reservaRoutes = require('./routes/reserva.routes');
const relatorioRoutes = require('./routes/relatorio.routes');

const app = express();

/* -------------------------
   CONFIGURAÇÕES
-------------------------- */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: 'reservou-labou-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 4
        }
    })
);

app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'main'
    })
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

/* -------------------------
   VARIÁVEIS GLOBAIS
-------------------------- */

app.use((req, res, next) => {

    res.locals.usuario =
        req.session.usuario || null;

    next();
});

/* -------------------------
   ROTAS
-------------------------- */

app.use('/', authRoutes);

app.use('/laboratorios', laboratorioRoutes);

app.use('/equipamentos', equipamentoRoutes);

app.use('/reservas', reservaRoutes);

app.use('/relatorios', relatorioRoutes);

/* -------------------------
   HOME
-------------------------- */

app.get('/', (req, res) => {

    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    res.render('home');
});

/* -------------------------
   404
-------------------------- */

app.use((req, res) => {

    res.status(404).render('404');
});

/* -------------------------
   BANCO + SERVIDOR
-------------------------- */

sequelize
    .sync()
    .then(() => {

        app.listen(3000, () => {

            console.log(
                'Servidor rodando em http://localhost:3000'
            );
        });
    })
    .catch((erro) => {

        console.error(
            'Erro ao conectar ao banco:',
            erro
        );
    });
