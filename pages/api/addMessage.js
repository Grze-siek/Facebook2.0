import { db } from '../../firebase';
import { serverPusher } from '../../pusher';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ body: 'Method not allowed' });
    return;
  }

  const { message } = req.body;
  const newMessage = {
    ...message,
    created_at: Date.now(),
  };
  console.log(newMessage);

  db.collection('messages').doc(message.id).set(newMessage);
  serverPusher.trigger('messages', 'new-message', newMessage);

  res.status(200).json({ message: newMessage });
}
