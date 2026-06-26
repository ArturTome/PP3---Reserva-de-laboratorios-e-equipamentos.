    /* =====================================================
       BUSCAR RESERVA
    ===================================================== */

    static async buscar(req, res) {

        try {

            const reserva = await ReservaEquipamento.findByPk(

                req.params.id,

                {

                    include: [

                        Usuario,

                        Equipamento

                    ]

                }

            );

            if (!reserva) {

                return res.status(404).json({

                    erro: "Reserva não encontrada."

                });

            }

            res.json(reserva);

        }

        catch (erro) {

            console.log(erro);

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       FORMULÁRIO DE EDIÇÃO
    ===================================================== */

    static async editarPage(req, res) {

        try {

            const reserva = await ReservaEquipamento.findByPk(

                req.params.id,

                {

                    include: [

                        Equipamento

                    ]

                }

            );

            if (!reserva) {

                return res.send(

                    "Reserva inexistente."

                );

            }

            const equipamentos = await Equipamento.findAll({

                order: [

                    ["NomeEquip","ASC"]

                ]

            });

            res.render(

                "reservaEquipamento/editar",

                {

                    reserva,

                    equipamentos

                }

            );

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }

    /* =====================================================
       EDITAR RESERVA
    ===================================================== */

    static async editar(req, res) {

        try {

            const reserva = await ReservaEquipamento.findByPk(

                req.params.id

            );

            if (!reserva) {

                return res.send(

                    "Reserva inexistente."

                );

            }

            const {

                DataReserva,

                HoraEntrada,

                HoraSaida,

                equipamentos

            } = req.body;

            if (

                HoraEntrada >= HoraSaida

            ) {

                return res.send(

                    "Horário inválido."

                );

            }

            /* ============================================
               VERIFICA ESTOQUE
            ============================================ */

            for (const item of equipamentos) {

                const disponivel =

                    await ReservaEquipamentoController
                    .calcularQuantidadeDisponivel(

                        item.IdEquip,

                        DataReserva,

                        HoraEntrada,

                        HoraSaida

                    );

                if (item.Quantidade > disponivel) {

                    return res.send(

                        `Quantidade insuficiente para o equipamento ${item.IdEquip}.`

                    );

                }

            }

            await reserva.update({

                DataReserva,

                HoraEntrada,

                HoraSaida

            });

            /* ============================================
               REMOVE VÍNCULOS ANTIGOS
            ============================================ */

            await ReservaEquipamentoItem.destroy({

                where: {

                    IdReservaEquip:

                    reserva.IdReservaEquip

                }

            });

            /* ============================================
               CRIA NOVOS VÍNCULOS
            ============================================ */

            for (const item of equipamentos) {

                await ReservaEquipamentoItem.create({

                    IdReservaEquip:

                        reserva.IdReservaEquip,

                    IdEquip:

                        item.IdEquip,

                    Quantidade:

                        item.Quantidade

                });

            }

            res.redirect(

                "/reservas/equipamentos"

            );

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }

    /* =====================================================
       API PUT
    ===================================================== */

    static async apiEditar(req, res) {

        try {

            const reserva = await ReservaEquipamento.findByPk(

                req.params.id

            );

            if (!reserva) {

                return res.status(404).json({

                    erro:

                    "Reserva inexistente."

                });

            }

            await reserva.update({

                DataReserva: req.body.DataReserva,

                HoraEntrada: req.body.HoraEntrada,

                HoraSaida: req.body.HoraSaida

            });

            res.json({

                mensagem:

                "Reserva atualizada."

            });

        }

        catch (erro) {

            console.log(erro);

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       EXCLUIR
    ===================================================== */

    static async excluir(req, res) {

        try {

            const reserva = await ReservaEquipamento.findByPk(

                req.params.id

            );

            if (!reserva) {

                return res.send(

                    "Reserva inexistente."

                );

            }

            await ReservaEquipamentoItem.destroy({

                where: {

                    IdReservaEquip:

                    reserva.IdReservaEquip

                }

            });

            await reserva.destroy();

            res.redirect(

                "/reservas/equipamentos"

            );

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }

    /* =====================================================
       API DELETE
    ===================================================== */

    static async apiExcluir(req, res) {

        try {

            const reserva = await ReservaEquipamento.findByPk(

                req.params.id

            );

            if (!reserva) {

                return res.status(404).json({

                    erro:

                    "Reserva inexistente."

                });

            }

            await ReservaEquipamentoItem.destroy({

                where: {

                    IdReservaEquip:

                    reserva.IdReservaEquip

                }

            });

            await reserva.destroy();

            res.json({

                mensagem:

                "Reserva removida."

            });

        }

        catch (erro) {

            console.log(erro);

            res.status(500).json({

                erro: erro.message

            });

        }

    }

}

module.exports = ReservaEquipamentoController;

    /* =====================================================
       GERAR RELATÓRIO
    ===================================================== */

    static async gerarRelatorio(req, res) {

        try {

            const {

                IdReservaLab,

                Descricao

            } = req.body;

            const reserva = await ReservaLaboratorio.findByPk(IdReservaLab);

            if (!reserva) {

                return res.status(404).send(

                    "Reserva não encontrada."

                );

            }

            const relatorio = await Relatorio.create({

                IdUser: req.session.usuario.id,

                IdReservaLab,

                Descricao

            });

            res.redirect("/historico");

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro ao gerar relatório.");

        }

    }

    /* =====================================================
       LISTAR RELATÓRIOS
    ===================================================== */

    static async listarRelatorios(req, res) {

        try {

            const relatorios = await Relatorio.findAll({

                include: [

                    Usuario,

                    {

                        model: ReservaLaboratorio,

                        include: [

                            Laboratorio

                        ]

                    }

                ],

                order: [

                    ["DataGeracao", "DESC"]

                ]

            });

            res.render(

                "historico/relatorios",

                {

                    relatorios

                }

            );

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }

    /* =====================================================
       BUSCAR POR USUÁRIO
    ===================================================== */

    static async buscarUsuario(req, res) {

        try {

            const reservas = await ReservaLaboratorio.findAll({

                where: {

                    IdUser: req.params.id

                },

                include: [

                    Usuario,

                    Laboratorio

                ]

            });

            res.json(reservas);

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       BUSCAR POR LABORATÓRIO
    ===================================================== */

    static async buscarLaboratorio(req, res) {

        try {

            const reservas = await ReservaLaboratorio.findAll({

                where: {

                    IdLab: req.params.id

                },

                include: [

                    Usuario,

                    Laboratorio

                ]

            });

            res.json(reservas);

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       BUSCAR POR PERÍODO
    ===================================================== */

    static async buscarPeriodo(req, res) {

        try {

            const {

                inicio,

                fim

            } = req.query;

            const reservas = await ReservaLaboratorio.findAll({

                where: {

                    DataReserva: {

                        [Op.between]: [

                            inicio,

                            fim

                        ]

                    }

                },

                include: [

                    Usuario,

                    Laboratorio

                ],

                order: [

                    ["DataReserva", "ASC"]

                ]

            });

            res.json(reservas);

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       API RELATÓRIOS
    ===================================================== */

    static async apiRelatorios(req, res) {

        try {

            const relatorios = await Relatorio.findAll({

                include: [

                    Usuario,

                    {

                        model: ReservaLaboratorio,

                        include: [

                            Laboratorio

                        ]

                    }

                ]

            });

            res.json(relatorios);

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       EXCLUIR RELATÓRIO
    ===================================================== */

    static async excluirRelatorio(req, res) {

        try {

            const relatorio = await Relatorio.findByPk(

                req.params.id

            );

            if (!relatorio) {

                return res.status(404).send(

                    "Relatório não encontrado."

                );

            }

            await relatorio.destroy();

            res.redirect("/historico/relatorios");

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }

    /* =====================================================
       API DELETE RELATÓRIO
    ===================================================== */

    static async apiExcluirRelatorio(req, res) {

        try {

            const relatorio = await Relatorio.findByPk(

                req.params.id

            );

            if (!relatorio) {

                return res.status(404).json({

                    erro: "Relatório não encontrado."

                });

            }

            await relatorio.destroy();

            res.json({

                mensagem: "Relatório removido com sucesso."

            });

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

}

module.exports = HistoricoController;

    /* =====================================================
       GERAR RELATÓRIO
    ===================================================== */

    static async gerarRelatorio(req, res) {

        try {

            const {

                IdReservaLab,

                Descricao

            } = req.body;

            const reserva = await ReservaLaboratorio.findByPk(IdReservaLab);

            if (!reserva) {

                return res.status(404).send(

                    "Reserva não encontrada."

                );

            }

            const relatorio = await Relatorio.create({

                IdUser: req.session.usuario.id,

                IdReservaLab,

                Descricao

            });

            res.redirect("/historico");

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro ao gerar relatório.");

        }

    }

    /* =====================================================
       LISTAR RELATÓRIOS
    ===================================================== */

    static async listarRelatorios(req, res) {

        try {

            const relatorios = await Relatorio.findAll({

                include: [

                    Usuario,

                    {

                        model: ReservaLaboratorio,

                        include: [

                            Laboratorio

                        ]

                    }

                ],

                order: [

                    ["DataGeracao", "DESC"]

                ]

            });

            res.render(

                "historico/relatorios",

                {

                    relatorios

                }

            );

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }

    /* =====================================================
       BUSCAR POR USUÁRIO
    ===================================================== */

    static async buscarUsuario(req, res) {

        try {

            const reservas = await ReservaLaboratorio.findAll({

                where: {

                    IdUser: req.params.id

                },

                include: [

                    Usuario,

                    Laboratorio

                ]

            });

            res.json(reservas);

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       BUSCAR POR LABORATÓRIO
    ===================================================== */

    static async buscarLaboratorio(req, res) {

        try {

            const reservas = await ReservaLaboratorio.findAll({

                where: {

                    IdLab: req.params.id

                },

                include: [

                    Usuario,

                    Laboratorio

                ]

            });

            res.json(reservas);

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       BUSCAR POR PERÍODO
    ===================================================== */

    static async buscarPeriodo(req, res) {

        try {

            const {

                inicio,

                fim

            } = req.query;

            const reservas = await ReservaLaboratorio.findAll({

                where: {

                    DataReserva: {

                        [Op.between]: [

                            inicio,

                            fim

                        ]

                    }

                },

                include: [

                    Usuario,

                    Laboratorio

                ],

                order: [

                    ["DataReserva", "ASC"]

                ]

            });

            res.json(reservas);

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       API RELATÓRIOS
    ===================================================== */

    static async apiRelatorios(req, res) {

        try {

            const relatorios = await Relatorio.findAll({

                include: [

                    Usuario,

                    {

                        model: ReservaLaboratorio,

                        include: [

                            Laboratorio

                        ]

                    }

                ]

            });

            res.json(relatorios);

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

    /* =====================================================
       EXCLUIR RELATÓRIO
    ===================================================== */

    static async excluirRelatorio(req, res) {

        try {

            const relatorio = await Relatorio.findByPk(

                req.params.id

            );

            if (!relatorio) {

                return res.status(404).send(

                    "Relatório não encontrado."

                );

            }

            await relatorio.destroy();

            res.redirect("/historico/relatorios");

        }

        catch (erro) {

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }

    /* =====================================================
       API DELETE RELATÓRIO
    ===================================================== */

    static async apiExcluirRelatorio(req, res) {

        try {

            const relatorio = await Relatorio.findByPk(

                req.params.id

            );

            if (!relatorio) {

                return res.status(404).json({

                    erro: "Relatório não encontrado."

                });

            }

            await relatorio.destroy();

            res.json({

                mensagem: "Relatório removido com sucesso."

            });

        }

        catch (erro) {

            res.status(500).json({

                erro: erro.message

            });

        }

    }

}

module.exports = HistoricoController;
