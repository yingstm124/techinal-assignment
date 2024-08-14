import { useEffect, useRef } from 'react';
import './App.css'
import io, { Socket } from 'socket.io-client';



function App() {
  const socketRef = useRef<Socket>()
  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('setUsername', 1)
  

    socketRef.current.on('conversation', (obj: object) => {
    console.log(`receive ${obj}`)
   })

   return () => {
    if  (socketRef.current)
      socketRef.current.off('message')
   }
}, []);

  const sendMsg = () => {

    socketRef.current?.emit('conversation', {
      userId: 1,
      receiverId: 2,
      roomId: '12',
      message: 'msg: ' + Date.now().toString()
    })
  }
  return (
    <>
      <button onClick={sendMsg}>send</button>
    </>
  )
}

export default App
