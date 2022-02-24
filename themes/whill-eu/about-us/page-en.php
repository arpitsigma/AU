<div class="top-about-us">
    <div class="container-wrapper">

        <section class="about-us-mission">
            <h2 class="heading-en color-blue text-center">Our Mission</h2>
            <h3 class="heading-jp text-center">Delivering Fun & Innovative<br />Mobility for All</h3>

            <div class='mission-description'>
                WHILL was created with the goal of building a platform for short- distance mobility. Providing people with access to an innovative and well-designed personal mobility solution that can be used comfortability whenever needed. This solution creates a seamless connection between existing transportation infrastructure and large facilities. Introducing a new style of short-distance travel, WHILL is the last piece of transportation that no other means of transportation can provide.
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
            <h2 class="heading-jp color-blue text-center">Company Profile</h2>

            <table class="about-us-tbl">
                <tr>
                    <th>Corporate Name</th>
                    <td>WHILL</td>
                </tr>
                <tr>
                    <th>Established</th>
                    <td>May 2012</td>
                </tr>
                <tr>
                    <th>Business</th>
                    <td>1. Design and sales of personal mobility products<br />
                        2. Provider of transportation services using personal mobility products. (MaaS)
                    </td>
                </tr>
                <tr>
                    <th>Management</th>
                    <td>
                        Satoshi Sugie, Board Director, CEO<br />
                        Junpei Naito, Board Director, CDO<br />
                        Muneaki Fukuoka, Board Director, CTO<br />
                        Kenji Goho, Board Director, CFO/COO<br />
                        Kerry Renaud, Board Director / President at WHILL US / CEO at Scootaround Inc.<br />
                        David Milstein, Outside Director<br />
                        Shinji Oshige, Outside Director<br />
                        Shinzo Takano, Outside Director<br />
                        Mike Scipio, President at WHILL Europe B.V.<br />
                        Tian Ye, President at China Co.,Ltd.<br />
                        Chisato Nakamura, Full-Time Auditor<br />
                        Ken Hirano, External Auditor<br />
                        Masahiro Yamasawa, External Auditor
                    </td>
                </tr>
                <tr>
                    <th>Number of Employees</th>
                    <td>200+ employees (consolidated basis) (as of August 2020)</td>
                </tr>
                <tr>
                    <th>History</th>
                    <td>
                        2012&nbsp;&nbsp;&nbsp;Founded<br />
                        2013&nbsp;&nbsp;&nbsp;Incorporated in the U.S.A<br />
                        2014&nbsp;&nbsp;&nbsp;WHILL Model A launch<br />
                        2017&nbsp;&nbsp;&nbsp;WHILL Model C launch<br />
                        2018&nbsp;&nbsp;&nbsp;Established WHILL Europe (Amsterdam)<br />
                        2018&nbsp;&nbsp;&nbsp;Merger with Scootaround, Inc.<br />
                        2019&nbsp;&nbsp;&nbsp;Announced MaaS concept and autonomous driving system<br />
                        2019&nbsp;&nbsp;&nbsp;Established WHILL China (Suzhou)<br />
                        2020&nbsp;&nbsp;&nbsp;Implemented autonomous mobility service for commercial use
                    </td>
                </tr>
                <tr>
                    <th>Office Locations</th>
                    <td>
                        <div class="address">
                            <h4 class="address-name">Japan Headquarters</h4>
                            <p><a href="https://goo.gl/maps/1N2CcfhJ7YAhPodf7" rel="noopener" target="_blank">Harbor Premium Building 2F, 2-1-11 Higashi-Shinagawa, Shinagawa-ku, Tokyo, 140-0002, Japan</a></p>
                        </div>

                        <div class="address">
                            <h4 class="address-name">Kyoto, Japan Office</h4>
                            <p><a href="https://goo.gl/maps/8QwXJBkEApACiY4X9" rel="noopener" target="_blank">Kyoto Research Park Building #6 Room 418, 93 Chudoji Awata-cho, Shimogyo-ku, Kyoto, 600-8815, Japan</a></p>
                        </div>

                        <div class="address">
                            <h4 class="address-name">United States Office</h4>
                            <p><a href="https://goo.gl/maps/XmgF62nuZC29CkhN6" rel="noopener" target="_blank">951 Mariners Island Blvd., Suite 300, San Mateo, CA 94404</a></p>
                        </div>

                        <div class="address">
                            <h4 class="address-name">Canada Office</h4>
                            <p><a href="https://goo.gl/maps/PW14shStUC1LJymj8" rel="noopener" target="_blank">1345 Waverley St #302, Winnipeg, MB R3T 5Y7, Canada</a></p>
                        </div>

                        <div class="address">
                            <h4 class="address-name">Europe Office</h4>
                            <p><a href="https://goo.gl/maps/DpizRCDjMfiS4VpBA" rel="noopener" target="_blank">Arena Boulevard 61, 1101 DL Amsterdam, the Netherlands</a></p>
                        </div>

                        <div class="address">
                            <h4 class="address-name">China Office</h4>
                            <p><a href="https://goo.gl/maps/t5BEHwV7Ny9NXS5h8" rel="noopener" target="_blank">Room 902, Building 1, Yangcheng Lake International Science and<br />Technology Entrepreneurship Park, Xiangcheng Dinstrict, Suzhou, Jiangsu Province, China</a></p>
                        </div>

                        <div class="address">
                            <h4 class="address-name">Taiwan Office</h4>
                            <p><a href="https://goo.gl/maps/3EHHhLpens5vyarV7" rel="noopener" target="_blank">18F-2, No. 32, Gaotie 2nd Rd., Zhubei City, Hsinchu County 302, Taiwan (R.O.C.)</a></p>
                        </div>

                    </td>
                </tr>
            </table>
        </section>


    </div>
</div>

