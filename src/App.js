import { useState } from "react";
import { ethers } from "ethers";
// Import ABI Code to interact with smart contract
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import "./App.css";


const greeterAddress = "0xc7F4781B15001c2BB90933F513816A9865d93580";

function App() {
  

  const [message, setMessage] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  
  async function fetchGreeting() {
    if (!message) return;

    
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(message);

      setMessage("");
      await transaction.wait();
      fetchGreeting();
    }
  }


  async function setGreeting() {
    if (!message) return;

    
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(message);

      setMessage("");
      await transaction.wait();
      fetchGreeting();
    }
  }

  // Return
  return (
    <div className="App">
      <div className="App-header">
        {/* DESCRIPTION  */}
        <div className="description">
          <h1>HELLO ARBITRUM</h1>
          <h3>Do You Like BLOCKCHAIN?</h3>
        </div>
        {/* BUTTONS - Fetch and Set */}
        <div className="custom-buttons">
          <button onClick={fetchGreeting} style={{ backgroundColor: "green" }}>
            YES
          </button>
          <button onClick={setGreeting} style={{ backgroundColor: "red" }}>
            NO
          </button>
        </div>
        {/* INPUT TEXT - String  */}
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Your ANSWER IS..."
        />

        {/* Current Value stored on Blockchain */}
        <h2 className="greeting">Answer: {currentGreeting}</h2>
      </div>
    </div>
  );
}

export default App;
