<?php
    $conn = mysqli_connect("localhost:3306", "root", "root", "web");

    $query = "SELECT SUM(p.preco * c.quantidade) AS subtotal FROM carrinho c INNER JOIN produtos p ON c.id_produto = p.id;";

    $resultado_query = mysqli_query($conn, $query);
    
    if($resultado = mysqli_fetch_assoc($resultado_query)) {
        $dado = $resultado;
    }

    $dado_json = json_encode($dado);
    echo $dado_json;
?>