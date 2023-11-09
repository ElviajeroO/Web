<?php
        $conn = mysqli_connect("localhost:3306", "root", "root", "web");

    $query = "SELECT p.*, cp.quantidade FROM produto p INNER JOIN carrinho_produto cp ON p.id = cp.id_produto;";

    $resposta = mysqli_query($conn, $query);
    $dados_produtos = array();
    
    while($resultado = mysqli_fetch_assoc($resposta)){
        array_push($dados_produtos, $resultado);
    }

    $query = "SELECT c.frete, SUM(cp.quantidade * p.preco) AS subtotal, c.frete + SUM(cp.quantidade * p.preco) AS total FROM produto p 
        INNER JOIN carrinho_produto cp ON p.id = cp.id_produto
        INNER JOIN carrinho c ON cp.id_carrinho = c.id
        GROUP BY c.id";

    $resposta = mysqli_query($conn, $query);
    $dados_total = mysqli_fetch_assoc($resposta);

    $dados = array();
    array_push($dados, $dados_produtos);
    array_push($dados, $dados_total);

    $dados_json = json_encode($dados);

    echo $dados_json;
?>