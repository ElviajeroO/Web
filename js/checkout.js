window.onload = async function() {
    var promise = await fetch('../php/carrega_resumo.php', {
        method: 'GET'
    })

    var resumo = await promise.json();

    for(var i = 0; i < resumo[0].length; i++){
        var template = 
        `<div class="resumo">
            <div class="resumo-img">
                <img src="../img/produtos/${resumo[0][i].id}.png" />
            </div>

            <div class="resumo-texto">
                ${resumo[0][i].nome} <br>
                Tamanho: ${resumo[0][i].tamanho} <br>
                Cor: ${resumo[0][i].cor} <br>
                Quantidade: ${resumo[0][i].quantidade}
            </div>

            <div class="resumo-preco">
                R$${resumo[0][i].preco}
            </div>
        </div>`

        document.getElementById('resumo').innerHTML += template;
    }

    template = 
    `<div class="resumo-total">
        <div class="total-valores">
            <div>
                Subtotal
            </div>
            
            <div>
                R$${parseFloat(resumo[1].subtotal).toFixed(2)}
            </div>
        </div>

        <div class="total-valores">
            <div>
                Frete
            </div>

            <div>
                R$${parseFloat(resumo[1].frete).toFixed(2)}
            </div>
        </div>

        <div class="total-valores">
            <div>
                Total
            </div>

            <div>
                R$${parseFloat(resumo[1].total).toFixed(2)}
            </div>
        </div>
        
        
    </div>`

    document.getElementById('total').innerHTML = template;   
}

function escolhe_pagamento(id) {
    type = document.getElementById(id).value;
    if(type == 'c' || type == 'd'){
        var template = 
        `<div class="pagamento-input">
            <form id="cartao">
                <div class="input-div">
                    <input type="number" name="numero" placeholder="Número do cartão:" />
                    <div id="n-check" class="input-check"></div>
                </div>

                <div class="input-div">
                    <input type="number" name="cvv" placeholder="CVV:" class="pagamento-cvv"/>
                    <div id="cvv-check" class="input-check"></div>
                </div>

                <div class="input-div">
                    <input type="text" name="nome" placeholder="Nome do titular do cartão" />
                    <div id="nome-check" class="input-check"></div>
                </div>

                <div class="input-div">
                    <input type="month" name="venc" placeholder="Vencimento do cartão"/>
                    <div id="venc-check" class="input-check"></div>
                </div>
            </form>
        </div>
        
        <div class="pagamento-concluir">
			<div class="concluir-button">
				<button onclick="verifica_dados()">
					CONCLUIR PAGAMENTO
				</button>
			</div>
		</div>`
    }
    else {
        var template =
        `<div class="pagamento-pix">
            <div class="pix-texto">
                Escaneie o QR code para efetuar o pagamento por PIX:
            </div>

            <div class="pix-img">
                <img src="../img/pix.png" />
            </div>
        </div>
        
        <div class="pagamento-concluir">
			<div class="concluir-button">
				<button onclick="limpa_carrinho()">
					CONCLUIR PAGAMENTO
				</button>
			</div>
		</div>`
    }
    document.getElementById('pagamento').innerHTML = template;
}

async function verifica_dados() {
    var flag = true;
    var form = new FormData(document.getElementById('cartao'));

    if(form.get('numero') == '' || form.get('numero').length != 16) {
        var template = 
        `<i class="fa-regular fa-circle-xmark fa-beat fa-2xl"></i>`

        document.getElementById('n-check').innerHTML = template
        flag = false;
    }
    else {
        document.getElementById('n-check').innerHTML = ''
    }

    if(form.get('cvv') == '' || form.get('cvv').length != 3) {
        var template = 
        `<i class="fa-regular fa-circle-xmark fa-beat fa-2xl"></i>`

        document.getElementById('cvv-check').innerHTML = template
        flag = false;
    }
    else {
        document.getElementById('cvv-check').innerHTML = ''
    }

    if(form.get('nome') == '') {
        var template = 
        `<i class="fa-regular fa-circle-xmark fa-beat fa-2xl"></i>`

        document.getElementById('nome-check').innerHTML = template
        flag = false;
    }
    else {
        document.getElementById('nome-check').innerHTML = ''
    }

    if(form.get('venc') == '') {
        var template = 
        `<i class="fa-regular fa-circle-xmark fa-beat fa-2xl"></i>`

        document.getElementById('venc-check').innerHTML = template
        flag = false;
    }
    else {
        document.getElementById('venc-check').innerHTML = ''
    }

    if(flag) {
       limpa_carrinho();
    }
    
}

async function limpa_carrinho() {
    var promise = await fetch('../php/limpa_carrinho.php', {
        method: 'GET'
    });

    window.location.href = 'conclui.html';
}

function menuShow(){

	let menuMobile = document.querySelector('.header-mobile-menu');

	if (menuMobile.classList.contains('open')){
		menuMobile.classList.remove('open');
	} else{
		menuMobile.classList.add('open');
	}
}