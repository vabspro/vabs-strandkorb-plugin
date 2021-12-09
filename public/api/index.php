<?php
declare(strict_types=1);
require VABS_PLUGIN_STRANDKORB_ROOTPATH . 'vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;

class VABSEndpoints
{

    public $logger;
    public $config;

    public $token;
    public $client_id;
    public $url;
    public $object_code = 7;

    public $get_chairs_endpoint = '/beachchair/chair';
    public $get_chair_locations_endpoint = '/beachchair/location';
    public $get_bookings_endpoint = '/beachchair/booking/';
    public $get_price_endpoint = '/beachchair/price/';
    public $create_contact_endpoint = '/contact/';
    public $create_sales_header_endpoint = '/sales/order/';
    public $create_sales_line_endpoint = '/sales/line/';
    public $create_sales_invoice_endpoint = '/sales/invoice/';
    public $get_voucher_endpoint = '/voucher';
    public $get_voucher_templates_endpoint = '/voucher/templates';

    public function __construct()
    {

        include(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/public/config.php');
    

        $this->logger = new Logger('main');
        $this->config = $config;
        $this->token = $config['api_token'];
        $this->client_id = $config['client_id'];
        $this->url = $config['url'];
        $this->qrcode_options = new QROptions([
            'eccLevel' => QRCode::ECC_L,
            'outputType' => QRCode::OUTPUT_MARKUP_SVG,
            'version' => 5,
        ]);

        add_action('rest_api_init', function () {
            register_rest_route('app/v1', 'config', ['methods' => 'GET', 'callback' => array($this, 'get_config_data')]);
            register_rest_route('app/v1', 'errorhandling', ['methods' => 'POST', 'callback' => array($this, 'send_error_message_to_admin')]);
            
            register_rest_route('app/v1', 'rentals', ['methods' => 'GET', 'callback' => array($this, 'app_get_beachchairs')]);
            register_rest_route('app/v1', 'locations', ['methods' => 'GET', 'callback' => array($this, 'app_get_beachchair_locations')]);
            register_rest_route('app/v1', 'bookings', ['methods' => 'GET', 'callback' => array($this, 'app_get_beachchair_bookings')]);
            register_rest_route('app/v1', 'create_contact_id', ['methods' => 'POST', 'callback' => array($this, 'create_contact_id')]);
            register_rest_route('app/v1', 'create_salesheader_id', [
                'methods' => 'POST',
                'callback' => array($this, 'create_salesheader_id'),
            ]);
            register_rest_route('app/v1', 'create_salesline_id', ['methods' => 'POST', 'callback' => array($this, 'create_salesline_id')]);
            register_rest_route('app/v1', 'price', ['methods' => 'POST', 'callback' => array($this, 'get_beachchair_price')]);
            register_rest_route('app/v1', 'create_sales_invoice_id', [
                'methods' => 'GET',
                'callback' => array($this, 'create_sales_invoice_id'),
            ]);

            register_rest_route('app/v1', 'voucher_list', ['methods' => 'GET', 'callback' => array($this, 'get_voucher_list')]);
            register_rest_route('app/v1', 'voucher_template_list', ['methods' => 'GET', 'callback' => array($this, 'get_voucher_template_list')]);
            register_rest_route('app/v1', 'generate_code', ['methods' => 'POST', 'callback' => array($this, 'generate_qr_code')]);
        });
    }

    public function generate_qr_code()
    {
        try {
            $folder_path = VABS_PLUGIN_STRANDKORB_ROOTPATH . '/codes/';
            $zip_path = VABS_PLUGIN_STRANDKORB_ROOTPATH . 'codes.zip';

            array_map('unlink', glob("$folder_path/*.*"));
            rmdir($folder_path);
            unlink($zip_path);

            $folder = mkdir($folder_path, 0700);
            $zip = new ZipArchive;

            $request = json_decode(file_get_contents('php://input'));
        
            $header = ['Token:' . $this->token];
            $curl = curl_init($this->url . $this->get_chairs_endpoint);
        
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
            $curl_response = curl_exec($curl);
            curl_close($curl);

            if(isset($request->multiple) && $request->multiple == true){
                foreach (json_decode($curl_response) as $chair) {
                    $filename = 'chair-'.$chair->name.'.svg';
                    $qrcode_target = $request->url . '?chair='.$chair->name;
                    $qrcode = (new QRCode($this->qrcode_options))->render($qrcode_target);
                    $svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image width="200" height="200" xlink:href="'.$qrcode.'"/></svg>';
                    $filepath = VABS_PLUGIN_STRANDKORB_ROOTPATH . '/codes/'.$filename;
                    $file = fopen($filepath, 'w');
                    file_put_contents($filepath, $svg);
                };
            }else{
                $filename = 'qrcode.svg';
                $qrcode_target = $request->url;
                $qrcode = (new QRCode($this->qrcode_options))->render($qrcode_target);
                $svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image width="200" height="200" xlink:href="'.$qrcode.'"/></svg>';
                $filepath = VABS_PLUGIN_STRANDKORB_ROOTPATH . '/codes/'.$filename;
                $file = fopen($filepath, 'w');
                file_put_contents($filepath, $svg);
            }
            

            $zip = new ZipArchive();
            $zip->open('codes.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);
            if($zip->open($zip_path, ZipArchive::CREATE ) === TRUE) {
                $dir = opendir($folder_path);
                while($file = readdir($dir)) {
                    if(is_file($folder_path.$file)) {
                        $zip->addFile($folder_path.$file, $file);
                    }
                }
                $zip ->close();
            }

            return [
                'status' => 'ok',
                'zipfolder' => $_SERVER['HTTP_ORIGIN'] . '/wp-content/plugins/vabs-strandkorb-plugin/codes.zip'
            ];
         
        } catch (\Throwable $th) {
            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . date("Y-m-d_h:i:sa") . '.log', Logger::DEBUG));
            $this->logger->info('A warning message', ['request' => $_REQUEST, 'error' => $th]);
    
            mail('uwe@vabs.pro', 'Error generating code', implode(',', ['request' => $_REQUEST, 'server' => $_SERVER]));
        }
    }

