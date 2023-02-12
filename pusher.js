import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
  appId: '1552727',
  key: 'cf7a8823bfa699f11277',
  secret: 'dbbce7c92e4a78d4bc20',
  cluster: 'eu',
  useTLS: true,
});

export const clientPusher = new ClientPusher('cf7a8823bfa699f11277', {
  cluster: 'eu',
});
