create schema web;

use web;

create table produtos(
	id_produto int not null auto_increment primary key,
    nome varchar(100) not null,
    preco float(6,2) not null,
    cor varchar(100) not null,
    tamanho varchar(1) not null
);

create table carrinho(
	id_produto int not null,
    quantidade int not null,
    foreign key(id_produto) references web.produtos(id_produto)
);
