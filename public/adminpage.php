<?php

class VRBAdminPage
{
    public $config;
    public $options;

    public function __construct()
    {
        include(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/public/config.php');
        $this->config = $config;

        add_action( 'admin_menu', array($this, 'add_vabs_admin_pages') );
    }

    public function add_vabs_admin_pages()
    {
        add_menu_page('vabs plugin', 'VABS Strandkorb', 'manage_options', 'wpvabs_plugin', array($this, 'vabs_admin_index'), '', 110);
        add_submenu_page('wpvabs_plugin', 'Online Buchung', 'Online Buchung', 'manage_options', 'vabs_online_booking', array($this, 'vabs_online_booking'));
        add_submenu_page('wpvabs_plugin', 'Belegungsplan', 'Belegungsplan', 'manage_options', 'vabs_booking_plan', array($this, 'vabs_booking_plan'));
        add_submenu_page('wpvabs_plugin', 'Buchungsübersicht', 'Buchungsübersicht', 'manage_options', 'vabs_bookings_table', array($this, 'vabs_bookings_table'));
        add_submenu_page('wpvabs_plugin', 'Vabs QR Code', 'QR Code', 'manage_options', 'vabs_qrcode_generator', array($this, 'vabs_qrcode_generator'));
        add_submenu_page('wpvabs_plugin', 'Vabs Shortcode', 'Shortcode', 'manage_options', 'vabs_shortcode_generator', array($this, 'vabs_shortcode_generator'));
    }


    public function vabs_admin_index()
    {
        include(VABS_PLUGIN_STRANDKORB_ROOTPATH . 'public/templates/index.php');
    }

    public function vabs_booking_plan()
    {
        include(VABS_PLUGIN_STRANDKORB_ROOTPATH . 'public/templates/overview.php');
    }

    public function vabs_online_booking()
    {
        include(VABS_PLUGIN_STRANDKORB_ROOTPATH . 'public/templates/onlinebooking.php');
    }

    public function vabs_bookings_table()
    {
        include(VABS_PLUGIN_STRANDKORB_ROOTPATH . 'public/templates/bookings-table.php');
    }

    public function vabs_shortcode_generator()
    {
        include(VABS_PLUGIN_STRANDKORB_ROOTPATH . 'public/templates/generator.php');
    }

    public function vabs_qrcode_generator()
    {
        include(VABS_PLUGIN_STRANDKORB_ROOTPATH . 'public/templates/qrcode.php');
    }
}