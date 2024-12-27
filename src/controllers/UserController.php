<?php

//controller is the middle man between that routes to the correct service
class UserController extends Controller
{
    private $userService;

    public function __construct($db)
    {
        $this->userService = new UserService($db, 'Users');
    }

    public function registerUser()
    {
        try {
            $data = json_decode(file_get_contents('php://input'));

            if (empty($data)) {
                http_response_code(400);
                echo json_encode(['message' => 'No data provided']);
                return;
            }

            $this->userService->registerUser($data);

            $this->successResponse($data, 'User registered successfully');
        } catch (Exception $e) {
            $this->errResponse($e->getMessage());
        }
    }

    public function loginUser() {
        try {
            $data = json_decode(file_get_contents('php://input'));

            if (empty($data)) {
                http_response_code(400);
                echo json_encode(['message' => 'No data provided']);
                return;
            }

            $email = $data->email;
            $pass = $data->password;

            $this->userService->login($email, $pass);

            $data->role = $_SESSION['role'];
            $data->user_Id = $_SESSION['user_id'];

            $this->successResponse($data, 'User logged in successfully');
        } catch (Exception $e) {
            $this->errResponse($e->getMessage());
        }
    }

    public function getUsers(){
        try {
            $users = $this->userService->getUsers();

            if ($users){
                $this->basicResponse($users);
            } else {
                $this->errResponse('No users found', 200);
            }
        } catch (Exception $e){
            $this->errResponse('Error getting the data');
        }
    }
}
