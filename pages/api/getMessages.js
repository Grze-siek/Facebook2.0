import { db } from '../../firebase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ body: 'Method not allowed' });
    return;
  }
  const messagesArr = [];
  return await db
    .collection('messages')
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        messagesArr.push({ ...doc.data() });
      });

      const messages = messagesArr.sort((a, b) => b.created_at - a.created_at);
      res.status(200).json({ messages });
    });
}
