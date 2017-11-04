<?php  
class DataInputStream {

	private $length;
	private $data;


	function __constructor() {
		$this->length =  0;
		$this->data   = "";
	}


	public function writeInt($i) {
		$this->data   .= pack("N", $i);
		$this->length += 4;
	}
	public function writeLong($l) {
		$this->data .= pack("J", $l);
		$this->length += 8;
	}


	public function toString() {
		return pack("N", $this->length) . $this->data;
	}

}
?>