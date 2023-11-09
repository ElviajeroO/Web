create schema web;

use web;

CREATE TABLE produto (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
    preco FLOAT(6,2) NOT NULL,
    cor VARCHAR(100) NOT NULL,
    tamanho VARCHAR(1) NOT NULL
);

CREATE TABLE carrinho (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    frete FLOAT(4,2)
);

CREATE TABLE carrinho_produto (
	id_carrinho INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY(id_carrinho) REFERENCES carrinho(id),
    FOREIGN KEY(id_produto) REFERENCES produto(id)
);
