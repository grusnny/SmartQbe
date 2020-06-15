const mqtt = require('mqtt');

const client = mqtt.connect('mqtts://mqtt.flespi.io:8883', {
  clientId: 'flespi-examples-mqtt-client-nodejs',
  // see https://flespi.com/kb/tokens-access-keys-to-flespi-platform to read about flespi tokens
  username: `FlespiToken ${"fmZr12yVuqMjLEBr3n2FLPINBPzRBmpGweVn4k7oAHybbXr38hyKW4nlKK3bXgFj"}`,
  protocolVersion: 5,
  clean: true,
});
console.log('mqtt client created, connecting...');

client.on('connect', () => {
  console.log('connected, subscribing to "test" topic...');

  client.subscribe('test', {qos: 1}, (err) => {
    if (err) {
      console.log('failed to subscribe to topic "test":', err);
      return;
    }
    console.log('subscribed to "test" topic, publishing message...');
    client.publish('test', 'hello from flespi mqtt client example script!', {qos: 1});
  });
});

client.on('message', (topic, msg) => {
  console.log(`received message in topic "${topic}": "${msg.toString('utf8')}"`);
  console.log('disconnecting...');
  client.end();
});

client.on('close', () => {
  console.log('disconnected');
})

client.on('error', (err) => {
  console.log('mqtt client error:', err);
  client.end(true) // force disconnect and stop the script
});