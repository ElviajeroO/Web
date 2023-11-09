<?php
    $frete = $_POST['frete'];

    $conn = mysqli_connect("localhost:3306", "root", "ShiinaMashiroperfeita!", "tde_pweb");

    $query = "UPDATE carrinho c SET frete = $frete WHERE c.id = 1";

    mysqli_query($conn, $query);
?>