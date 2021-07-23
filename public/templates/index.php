<?php
$string = json_encode($this->config);

?>

<div id="vabs">
    <div class="vabs">
        <div class="vabs__card">
            <div class="vabs__card--header">
                <img src="<?php echo plugins_url('/vabs_strandkorb/assets/img/logo.png'); ?>" alt="logo">
            </div>
            <div class="vabs__card--body">
                <form action="<?php echo plugins_url('/vabs-strandkorb-plugin/public/controller/formcontroller.php'); ?>" class="form" method="POST">
                    <div class="vabs__dashboard" data-type="settingsform" data-config='<?= $string ?>'></div>
                </form>
            </div>
        </div>
    </div>
</div>