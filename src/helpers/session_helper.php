<?php

session_start();

function adminIsLoggedIn(){
    if(isset($_SESSION['user_id']) && ($_SESSION['role'] ==='supervisor')){
        return true;
    } else {
        return false;
    }

}

function clientIsLoggedIn(){
    if(isset($_SESSION['user_id']) && ($_SESSION['role'] ==='employee' || $_SESSION['role'] ==='supervisor')){
        return true;
    } else {
        return false;
    }
}