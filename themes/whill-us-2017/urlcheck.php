<?php
	if( isset($_POST['data']) ) {
		$url = $_POST['data'];
		$header_data = @get_headers($url);
		$verify = $header_data[0]; // moved
		$verify2 = $header_data[24]; // after move
		if(!strpos($verify, '404') && !strpos($verify2, '404')){
			echo "200";
		} else {
			echo "404";
		}
	}
?>