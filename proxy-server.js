import http from 'http';
import net from 'net';

const PROXY_PORT = 5000;
const TARGET_HOST = 'localhost';
const TARGET_PORT = 3000;

// Crear servidor proxy
const server = http.createServer((req, res) => {
  const options = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  // Eliminar header host para evitar validación
  delete options.headers['host'];
  options.headers['host'] = `${TARGET_HOST}:${TARGET_PORT}`;

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Service Unavailable');
  });

  req.pipe(proxyReq);
});

// Manejar WebSocket
server.on('upgrade', (req, socket, head) => {
  const proxySocket = net.createConnection({
    host: TARGET_HOST,
    port: TARGET_PORT,
  });

  proxySocket.on('connect', () => {
    socket.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n\r\n`);
    proxySocket.write(head);
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxySocket.on('error', (err) => {
    console.error('WebSocket error:', err);
    socket.destroy();
  });
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`✓ Proxy server running on port ${PROXY_PORT}`);
  console.log(`✓ Forwarding to Angular dev server on ${TARGET_HOST}:${TARGET_PORT}`);
  console.log(`✓ Access via: http://localhost:${PROXY_PORT}`);
});

