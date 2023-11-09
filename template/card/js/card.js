window.onload = async function(){
	var promise = await fetch("../php/select.php", {
		method: 'GET',
	});
	 
	var dados = await promise.json();
	
	console.log(dados);

	for(var i = 0; i < dados.length; i++){
		var card = 
		`<div class='card'>
			<div class='card-nome'>
				<a>${dados[i].nome}</a>
			</div>
			<div class='card-imagem'>
				<img src='../upload/${dados[i].nome}'></img>
			</div>
			<div class='card-adic'>
				<div class='card-cor'><a>${dados[i].cor}</a></div>
				<div class='card-tam'><a>${dados[i].tamanho}</a></div>
			</div>
			<div class='card-valor'>
				<a>R$${dados[i].preco}</a>
			</div>
			<div class='card-acao' onclick='Apagar(${dados[i].id_produto})'>
				<a>Apagar produto</a>
			</div>
		</div>`
		
		document.getElementById('produtos').innerHTML += card;
	}
}
