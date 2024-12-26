<?php

class Bug extends Task {
    private $type = 'Bug';

    public function __construct($conn) {
        parent::__construct($conn);
        $this->type = 'Bug';
    }

    
}