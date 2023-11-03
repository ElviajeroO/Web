<?php 

	$nome = $_POST['none'];
	$preco = $_POST['preco'];
	$file = $_FILES['arquivo'];


	$connection = mysqli_connect('127.0.0.1:3306', 'root', 'root','web');
	if (empty($nome) or empty($preco) or empty($file['type']))
		echo 'Preencha todos os campos';
	else
		$query = "INSERT INTO produtos (nome, preco) VALUES('$nome', '$preco')";
		mysqli_query($connection, $query);
		$novo = "../upload/".$nome;
                move_uploaded_file($file["tmp_name"], $novo);
		echo 'Imagem e produto inseridos com sucesso';
?>
