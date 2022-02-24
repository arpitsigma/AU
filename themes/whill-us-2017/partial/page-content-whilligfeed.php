<?php
// function rudr_instagram_api_curl_connect( $api_url ){
// 	$connection_c = curl_init(); // initializing
// 	curl_setopt( $connection_c, CURLOPT_URL, $api_url ); // API URL to connect
// 	curl_setopt( $connection_c, CURLOPT_RETURNTRANSFER, 1 ); // return the result, do not print
// 	curl_setopt( $connection_c, CURLOPT_TIMEOUT, 20 );
// 	$json_return = curl_exec( $connection_c ); // connect and get json data
// 	curl_close( $connection_c ); // close connection
// 	return json_decode( $json_return ); // decode and return
// }
// $access_token = 'IGQVJYSTVOdzVzNS1EME9KMWJVTjhlZATgybDItbnA5Um9JYVdoNXJNLW83OWtHYURjOHlLdHJaWTVQZA3lDMWEyRDBncGlEUE4xbjMxY1hjeWNudllPakVXcDZAaYWdQQWlhMzk5RGJKZAlB4RDdBRE03dwZDZD';
// $username = 'whill_us';
// $user_search = rudr_instagram_api_curl_connect("https://api.instagram.com/v1/users/search?q=" . $username . "&access_token=" . $access_token);
//
// $user_id = $user_search->data[0]->id; // or use string 'self' to get your own media
// $return = rudr_instagram_api_curl_connect("https://api.instagram.com/v1/users/" . $user_id . "/media/recent?access_token=" . $access_token);
// query the user media

//$fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username";
$fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
$token = "IGQVJYSTVOdzVzNS1EME9KMWJVTjhlZATgybDItbnA5Um9JYVdoNXJNLW83OWtHYURjOHlLdHJaWTVQZA3lDMWEyRDBncGlEUE4xbjMxY1hjeWNudllPakVXcDZAaYWdQQWlhMzk5RGJKZAlB4RDdBRE03dwZDZD";
$limit = 8;
 
$json_feed_url="https://graph.instagram.com/me/media?fields={$fields}&access_token={$token}&limit={$limit}";
$json_feed = @file_get_contents($json_feed_url);
$contents = json_decode($json_feed, true, 512, JSON_BIGINT_AS_STRING);
 
// echo "<div class='ig_feed_container'>";
    // foreach($contents["data"] as $post){
         
        // $username = isset($post["username"]) ? $post["username"] : "";
        // $caption = isset($post["caption"]) ? $post["caption"] : "";
        // $media_url = isset($post["media_url"]) ? $post["media_url"] : "";
        // $permalink = isset($post["permalink"]) ? $post["permalink"] : "";
        // $media_type = isset($post["media_type"]) ? $post["media_type"] : "";
         
        // echo "
            // <div class='ig_post_container'>
                // <div>";
 
                    // if($media_type=="VIDEO"){
                        // echo "<video controls style='width:100%; display: block !important;'>
                            // <source src='{$media_url}' type='video/mp4'>
                            // Your browser does not support the video tag.
                        // </video>";
                    // }
 
                    // else{
                        // echo "<img src='{$media_url}' />";
                    // }
                 
                // echo "</div>
                // <div class='ig_post_details'>
                    // <div>
                        // <strong>@{$username}</strong> {$caption}
                    // </div>
                    // <div class='ig_view_link'>
                        // <a href='{$permalink}' target='_blank'>View on Instagram</a>
                    // </div>
                // </div>
            // </div>
        // ";
    // }
// echo "</div>"
?>
<!--<div>
  <div class="c-container" style="no-padding">-->
    <div id="instafeed" class="c-grid no-margin">
	  <?php foreach($contents["data"] as $post){
		  //$username = isset($post["username"]) ? $post["username"] : "";
          $caption = isset($post["caption"]) ? $post["caption"] : "";
          $media_url = isset($post["media_url"]) ? $post["media_url"] : "";
          $permalink = isset($post["permalink"]) ? $post["permalink"] : "";
          $media_type = isset($post["media_type"]) ? $post["media_type"] : "";
		  ?>
		  <div class='c-grid__u_1of2 c-grid__u_medium_1of4 text-center'>
                <div class="ig-frame">
					<?php if($media_type=="VIDEO"): ?>
						<video controls style='width:100%; display: block !important;'>
                            <source src='<?= $media_url ?>' type='video/mp4'>
                            Your browser does not support the video tag.
                        </video>
					<?php else: ?>
						<img src='<?=$media_url?>' />
					<?php endif; ?>
					<div class="gallery-overlay">
						<div class="gallery-overlay-content">
							<p class="gallery-img-title">Sample Title</p>
							<p class="gallery-img-desc">
								<a href="<?=$media_url?>">
									<!--<svg viewbox="0 0 512 512" preserveAspectRatio="xMidYMid meet" style="display: none;">
										<path d="M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z"></path>
										<path d="M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z"></path>
										<circle cx="351.5" cy="160.5" r="21.5"></circle>
									</svg>-->
									View Image
								</a>
							</p>
						</div>
					</div>
				</div>
				<?php 
				// <div class='ig_post_details'>
                    // <div>
					// <strong>@{$username}</strong> {$caption}
                    // </div>
                    // <div class='ig_view_link'>
                        // <a href='{$permalink}' target='_blank'>View on Instagram</a>
                    // </div>
                // </div>
				?>
            </div>
	  <?php }?>
    </div>
<!--  </div>
</div>-->
<div class="gallery-zoom">
	<div class="gallery-zoom-opt">
		<div class="gallery-zoom-opt-x">
			<span></span>
		</div>
    </div>
</div>
<!--<script src="https://cdn.jsdelivr.net/gh/stevenschobert/instafeed.js@2.0.0rc1/src/instafeed.min.js"></script>-->
<script type="text/javascript">
// $(document).ready(function(){
  // var feed = new Instafeed({
    // accessToken: "IGQVJYSTVOdzVzNS1EME9KMWJVTjhlZATgybDItbnA5Um9JYVdoNXJNLW83OWtHYURjOHlLdHJaWTVQZA3lDMWEyRDBncGlEUE4xbjMxY1hjeWNudllPakVXcDZAaYWdQQWlhMzk5RGJKZAlB4RDdBRE03dwZDZD",
    // limit: 8,
    // template: '<div class="c-grid__u_1of2 c-grid__u_small_1of4 text-center"><div class="ig-frame"><a href="{{link}}" class="ig-link" target="_blank"><img src="{{image}}" class="ig-img"/></a></div></div>'
  // });
  // feed.run();
// })
</script>
