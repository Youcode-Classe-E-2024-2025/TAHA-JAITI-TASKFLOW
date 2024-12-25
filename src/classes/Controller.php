<?php

class Controller {
    
    protected function successResponse ($data, $msg = 'Success',$code) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $msg,
            'data' => $data
        ]);
        exit;
    }

    
}