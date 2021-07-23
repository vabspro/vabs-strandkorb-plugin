<?php

$route = $_SERVER['HTTP_REFERER'];




$locations = [];
if(isset($_POST['locationname']) && count($_POST['locationname'])){
    foreach ($_POST['locationname'] as $index => $name) {
        array_push($locations, ['id' => $_POST['locationId'][$index], 'name' => $name, 'coords' => $_POST['locationcoords'][$index]]);
    }
}

$chairs = [];
if(isset($_POST['bechchairType']) && count($_POST['bechchairType'])){
    foreach ($_POST['bechchairType'] as $index => $name) {
        array_push($chairs, ['id' => $_POST['beachchairId'][$index], 'name' => $name, 'image' => $_POST['bechchairImage'][$index]]);
    }
}

$data = array(
    'api_token' => $_POST['api_token'] ? $_POST['api_token'] : null,
    'client_id' => $_POST['client_id'] ? $_POST['client_id'] : null,
    'url' => $_POST['url'] ? $_POST['url'] : null,
    'referrer' => $_POST['referrer_id'] ? $_POST['referrer_id'] : null,
    'dsgvo' => $_POST['dsgvo'] ? $_POST['dsgvo'] : null,
    'agb' => $_POST['agb'] ? $_POST['agb'] : null,
    'redirect' => $_POST['redirect'] ? $_POST['redirect'] : null,
    'location' => $_POST['location'] ? $_POST['location'] : null,
    'locations' => $locations,
    'chairs' => $chairs
);


$file = realpath(dirname(__FILE__)) . '/../config.php';

file_put_contents($file, '<?php $config = ' . var_export($data, true) . ';');

header("Location:" . $route, true, 302);

