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
                <input type="number" name="numero" placeholder="Número do cartão:" />
                <input type="number" name="cvv" placeholder="CVV:" class="pagamento-cvv"/>
                <input type="text" name="nome" placeholder="Nome do titular do cartão" />
                <input type="month" name="venc" placeholder="Vencimento do cartão"/>
            </form>
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
        </div>`
    }
    document.getElementById('pagamento').innerHTML = template;
}

function verifica_dados() {
    var form = new FormData(document.getElementById('cartao'));

    
}