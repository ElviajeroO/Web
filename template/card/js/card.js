
// filmes

var conteudo = [
    {id: 1, titulo: "Pulseira de equilibrio", genero: "R$100,00"},
    {id: 2, titulo: "Avatar", genero: "Aventura"},
    {id: 3, titulo: "Fuga das Galinhas", genero: "Desenho Animado"},
    {id: 4, titulo: "Oppenheimer", genero: "Drama"},
    {id: 5, titulo: "Os dez Mandamentos", genero: "Drama"},
];

for(var i = 0; i < conteudo.length; i++) {

   var template = 
	`<div class="card">
		<div class="card-titulo">${conteudo[i].titulo}</div>
		<div class="card-genero">${conteudo[i].genero}</div>
		<div class="card-acao"r onclick="comprar(${conteudo[i].id})" >COMPRAR</div>
	</div>`;

	document.getElementById('filmes').innerHTML += template;
}

function comprar(id){
	var dados = new FormData();
	dados.append("id_produto", id);
	
	fetch("php/comprar.php", {
		method: "POST",
		body: dados
	});
}


