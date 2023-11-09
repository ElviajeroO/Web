async function Gravar(){

		var form = document.getElementById('cadastra-forms');
		var file = document.getElementById('file').files;
		var dados = new FormData(form);
		dados.append('arquivo', file[0]);
		console.log(dados);
		var promise = await fetch('../php/gravar.php', {
			method: 'POST',
			body: dados
		});
	
	var resposta = await promise.text();


	var template = `<a>${resposta}</a>`;

	document.getElementById('resposta').innerHTML = template;

}

function menuShow(){

	let menuMobile = document.querySelector('.header-mobile-menu');

	if (menuMobile.classList.contains('open')){
		menuMobile.classList.remove('open');
	} else{
		menuMobile.classList.add('open');
	}
}
