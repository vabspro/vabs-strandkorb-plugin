<?php

class VRBDependencies
{
    protected $options;

    public function __construct()
    {
        add_action( 'admin_enqueue_scripts', array($this, 'enqueue_admin') );
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue') );
    }

    public function enqueue_admin()
    {
        wp_enqueue_style('vrb_strandkorb_plugin_admin_map_style', 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css');
        wp_enqueue_style('vrb_strandkorb_plugin_admin_map_style', 'https://unpkg.com/browse/flatpickr@4.6.13/dist/themes/airbnb.css');
        wp_enqueue_style('vrb_strandkorb_plugin_admin_style', plugins_url( 'vabs-strandkorb-plugin/dist/backend/index.css'));
        
        wp_enqueue_script('vrb_strandkorb_plugin_admin_script', plugins_url( 'vabs-strandkorb-plugin/dist/backend/index.js'), '', '', true);

    }

    public function enqueue()
    {
        wp_enqueue_style('vrb_strandkorb_plugin_map_style', 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css');
        wp_enqueue_style('vrb_strandkorb_plugin_map_style', 'https://unpkg.com/browse/flatpickr@4.6.13/dist/themes/airbnb.css');

        wp_enqueue_style('vrb_strandkorb_plugin_style', plugins_url( 'vabs-strandkorb-plugin/dist/frontend/index.css'));
        wp_enqueue_script('vrb_strandkorb_plugin_script', plugins_url( 'vabs-strandkorb-plugin/dist/frontend/index.js'), '', '', true);

    }
}