    public function send_error_message_to_admin()
    {
        $request = json_decode(file_get_contents('php://input'));
        $payload = file_get_contents('php://input');

        $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . date("Y-m-d_h:i:sa") . '.log', Logger::DEBUG));
        $this->logger->info('A warning message', ['request' => $payload]);

        mail('uwe@vabs.pro', $request->message . ' in ' . $request->type, $payload);
    }

    public function get_config_data()
    {
        try {
            return [
                'links' => [
                    'agb' => $this->config['agb'],
                    'dsgvo' => $this->config['dsgvo']
                ],
                'location' => explode(', ', $this->config['location']),
                'locations' => $this->config['locations'],
                'chairtypes' => $this->config['chairs']
            ];
        } catch (\Throwable $th) {
            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . date("Y-m-d_h:i:sa") . '.log', Logger::DEBUG));
            $this->logger->info('A warning message', ['request' => $_REQUEST]);
    
            mail('uwe@vabs.pro', 'Error loading config data', ['request' => $_REQUEST, 'server' => $_SERVER]);
    
        }
    }

    public function app_get_beachchairs()
    {
        try {
            $header = ['Token:' . $this->token];
            $curl = curl_init($this->url . $this->get_chairs_endpoint);
        
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        #
            $curl_response = curl_exec($curl);
        
            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {

            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'request' => $_REQUEST, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);

        }
        
    }

    public function app_get_beachchair_locations()
    {
        
        try {
            $header = ['Token:' . $this->token];
            $curl = curl_init($this->url . $this->get_chair_locations_endpoint);
        
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        
            $curl_response = curl_exec($curl);
        
            curl_close($curl);
     
            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'request' => $_REQUEST, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
    }

    public function get_beachchair_price()
    {

        try {
            $request = json_decode(file_get_contents('php://input'));
   

        if (!isset($request->id)) {
            return [
                'error' => 'Uppps, something went wrong. the id is mandatory',
            ];
        }

        if (!isset($request->startDate)) {
            return [
                'error' => 'Uppps, something went wrong. you must declar at least one date',
            ];
        }

        $requestParams = $request->id;
        $requestParams .= '/' . $request->startDate;

        if (isset($request->startTime)) {
            $requestParams .= 'T' . $request->startTime;
        }

        $requestParams .= isset($request->endDate) ? '/' . $request->endDate : '/' . $request->startDate;
        if (isset($request->endTime)) {
            $requestParams .= 'T' . $request->endTime;
        }



        $header = ['Token:' . $this->token];
        $curl = curl_init($this->url . $this->get_price_endpoint . $requestParams);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPGET, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

        $curl_response = curl_exec($curl);

        curl_close($curl);
        return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'request' => $request, 'server' => $_SERVER]);

            mail('mail@uwe-horn.net', $currentDate, $th);
        }
        
    }

    public function app_get_beachchair_bookings()
    {
        try {
            $request = $_GET;
            if (!isset($request['startDate'])) {
                return [
                    'error' => 'at least one date is mandatory',
                ];
            }
    
            $requestUrl = $this->get_bookings_endpoint . $request['startDate'];
            if (isset($request['endDate']) && $request['endDate'] !== 'null') {
                $requestUrl .= '/' . $request['endDate'];
            } else {
                $requestUrl .= '/' . $request['startDate'];
            }
    
            $header = ['Token:' . $this->token];
            $curl = curl_init($this->url. $requestUrl);
    
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    
            $curl_response = curl_exec($curl);
    
            curl_close($curl);
    
            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'request' => $request, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }

    }

    public function create_contact_id()
    {
        try {
            $request = json_decode(file_get_contents('php://input'));

            $header = ['Token:' . $this->token];

            $curl = curl_init($this->url . $this->create_contact_endpoint);
            $data = [
                'target_client_hash' => $this->client_id,
                'firstname' => $request->firstName,
                'lastname' => $request->lastName,
                'street' => $request->street,
                'zip_code' => $request->zipCode,
                'city' => $request->city,
                'email' =>
                    isset($request->email) && $request->email !== '' ? $request->email : 'xxx@xxx.xx',
                'mobile' => isset($request->mobile) && $request->mobile != '' ? $request->mobile : '00000000',
                'create_lead' => true,
                'shorttext' => 'Strandkorb',
                'longtext' => isset($request->message) ? $request->message : '',
                'send_email_request' => 'yes',
            ];
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'request' => $request, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
        
    }

    public function create_salesheader_id()
    {
        
        try {
            $request = json_decode(file_get_contents('php://input'));
        
            $header = ['Token:' . $this->token];
            $endpoint = $this->url . $this->create_sales_header_endpoint;
            $curl = curl_init($endpoint);

            curl_setopt($curl, CURLOPT_POST, true);
            $data = [
                'target_client_hash' => $this->client_id,
                'sellto_contact_id' => $request->contact_id,
            ];
            
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'request' => $request, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
        
    }

    public function create_salesline_id()
    {
        try {
            $request = json_decode(file_get_contents('php://input'));

            $start = $request->startDate;
            if ($request->startTime) {
                $start .= 'T' . $request->startTime;
            }

            $end = isset($request->endDate) ? $request->endDate : $request->startDate;
            if ($request->endTime) {
                $end .= 'T' . $request->endTime;
            }

            $header = ['Token: ' . $this->token];
            $curl = curl_init($this->url . $this->create_sales_line_endpoint);
            //As this is a POST Request we need to set the data and method
            curl_setopt($curl, CURLOPT_POST, true);
            $data = [
                'target_client_hash' => $this->client_id,
                'sales_header_id' => $request->salesHeaderId,
                'object_id' => $request->id,
                'object_code' => isset($request->object_code) ? $request->object_code : $this->object_code,
                'quantity' => $request->quantity,
                'quantity_to_book' => 1,
                'date_from' => $start,
                'date_to' => $end,
                'discount' => isset($request->discount) ? $request->discount : null,
                'ship_to_contact' => isset($request->ship_to_contact_id) ? $request->ship_to_contact_id : null,
                'voucher_template_id' => isset($request->voucher_template_id) ? $request->voucher_template_id : null
            ];
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'request' => $request, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
        
    }

    public function create_sales_invoice_id()
    {
        try {
            $sales_header_id = isset($_GET['sales_header_id']) ? $_GET['sales_header_id'] : null;

            if (!$sales_header_id) {
                return [
                    'error' => 'Uppps, something went wrong. sales header id is required',
                ];
            }
            $header = ['Token: ' . $this->token];

            $curl = curl_init($this->url . $this->create_sales_invoice_endpoint);
            curl_setopt($curl, CURLOPT_POST, true);
            $data = [
                'target_client_hash' => $this->client_id,
                'sales_header_id' => $sales_header_id,
                'sendEmail' => 1,
            ];
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'request' => $sales_header_id, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
        
    }


    public function get_voucher_list()
    {
        try {
            $header = ['Token: ' . $this->token];
            $curl = curl_init($this->url . $this->get_voucher_endpoint);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
    }

    public function get_voucher_template_list()
    {
        try {
            $header = ['Token: ' . $this->token];
            $curl = curl_init($this->url . $this->get_voucher_templates_endpoint);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        
            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_STRANDKORB_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th, 'server' => $_SERVER]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
    }
}
