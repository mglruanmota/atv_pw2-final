const express = require("express");

const categoriaModel = require("../model/Categoria");

const router = express.Router();

//ROTA DE INSERÇÃO DE CATEGORIA
router.post("/categoria/cadastrarCategoria", (req, res) => {

    let { nome_categoria, observacoes_categoria } = req.body;

    categoriaModel.create({ nome_categoria, observacoes_categoria})
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                messageStatus: "Categoria inserida com sucesso"
            });
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });

});

router.get('/categoria/listarCategoria', (req, res) => {
    categoriaModel.findAll()
        .then(
            (categorias) => {
                return res.status(200).json(categorias)
            }
        )
        .catch(
            (error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: error
                });
            });

});

router.put('/categoria/alterarCategoria', (req, res) => {

    let { codigo_categoria, nome_categoria, observacoes_categoria } = req.body;

    categoriaModel.update(
        { nome_categoria, observacoes_categoria },
        { where: { codigo_categoria } }
    )
        .then(
            () => {
                return res.status(200).json(
                    {
                        errorStatus: false,
                        messageStatus: "Categoria alterada com sucesso"
                    }
                );
            }
        )
        .catch(
            (error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: error
                });
            });
});

router.delete('/categoria/excluirCategoria/:codigo_categoria', (req, res) => {

    let {codigo_categoria} = req.params;

    categoriaModel.destroy(
        {where:{codigo_categoria}}
    )
    .then(
        () => {
            return res.status(200).json(
                {
                    errorStatus: false,
                    messageStatus: "Categoria alterada com sucesso"
                }
            );
        }
    )
    .catch(
        (error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    })
});

module.exports = router;