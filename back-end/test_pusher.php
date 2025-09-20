<?php

require __DIR__.'/vendor/autoload.php';


$options = array(
  'cluster' => 'mt1',
  'useTLS' => true
);

$pusher = new Pusher\Pusher(
  '71140512c79dedf61e7d',
  '4b8c104d55a1436419a1',
  '2053595',
  $options
);

$data['message'] = 'hello world';
$pusher->trigger('my-channel', 'my-event', $data);

echo "Event sent!";