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


	   var template = `<a>${resposta}</a>`

	document.getElementById('resposta').innerHTML = template;

}


				
