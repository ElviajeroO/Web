<?php
    $frete = $_POST['frete'];

    $conn = mysqli_connect("localhost:3306", "root", "root", "web");

    $query = "UPDATE carrinho c SET frete = $frete WHERE c.id = 1";

    mysqli_query($conn, $query);
?>