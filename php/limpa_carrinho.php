<?php
        $conn = mysqli_connect("localhost:3306", "root", "root", "web");

    $query = "UPDATE carrinho SET frete = NULL WHERE id = 1;";
    mysqli_query($conn, $query);

    $query = "DELETE FROM carrinho_produto WHERE id_carrinho = 1;";
    mysqli_query($conn, $query);

    echo '';
?>