import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const sendIcon = <svg className="fill-current w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448.011 448.011"><path d="M438.731 209.463l-416-192c-6.624-3.008-14.528-1.216-19.136 4.48a15.911 15.911 0 00-.384 19.648l136.8 182.4-136.8 182.4c-4.416 5.856-4.256 13.984.352 19.648 3.104 3.872 7.744 5.952 12.448 5.952 2.272 0 4.544-.48 6.688-1.472l416-192c5.696-2.624 9.312-8.288 9.312-14.528s-3.616-11.904-9.28-14.528z"/></svg>
let socket

function App() {
  const [id, setId] = useState()
  const [name, setName] = useState('arsa')
  const [messageList, setMessageList] = useState([])
  const input = useRef()

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.on('message', function(msg) {
      setMessageList(prev => [...prev, msg])
      window.scrollTo(0, document.body.scrollHeight);
    });
    socket.on('your id', function(id) {
      setId(id)
    });
    let userName = prompt('Та нэрээ оруулна уу')
    userName ?  setName(userName) :  setName('user')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.current.value) {
      let msg = {
        id,
        name,
        message : input.current.value
      }
      socket.emit('message', msg);
      input.current.value = ''
    }
  }

  const Message = ({messageId, name, message}) => {
    let isMe = messageId == id
    return (
      <li className={isMe ? 'text-right' : 'text-left'}>
        {!isMe && <p className="text-sm opacity-50 ml-2">{name}</p>}
        <p className={`py-1 px-4 mb-3 rounded-2xl inline-block ${isMe ? 'bg-gray-200' : 'bg-yellow-500 text-white'}`}>
          {message}
        </p>
      </li> 
    )
  }

  const Messages = () => (
    <ul className="p-3">
      {messageList.length > 0 
        ? 
         messageList.map((message, index) => <Message key={index} messageId={message.id} name={message.name} message={message.message}/>)
        :
         <p>Энд нэг л нам гүм байх чинь. Гоё зүйлс илгээгээч ;)</p>
      }
    </ul>
  )

  const MessagesContainer = () => (
    <main className="overflow-y-auto">
      <Messages />
    </main> 
  )

  const Textarea = () => (
    <form className="max-h-32 py-3 px-5 flex justify-around align-center">
      <input ref={input} type="text" placeholder="Aa" className="bg-gray-200 rounded-2xl h-10 outline-none px-3 py-1"/>
      <button onClick={handleSubmit} className="w-10 h-10 rounded-full text-yellow-500 p-1.5 outline-none hover:text-yellow-600">
        {sendIcon}
      </button>
    </form>
  )

  const Chat = () => (
    <section className="h-3/5 lg:w-1/4 sm:w-4/5  bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
      <MessagesContainer />
      <Textarea />
    </section>
  )

  return (
    <div class="h-screen flex justify-center items-center bg-gradient-to-br from-purple-300 to-blue-500 select-none">
      <Chat />
    </div>
  );
}

export default App;
