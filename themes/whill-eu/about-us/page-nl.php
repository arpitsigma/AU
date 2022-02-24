<div class="top-about-us">
	<div class="container-wrapper">

		<section class="about-us-mission">
			<h2 class="heading-en color-blue text-center">Onze missie</h2>
			<h3 class="heading-jp text-center">Leuke, innovatieve mobiliteit voor iedereen</h3>

			<div class='mission-description'>
                Een oplossing bieden voor mobiliteit over korte afstanden: met dat doel is WHILL opgericht. Onze innovatieve, doordachte producten voor personal mobility brengen je comfortabel en in stijl van punt A naar punt B, wanneer je maar wilt. Ze overbruggen moeiteloos de afstand tussen de bestaande vervoerinfrastructuur en grote faciliteiten. De nieuwe vervoermiddelen voor korte afstanden van WHILL zijn het antwoord op een 'missing link': ze vervoeren je op een manier die met geen enkel ander vervoermiddel mogelijk is.
			</div>

			<div class="slide-wrapper">
				<div class="inner">
					<a href="javascript:void(0)" class="slide-nav-item item-prev" id="slide-nav-prev"><div></div></a>
					<a href="javascript:void(0)" class="slide-nav-item item-next" id="slide-nav-next"><div></div></a>
					<div class="slides" id="slideWrapper" data-current="1" data-max="16">
						<?php
						$itemMax = 16;
						$html = '';
						// JetPack が勝手に画面リサイズ時に画像もリサイズしてしまうので、background表示に
						for($i=1;$i<=$itemMax;$i++){
							$html .= '<div class="slide-item slide'.$i.' replaceElm no-disp" id="about-us-slide'.$i.'">slide'.$i.'</div>';
						}
						echo $html;
						?>
					</div>
				</div>

			</div>

		</section>

		<section class="about-us-outline">
			<h2 class="heading-jp color-blue text-center">Bedrijfsprofiel</h2>

			<table class="about-us-tbl">
				<tr>
					<th>Bedrijfsnaam</th>
					<td>WHILL</td>
				</tr>
				<tr>
					<th>Oprichting</th>
					<td>Mei 2012</td>
				</tr>
				<tr>
					<th>Activiteiten</th>
					<td>1. Design en verkoop van producten voor personal mobility<br />
						2. Leverancier van vervoerservices met producten voor personal mobility (MaaS)
					</td>
				</tr>
				<tr>
					<?php
                    // 翻訳が Management のままになっている
                    /* <th>Beheer</th> */
                    ?>
					<th>Management</th>
					<td>
                        Satoshi Sugie, raad van bestuur, CEO<br />
                        Junpei Naito, raad van bestuur, CDO<br />
                        Muneaki Fukuoka, raad van bestuur, CTO<br />
                        Kenji Goho, raad van bestuur, CFO/COO<br />
                        Kerry Renaud, raad van bestuur / Algemeen directeur WHILL US / CEO Scootaround Inc.<br />
                        David Milstein, onafhankelijk directeur<br />
                        Shinji Oshige, onafhankelijk directeur<br />
                        Shinzo Takano, onafhankelijk directeur<br />
                        Mike Scipio, Algemeen directeur WHILL Europe bv<br />
                        Tian Ye, Algemeen directeur China Co., Ltd.<br />
                        Chisato Nakamura, voltijds auditor<br />
                        Ken Hirano, extern auditor<br />
                        Masahiro Yamasawa, extern auditor
					</td>
				</tr>
				<tr>
					<th>Aantal personeelsleden</th>
					<td>200 personeelsleden (geconsolideerde basis; in april 2020)</td>
				</tr>
				<tr>
					<th>Geschiedenis</th>
					<td>
                        2012&nbsp;&nbsp;&nbsp;Oprichting<br />
                        2013&nbsp;&nbsp;&nbsp;Lancering in de VS<br />
                        2014&nbsp;&nbsp;&nbsp;Lancering WHILL Model A<br />
                        2017&nbsp;&nbsp;&nbsp;Lancering WHILL Model C<br />
                        2018&nbsp;&nbsp;&nbsp;Oprichting WHILL Europe (Amsterdam)<br />
                        2018&nbsp;&nbsp;&nbsp;Fusie met Scootaround, Inc.<br />
                        2019&nbsp;&nbsp;&nbsp;Bekendmaking MaaS-concept en autonoom rijsysteem<br />
                        2019&nbsp;&nbsp;&nbsp;Oprichting WHILL China (Suzhou)<br />
					</td>
				</tr>
				<tr>
					<th>Kantoorlocaties</th>
					<td>
						<div class="address">
							<h4 class="address-name">Hoofdkantoor Japan</h4>
							<p><a href="https://goo.gl/maps/1N2CcfhJ7YAhPodf7" rel="noopener" target="_blank">Harbor Premium Building 2F, 2-1-11 Higashi-Shinagawa, Shinagawa-ku, Tokyo, 140-0002, Japan</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Kantoor Kyoto (Japan)</h4>
							<p><a href="https://goo.gl/maps/8QwXJBkEApACiY4X9" rel="noopener" target="_blank">Kyoto Research Park Building #6 Room 418, 93 Chudoji Awata-cho, Shimogyo-ku, Kyoto, 600-8815, Japan</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Kantoor Verenigde Staten</h4>
							<p><a href="https://goo.gl/maps/XmgF62nuZC29CkhN6" rel="noopener" target="_blank">951 Mariners Island Blvd., Suite 300, San Mateo, CA 94404</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Kantoor Canada</h4>
							<p><a href="https://goo.gl/maps/PW14shStUC1LJymj8" rel="noopener" target="_blank">1345 Waverley St #302, Winnipeg, MB R3T 5Y7, Canada</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Kantoor Europa</h4>
							<p><a href="https://goo.gl/maps/DpizRCDjMfiS4VpBA" rel="noopener" target="_blank">Arena Boulevard 61, 1101 DL Amsterdam, the Netherlands</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Kantoor China</h4>
							<p><a href="https://goo.gl/maps/t5BEHwV7Ny9NXS5h8" rel="noopener" target="_blank">Room 902, Building 1, Yangcheng Lake International Science and<br />Technology Entrepreneurship Park, Xiangcheng Dinstrict, Suzhou, Jiangsu Province, China</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Kantoor Taiwan</h4>
							<p><a href="https://goo.gl/maps/3EHHhLpens5vyarV7" rel="noopener" target="_blank">18F-2, No. 32, Gaotie 2nd Rd., Zhubei City, Hsinchu County 302, Taiwan (R.O.C.)</a></p>
						</div>

					</td>
				</tr>
			</table>
		</section>


	</div>
</div>

