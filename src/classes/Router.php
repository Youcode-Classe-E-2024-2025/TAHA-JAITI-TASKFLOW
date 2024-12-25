<?php
class Router {
    private $routes = [];

    public function addRoute(string $method, string $path, callable $callback): void {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'callback' => $callback
        ];
    }

    public function handleRequest($method, $path) {
        foreach ($this->routes as $route){
            if ($route['method'] === $method && $route['path'] === $path){
                return call_user_func($route['callback']);
            }
        }

        http_response_code(404);   
    }
}