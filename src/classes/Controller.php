<?php

class Controller {
    
    protected function successResponse ($data, $msg = 'Success',$code = '200') {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $msg,
            'data' => $data
        ]);
        exit;
    }

    protected function errResponse ($msg, $code = '400') {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'controller response',
            'message' => $msg
        ]);
        exit;
    }

    protected function basicResponse ($data, $code = '200') {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    protected function getRequestData () {
        $data = json_decode(file_get_contents('php://input'));
        return $data;
    }
    
    public function requireRole(string $role){
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== $role) {
            http_response_code(400);
            throw new Exception('Unauthorized: Access denied.');
        }
    }

    public function requireLogin(){
        if (!isset($_SESSION['user_id'])) {
            http_response_code(400);
            throw new Exception('Unauthorized: User is not logged in.');
        }
    }
}