<?php 

	$id = $_POST['id_produto'];

	$connection = mysqli_connect('127.0.0.1:3306', 'root', 'root', 'web');
	
	$query = 'DELETE FROM produtos WHERE id_produto ='.$id;

	mysqli_query($connection, $query);

	echo 'Produto Deletado';
?>
