const searchInput = document.querySelector('.search-input');

let user = [];
searchInput.addEventListener('input', (e) =>{
	document.getElementById('produtos').innerHTML = '';
	const value = e.target.value;
	user.forEach(user => {
		if (user.nome.includes(value)) {
			let conteudo = `<div class='card'>
						<div class='card-nome'>
							<a>${user.nome}</a>
						</div>
						<div class='card-imagem'>
							<img src='upload/${user.nome}'></img>
						</div>
						<div class='card-adic'>
							<div class='card-cor'><a>${user.cor}</a></div>
							<div class='card-tam'><a>${user.tamanho}</a></div>
						</div>
						<div class='card-valor'>
							<a>R$${user.preco}</a>
						</div>
						<div class='card-acao' onclick='AddCarrinho(${user.id})'>
							<a>Adicionar ao carrinho</a>
						</div>
					</div>`;
			document.getElementById('produtos').innerHTML += conteudo;
		}
	})
})
window.onload = async function(){
	var promise = await fetch("/www/php/select.php", {
		method: 'GET',
	});
	 
	var dados = await promise.json();
	user = dados;
	console.log(dados);

	for(var i = 0; i < dados.length; i++){
		var card = 
		`<div class='card'>
			<div class='card-nome'>
				<a>${dados[i].nome}</a>
			</div>
			<div class='card-imagem'>
				<img src='upload/${dados[i].nome}'></img>
			</div>
			<div class='card-adic'>
				<div class='card-cor'><a>${dados[i].cor}</a></div>
				<div class='card-tam'><a>${dados[i].tamanho}</a></div>
			</div>
			<div class='card-valor'>
				<a>R$${dados[i].preco}</a>
			</div>
			<div class='card-acao' onclick='AddCarrinho(${dados[i].id})'>
				<a>Adicionar ao carrinho</a>
			</div>
		</div>`
		
		document.getElementById('produtos').innerHTML += card;
	}
}

async function AddCarrinho(id){

	var dados = new FormData();

	dados.append('id_produto', id);

	console.log(dados);
	var promise = await fetch('/www/php/addcarrinho.php', {
		method:"POST",
		body: dados
	});
	
	var resposta = await promise.text();

	window.location.reload();
}

function menuShow(){

	let menuMobile = document.querySelector('.header-mobile-menu');

	if (menuMobile.classList.contains('open')){
		menuMobile.classList.remove('open');
	} else{
		menuMobile.classList.add('open');
	}
}
