const sequelize = require("sequelize");

const connection = require("../database/database");

const Categoria = require('./Categoria');

const Produto = connection.define(
        'tbl_produto',
        {
                codigo_produto: {
                        type: sequelize.INTEGER(10),
                        unsigned: true,
                        autoIncrement: true,
                        primaryKey: true
                },
                codigo_categoria: {
                        type: sequelize.INTEGER,
                        allowNull: false
                },
                nome_produto: {
                        type: sequelize.STRING(255),
                        allowNull: false
                },
                valor_produto: {
                        type: sequelize.DECIMAL(10, 2),
                        allowNull: false
                },
                imagem_produto: {
                        type: sequelize.STRING(500),
                        allowNull: false
                },
                imagem_produto_url: {
                        type: sequelize.STRING(500),
                        allowNull: false
                },
                descricao_produto: {
                        type: sequelize.TEXT,
                        allowNull: false
                }
        }
);

Categoria.hasMany(Produto, {
        foreignKey: 'codigo_categoria',
        sourceKey: 'codigo_categoria'
});


/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/
Produto.belongsTo(Categoria, {
        foreignKey: 'codigo_categoria',
        sourceKey: 'codigo_categoria'
});

Produto.sync({ force: false });

module.exports = Produto;

