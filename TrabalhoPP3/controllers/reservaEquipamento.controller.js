const {

    ReservaEquipamento,

    ReservaEquipamentoItem,

    Equipamento,

    Usuario

} = require("../models");

const { Op } = require("sequelize");

class ReservaEquipamentoController {

    /* =====================================================
       CALCULAR QUANTIDADE DISPONÍVEL
    ===================================================== */

    static async calcularQuantidadeDisponivel(

        idEquip,

        data,

        horaEntrada,

        horaSaida

    ) {

        const equipamento =

            await Equipamento.findByPk(idEquip);

        if (!equipamento) {

            return 0;

        }

        const reservas =

            await ReservaEquipamento.findAll({

                include:[

                    {

                        model:Equipamento,

                        where:{

                            IdEquip:idEquip

                        }

                    }

                ],

                where:{

                    DataReserva:data

                }

            });

        let reservado = 0;

        reservas.forEach(reserva=>{

            if(

                horaEntrada < reserva.HoraSaida &&

                horaSaida > reserva.HoraEntrada

            ){

                reserva.Equipamentos.forEach(item=>{

                    reservado +=
                    item.Reserva_Equipamento.Quantidade;

                });

            }

        });

        return equipamento.Quantidade - reservado;

    }

    /* =====================================================
       DISPONIBILIDADE
    ===================================================== */

    static async verificarDisponibilidade(req,res){

        try{

            const{

                idEquip,

                data,

                horaEntrada,

                horaSaida

            }=req.query;

            if(

                !idEquip ||

                !data ||

                !horaEntrada ||

                !horaSaida

            ){

                return res.status(400).json({

                    erro:"Parâmetros obrigatórios."

                });

            }

            const disponivel=

                await ReservaEquipamentoController
                .calcularQuantidadeDisponivel(

                    idEquip,

                    data,

                    horaEntrada,

                    horaSaida

                );

            res.json({

                quantidadeDisponivel:

                disponivel

            });

        }

        catch(erro){

            console.log(erro);

            res.status(500).json({

                erro:erro.message

            });

        }

    }

    /* =====================================================
       LISTAR
    ===================================================== */

    static async listar(req,res){

        try{

            const reservas=

                await ReservaEquipamento.findAll({

                    include:[

                        Usuario,

                        Equipamento

                    ],

                    order:[

                        ["DataReserva","ASC"],

                        ["HoraEntrada","ASC"]

                    ]

                });

            res.render(

                "reservaEquipamento/listar",

                {

                    reservas

                }

            );

        }

        catch(erro){

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }

    /* =====================================================
       API JSON
    ===================================================== */

    static async apiListar(req,res){

        try{

            const reservas=

                await ReservaEquipamento.findAll({

                    include:[

                        Usuario,

                        Equipamento

                    ]

                });

            res.json(reservas);

        }

        catch(erro){

            res.status(500).json({

                erro:erro.message

            });

        }

    }

    /* =====================================================
       FORMULÁRIO
    ===================================================== */

    static async cadastroPage(req,res){

        try{

            const equipamentos=

                await Equipamento.findAll({

                    order:[

                        ["NomeEquip","ASC"]

                    ]

                });

            res.render(

                "reservaEquipamento/cadastrar",

                {

                    equipamentos

                }

            );

        }

        catch(erro){

            console.log(erro);

            res.status(500).send("Erro.");

        }

    }
