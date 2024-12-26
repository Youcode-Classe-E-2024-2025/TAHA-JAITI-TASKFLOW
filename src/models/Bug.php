<?php

class Bug extends Task {
    public function __construct($conn) {
        parent::__construct($conn);
        $this->type = 'bug';
    }

    
}