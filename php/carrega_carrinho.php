<?php
    $conn = mysqli_connect("localhost:3306", "root", "root", "tde_pweb");

    $query = "SELECT p.*, cp.quantidade, cp.quantidade * p.preco AS subtotal FROM tde_pweb.carrinho_produto cp INNER JOIN tde_pweb.produto p ON cp.id_produto = p.id;";

    $resultado_query = mysqli_query($conn, $query);
    $dados = array();

    while($resultado = mysqli_fetch_assoc($resultado_query)) {
        array_push($dados, $resultado);
    }

    $dados_json = json_encode($dados);
    echo $dados_json;
?>