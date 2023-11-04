window.onload = async function(){
	var promise = await fetch("../php/select.php", {
		method: 'GET',
	});
	 
	var dados = await promise.json();

	console.log(dados);

	for(var i = 0; i < dados.length; i++){
		var conteudo = 
		`<div class='card'>
				<div class='card-nome'>
					<a>${dados[i].nome}</a>
				</div>
				<div class='card-imagem'>
					<img src='../upload/${dados[i].nome}'></img>
				</div>
				<div class='card-valor'>
					<a>R$${dados[i].preco}</a>
				</div>
				<div class='card-acao' onclick='Apagar(${dados[i].id_produto})'>
					<a>Apagar produto</a>
				</div>
		</div>`
		
		document.getElementById('produtos').innerHTML += conteudo;
	}
}

async function Apagar(id){

	var dados = new FormData();

	dados.append('id_produto', id);

	console.log(dados);
	var promise = await fetch('../php/deletar.php', {
		method:"POST",
		body: dados
	});
	
	var resposta = await promise.text();

	window.location.reload();
}
