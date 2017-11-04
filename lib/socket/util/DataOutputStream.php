<?php  
class DataOutputStream {

	private $length;
	private $data;


	function __constructor() {
		$this->length =  0;
		$this->data   = "";
	}


	public function getLength() {
		return $this->length;
	}

	public function close() {
		$this->length =  0;
		$this->data   = "";
	}


	public function write($byteArray) {
		$this->data   .= $byteArray;
		$this->length += strlen($byteArray);
	}
	public function writeBoolean($boolean) {
		$this->data   .= pack("C", bindec($boolean));
		$this->length += 1;
	}
	public function writeByte($byte) {
		$this->data   .= pack("C", $byte);
		$this->length += 1;
	}
	public function writeChar($ch) {
		$this->data   .= pack("c", $ch);
		$this->length += 2;
	}
	public function writeInt($i) {
		$this->data   .= pack("N", $i);
		$this->length += 4;
	}
	public function writeLong($l) {
		$this->data   .= pack("J", $l);
		$this->length += 8;
	}
	public function writeShort($s) {
		$this->data   .= pack("n", $s);
		$this->length += 2;
	}

	public function toByteArray() {
		return pack("N", $this->length) . $this->data;
	}

}
?>