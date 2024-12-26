<?php

class Feature extends Task {
    public function __construct($conn) {
        parent::__construct($conn);
        $this->type = 'feature';
    }
}