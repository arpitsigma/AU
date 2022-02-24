<div class="top-about-us">
	<div class="container-wrapper">

		<section class="about-us-mission">
            <?php /* 翻訳されていないので変更せず */ ?>
			<h2 class="heading-en color-blue text-center">Notre mission</h2>
			<h3 class="heading-jp text-center">Offrir une mobilité agréable et innovante pour chacun</h3>

			<div class='mission-description'>
                WHILL a été créé dans l'objectif de construire une plateforme pour la mobilité de courte distance. Permettre à chacun d'accéder à une solution de mobilité personnelle innovante et bien pensée, pouvant être utilisée de manière confortable et en toute situation. Cette solution crée une connexion fluide entre les infrastructures de transport classiques et les grandes installations. Proposant un nouveau style de déplacement de courte distance, WHILL est le dernier maillon de transport qu'aucun autre moyen de transport ne peut offrir.
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
            <?php /* 翻訳されていないので変更せず */ ?>
			<h2 class="heading-jp color-blue text-center">Profil de l’entreprise</h2>

			<table class="about-us-tbl">
				<tr>
					<th>Raison sociale</th>
					<td>WHILL</td>
				</tr>
				<tr>
					<th>Création</th>
					<td>Mai 2012</td>
				</tr>
				<tr>
					<th>Activités</th>
					<td>1. Conception et vente de produits de mobilité personnelle<br />
						2. Fournisseur de services de transport au moyen de produits de mobilité personnelle (MaaS)
					</td>
				</tr>
				<tr>
					<th>Direction</th>
					<td>
                        Satoshi Sugie, membre du Conseil d'administration, CEO<br />
                        Junpei Naito, membre du Conseil d'administration, CDO<br />
                        Muneaki Fukuoka, membre du Conseil d'administration, CTO<br />
                        Kenji Goho, membre du Conseil d'administration, CFO/COO<br />
                        Kerry Renaud, membre du Conseil d'administration / Président de WHILL US / CEO de Scootaround Inc.<br />
                        David Milstein, administrateur externe<br />
                        Shinji Oshige, administrateur externe<br />
                        Shinzo Takano, administrateur externe<br />
                        Mike Scipio, Président de WHILL Europe B.V.<br />
                        Tian Ye, Président de China Co., Ltd.<br />
                        Chisato Nakamura, auditeur à temps plein<br />
                        Ken Hirano, auditeur externe<br />
                        Masahiro Yamasawa, auditeur externe
					</td>
				</tr>
				<tr>
					<th>Nombre de salariés</th>
					<td>Plus de 200 salariés (sur base consolidée) (en avril 2020)</td>
				</tr>
				<tr>
					<th>Historique</th>
					<td>
                        2012&nbsp;&nbsp;&nbsp;Fondation<br />
                        2013&nbsp;&nbsp;&nbsp;Établissement aux États-Unis<br />
                        2014&nbsp;&nbsp;&nbsp;Lancement de WHILL Model A<br />
                        2017&nbsp;&nbsp;&nbsp;Lancement de WHILL Model C<br />
                        2018&nbsp;&nbsp;&nbsp;Création de WHILL Europe (Amsterdam)<br />
                        2018&nbsp;&nbsp;&nbsp;Fusion avec Scootaround, Inc.<br />
                        2019&nbsp;&nbsp;&nbsp;Présentation du concept MaaS et du système de conduite autonome<br />
                        2019&nbsp;&nbsp;&nbsp;Création de WHILL Chine (Suzhou)<br />
					</td>
				</tr>
				<tr>
					<th>Nos bureaux</th>
					<td>
						<div class="address">
							<h4 class="address-name">Siège principal - Japon</h4>
							<p><a href="https://goo.gl/maps/1N2CcfhJ7YAhPodf7" rel="noopener" target="_blank">Harbor Premium Building 2F, 2-1-11 Higashi-Shinagawa, Shinagawa-ku, Tokyo, 140-0002, Japon</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Kyoto, Japon</h4>
							<p><a href="https://goo.gl/maps/8QwXJBkEApACiY4X9" rel="noopener" target="_blank">Kyoto Research Park Building #6 Room 418, 93 Chudoji Awata-cho, Shimogyo-ku, Kyoto, 600-8815, Japon</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">États-Unis</h4>
							<p><a href="https://goo.gl/maps/XmgF62nuZC29CkhN6" rel="noopener" target="_blank">951 Mariners Island Blvd., Suite 300, San Mateo, CA 94404</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Canada</h4>
							<p><a href="https://goo.gl/maps/PW14shStUC1LJymj8" rel="noopener" target="_blank">1345 Waverley St #302, Winnipeg, MB R3T 5Y7, Canada</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Europe</h4>
							<p><a href="https://goo.gl/maps/DpizRCDjMfiS4VpBA" rel="noopener" target="_blank">Arena Boulevard 61, 1101 DL Amsterdam, the Netherlands</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Chine</h4>
							<p><a href="https://goo.gl/maps/t5BEHwV7Ny9NXS5h8" rel="noopener" target="_blank">Room 902, Building 1, Yangcheng Lake International Science and<br />Technology Entrepreneurship Park, Xiangcheng Dinstrict, Suzhou, Jiangsu Province, China</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Taïwan</h4>
							<p><a href="https://goo.gl/maps/3EHHhLpens5vyarV7" rel="noopener" target="_blank">18F-2, No. 32, Gaotie 2nd Rd., Zhubei City, Hsinchu County 302, Taiwan (R.O.C.)</a></p>
						</div>

					</td>
				</tr>
			</table>
		</section>


	</div>
</div>

