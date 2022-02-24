<div class="top-about-us">
	<div class="container-wrapper">

		<section class="about-us-mission">
			<h2 class="heading-en color-blue text-center">Nuestra misión</h2>
			<h3 class="heading-jp text-center">Ofrecemos movilidad innovadora y divertida para todos</h3>

			<div class='mission-description'>
                WHILL fue creado con el objetivo de construir una plataforma para la movilidad de corta distancia. Brindamos a las personas acceso a una solución de movilidad personal innovadora y bien diseñada que puede ser utilizada cómodamente cuando sea necesario. Esta solución crea una conexión perfecta entre la infraestructura de transporte existente y las grandes instalaciones. Presentamos un nuevo estilo de viajes de corta distancia, WHILL cubre el último hueco en el transporte que ningún otro medio de transporte es capaz de proporcionar.
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
			<h2 class="heading-jp color-blue text-center">Perfil de la empresa</h2>

			<table class="about-us-tbl">
				<tr>
					<th>Nombre corporativo</th>
					<td>WHILL</td>
				</tr>
				<tr>
					<th>Fundación</th>
					<td>Mayo de 2012</td>
				</tr>
				<tr>
					<th>Negocio</th>
					<td>1. Diseño y venta de productos de movilidad personal<br />
						2. Proveedor de servicios de transporte que ofrece productos de movilidad personal. (MaaS)
					</td>
				</tr>
				<tr>
					<th>Equipo directivo</th>
					<td>
                        Satoshi Sugie, director del consejo, CEO<br />
                        Junpei Naito, director del consejo, CDO<br />
                        Muneaki Fukuoka, director del consejo, CTO<br />
                        Kenji Goho, director del consejo, CFO/COO<br />
                        Kerry Renaud, director del consejo/presidente en WHILL US/CEO en Scootaround Inc.<br />
                        David Milstein, director externo<br />
                        Shinji Oshige, director externo<br />
                        Shinzo Takano, director externo<br />
                        Mike Scipio, presidente en WHILL Europe B.V.<br />
                        Tian Ye, presidente en China Co., Ltd.<br />
                        Chisato Nakamura, auditor a tiempo completo<br />
                        Ken Hirano, auditor externo<br />
                        Masahiro Yamasawa, auditor externo
					</td>
				</tr>
				<tr>
					<th>Número de empleados</th>
					<td>Más de 200 empleados (base consolidada) (abril de 2020)</td>
				</tr>
				<tr>
					<th>Historia</th>
					<td>
                        2012&nbsp;&nbsp;&nbsp;Fundación<br />
                        2013&nbsp;&nbsp;&nbsp;Constitución en los EE. UU.<br />
                        2014&nbsp;&nbsp;&nbsp;Lanzamiento del Modelo A de WHILL<br />
                        2017&nbsp;&nbsp;&nbsp;Lanzamiento del Modelo C de WHILL<br />
                        2018&nbsp;&nbsp;&nbsp;Constitución de WHILL Europe (Amsterdam)<br />
                        2018&nbsp;&nbsp;&nbsp;Fusión con Scootaround, Inc.<br />
                        2019&nbsp;&nbsp;&nbsp;Anuncio del concepto MaaS y del sistema de conducción autónoma<br />
                        2019&nbsp;&nbsp;&nbsp;Creación de WHILL China (Suzhou)<br />
					</td>
				</tr>
				<tr>
					<th>Ubicación de las oficinas</th>
					<td>
						<div class="address">
							<h4 class="address-name">Sede en Japón</h4>
							<p><a href="https://goo.gl/maps/1N2CcfhJ7YAhPodf7" rel="noopener" target="_blank">Harbor Premium Building 2F, 2-1-11 Higashi-Shinagawa, Shinagawa-ku, Tokyo, 140-0002, Japón</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Oficina en Kyoto, Japón</h4>
							<p><a href="https://goo.gl/maps/8QwXJBkEApACiY4X9" rel="noopener" target="_blank">Kyoto Research Park Building #6 Room 418, 93 Chudoji Awata-cho, Shimogyo-ku, Kyoto, 600-8815, Japón</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Oficina en Estados Unidos</h4>
							<p><a href="https://goo.gl/maps/XmgF62nuZC29CkhN6" rel="noopener" target="_blank">951 Mariners Island Blvd., Suite 300, San Mateo, CA 94404</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Oficina en Canadá</h4>
							<p><a href="https://goo.gl/maps/PW14shStUC1LJymj8" rel="noopener" target="_blank">1345 Waverley St #302, Winnipeg, MB R3T 5Y7, Canada</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Oficina en Europa</h4>
							<p><a href="https://goo.gl/maps/DpizRCDjMfiS4VpBA" rel="noopener" target="_blank">Arena Boulevard 61, 1101 DL Amsterdam, the Netherlands</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Oficina en China</h4>
							<p><a href="https://goo.gl/maps/t5BEHwV7Ny9NXS5h8" rel="noopener" target="_blank">Room 902, Building 1, Yangcheng Lake International Science and<br />Technology Entrepreneurship Park, Xiangcheng Dinstrict, Suzhou, Jiangsu Province, China</a></p>
						</div>

						<div class="address">
							<h4 class="address-name">Oficina en Taiwán</h4>
							<p><a href="https://goo.gl/maps/3EHHhLpens5vyarV7" rel="noopener" target="_blank">18F-2, No. 32, Gaotie 2nd Rd., Zhubei City, Hsinchu County 302, Taiwan (R.O.C.)</a></p>
						</div>

					</td>
				</tr>
			</table>
		</section>


	</div>
</div>

