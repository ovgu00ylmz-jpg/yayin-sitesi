const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name } = JSON.parse(event.body);

  const response = await fetch('https://livepeer.studio/api/stream', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer a3c65b81-901d-40e2-9685-6cb1103511dd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      profiles: [
        { name: '720p', bitrate: 2000000, fps: 30, width: 1280, height: 720 }
      ]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data)
  };
};
