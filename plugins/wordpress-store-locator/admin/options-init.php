<?php

    global $wpdb;

    if ( ! class_exists( 'weLaunch' ) && ! class_exists( 'Redux' ) ) {
        return;
    }

    if( class_exists( 'weLaunch' ) ) {
        $framework = new weLaunch();
    } else {
        $framework = new Redux();
    }

    $weekdays = array(
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    );

    // Get Store categories
    $sql = "SELECT *
    FROM " . $wpdb->prefix . "term_relationships
    LEFT JOIN " . $wpdb->prefix . "term_taxonomy
       ON (" . $wpdb->prefix . "term_relationships.term_taxonomy_id = " . $wpdb->prefix . "term_taxonomy.term_taxonomy_id)
    LEFT JOIN " . $wpdb->prefix . "terms on " . $wpdb->prefix . "term_taxonomy.term_taxonomy_id = " . $wpdb->prefix . "terms.term_id
    WHERE " . $wpdb->prefix . "term_taxonomy.taxonomy = 'store_category'
    GROUP BY " . $wpdb->prefix . "term_taxonomy.term_id";

    $store_categories = $wpdb->get_results($sql);
    $temp = array('' => 'None');
    foreach ($store_categories as $store_category) {
        $temp[$store_category->term_id] = $store_category->name;
    }
    $store_categories = $temp;

    // This is your option name where all the Redux data is stored.
    $opt_name = "wordpress_store_locator_options";

    $args = array(
        'opt_name' => 'wordpress_store_locator_options',
        'use_cdn' => TRUE,
        'dev_mode' => FALSE,
        'display_name' => 'WordPress Store Locator',
        'display_version' => '2.0.9',
        'page_title' => 'WordPress Store Locator',
        'update_notice' => TRUE,
        'intro_text' => '',
        'footer_text' => '&copy; '.date('Y').' weLaunch',
        'admin_bar' => TRUE,
        'menu_type' => 'submenu',
        'menu_title' => 'Settings',
        'allow_sub_menu' => TRUE,
        'page_parent' => 'edit.php?post_type=stores',
        'page_parent_post_type' => 'stores',
        'customizer' => FALSE,
        'default_mark' => '*',
        'hints' => array(
            'icon_position' => 'right',
            'icon_color' => 'lightgray',
            'icon_size' => 'normal',
            'tip_style' => array(
                'color' => 'light',
            ),
            'tip_position' => array(
                'my' => 'top left',
                'at' => 'bottom right',
            ),
            'tip_effect' => array(
                'show' => array(
                    'duration' => '500',
                    'event' => 'mouseover',
                ),
                'hide' => array(
                    'duration' => '500',
                    'event' => 'mouseleave unfocus',
                ),
            ),
        ),
        'output' => TRUE,
        'output_tag' => TRUE,
        'settings_api' => TRUE,
        'cdn_check_time' => '1440',
        'compiler' => TRUE,
        'page_permissions' => 'manage_options',
        'save_defaults' => TRUE,
        'show_import_export' => TRUE,
        'database' => 'options',
        'transient_time' => '3600',
        'network_sites' => TRUE,
    );

    global $weLaunchLicenses;
    if( (isset($weLaunchLicenses['wordpress-store-locator']) && !empty($weLaunchLicenses['wordpress-store-locator'])) ) {
        $args['display_name'] = '<span class="dashicons dashicons-yes-alt" style="color: #9CCC65 !important;"></span> ' . $args['display_name'];
    } else {
        $args['display_name'] = '<span class="dashicons dashicons-dismiss" style="color: #EF5350 !important;"></span> ' . $args['display_name'];
    }

    $framework::setArgs( $opt_name, $args );

    /*
     * ---> END ARGUMENTS
     */

    /*
     * ---> START HELP TABS
     */


    $framework::setSection( $opt_name, array(
        'title'  => __( 'Store Locator', 'wordpress-store-locator' ),
        'id'     => 'general',
        'desc'   => __( 'Need support? Please use the comment function on codecanyon.', 'wordpress-store-locator' ),
        'icon'   => 'el el-home',
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'General', 'wordpress-store-locator' ),
        'desc'       => __( 'To get auto updates please <a href="' . admin_url('tools.php?page=welaunch-framework') . '">register your License here</a>.', 'wordpress-store-locator' ),
        'id'         => 'general-settings',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'enable',
                'type'     => 'checkbox',
                'title'    => __( 'Enable', 'wordpress-store-locator' ),
                'subtitle' => __( 'Enable store locator.', 'wordpress-store-locator' ),
                'default'  => '1',
            ),
            array(
                'id'       => 'apiKey',
                'type'     => 'text',
                'title'    => __( 'Google Api Key', 'wordpress-store-locator' ),
                'subtitle' => __( 'No key? <a href="https://console.developers.google.com/flows/enableapi?apiid=maps_backend&keyType=CLIENT_SIDE&reusekey=true" target="_blank">Get it now!</a>', 'wordpress-store-locator' ),
            ),
            array(
                'id'       => 'serverApiKey',
                'type'     => 'text',
                'title'    => __( 'Google Api Key (Server Side)', 'wordpress-store-locator' ),
                'subtitle' => __( 'This will be used to fetch Lat / Lng when you import stores. It should not be your public key and have no http heder restrictions!', 'wordpress-store-locator' ),
            ),
            array(
                'id'       => 'buttonModalTitle',
                'type'     => 'text',
                'title'    => __('Store locator Title', 'wordpress-store-locator'),
                'subtitle' => __('The title of the Store locator', 'wordpress-store-locator'),
                'default'  => 'Find in Store',
            ),
            array(
                'id'       => 'excel2007',
                'type'     => 'checkbox',
                'title'    => __( 'Use Excel 2007', 'wordpress-store-locator' ),
                'subtitle' => __( 'If you can not work with xlsx (Excel 2007 and higher) files, check this. You then can work with normal .xls files.', 'wordpress-store-locator' ),
                'default'  => '0',
            ),
            array(
                'id'   => 'importer',
                'type' => 'info',
                'desc' => __('<div style="text-align:center;">
                    <p>To import stores use the template you get when clicking on "Get Sample Import File" button below. If you want to fetch lat / lng automatically make sure you set a server side API key above.</p>
                    <a href="' . get_admin_url() . 'edit.php?post_type=stores&page=wordpress_store_locator_options_options&export-stores" class="button button-success">Export all Stores</a>
                    <a href="' . get_admin_url() . 'admin.php?page=wordpress-store-locator-importer" class="button button-primary">Import Stores</a>  
                    <a href="' . get_admin_url() . 'edit.php?post_type=stores&page=wordpress_store_locator_options_options&get-import-file" class="button button-primary">Get Sample Import File</a>
                    <a id="delete-stores" href="' . get_admin_url() . 'edit.php?post_type=stores&page=wordpress_store_locator_options_options&delete-stores" class="button button-danger">Delete all Stores</a> 
                    </div>', 'wordpress-store-locator')
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Layout', 'wordpress-store-locator' ),
        // 'desc'       => __( '', 'wordpress-store-locator' ),
        'id'         => 'layout-settings',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'layout',
                'type'     => 'image_select',
                'title'    => __( 'Select Layout', 'wordpress-store-locator' ),
                'subtitle'    => __( 'Select a general layout. Under advanced settings you can cusotmize the layout on an advanced level.', 'wordpress-store-locator' ),
                'options'  => array(
                    '1'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/1.jpg'),
                    '2'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/2.jpg'),
                    '3'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/3.jpg'),
                    '4'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/4.jpg'),
                    '5'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/5.jpg'),
                    '6'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/6.jpg'),
                    '7'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/7.jpg'),
                    '8'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/8.jpg'),
                    '9'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/9.jpg'),
                    '10'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/10.jpg'),
                    '11'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/11.jpg'),
                    '12'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/12.jpg'),
                    '13'      => array('img'   => plugin_dir_url( __FILE__ ) . 'img/13.jpg'),
                ),
                'default' => '1',
            ),

            array(
                'id'       => 'advancedLayout',
                'type'     => 'checkbox',
                'title'    => __( 'Advanced Layout', 'wordpress-store-locator' ),
                'subtitle' => __( 'Check this to customize the layout yourself.', 'wordpress-store-locator' ),
                'default'  => '0',
            ),
            array(
                'id'       => 'searchBoxColumns',
                'type'     => 'spinner',
                'title'    => __( 'Search Box Width (in Columns)', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '12',
                'default'  => '6',
                'required' => array('advancedLayout','equals','1'),
            ),
            array(
                'id'       => 'resultListColumns',
                'type'     => 'spinner',
                'title'    => __( 'Result List Width (in Columns)', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '12',
                'default'  => '3',
                'required' => array('advancedLayout','equals','1'),
            ),
            array(
                'id'       => 'mapColumns',
                'type'     => 'spinner',
                'title'    => __( 'Map Width (in Columns)', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '12',
                'default'  => '9',
                'required' => array('advancedLayout','equals','1'),
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Map', 'wordpress-store-locator' ),
        'desc'       => __( 'Default Map Settings', 'wordpress-store-locator' ),
        'id'         => 'map',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'mapEnabled',
                'type'     => 'switch',
                'title'    => __( 'Enable Map', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'mapAutoHeight',
                'type'     => 'checkbox',
                'title'    => __( 'Map Auto Height', 'wordpress-store-locator' ),
                'subtitle'    => __( 'Will set the map height automatically based on sidebar (search + result list) height.', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'mapHeight',
                'type'     => 'spinner',
                'title'    => __( 'Map Height', 'wordpress-store-locator' ),
                'subtitle' => __( 'Set a map height.', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '99999999',
                'default' => '400',
                'required' => array('mapAutoHeight','equals','0'),
            ),
            array(
                'id'       => 'mapFullHeight',
                'type'     => 'checkbox',
                'title'    => __( 'Full Height Map', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDistanceUnit',
                'type'     => 'select',
                'title'    => __( 'Distance Unit', 'wordpress-store-locator' ),
                'subtitle' => __( 'Choose the Distance Unit.', 'wordpress-store-locator' ),
                'options'  => array(
                    'km' => __('Kilometer (KM)', 'wordpress-store-locator'),
                    'mi' => __('Miles', 'wordpress-store-locator'),
                ),
                'default' => 'km',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDefaultLat',
                'type'     => 'text',
                'title'    => __( 'Default Latitude', 'wordpress-store-locator' ),
                'default'  => '48.8620722',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDefaultLng',
                'type'     => 'text',
                'title'    => __( 'Default Longitude', 'wordpress-store-locator' ),
                'default'  => '41.352047',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDefaultType',
                'type'     => 'select',
                'title'    => __( 'Default Map Type', 'wordpress-store-locator' ),
                'subtitle' => __( 'Choose the default Map Type.', 'wordpress-store-locator' ),
                'options'  => array(
                    'ROADMAP' => __('Roadmap', 'wordpress-store-locator'),
                    'SATELLITE' => __('Satellite', 'wordpress-store-locator'),
                    'HYBRID' => __('Hybrid', 'wordpress-store-locator'),
                    'TERRAIN' => __('Terrain', 'wordpress-store-locator'),
                ),
                'default' => 'ROADMAP',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDefaultZoom',
                'type'     => 'spinner',
                'title'    => __( 'Default Map Zoom', 'wordpress-store-locator' ),
                'subtitle' => __( 'Choose the default Zoom Level.', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '16',
                'default' => '10',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapRadiusSteps',
                'type'     => 'text',
                'title'    => __( 'Radius Select Steps', 'wordpress-store-locator' ),
                'subtitle' => __( 'Split the values by comma.', 'wordpress-store-locator' ),
                'default' => '5,10,25,50,100',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapRadius',
                'type'     => 'spinner',
                'title'    => __( 'Default Radius', 'wordpress-store-locator' ),
                'subtitle' => __( 'Choose the default Radius. The default value must be available in the radius steps above.', 'wordpress-store-locator' ),
                'default' => '25',
                'min'      => '1',
                'step'     => '5',
                'max'      => '9999',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDrawRadiusCircle',
                'type'     => 'checkbox',
                'title'    => __( 'Draw Radius Circle', 'wordpress-store-locator' ),
                'subtitle'    => __( 'Disable this to disable the automatic zoom level adjustments based on radius.', 'wordpress-store-locator' ),
                'default'  => 1,
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapRadiusToZoom',
                'type'     => 'checkbox',
                'title'    => __( 'Adjust zoom level to Radius automatically', 'wordpress-store-locator' ),
                'default'  => 1,
                'required' => array('mapDrawRadiusCircle','equals','0'),
            ),
            array(
                'id'       => 'mapExtendRadius',
                'type'     => 'checkbox',
                'title'    => __( 'Extend map radius.', 'wordpress-store-locator' ),
                'subtitle'    => __( 'Automatically extend the search radius if no stores were found.', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapPanToOnHover',
                'type'     => 'checkbox',
                'title'    => __( 'Pan to Marker on Mouse Hover.', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDefaultIcon',
                'type'     => 'text',
                'title'    => __( 'Default Store Icon', 'wordpress-store-locator' ),
                'default'  => 'https://maps.google.com/mapfiles/marker_grey.png',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDefaultIconHover',
                'type'     => 'text',
                'title'    => __( 'Default Store Icon on Hover', 'wordpress-store-locator' ),
                'default'  => 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapDefaultUserIcon',
                'type'     => 'text',
                'title'    => __( 'Default User Icon', 'wordpress-store-locator' ),
                'default'  => 'https://welaunch.io/plugins/wp-content/uploads/2016/04/home-2.png',
                'required' => array('mapEnabled','equals','1'),
            ),
            array(
                'id'       => 'mapStyling',
                'type'     => 'ace_editor',
                'mode'     => 'json',
                'title'    => __( 'Map Styling (JSON format)', 'wordpress-store-locator' ),
                'subtitle' => __( 'You can use <a href="https://mapstyle.withgoogle.com" target="_blank">https://mapstyle.withgoogle.com</a> OR <a href="https://snazzymaps.com" target="_blank">https://snazzymaps.com</a> for that.'),
                'default'  => '',
                'required' => array('mapEnabled','equals','1'),
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Infowindow ', 'wordpress-store-locator' ),
        'desc'       => __( 'Maps Infowindow settings', 'wordpress-store-locator' ),
        'id'         => 'infowindow',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'infowindowEnabled',
                'type'     => 'switch',
                'title'    => __( 'Enable Infowindow', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'infowindowCheckClosed',
                'type'     => 'checkbox',
                'title'    => __( 'Check if Infowindow is closed', 'wordpress-store-locator' ),
                'subtitle'    => __( 'This prevents infowindow twiches when hovering on a map icon again.', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('infowindowEnabled','equals','1'),
            ),
            array(
                'id'       => 'infowindowOpenOnMouseover',
                'type'     => 'checkbox',
                'title'    => __( 'Open Infowindow on Mouseover', 'wordpress-store-locator' ),
                'subtitle'    => __( 'Open the infowindow when a user hover over the marker.', 'wordpress-store-locator' ),
                'default'  => 1,
                'required' => array('infowindowEnabled','equals','1'),
            ),
            array(
                'id'       => 'infowindowLinkAction',
                'type'     => 'select',
                'title'    => __( 'Store Link Action', 'wordpress-store-locator' ),
                'subtitle' => __( 'What happens when store name is clicked in infowindow.', 'wordpress-store-locator' ),
                'options'  => array( 
                    'storepage' => __('Single Store Page', 'wordpress-store-locator'),
                    'web' => __('Website', 'wordpress-store-locator'),
                    'tel' => __('Telephone', 'wordpress-store-locator'),
                    'email' => __('Email', 'wordpress-store-locator'),
                    'none' => __('None', 'wordpress-store-locator'),
                ),
                'default'  => 'storepage',
                'required' => array('infowindowEnabled','equals','1'),
            ),
            array(
                'id'       => 'infowindowLinkActionNewTab',
                'type'     => 'checkbox',
                'title'    => __( 'Open Store Link Action in new Tab', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'infowwindowWidth',
                'type'     => 'spinner',
                'title'    => __( 'Width (in pixel)', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '999',
                'default'  => '350',
                'required' => array('infowindowEnabled','equals','1'),
            ),
            array(
                'id'       => 'infowindowDetailsColumns',
                'type'     => 'spinner',
                'title'    => __( 'Details Width (in Columns)', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '12',
                'default'  => '12',
                'required' => array('infowindowEnabled','equals','1'),
            ),
            array(
                'id'       => 'infowindowImageColumns',
                'type'     => 'spinner',
                'title'    => __( 'Image Width (in Columns)', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '12',
                'default'  => '6',
                'required' => array('infowindowEnabled','equals','1'),
            ),
            array(
                'id'       => 'infowindowOpeningHoursColumns',
                'type'     => 'spinner',
                'title'    => __( 'Opening Hours Width (in Columns)', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '12',
                'default'  => '6',
                'required' => array('infowindowEnabled','equals','1'),
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Result List', 'wordpress-store-locator' ),
        'desc'       => __( 'Default Map Settings', 'wordpress-store-locator' ),
        'id'         => 'resultList',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'resultListEnabled',
                'type'     => 'switch',
                'title'    => __( 'Enable Result List', 'wordpress-store-locator' ),
                'default'  => 1,
            ),


            array(
                'id'       => 'resultListItemColumns',
                'type'     => 'spinner',
                'title'    => __( 'Result list Item Columns', 'wordpress-store-locator' ),
                'subtitle'    => __( 'How many stores per row.', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '12',
                'default'  => '12',
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListItemLayout',
                'type'     => 'select',
                'title'    => __( 'Result list item layout', 'wordpress-store-locator' ),
                'subtitle' => __( 'Choose how a result item should be shown.', 'wordpress-store-locator' ),
                'options'  => array( 
                    'oneColumn' => __('One Column', 'wordpress-store-locator'),
                    'threeColumns' => __('Three Columns', 'wordpress-store-locator'),
                ),
                'default'  => 'oneColumn',
                'required' => array('resultListEnabled','equals','1'),
            ),

            array(
                'id'       => 'resultListOrder',
                'type'     => 'select',
                'title'    => __( 'Sort Results by', 'wordpress-store-locator' ),
                'options'  => array(
                    'distance' => __('Distance', 'wordpress-store-locator'),
                    'post_title' => __('Alphabetically', 'wordpress-store-locator'),
                    'premium' => __('Premium Stores First', 'wordpress-store-locator'),
                    'ranking' => __('Store Ranking', 'wordpress-store-locator'),
                    'rand()' => __('Random', 'wordpress-store-locator'),
                ),
                'default' => 'distance',
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListOrderAllStores',
                'type'     => 'select',
                'title'    => __( 'All Stores Sort Results by', 'wordpress-store-locator' ),
                'options'  => array(
                    'distance' => __('Distance', 'wordpress-store-locator'),
                    'post_title' => __('Alphabetically', 'wordpress-store-locator'),
                    'premium' => __('Premium Stores First', 'wordpress-store-locator'),
                    'ranking' => __('Store Ranking', 'wordpress-store-locator'),
                    'rand()' => __('Random', 'wordpress-store-locator'),
                ),
                'default' => 'distance',
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListAllHideDistance',
                'type'     => 'checkbox',
                'title'    => __( 'All stores Hide Distance', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListShowTitle',
                'type'     => 'checkbox',
                'title'    => __( 'Show the title "Results"', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListAutoHeight',
                'type'     => 'checkbox',
                'title'    => __( 'Result list Auto Height', 'wordpress-store-locator' ),
                'subtitle'    => __( 'Will set the result list same height as the map is.', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'resultListHover',
                'type'     => 'checkbox',
                'title'    => __( 'Enable Result List Hover', 'wordpress-store-locator' ),
                'default'  => 1,
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListNoResultsText',
                'type'     => 'text',
                'title'    => __('No Results Text', 'wordpress-store-locator'),
                'default'  => 'No Stores found ... try again!',
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListMax',
                'type'     => 'spinner',
                'title'    => __( 'Maximum Results', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '99999',
                'default'  => '100',
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListLinkAction',
                'type'     => 'select',
                'title'    => __( 'Store Link Action', 'wordpress-store-locator' ),
                'subtitle' => __( 'What happens when store name is clicked.', 'wordpress-store-locator' ),
                'options'  => array( 
                    'storepage' => __('Single Store Page', 'wordpress-store-locator'),
                    'web' => __('Website', 'wordpress-store-locator'),
                    'tel' => __('Telephone', 'wordpress-store-locator'),
                    'email' => __('Email', 'wordpress-store-locator'),
                    'none' => __('None', 'wordpress-store-locator'),
                ),
                'default'  => 'storepage',
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListLinkActionNewTab',
                'type'     => 'checkbox',
                'title'    => __( 'Open Store Link Action in new Tab', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListIconEnabled',
                'type'     => 'checkbox',
                'title'    => __( 'Show Result List Icon', 'wordpress-store-locator' ),
                'default'  => 0,
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListIcon',
                'type'     => 'text',
                'title'    =>  __('Result List Icon', 'wordpress-store-locator'),
                'required' => array('resultListIconEnabled','equals','1'),
                'default'  => 'fas fa-map-marker',
            ),
            array(
                'id'       => 'resultListIconSize',
                'type'     => 'select',
                'title'    =>  __('Result List Icon Size', 'wordpress-store-locator'),
                'options'  => array(
                    '' => 'Normal',
                    'fa-lg' => 'Large',
                    'fa-2x' => '2x',
                    'fa-3x' => '3x',
                    'fa-4x' => '4x',
                    'fa-5x' => '5x',
                    ), 
                'default' => 'fa-3x',
                'required' => array('resultListIconEnabled','equals','1'),
            ),
            array(
                'id'     =>'resultListIconColor',
                'type'  => 'color',
                'title' => __('Result List Icon Color', 'wordpress-store-locator'), 
                'validate' => 'color',
                'default' => '#000000',
                'required' => array('resultListIconEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListPremiumIconEnabled',
                'type'     => 'checkbox',
                'title'    => __( 'Show Result List Premium Icon', 'wordpress-store-locator' ),
                'default'  => 1,
                'required' => array('resultListEnabled','equals','1'),
            ),
            array(
                'id'       => 'resultListPremiumIcon',
                'type'     => 'text',
                'title'    =>  __('Result List Premium Icon', 'wordpress-store-locator'),
                'required' => array('resultListPremiumIconEnabled','equals','1'),
                'default'  => 'fas fa-star'
            ),
            array(
                'id'       => 'resultListPremiumIconSize',
                'type'     => 'select',
                'title'    =>  __('Result List Premium Icon Size', 'wordpress-store-locator'),
                'options'  => array(
                    '' => 'Normal',
                    'fa-lg' => 'Large',
                    'fa-2x' => '2x',
                    'fa-3x' => '3x',
                    'fa-4x' => '4x',
                    'fa-5x' => '5x',
                    ), 
                'default' => 'fa-3x',
                'required' => array('resultListPremiumIconEnabled','equals','1'),
            ),
            array(
                'id'     =>'resultListPremiumIconColor',
                'type'  => 'color',
                'title' => __('Result List Premium Icon Color', 'wordpress-store-locator'), 
                'validate' => 'color',
                'default' => '#ffff00',
                'required' => array('resultListPremiumIconEnabled','equals','1'),
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Search Box', 'wordpress-store-locator' ),
        'desc'       => __( 'Search Box Settings', 'wordpress-store-locator' ),
        'id'         => 'searchBox',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'searchLayout',
                'type'     => 'select',
                'title'    => __( 'Search Layout', 'wordpress-store-locator' ),
                'subtitle' => __( 'Choose how a Search box layout.', 'wordpress-store-locator' ),
                'options'  => array( 
                    'oneColumn' => __('One Column', 'wordpress-store-locator'),
                    // 'twoColumns' => __('Two Columns', 'wordpress-store-locator'),
                ),
                'default'  => 'oneColumn',
            ),
            array(
                'id'      => 'searchBoxFields',
                'type'    => 'sorter',
                'title'   => 'Search Box Fields.',
                'options' => array(
                    'enabled'  => array(
                        'search_title' => __('Title & Active Filter', 'wordpress-store-locator'),
                        // 'active_filter' => __('Active Filter', 'wordpress-store-locator'),
                        'address_field' => __('Address Field', 'wordpress-store-locator'),
                        'my_position' => __('My Position', 'wordpress-store-locator'),
                        'all_stores' => __('Get All Stores', 'wordpress-store-locator'),
                        'store_name_search' => __('Store Name Search', 'wordpress-store-locator'),
                        'search_button' => __('Search Button', 'wordpress-store-locator'),
                        'filter' => __('Filters', 'wordpress-store-locator'),

                    ),
                    'disabled' => array(

                    )
                ),
            ),

            array(
                'id'       => 'searchBoxEmptyAddressByDefault',
                'type'     => 'checkbox',
                'title'    => __( 'Empty address field by default', 'wordpress-store-locator' ),
                'subtitle' => __( 'Enable to leave the address field empty by default.', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'searchBoxAutolocate',
                'type'     => 'checkbox',
                'title'    => __( 'Enable Auto Geolocation', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'searchBoxAutolocateIP',
                'type'     => 'checkbox',
                'title'    => __( 'Enable IP Geolocation Fallback', 'wordpress-store-locator' ),
                'default'  => 1,
                'required' => array('searchBoxAutolocate','equals','1'),
            ),
            array(
                'id'       => 'searchBoxSaveAutolocate',
                'type'     => 'checkbox',
                'title'    => __( 'Save Auto Geolocation in Cookie?', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'searchBoxAutocomplete',
                'type'     => 'checkbox',
                'title'    => __( 'Enable Autocomplete', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'autocompleteType',
                'type'     => 'select',
                'title'    => __( 'Restrict Types', 'wordpress-store-locator' ),
                'subtitle'     => __('You may restrict results from a Place Autocomplete request to be of a certain type. If for example you want to hide the street from autocomplete search, you have to select the "Regions". <a href="https://developers.google.com/places/supported_types?hl=en" target="_blank">Learn More</a>!'),
                'options'  => array(
                    'geocode' => __('Geocode', 'wordpress-store-locator'),
                    '(regions)' => __('Regions', 'wordpress-store-locator'),
                    '(cities)' => __('Cities', 'wordpress-store-locator'),
                    'address' => __('Address', 'wordpress-store-locator'),
                    'establishment' => __('Establishment', 'wordpress-store-locator'),
                ),
                'default' => 'geocode',
                'required' => array('searchBoxAutocomplete','equals','1'),
            ),
            array(
                'id'       => 'autocompleteCountryRestrict',
                'type'     => 'text',
                'title'    => __('Restrict Autocomplete to a country', 'wordpress-store-locator'),
                'subtitle'     => '2 character ISO-Codes only! You can insert for example US to limit the autocomplete to only search in United States. For multiple use comma separator like US,DE',
                'default'  => '',
                'required' => array('searchBoxAutocomplete','equals','1'),
            ),

            array(
                'id'       => 'searchBoxAddressText',
                'type'     => 'text',
                'title'    => __( 'Address Field Name', 'wordpress-store-locator' ),
                'subtitle' => __( 'Address Field Name label text.', 'wordpress-store-locator'),
                'default'  =>__('Address', 'wordpress-store-locator' ),
            ),
            array(
                'id'       => 'searchBoxAddressPlaceholder',
                'type'     => 'text',
                'title'    => __( 'Address Field Name Placeholder', 'wordpress-store-locator' ),
                'subtitle' => __( 'Address Field Name placeholder text.', 'wordpress-store-locator'),
                'default'  => __('Enter your address', 'wordpress-store-locator'),
            ),

            array(
                'id'       => 'searchBoxStoreNameSearchText',
                'type'     => 'text',
                'title'    => __( 'Search by Store Name Text', 'wordpress-store-locator' ),
                'subtitle' => __( 'Search by Store Name label text.', 'wordpress-store-locator'),
                'default'  =>__('Store name', 'wordpress-store-locator' ),
            ),
            array(
                'id'       => 'searchBoxStoreNameSearchPlaceholder',
                'type'     => 'text',
                'title'    => __( 'Search by Store Name Placeholder', 'wordpress-store-locator' ),
                'subtitle' => __( 'Search by Store Name placeholder text.', 'wordpress-store-locator'),
                'default'  =>__('Ener a Store name', 'wordpress-store-locator' ),
            ),


            array(
                'id'       => 'searchBoxGetMyPositionText',
                'type'     => 'text',
                'title'    => __( 'Get my Position Text', 'wordpress-store-locator' ),
                'subtitle' => __( 'Get my position link text.', 'wordpress-store-locator'),
                'default'  => __('Get my Position', 'wordpress-store-locator' ),
            ),
            array(
                'id'       => 'searchButtonText',
                'type'     => 'text',
                'title'    => __('Button Text', 'wordpress-store-locator'),
                'subtitle' => __('Text for the search button.', 'wordpress-store-locator'),
                'default'  => __('Find in Store', 'wordpress-store-locator' ),
            ),

            array(
                'id'       => 'searchBoxShowShowAllStoresKeepFilter',
                'type'     => 'checkbox',
                'title'    => __( 'Get All Stores Keep Filter', 'wordpress-store-locator' ),
                'subtitle' => __( 'Keep category + filters when clicking on get all stores.', 'wordpress-store-locator'),
                'default'  => 0
            ),

            array(
                'id'       => 'searchBoxShowShowAllStoresText',
                'type'     => 'text',
                'title'    => __( 'Get All Stores Text', 'wordpress-store-locator' ),
                'subtitle' => __( 'Text for the all stores button.', 'wordpress-store-locator'),
                'default'  => __('Show all Stores', 'wordpress-store-locator' ), 
            ),

            array(
                'id'       => 'searchBoxShowShowAllStoresZoom',
                'type'     => 'spinner',
                'title'    => __( 'Get All Stores Zoom Level', 'wordpress-store-locator' ),
                'subtitle' => __( 'Choose the Zoom Level when you want to show all stores.', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '16',
                'default' => '10',
            ),
            array(
                'id'       => 'searchBoxShowShowAllStoresLat',
                'type'     => 'text',
                'title'    => __( 'Get All Stores Latitude', 'wordpress-store-locator' ),
                'default'  => '48.8620722',
            ),
            array(
                'id'       => 'searchBoxShowShowAllStoresLng',
                'type'     => 'text',
                'title'    => __( 'Get All Stores Longitude', 'wordpress-store-locator' ),
                'default'  => '41.352047',
            ),

        )
    ) );


    $framework::setSection( $opt_name, array(
        'title'      => __( 'Filter', 'wordpress-store-locator' ),
        'desc'       => __( 'Default Filtering Settings', 'wordpress-store-locator' ),
        'id'         => 'filter',
        'subsection' => true,
        'fields'     => array(

            array(
                'id'       => 'filterLayout',
                'type'     => 'select',
                'title'    => __( 'Filter layout', 'wordpress-store-locator' ),
                'subtitle' => __( 'Choose how a Search box layout.', 'wordpress-store-locator' ),
                'options'  => array( 
                    'oneColumn' => __('One Column', 'wordpress-store-locator'),
                    'threeColumns' => __('Three Columns', 'wordpress-store-locator'),
                ),
                'default'  => 'oneColumn',
            ),
            array(
                'id'      => 'filterFields',
                'type'    => 'sorter',
                'title'   => 'Filter Fields.',
                'options' => array(
                    'enabled'  => array(
                        'radius_filter' => __('Radius Filter', 'wordpress-store-locator'),
                        'store_categories' => __('Store Categories', 'wordpress-store-locator'),
                        'store_filter' => __('Store filter', 'wordpress-store-locator'),
                    ),
                    'disabled' => array(

                    )
                ),
            ),

            array(
                'id'       => 'searchBoxShowFilterOpen',
                'type'     => 'checkbox',
                'title'    => __( 'Filtering open by default', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'searchBoxDefaultCategory',
                'type'     => 'select',
                'title'    =>  __('Default filter category', 'wordpress-store-locator'),
                'subtitle' =>  __('Set a default filter category', 'wordpress-store-locator'),
                'options'  => $store_categories,
                'default' => '',
            ),
            array(
                'id'       => 'showFilterCategoriesAsImage',
                'type'     => 'checkbox',
                'title'    => __( 'Display Category Filters as Image', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'searchBoxShowRadius',
                'type'     => 'checkbox',
                'title'    => __( 'Show Search Radius', 'wordpress-store-locator' ),
                'subtitle' => __( 'Enable to show search Radius.', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'searchBoxShowFilter',
                'type'     => 'checkbox',
                'title'    => __( 'Show Search Filters', 'wordpress-store-locator' ),
                'subtitle' => __( 'Enable to show search filters.', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'searchBoxCategoriesText',
                'type'     => 'text',
                'title'    => __('Categories text', 'wordpress-store-locator'),
                'subtitle' => __('Text above the Categories filter.', 'wordpress-store-locator'),
                'default'  => __('', 'wordpress-store-locator')
            ),
            array(
                'id'       => 'searchBoxRadiusText',
                'type'     => 'text',
                'title'    => __('Radius text', 'wordpress-store-locator'),
                'subtitle' => __('Text above the radius filter.', 'wordpress-store-locator'),
                'default'  => __('', 'wordpress-store-locator' ),
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Loading', 'wordpress-store-locator' ),
        'desc'       => __( 'Loading Settings', 'wordpress-store-locator' ),
        'id'         => 'loading',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'loadingIcon',
                'type'     => 'text',
                'title'    =>  __('Loading Icon', 'wordpress-store-locator'),
                'default'  => 'fas fa-spinner'
            ),
            array(
                'id'       => 'loadingAnimation',
                'type'     => 'select',
                'title'    =>  __('Loading Animation', 'wordpress-store-locator'),
                'options'  => array(
                    '' => 'None',
                    'fa-spin' => 'Spin',
                    'fa-pules' => 'Pules'
                    ), 
                'default' => 'fa-spin'
            ),
            array(
                'id'       => 'loadingIconSize',
                'type'     => 'select',
                'title'    =>  __('Loading Icon Size', 'wordpress-store-locator'),
                'options'  => array(
                    '' => 'Normal',
                    'fa-lg' => 'Large',
                    'fa-2x' => '2x',
                    'fa-3x' => '3x',
                    'fa-4x' => '4x',
                    'fa-5x' => '5x',
                    ), 
                'default' => 'fa-3x'
            ),
            array(
                'id'     =>'loadingIconColor',
                'type'  => 'color',
                'title' => __('Loading Icon Color', 'wordpress-store-locator'), 
                'validate' => 'color',
                'default' => '#000000'
            ),
            array(
                'id'     =>'loadingOverlayColor',
                'type'  => 'color',
                'title' => __('Overlay Color', 'wordpress-store-locator'), 
                'validate' => 'color',
                'default' => '#FFFFFF'
            ),
            array(
                'id'     =>'loadingOverlayTransparency',
                'type'  => 'text',
                'title' => __('Overlay Transparency', 'wordpress-store-locator'), 
                'subtitle' => __('Enter 0 to 1. Example: 0.8', 'wordpress-store-locator'), 
                'default'  => '0.8',
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Data to Show', 'wordpress-store-locator' ),
        'desc'       => __( 'Data you want to show.', 'wordpress-store-locator' ),
        'id'         => 'fields',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'showName',
                'type'     => 'checkbox',
                'title'    => __( 'Show Name', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showRating',
                'type'     => 'checkbox',
                'title'    => __( 'Show Rating', 'wordpress-store-locator' ),
                'subtitle'    => __( 'This will show average rating in listing (if available). Also will show rating form on single store page.', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
                array(
                    'id'       => 'showRatingLinkToForm',
                    'type'     => 'checkbox',
                    'title'    => __( 'Link Rating Icons to Single Store Rating Form', 'wordpress-store-locator' ),
                    'default'  => 1,
                    'required' => array('showRating','equals','1'),
                ),

            array(
                'id'       => 'showDescription',
                'type'     => 'checkbox',
                'title'    => __( 'Show Description', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
                array(
                    'id'       => 'showDescriptionStripShortcodes',
                    'type'     => 'checkbox',
                    'title'    => __( 'Strip Shortcodes', 'wordpress-store-locator' ),
                    'default'  => 0,
                    'required' => array('showDescription','equals','1'),
                ),
                array(
                    'id'       => 'showDescriptionVisualComposer',
                    'type'     => 'checkbox',
                    'title'    => __( 'Visual Composer Support', 'wordpress-store-locator' ),
                    'default'  => 1,
                    'required' => array('showDescription','equals','1'),
                ),
            array(
                'id'       => 'showStreet',
                'type'     => 'checkbox',
                'title'    => __( 'Show Street', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showZip',
                'type'     => 'checkbox',
                'title'    => __( 'Show ZIP', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showCity',
                'type'     => 'checkbox',
                'title'    => __( 'Show City', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showRegion',
                'type'     => 'checkbox',
                'title'    => __( 'Show Region', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showCountry',
                'type'     => 'checkbox',
                'title'    => __( 'Show Country', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showAddressStyle',
                'type'     => 'select',
                'title'    =>  __('Address Format', 'wordpress-store-locator'),
                'options'  => array(
                    'standard' => 'Standard',
                    'american' => 'American / Australian'
                    ), 
                'default' => 'europe'
            ),
            array(
                'id'       => 'showWebsite',
                'type'     => 'checkbox',
                'title'    => __( 'Show Website', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showWebsiteText',
                'type'     => 'text',
                'title'    => __('Website Text', 'wordpress-store-locator'),
                'default'  => 'Website',
                'required' => array('showWebsite','equals','1'),
            ),
            array(
                'id'       => 'showEmail',
                'type'     => 'checkbox',
                'title'    => __( 'Show Email', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showEmailText',
                'type'     => 'text',
                'title'    => __('Email Text', 'wordpress-store-locator'),
                'default'  => 'Email',
                'required' => array('showEmail','equals','1'),
            ),
            array(
                'id'       => 'showTelephone',
                'type'     => 'checkbox',
                'title'    => __( 'Show Telephone', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showTelephoneText',
                'type'     => 'text',
                'title'    => __('Telephone Text', 'wordpress-store-locator'),
                'default'  => 'Tel.',
                'required' => array('showTelephone','equals','1'),
            ),
            array(
                'id'       => 'showMobile',
                'type'     => 'checkbox',
                'title'    => __( 'Show Mobile Phone', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showMobileText',
                'type'     => 'text',
                'title'    => __('Mobile Text', 'wordpress-store-locator'),
                'default'  => 'Mobile',
                'required' => array('showMobile','equals','1'),
            ),
            array(
                'id'       => 'showFax',
                'type'     => 'checkbox',
                'title'    => __( 'Show Fax', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showFaxText',
                'type'     => 'text',
                'title'    => __('Fax Text', 'wordpress-store-locator'),
                'default'  => 'Fax',
                'required' => array('showFax','equals','1'),
            ),
            array(
                'id'       => 'showDistance',
                'type'     => 'checkbox',
                'title'    => __( 'Show Distance', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showDistanceText',
                'type'     => 'text',
                'title'    => __('Distance Text', 'wordpress-store-locator'),
                'default'  => 'Distance',
                'required' => array('showDistance','equals','1'),
            ),
            array(
                'id'       => 'showStoreCategories',
                'type'     => 'checkbox',
                'title'    => __( 'Show Stores Categories', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showStoreFilter',
                'type'     => 'checkbox',
                'title'    => __( 'Show Stores Filter', 'wordpress-store-locator' ),
                'default'  => 0,
            ),

            array(
                'id'       => 'showContactStore',
                'type'     => 'checkbox',
                'title'    => __( 'Show Contact Store', 'wordpress-store-locator' ),
                'subtitle' => __( 'Contact dealer via a contact form on a new pag.', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showContactStoreText',
                'type'     => 'text',
                'title'    => __('Contact Store Text', 'wordpress-store-locator'),
                'default'  => 'Contact Store',
                'required' => array('showContactStore','equals','1'),
            ),
            array(
                'id'       => 'showContactStorePage',
                'type'     => 'select',
                'title'    => __('Contact Page', 'wordpress-store-locator'),
                'subtitle' => __('Make sure a form is embedded on the site. A tutorial how to create a form can be found here.', 'wordpress-store-locator'),
                'data'     => 'pages',
                'ajax'     => 'true',
                'required' => array('showContactStore','equals','1'),
            ),
            array(
                'id'       => 'showGetDirection',
                'type'     => 'checkbox',
                'title'    => __( 'Show Get Direction', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
                array(
                    'id'       => 'showGetDirectionText',
                    'type'     => 'text',
                    'title'    => __('Get Directions Text', 'wordpress-store-locator'),
                    'default'  => 'Get Directions',
                    'required' => array('showGetDirection','equals','1'),
                ),
                array(
                    'id'       => 'showGetDirectionEmptySource',
                    'type'     => 'checkbox',
                    'title'    => __( 'Leave source address empty in Google Maps.', 'wordpress-store-locator' ),
                    'default'  => 0,
                    'required' => array('showGetDirection','equals','1'),
                ),
            array(
                'id'       => 'showCallNow',
                'type'     => 'checkbox',
                'title'    => __( 'Show Call Now Button', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'showCallNowText',
                'type'     => 'text',
                'title'    => __('Call Now Text', 'wordpress-store-locator'),
                'default'  => 'Call Now',
                'required' => array('showCallNow','equals','1'),
            ),
            array(
                'id'       => 'showVisitWebsite',
                'type'     => 'checkbox',
                'title'    => __( 'Show Visit Website Button', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showVisitWebsiteText',
                'type'     => 'text',
                'title'    => __('Visit Website Text', 'wordpress-store-locator'),
                'default'  => 'Visit Website',
                'required' => array('showVisitWebsite','equals','1'),
            ),
            array(
                'id'       => 'showWriteEmail',
                'type'     => 'checkbox',
                'title'    => __( 'Show Write Email Button', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showWriteEmailText',
                'type'     => 'text',
                'title'    => __('Write Email Text', 'wordpress-store-locator'),
                'default'  => 'Write Email',
                'required' => array('showWriteEmail','equals','1'),
            ),
            array(
                'id'       => 'showShowOnMap',
                'type'     => 'checkbox',
                'title'    => __( 'Show Show on Map Button', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showShowOnMapText',
                'type'     => 'text',
                'title'    => __('Show on Map Text', 'wordpress-store-locator'),
                'default'  => 'Show on Map',
                'required' => array('showShowOnMap','equals','1'),
            ),
            array(
                'id'       => 'showVisitStore',
                'type'     => 'checkbox',
                'title'    => __( 'Show Visit Store Button', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showVisitStoreText',
                'type'     => 'text',
                'title'    => __('Show Visit Store Text', 'wordpress-store-locator'),
                'default'  => 'Visit Store',
                'required' => array('showVisitStore','equals','1'),
            ),
            array(
                'id'       => 'showImage',
                'type'     => 'checkbox',
                'title'    => __( 'Show Image', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'imageDimensions',
                'type'     => 'dimensions',
                'units'    => array('px'),
                'title'    => __('Image Dimensions', 'wordpress-store-locator'),
                'default'  => array(
                    'width'   => '150', 
                    'height'   => '100', 
                ),
                'required' => array('showImage','equals','1'),
            ),
            array(
                'id'       => 'imagePosition',
                'type'     => 'select',
                'title'    => __( 'Image Position', 'wordpress-store-locator' ),
                'options'  => array(
                    'store-locator-image-top' => __('Top', 'wordpress-store-locator'),
                    'store-locator-order-first' => __('Left', 'wordpress-store-locator'),
                    'store-locator-order-last' => __('Right', 'wordpress-store-locator'),
                ),
                'default' => 'store-locator-order-first',
                'required' => array('showImage','equals','1'),
            ),
            array(
                'id'       => 'showCustomFields',
                'type'     => 'multi_text',
                'title'    => esc_html__('Custom Fields', 'wordpress-store-locator'),
                'subtitle' => esc_html__('Create custom fields here.'),
                'default'  => array(),
            ),
            array(
                'id'       => 'showOpeningHours',
                'type'     => 'checkbox',
                'title'    => __( 'Show Opening Hours', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showOpeningHoursText',
                'type'     => 'text',
                'title'    => __('Opening Hours Text', 'wordpress-store-locator'),
                'default'  => 'Opening Hours',
                'required' => array('showOpeningHours','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHoursClock',
                'type'     => 'text',
                'title'    => __('Opening Hours Clock', 'wordpress-store-locator'),
                'default'  => "o'Clock",
                'required' => array('showOpeningHours','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHoursMonday',
                'type'     => 'text',
                'title'    => __('Monday Text', 'wordpress-store-locator'),
                'default'  => 'Monday',
                'required' => array('showOpeningHours','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHoursTuesday',
                'type'     => 'text',
                'title'    => __('Tuesday Text', 'wordpress-store-locator'),
                'default'  => 'Tuesday',
                'required' => array('showOpeningHours','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHoursWednesday',
                'type'     => 'text',
                'title'    => __('Wednesday Text', 'wordpress-store-locator'),
                'default'  => 'Wednesday',
                'required' => array('showOpeningHours','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHoursThursday',
                'type'     => 'text',
                'title'    => __('Thursday Text', 'wordpress-store-locator'),
                'default'  => 'Thursday',
                'required' => array('showOpeningHours','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHoursFriday',
                'type'     => 'text',
                'title'    => __('Friday Text', 'wordpress-store-locator'),
                'default'  => 'Friday',
                'required' => array('showOpeningHours','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHoursSaturday',
                'type'     => 'text',
                'title'    => __('Saturday Text', 'wordpress-store-locator'),
                'default'  => 'Saturday',
                'required' => array('showOpeningHours','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHoursSunday',
                'type'     => 'text',
                'title'    => __('Sunday Text', 'wordpress-store-locator'),
                'default'  => 'Sunday',
                'required' => array('showOpeningHours','equals','1'),
            ),

            array(
                'id'       => 'showOpeningHours2',
                'type'     => 'checkbox',
                'title'    => __( 'Show Opening Hours 2', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'showOpeningHours2Text',
                'type'     => 'text',
                'title'    => __('Opening Hours Text', 'wordpress-store-locator'),
                'default'  => 'Opening Hours',
                'required' => array('showOpeningHours2','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHours2Clock',
                'type'     => 'text',
                'title'    => __('Opening Hours Clock', 'wordpress-store-locator'),
                'default'  => "o'Clock",
                'required' => array('showOpeningHours2','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHours2Monday',
                'type'     => 'text',
                'title'    => __('Monday Text', 'wordpress-store-locator'),
                'default'  => 'Monday',
                'required' => array('showOpeningHours2','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHours2Tuesday',
                'type'     => 'text',
                'title'    => __('Tuesday Text', 'wordpress-store-locator'),
                'default'  => 'Tuesday',
                'required' => array('showOpeningHours2','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHours2Wednesday',
                'type'     => 'text',
                'title'    => __('Wednesday Text', 'wordpress-store-locator'),
                'default'  => 'Wednesday',
                'required' => array('showOpeningHours2','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHours2Thursday',
                'type'     => 'text',
                'title'    => __('Thursday Text', 'wordpress-store-locator'),
                'default'  => 'Thursday',
                'required' => array('showOpeningHours2','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHours2Friday',
                'type'     => 'text',
                'title'    => __('Friday Text', 'wordpress-store-locator'),
                'default'  => 'Friday',
                'required' => array('showOpeningHours2','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHours2Saturday',
                'type'     => 'text',
                'title'    => __('Saturday Text', 'wordpress-store-locator'),
                'default'  => 'Saturday',
                'required' => array('showOpeningHours2','equals','1'),
            ),
            array(
                'id'       => 'showOpeningHours2Sunday',
                'type'     => 'text',
                'title'    => __('Sunday Text', 'wordpress-store-locator'),
                'default'  => 'Sunday',
                'required' => array('showOpeningHours2','equals','1'),
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Single Store Page', 'wordpress-store-locator' ),
        'desc'       => __( 'Default Single Store Page Settings', 'wordpress-store-locator' ),
        'id'         => 'single-store-page',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'singleStoreShowOpeningHours',
                'type'     => 'checkbox',
                'title'    => __( 'Show Opening Hours', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'singleStoreContactStore',
                'type'     => 'checkbox',
                'title'    => __( 'Show Contact Store', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'singleStoreShowRating',
                'type'     => 'checkbox',
                'title'    => __( 'Show Rating Form', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'singleStoreShowMap',
                'type'     => 'checkbox',
                'title'    => __( 'Show Map', 'wordpress-store-locator' ),
                'default'  => 1,
            ),
            array(
                'id'       => 'singleStoreShowMapZoom',
                'type'     => 'spinner',
                'title'    => __( 'Map Zoom', 'wordpress-store-locator' ),
                'min'      => '1',
                'step'     => '1',
                'max'      => '16',
                'default' => '10',
                'required' => array('singleStoreShowMap','equals','1'),
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'WooCommerce', 'wordpress-store-locator' ),
        'id'         => 'woocommerce',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'buttonEnabled',
                'type'     => 'checkbox',
                'title'    => __( 'Enable', 'wordpress-store-locator' ),
                'subtitle' => __( 'Enables the single product custom button.', 'wordpress-store-locator' ),
                'default'  => '1',
            ),
            array(
                'id'       => 'buttonText',
                'type'     => 'text',
                'title'    => __('Button Text', 'wordpress-store-locator'),
                'subtitle' => __('Text inside the custom button.', 'wordpress-store-locator'),
                'default'  => 'Find in Store',
            ),
            array(
                'id'       => 'buttonPosition',
                'type'     => 'select',
                'title'    => __('Button Position', 'wordpress-store-locator'),
                'subtitle' => __('Specify the positon of the Button.', 'wordpress-store-locator'),
                'default'  => 'woocommerce_single_product_summary',
                'options'  => array( 
                    'woocommerce_before_single_product' => __('Before Single Product', 'wordpress-store-locator'),
                    'woocommerce_before_single_product_summary' => __('Before Single Product Summary', 'wordpress-store-locator'),
                    'woocommerce_single_product_summary' => __('In Single Product Summary', 'wordpress-store-locator'),
                    'woocommerce_product_meta_start' => __('Before Meta Information', 'wordpress-store-locator'),
                    'woocommerce_product_meta_end' => __('After Meta Information', 'wordpress-store-locator'),
                    'woocommerce_after_single_product_summary' => __('After Single Product Summary', 'wordpress-store-locator'),
                    'woocommerce_after_single_product' => __('After Single Product', 'wordpress-store-locator'),
                    'woocommerce_after_main_content' => __('After Main Product', 'wordpress-store-locator'),
                ),
            ),
            array(
                'id'       => 'buttonAction',
                'type'     => 'select',
                'title'    => __('Button Action', 'wordpress-store-locator'), 
                'subtitle' => __('What happens when the User clicks the button.', 'wordpress-store-locator'),
                'options'  => array(
                    '1' => __('Open Store Locator Modal', 'wordpress-store-locator' ),
                    '2' => __('Go to custom URL', 'wordpress-store-locator' ),
                ),
                'default'  => '1',
            ),
            array(
                'id'       => 'buttonActionURL',
                'type'     => 'text',
                'title'    => __('Button custom URL', 'wordpress-store-locator'),
                'subtitle' => __('The URL where the user will be sent to when he clicked the button.', 'wordpress-store-locator'),
                'validate' => 'url',
                'required' => array('buttonAction','equals','2'),
            ),
            array(
                'id'       => 'buttonActionURLTarget',
                'type'     => 'select',
                'title'    => __('Custom Button URL target', 'wordpress-store-locator'),
                'subtitle' => __('The target attribute of the link.', 'wordpress-store-locator'),
                'options'  => array(
                    '_self' => __('_self (same Window)', 'wordpress-store-locator'),
                    '_blank' => __('_blank (new Window)', 'wordpress-store-locator'),
                    '_parent' => __('_parent (parent Window)', 'wordpress-store-locator'),
                    '_top' => __('_top (full body of the Window)', 'wordpress-store-locator'),
                ),
                'default'  => '_self',
                'required' => array('buttonAction','equals','2'),
            ),
            array(
                'id'       => 'buttonModalPosition',
                'type'     => 'select',
                'title'    => __('Modal Code Position', 'wordpress-store-locator'),
                'subtitle' => __('The position of the Store locator.', 'wordpress-store-locator'),
                'default'  => 'wp_footer',
                'options'  => array(
                    'wp_footer' => __('Footer', 'wordpress-store-locator'),      
                    'woocommerce_before_main_content' => __('Before Main Content', 'wordpress-store-locator'),
                    'woocommerce_before_single_product' => __('Before Single Product', 'wordpress-store-locator'),
                    'woocommerce_before_single_product_summary' => __('Before Single Product Summary', 'wordpress-store-locator'),
                    'woocommerce_single_product_summary' => __('In Single Product Summary', 'wordpress-store-locator'),
                    'woocommerce_product_meta_start' => __('Before Meta Information', 'wordpress-store-locator'),
                    'woocommerce_product_meta_end' => __('After Meta Information', 'wordpress-store-locator'),
                    'woocommerce_after_single_product_summary' => __('After Single Product Summary', 'wordpress-store-locator'),
                    'woocommerce_after_single_product' => __('After Single Product', 'wordpress-store-locator'),
                    'woocommerce_after_main_content' => __('After Main Product', 'wordpress-store-locator'),
                ),
                'required' => array('buttonAction','equals','1'),
            ),
            array(
                'id'       => 'buttonModalSize',
                'type'     => 'select',
                'title'    => __('Modal size', 'wordpress-store-locator'),
                'subtitle' => __('Size of the modal.', 'wordpress-store-locator'),
                'options'  => array(
                    '' => __('Normal', 'wordpress-store-locator'),
                    'modal-sm' => __('Small', 'wordpress-store-locator'),
                    'modal-lg' => __('Large', 'wordpress-store-locator'),
                ),
                'default'  => 'modal-lg',
                'required' => array('buttonAction','equals','1'),
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Defaults', 'wordpress-store-locator' ),
        'id'         => 'defaults',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'defaultAddress1',
                'type'     => 'text',
                'title'    => __('Default Address 1', 'wordpress-store-locator'),
                'default'  => '',
            ),
            array(
                'id'       => 'defaultAddress2',
                'type'     => 'text',
                'title'    => __('Default Address 2', 'wordpress-store-locator'),
                'default'  => '',
            ),
            array(
                'id'       => 'defaultZIP',
                'type'     => 'text',
                'title'    => __('Default ZIP', 'wordpress-store-locator'),
                'default'  => '',
            ),
            array(
                'id'       => 'defaultCity',
                'type'     => 'text',
                'title'    => __('Default City', 'wordpress-store-locator'),
                'default'  => '',
            ),
            array(
                'id'       => 'defaultRegion',
                'type'     => 'text',
                'title'    => __('Default Region', 'wordpress-store-locator'),
                'default'  => '',
            ),
            array(
                'id'       => 'defaultCountry',
                'type'     => 'select',
                'title'    => __('Default Country', 'wordpress-store-locator'),
                'options' => array( "AF" => "Afghanistan", "AL" => "Albania", "DZ" => "Algeria", "AS" => "American Samoa", "AD" => "Andorra", "AO" => "Angola", "AI" => "Anguilla", "AQ" => "Antarctica", "AG" => "Antigua and Barbuda", "AR" => "Argentina", "AM" => "Armenia", "AW" => "Aruba", "AU" => "Australia", "AT" => "Austria", "AZ" => "Azerbaijan", "BS" => "Bahamas", "BH" => "Bahrain", "BD" => "Bangladesh", "BB" => "Barbados", "BY" => "Belarus", "BE" => "Belgium", "BZ" => "Belize", "BJ" => "Benin", "BM" => "Bermuda", "BT" => "Bhutan", "BO" => "Bolivia", "BA" => "Bosnia and Herzegovina", "BW" => "Botswana", "BV" => "Bouvet Island", "BR" => "Brazil", "BQ" => "British Antarctic Territory", "IO" => "British Indian Ocean Territory", "VG" => "British Virgin Islands", "BN" => "Brunei", "BG" => "Bulgaria", "BF" => "Burkina Faso", "BI" => "Burundi", "KH" => "Cambodia", "CM" => "Cameroon", "CA" => "Canada", "CT" => "Canton and Enderbury Islands", "CV" => "Cape Verde", "KY" => "Cayman Islands", "CF" => "Central African Republic", "TD" => "Chad", "CL" => "Chile", "CN" => "China", "CX" => "Christmas Island", "CC" => "Cocos [Keeling] Islands", "CO" => "Colombia", "KM" => "Comoros", "CG" => "Congo - Brazzaville", "CD" => "Congo - Kinshasa", "CK" => "Cook Islands", "CR" => "Costa Rica", "HR" => "Croatia", "CU" => "Cuba", "CY" => "Cyprus", "CZ" => "Czech Republic", "CI" => "C??te d???Ivoire", "DK" => "Denmark", "DJ" => "Djibouti", "DM" => "Dominica", "DO" => "Dominican Republic", "NQ" => "Dronning Maud Land", "DD" => "East Germany", "EC" => "Ecuador", "EG" => "Egypt", "SV" => "El Salvador", "GQ" => "Equatorial Guinea", "ER" => "Eritrea", "EE" => "Estonia", "ET" => "Ethiopia", "FK" => "Falkland Islands", "FO" => "Faroe Islands", "FJ" => "Fiji", "FI" => "Finland", "FR" => "France", "GF" => "French Guiana", "PF" => "French Polynesia", "TF" => "French Southern Territories", "FQ" => "French Southern and Antarctic Territories", "GA" => "Gabon", "GM" => "Gambia", "GE" => "Georgia", "DE" => "Germany", "GH" => "Ghana", "GI" => "Gibraltar", "GR" => "Greece", "GL" => "Greenland", "GD" => "Grenada", "GP" => "Guadeloupe", "GU" => "Guam", "GT" => "Guatemala", "GG" => "Guernsey", "GN" => "Guinea", "GW" => "Guinea-Bissau", "GY" => "Guyana", "HT" => "Haiti", "HM" => "Heard Island and McDonald Islands", "HN" => "Honduras", "HK" => "Hong Kong SAR China", "HU" => "Hungary", "IS" => "Iceland", "IN" => "India", "ID" => "Indonesia", "IR" => "Iran", "IQ" => "Iraq", "IE" => "Ireland", "IM" => "Isle of Man", "IL" => "Israel", "IT" => "Italy", "JM" => "Jamaica", "JP" => "Japan", "JE" => "Jersey", "JT" => "Johnston Island", "JO" => "Jordan", "KZ" => "Kazakhstan", "KE" => "Kenya", "KI" => "Kiribati", "KW" => "Kuwait", "KG" => "Kyrgyzstan", "LA" => "Laos", "LV" => "Latvia", "LB" => "Lebanon", "LS" => "Lesotho", "LR" => "Liberia", "LY" => "Libya", "LI" => "Liechtenstein", "LT" => "Lithuania", "LU" => "Luxembourg", "MO" => "Macau SAR China", "MK" => "Macedonia", "MG" => "Madagascar", "MW" => "Malawi", "MY" => "Malaysia", "MV" => "Maldives", "ML" => "Mali", "MT" => "Malta", "MH" => "Marshall Islands", "MQ" => "Martinique", "MR" => "Mauritania", "MU" => "Mauritius", "YT" => "Mayotte", "FX" => "Metropolitan France", "MX" => "Mexico", "FM" => "Micronesia", "MI" => "Midway Islands", "MD" => "Moldova", "MC" => "Monaco", "MN" => "Mongolia", "ME" => "Montenegro", "MS" => "Montserrat", "MA" => "Morocco", "MZ" => "Mozambique", "MM" => "Myanmar [Burma]", "NA" => "Namibia", "NR" => "Nauru", "NP" => "Nepal", "NL" => "Netherlands", "AN" => "Netherlands Antilles", "NT" => "Neutral Zone", "NC" => "New Caledonia", "NZ" => "New Zealand", "NI" => "Nicaragua", "NE" => "Niger", "NG" => "Nigeria", "NU" => "Niue", "NF" => "Norfolk Island", "KP" => "North Korea", "VD" => "North Vietnam", "MP" => "Northern Mariana Islands", "NO" => "Norway", "OM" => "Oman", "PC" => "Pacific Islands Trust Territory", "PK" => "Pakistan", "PW" => "Palau", "PS" => "Palestinian Territories", "PA" => "Panama", "PZ" => "Panama Canal Zone", "PG" => "Papua New Guinea", "PY" => "Paraguay", "YD" => "People's Democratic Republic of Yemen", "PE" => "Peru", "PH" => "Philippines", "PN" => "Pitcairn Islands", "PL" => "Poland", "PT" => "Portugal", "PR" => "Puerto Rico", "QA" => "Qatar", "RO" => "Romania", "RU" => "Russia", "RW" => "Rwanda", "RE" => "R??union", "BL" => "Saint Barth??lemy", "SH" => "Saint Helena", "KN" => "Saint Kitts and Nevis", "LC" => "Saint Lucia", "MF" => "Saint Martin", "PM" => "Saint Pierre and Miquelon", "VC" => "Saint Vincent and the Grenadines", "WS" => "Samoa", "SM" => "San Marino", "SA" => "Saudi Arabia", "SN" => "Senegal", "RS" => "Serbia", "CS" => "Serbia and Montenegro", "SC" => "Seychelles", "SL" => "Sierra Leone", "SG" => "Singapore", "SK" => "Slovakia", "SI" => "Slovenia", "SB" => "Solomon Islands", "SO" => "Somalia", "ZA" => "South Africa", "GS" => "South Georgia and the South Sandwich Islands", "KR" => "South Korea", "ES" => "Spain", "LK" => "Sri Lanka", "SD" => "Sudan", "SR" => "Suriname", "SJ" => "Svalbard and Jan Mayen", "SZ" => "Swaziland", "SE" => "Sweden", "CH" => "Switzerland", "SY" => "Syria", "ST" => "S??o Tom?? and Pr??ncipe", "TW" => "Taiwan", "TJ" => "Tajikistan", "TZ" => "Tanzania", "TH" => "Thailand", "TL" => "Timor-Leste", "TG" => "Togo", "TK" => "Tokelau", "TO" => "Tonga", "TT" => "Trinidad and Tobago", "TN" => "Tunisia", "TR" => "Turkey", "TM" => "Turkmenistan", "TC" => "Turks and Caicos Islands", "TV" => "Tuvalu", "UM" => "U.S. Minor Outlying Islands", "PU" => "U.S. Miscellaneous Pacific Islands", "VI" => "U.S. Virgin Islands", "UG" => "Uganda", "UA" => "Ukraine", "SU" => "Union of Soviet Socialist Republics", "AE" => "United Arab Emirates", "GB" => "United Kingdom", "US" => "United States", "ZZ" => "Unknown or Invalid Region", "UY" => "Uruguay", "UZ" => "Uzbekistan", "VU" => "Vanuatu", "VA" => "Vatican City", "VE" => "Venezuela", "VN" => "Vietnam", "WK" => "Wake Island", "WF" => "Wallis and Futuna", "EH" => "Western Sahara", "YE" => "Yemen", "ZM" => "Zambia", "ZW" => "Zimbabwe", "AX" => "??land Islands" ),
            ),
            array(
                'id'       => 'defaultTelephone',
                'type'     => 'text',
                'title'    => __('Default Telephone', 'wordpress-store-locator'),
                'default'  => '',
            ),
            array(
                'id'       => 'defaultMobile',
                'type'     => 'text',
                'title'    => __('Default Mobile', 'wordpress-store-locator'),
                'default'  => '',
            ),
            array(
                'id'       => 'defaultFax',
                'type'     => 'text',
                'title'    => __('Default Fax', 'wordpress-store-locator'),
                'default'  => '',
            ),
            array(
                'id'       => 'defaultEmail',
                'type'     => 'text',
                'title'    => __('Default Email', 'wordpress-store-locator'),
                'default'  => 'info@',
            ),
            array(
                'id'       => 'defaultWebsite',
                'type'     => 'text',
                'title'    => __('Default Website', 'wordpress-store-locator'),
                'default'  => 'http://',
            ),
            array(
                'id'       => 'defaultRanking',
                'type'     => 'text',
                'title'    => __('Default Ranking', 'wordpress-store-locator'),
                'default'  => '10',
            ),
            array(
                'id'       => 'defaultOpen',
                'type'     => 'text',
                'title'    => __('Default Open (Mo - Fr)', 'wordpress-store-locator'),
                'default'  => '08:00',
            ),
            array(
                'id'       => 'defaultClose',
                'type'     => 'text',
                'title'    => __('Default Close (Mo - Fr)', 'wordpress-store-locator'),
                'default'  => '17:00',
            ),
        )
    ) );

    $framework::setSection( $opt_name, array(
        'title'      => __( 'Advanced settings', 'wordpress-store-locator' ),
        'desc'       => __( 'Custom stylesheet / javascript.', 'wordpress-store-locator' ),
        'id'         => 'advanced',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'disableReplaceState',
                'type'     => 'checkbox',
                'title'    => __( 'Disable Replace State', 'wordpress-store-locator' ),
                'subtitle' => __( 'Check this to stop adding query parameters to URLs.', 'wordpress-store-locator' ),
                'default'  => '0',
            ),
            array(
                'id'       => 'useOutputBuffering',
                'type'     => 'checkbox',
                'title'    => __( 'Use Output Buffering', 'wordpress-store-locator' ),
                'subtitle' => __( 'Uncheck this if you see blank strings.', 'wordpress-store-locator' ),
                'default'  => '0',
            ),
            array(
                'id'       => 'doNotLoadBootstrap',
                'type'     => 'checkbox',
                'title'    => __( 'Do Not load Bootstrap', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'doNotLoadFontAwesome',
                'type'     => 'checkbox',
                'title'    => __( 'Do Not load Font Awesome', 'wordpress-store-locator' ),
                'default'  => 0,
            ),
            array(
                'id'       => 'performanceRenderOnThesePages',
                'type'     => 'select',
                'title'    => __('Performance (Render only on these pages)', 'wordpress-store-locator'),
                'multi'    => true,
                'data'     => 'pages',
                'ajax'     => 'true',
            ),
            array(
                'id'       => 'customCSS',
                'type'     => 'ace_editor',
                'mode'     => 'css',
                'title'    => __( 'Custom CSS', 'wordpress-store-locator' ),
                'subtitle' => __( 'Add some stylesheet if you want.', 'wordpress-store-locator' ),
            ),
            array(
                'id'       => 'customJS',
                'type'     => 'ace_editor',
                'mode'     => 'javascript',
                'title'    => __( 'Custom JS', 'wordpress-store-locator' ),
                'subtitle' => __( 'Add some javascript if you want.', 'wordpress-store-locator' ),
            ),           
        )
    ));


    /*
     * <--- END SECTIONS
     */
