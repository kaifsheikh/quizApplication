// api/login.js
// Yeh array hi aapki "credentials list" hai – server‑side safe.
const USERS = [
  { username: "zarmeen", password: "zarmeen12" },
  { username: "sanam", password: "sanam12" },
  { username: "sania", password: "sania12" },
  { username: "neha", password: "neha12" },
  { username: "kaif", password: "kaif12" },
  { username: "amang", password: "amang12" },
  { username: "anaya", password: "anaya12" },
  { username: "nitesh", password: "nitesh12" },
  { username: "jayesh", password: "jayesh12" },
];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Check karo
  const user = USERS.find(u => u.username === username && u.password === password);

  if (user) {
    // Success – login allowed
    return res.status(200).json({ success: true });
  } else {
    // Invalid credentials
    return res.status(200).json({ success: false });
  }
}