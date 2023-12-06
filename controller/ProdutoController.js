const express = require('express');
//IMPORTAÇÃO DOS PACOTES DO FIREBASE
const { initializeApp, FirebaseError } = require('firebase/app');

const { getStorage, ref, getDownloads, uploadBytes, listAll, deleteObject, getDownloadURL } = require('firebase/storage');

const app = express();
const router = express.Router();

const produto = require('../model/Produto');
const upload = require('../helpers/upload/uploadImagem');
const deleteImage = require('../helpers/upload/deleteImagem');

/*****FIREBASE - CONEXÃO E CONFIGURAÇÃO*****/
/*DADOS DE CONEXÃO COM O FIREBASE*/
const firebaseConfig = {
    apiKey: "AIzaSyAmA1vhCuYw-tWEY-0Pf6LbU2T7KdhD83c",
    authDomain: "upload-nodejs-d709e.firebaseapp.com",
    projectId: "upload-nodejs-d709e",
    storageBucket: "upload-nodejs-d709e.appspot.com",
    messagingSenderId: "208090475096",
    appId: "1:208090475096:web:a0f40e3954af73c7acb82d",
    measurementId: "G-XS6298SD7G"
};

//INICIALIZAR O FIREBASE 
const firebaseApp = initializeApp(firebaseConfig);

//CONECTANDO COM O STORAGE
const storage = getStorage(firebaseApp);

router.post("/produto/cadastrarProduto", upload.array('files', 1), (req, res) => {
    const { nome_produto, valor_produto, descricao_produto, codigo_categoria } = req.body;

    const files = req.files;

    let imagem_produto;
    let imagem_produto_url;
    let cont = 0;

    files.forEach(file => {

        const fileName = Date.now().toString() + '-' + file.originalname;
        const fileRef = ref(storage, fileName);

        uploadBytes(fileRef, file.buffer)
            .then((snapshot) => {
                const imageRef = ref(storage, snapshot.metadata.name);

                getDownloadURL(imageRef)
                    .then((urlFinal) => {
                        if (cont === 0) {
                            imagem_produto = snapshot.metadata.name; // Corrigido de fileName
                            imagem_produto_url = urlFinal;
                            cont++;

                            console.log('NOME DA IMAGEM PRODUTO: ' + imagem_produto);
                            console.log('URL DA IMAGEM PRODUTO: ' + imagem_produto_url);
                        } else {

                            if (imagem_produto_url !== 1) {
                                console.log('A IMAGEM JA FOI ENVIADA');
                            }
                        }

                        if (imagem_produto && imagem_produto_url) {
                            // GRAVAÇÃO DOS DADOS DO LIVRO NO BANCO DE DADOS
                            produto.create({
                                nome_produto,
                                valor_produto,
                                imagem_produto,
                                imagem_produto_url,
                                descricao_produto,
                                codigo_categoria,
                            })
                                .then(() => {
                                    return res.status(201).json({
                                        erroStatus: false,
                                        mensagemStatus: 'Produto inserido com sucesso.',
                                    });
                                })
                                .catch((erro) => {
                                    return res.status(400).json({
                                        erroStatus: true,
                                        erroMensagem: erro,
                                    });
                                });
                        }
                    });
            })
            .catch((erro) => {
                res.send('ERRO: ' + erro);
            });

    });



});

router.get("/produto/listarProduto", (req, res) => {
    produto.findAll()
        .then((produtos) => {
            return res.status(200).json(produtos)
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});


router.delete("/produto/excluirProduto/:codigo_produto", (req, res) => {
    const { codigo_produto } = req.params;

    produto.findByPk(codigo_produto)
        .then(
            (produto) => {
                deleteImage(produto.imagem_produto);
                deleteImage(produto.imagem_produto_url);

                produto.destroy({
                    where: { codigo_produto }
                }).then(
                    () => {
                        return res.status(200).json({
                            erroStatus: false,
                            mensagemStatus: 'Produto excluído com sucesso.'
                        });

                    }).catch((erro) => {
                        return res.status(400).json({
                            erroStatus: true,
                            erroMensagem: erro
                        });
                    });
            }
        )

});

module.exports = router;