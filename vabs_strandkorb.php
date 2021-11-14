<?php

/**
 * Plugin Name: VABS - Strandkorb Plugin
 * Description: VABS Plugin to book beachchairs
 * Version: 1.1
 * Author: Uwe Horn
 * Author URI http://uwe-horn.net
 * License: GPLv2 or later
 * Text Domain: vrb
 */

defined('ABSPATH') or die('You can not access this file.');

define('VABS_PLUGIN_STRANDKORB_ROOTPATH', plugin_dir_path( __FILE__ ));

include_once('public/dependencies.php');
include_once('public/adminpage.php');
include_once('public/shortcode.php');
include_once('public/index.php');
include_once('public/api/index.php');


function init_vrb()
{
    $plugin = new VRB_Connection_Plugin();
}

init_vrb();


