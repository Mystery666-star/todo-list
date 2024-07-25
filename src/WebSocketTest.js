import React, { useEffect } from 'react';

const WebSocketTest = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5001'); // Update the port to 5001

    ws.onopen = function() {
      console.log('WebSocket connected');
    };

    ws.onerror = function(error) {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = function(event) {
      console.log('Message from server:', event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <></>
  );
};

export default WebSocketTest;
