<?php
if (function_exists('opcache_reset')) { opcache_reset(); echo "OPCACHE_RESET=ok\n"; }
else { echo "OPCACHE_RESET=not_available\n"; }
?>

