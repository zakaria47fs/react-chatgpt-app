import './App.css';
import axios from "axios";
import { useState } from "react";


function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInput = async (event) => {
    event.preventDefault();
    setMessages([...messages, { message: input, sender: 'user' }]);

    axios
      .post("http://localhost:8080/chat", { input })
      .then((response) => {
        setMessages([...messages, { message: response.data, sender: 'bot' }]);
        setInput('');
      })
      .catch((err) => {
        console.error(err);
      }); 
  }

  return (
  //   <div>
  //     {messages.map((message, index) => (
  //       <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
  //         <span>{message.message}</span>
  //       </div>
  //     ))}
  //     <form onSubmit={handleInput}>
  //       <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
  //       <button type="submit">Send</button>
  //     </form>
  //   </div>
  // );
    <div style={{ width: '500px', margin: '0 auto' }}>
    <h1>Chatbot</h1>
    <div
      style={{
        maxHeight: '400px',
        height: '400px',
        border: '1px solid black',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            textAlign: message.sender === 'user' ? 'right' : 'left',
            marginBottom: '5px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '5px',
              borderRadius: '10px',
              backgroundColor: message.sender === 'user' ? 'lightblue' : 'lightgray',
            }}
          >
            {message.message}
          </span>
        </div>
      ))}
    </div>
    <form onSubmit={handleInput} style={{ marginTop: '10px' }}>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        style={{ width: '80%', padding: '5px' }}
      />
      <button type="submit" style={{ padding: '5px' }}>
        Send
      </button>
    </form>
  </div>
  );
};

export default App;
