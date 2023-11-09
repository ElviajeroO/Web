window.onload = async function(){
	var promise = await fetch("../php/carrega_carrinho.php", {
		method: "GET"
	});

	var carrinho = await promise.json();

	for(var i = 0; i < carrinho.length; i++) {
        //Template string para a descrição do produto
		var template =
		`<div class="descricao-conteudo">
			<div class="descricao-img">
				<img src="../img/produtos/${carrinho[i].id}.png" />
			</div>
		
			<div class="descricao-texto">
				<div class="descricao-nome">
					${carrinho[i].nome}
				</div>
	
				<div class="descricao-informacoes">
					Cor: ${carrinho[i].cor} <br>
					Tamanho: ${carrinho[i].tamanho}
				</div>
			</div>
		
		</div>`
	
		document.getElementById('descricao').innerHTML += template;

        //Template string para a quantidade do produto
		template = 
		`<div class="quantidade-input">
			<button onclick="atualiza_qtd('qtd${carrinho[i].id}', 1)">
				<i class="fa-solid fa-arrow-up"></i>
			</button>

			<input type="number" min="0" value="${carrinho[i].quantidade}" id="qtd${carrinho[i].id}"/> 

			<button onclick="atualiza_qtd('qtd${carrinho[i].id}', -1)">
				<i class="fa-solid fa-arrow-down"></i>
			</button>
		</div>`

		document.getElementById('quantidade').innerHTML += template;

        //Template string para o preço do produto
		template =
		`<div class="preco-texto">
			R$${parseFloat(carrinho[i].preco).toFixed(2)}
		</div>`

		document.getElementById('preco').innerHTML += template;

		//Template string para o subtotal da compra
		template =
		`<div class="subtotal-texto">
			R$${parseFloat(carrinho[i].subtotal).toFixed(2)}
		</div>`

		document.getElementById('subtotal').innerHTML += template;
	}

	if(carrinho.length > 0) {
		var template = 
		`<div class="finalizar">
			<div class="finalizar-frete">
				<div class="frete-input">
					<input type="text" placeholder="Digite o seu CEP:" id="cep"/>
					<button onclick="mostra_frete()"> Calcular frete </button>
				</div>

				<div id="check"></div>
					
				<div id="options"></div>
			</div>

			<div id="finalizar-button"></div>
		</div>`

		document.getElementById('finalizar').innerHTML = template;
	}

	else {
		var template = 
		`<div class="finalizar-aviso">
			<h2>
				Você não possui nenhum item no seu carrinho.
			</h2>
			<a href="../index.html" class="aviso-button">
				<button>
					Retornar à loja
				</button>
			</a>
		</div>`

		document.getElementById('finalizar').innerHTML = template;
	}

}

async function atualiza_qtd(qtd_id, tipo) {
	var qtd = document.getElementById(qtd_id);
	if(tipo > 0) {
		var value = parseInt(qtd.getAttribute('value')) + 1;
	}
	else {
		var value = parseInt(qtd.getAttribute('value')) - 1;
	}

	if(value < 0){
		value = 0;
	}

	qtd.setAttribute('value', value.toString());

	var id_produto = parseInt(qtd_id.match(/\d/g).join(''));	//Pega apenas os números da string

	var dados = new FormData();
	dados.append('id', id_produto);
	dados.append('value', value);

	var promise = await fetch('../php/atualiza_qtd.php', {
		method: 'POST',
		body: dados
	});

	var dados = await promise.json();

	document.getElementById('subtotal').innerHTML = '';

	for(i = 0; i < dados.length; i++) {
		template =
		`<div class="subtotal-texto">
			R$${parseFloat(dados[i].subtotal).toFixed(2)}
		</div>`

		document.getElementById('subtotal').innerHTML += template;
	}	
}

function mostra_frete() {
	var cep = document.getElementById('cep').value;

	document.getElementById('check').innerHTML = '';
	document.getElementById('options').innerHTML = '';

	
	if(!isNaN(cep) && cep.length == 8) {
		var template = `<i class="fa-regular fa-circle-check fa-2xl"></i>`

		document.getElementById('check').innerHTML = template;

		template = 
		`<div class="frete-options">
			<div class="options-legenda">
				<div class="legenda-envio">
					Envio
				</div>
		
				<div class="legenda-frete">
					Frete
				</div>
		
				<div class="legenda-previsao">
					Previsão
				</div>
			</div>
			<div class="options-texto">
				<div class="options-select">
					<input type="radio" id="sedex" name="frete" value="10" onclick="salva_frete('sedex')">
					<label for="sedex"> Sedex </label> <br>
					<input type="radio" id="pac" name="frete" value="0" onclick="salva_frete('pac')">
					<label for="pac"> PAC </label>
				</div>
		
				<div class="options-frete">
					R$10.00 <br>
					Grátis
				</div>
		
				<div class="options-previsao">
					5 d.u. <br>
					10 d.u.
				</div>
			</div>
		</div>`
			
		document.getElementById('options').innerHTML = template;
	}
	else {
		var template = `<i class="fa-regular fa-circle-xmark fa-2xl"></i>`

		document.getElementById('check').innerHTML = template;

		template = 
		`<h2>
			Verifique se o CEP está no formato correto!
		</h2>`

		document.getElementById('options').innerHTML = template;
	}
}

async function salva_frete(id) {
	var frete = parseFloat(document.getElementById(id).value);
	var dados = new FormData();

	dados.append('frete', frete);

	await fetch('../php/salva_frete.php', {
		method: "POST",
		body: dados
	});

	template = 
	`<button onclick="verifica_qtd()"> FINALIZAR COMPRA </button>`

	document.getElementById('finalizar-button').innerHTML = template;
}

async function verifica_qtd() {
	await fetch('../php/verifica_qtd.php', {
		method: 'GET'
	});

	window.location.href = "checkout.html";

}

function menuShow(){

	let menuMobile = document.querySelector('.header-mobile-menu');

	if (menuMobile.classList.contains('open')){
		menuMobile.classList.remove('open');
	} else{
		menuMobile.classList.add('open');
	}
}