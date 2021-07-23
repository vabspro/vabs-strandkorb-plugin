# VABS Strandkorb Plugin for Wordpress

This is a wordpress plugin to connect the VABS Backend with yout wordpres site.

**Installation in 3 simple steps:**

1. Download the zip file and install it within your wordpress plugins folder
2. After activation go to the vabs settings tab in your wordpress backend and fill out the required fields
3. Generate a shortcode for your needs and place it on your favorite site

### Alternative solution

For static html websites yout need to run some more steps to connect your website with the VABS backend.

**Installation in 3 simple steps:**

1.  Download the zip folder and place it within yout website root
2.  To activate the connection, fill in the required fields in your ./public/config.php
3.  load all required assets from the /assets folder and /dist/frontend folder
4.  place a <div> tag on your website which looks similar to this:

        <div class="vrb" data-type="$your-variable" data-redirect="$your-redirect-url" data-agb="$your-agb-url" data-datenschutz="$your-dsgvo-url"></div>
