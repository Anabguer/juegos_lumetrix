<?php
require_once __DIR__.'/config_hostalia.php';
function require_login(): void {
  if (!uakey()) { http_response_code(401); json_out(['success'=>false,'message'=>'unauthorized']); }
}

