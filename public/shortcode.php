<?php

class VRBShortcode
{
    protected $options;

    public function __construct()
    {
        add_shortcode('vabs_form', array( $this, 'init' ));
    }


    /**
     * @param $atts
     * @return string
     */
    public function init($atts)
    {
        return '<div class="vrb" data-type="' . $atts['type'] . '" data-redirect="' . $atts['redirect'] . '" data-agb="' . $atts['agb'] . '" data-datenschutz="' . $atts['datenschutz'] . '"></div>';

    }

}