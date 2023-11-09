function comprar(id){
	var dados = new FormData();
	dados.append("id_produto", id);
	
	fetch("php/comprar.php", {
		method: "POST",
		body: dados
	});
}

