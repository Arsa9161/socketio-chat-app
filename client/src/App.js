import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
let socket = io("http://localhost:5000");

function App() {
  // useEffect(() => {

  // }, [])
  const f = (e) => {
    fetch("http://localhost:5000").then((res) => console.log());
  };
  return (
    <div>
      REACTTt
      <button onClick={f}></button>
    </div>
  );
}

export default App;
