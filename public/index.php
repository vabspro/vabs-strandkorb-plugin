<?php

class VRB_Connection_Plugin
{
    protected $dependencies;
    protected $adminpage;
    protected $bookingshortcode;
    protected $endpoints;

    public function __construct()
    {
        $this->dependencies = new VRBDependencies();
        $this->adminpage = new VRBAdminPage();
        $this->bookingshortcode = new VRBShortcode();
        $this->endpoints = new VABSEndpoints();
    }

}