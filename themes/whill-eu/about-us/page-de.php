<div class="top-about-us">
	<div class="container-wrapper">

		<section class="about-us-mission">
			<h2 class="heading-en color-blue text-center">Unsere Mission</h2>
			<h3 class="heading-jp text-center">Mehr Spaß und innovative Mobilität für alle</h3>

			<div class='mission-description'>
                WHILL wurde mit dem Ziel gegründet, eine Plattform für die Mobilität auf Kurzstrecken aufzubauen. Menschen sollen Zugang zu innovativen und sorgfältig konzipierten Lösungen für ihre persönliche Mobilität erhalten, die sie je nach Bedarf ganz bequem nutzen können. Diese Lösung schafft die nahtlose Verbindung zwischen der bestehenden Infrastruktur für den Personenverkehr und großen Einrichtungen. Mit der Einführung eines neuen Konzepts für das Zurücklegen von Kurzstrecken deckt WHILL die so genannte letzte Meile ab, für die kein anderes Transportmittel bereitsteht.
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
			<h2 class="heading-jp color-blue text-center">Unternehmensprofil</h2>

			<table class="about-us-tbl">
				<tr>
					<th>Firmenname</th>
					<td>WHILL</td>
				</tr>
				<tr>
					<th>Gegründet</th>
					<td>Mai 2012</td>
				</tr>
				<tr>
					<th>Geschäftsaktivitäten</th>
					<td>1. Entwurf und Vertrieb von Produkten für persönliche Mobilität<br />
						2. Anbieter von Mobilitätsdienstleistungen durch Einsatz von Produkten für persönliche Mobilität (MaaS)
					</td>
				</tr>
				<tr>
                    <?php
                    // 翻訳が Management のままになっている
                    /* <th>Verwaltung</th> */
                    ?>
					<th>Verwaltung</th>
					<td>
                        Satoshi Sugie, Mitglied des Vorstands, CEO<br />
                        Junpei Naito, Mitglied des Vorstands, CDO<br />
                        Muneaki Fukuoka, Mitglied des Vorstands, CTO<br />
                        Kenji Goho, Mitglied des Vorstands, CFO/COO<br />
                        Kerry Renaud, Mitglied des Vorstands/Vorsitzender von WHILL US/CEO von Scootaround Inc.<br />
                        David Milstein, Externer Direktor<br />
                        Shinji Oshige, Externer Direktor<br />
                        Shinzo Takano, Externer Direktor<br />
                        Mike Scipio, Vorsitzender von WHILL Europe B.V.<br />
                        Tian Ye, Vorsitzender von China Co., Ltd.<br />
                        Chisato Nakamura, Interne Revision<br />
                        Ken Hirano, Externe Revision<br />
                        Masahiro Yamasawa, Externe Revision
					</td>
				</tr>
				<tr>
					<th>Mitarbeiterzahl</th>
					<td>Über 200 Mitarbeiter (konsolidierte Basis) (per April 2020)</td>
				</tr>
				<tr>
					<th>Historie</th>
					<td>
                        2012&nbsp;&nbsp;&nbsp;Gründung<br />
                        2013&nbsp;&nbsp;&nbsp;Firmeneintragung in den USA<br />
                        2014&nbsp;&nbsp;&nbsp;Einführung WHILL Model A<br />
                        2017&nbsp;&nbsp;&nbsp;Einführung WHILL Model C<br />
                        2018&nbsp;&nbsp;&nbsp;Gründung WHILL Europe (Amsterdam)<br />
                        2018&nbsp;&nbsp;&nbsp;Fusion mit Scootaround, Inc.<br />
                        2019&nbsp;&nbsp;&nbsp;Ankündigung MaaS-Konzept und System für autonomes Fahren<br />
                        2019&nbsp;&nbsp;&nbsp;Gründung WHILL China (Suzhou)<br />
					</td>
				</tr>
				<tr>
					<th>Standorte der Büros</th>
					<td>
						<div class="address">
							<h4 class="address-name">Firmenzentrale Japan</h4>
                            <p><a href="https://goo.gl/maps/1N2CcfhJ7YAhPodf7" rel="noopener" target="_blank">Harbor Premium Building 2F, 2-1-11 Higashi-Shinagawa, Shinagawa-ku, Tokyo, 140-0002, Japan</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Kyoto, Niederlassung Japan</h4>
                            <p><a href="https://goo.gl/maps/8QwXJBkEApACiY4X9" rel="noopener" target="_blank">Kyoto Research Park Building #6 Room 418, 93 Chudoji Awata-cho, Shimogyo-ku, Kyoto, 600-8815, Japan</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Niederlassung USA</h4>
							<p><a href="https://goo.gl/maps/XmgF62nuZC29CkhN6" rel="noopener" target="_blank">951 Mariners Island Blvd., Suite 300, San Mateo, CA 94404</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Niederlassung Kanada</h4>
							<p><a href="https://goo.gl/maps/PW14shStUC1LJymj8" rel="noopener" target="_blank">1345 Waverley St #302, Winnipeg, MB R3T 5Y7, Canada</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Niederlassung Europa</h4>
							<p><a href="https://goo.gl/maps/DpizRCDjMfiS4VpBA" rel="noopener" target="_blank">Arena Boulevard 61, 1101 DL Amsterdam, the Netherlands</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Niederlassung China</h4>
							<p><a href="https://goo.gl/maps/t5BEHwV7Ny9NXS5h8" rel="noopener" target="_blank">Room 902, Building 1, Yangcheng Lake International Science and<br />Technology Entrepreneurship Park, Xiangcheng Dinstrict, Suzhou, Jiangsu Province, China</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Niederlassung Taiwan</h4>
							<p><a href="https://goo.gl/maps/3EHHhLpens5vyarV7" rel="noopener" target="_blank">18F-2, No. 32, Gaotie 2nd Rd., Zhubei City, Hsinchu County 302, Taiwan (R.O.C.)</a></p>
						</div>

					</td>
				</tr>
			</table>
		</section>


	</div>
</div>

