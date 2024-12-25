<?php

class Service {
    protected $db;
    protected $table;

    public function __construct($db, $table){
        $this->db = $db;
        $this->table = $table;
    }

    public function getAll(){
        try {
            $sql = "SELECT * FROM $this->table";
            $query = $this->db->query($sql);

            $this->db->execute();

            return $this->db->fetchSet();
        } catch (PDOException $e) {
            return ['Error: ' . $e->getMessage()];
        }
    }

    public function getById($id) {
        try {
            $sql = "SELECT * FROM $this->table WHERE id = :id";
            $query = $this->db->query($sql);

            $this->db->bind(':id', $id);
            $this->db->execute();

            return $this->db->fetch();

        } catch (PDOException $e) {
            return ['Error: ' . $e->getMessage()];
        }
    }

    public function delete($id) {
        try {
            $sql = "DELETE FROM $this->table WHERE id = :id";
            $query = $this->db->query($sql);

            $this->db->bind(':id', $id);
            $this->db->execute();

            return ['message' => 'Deleted successfully'];
        } catch (PDOException $e) {
            return ['Error: ' . $e->getMessage()];
        }
    }

    protected function log_err($msg) {
        error_log($msg);
    }
}