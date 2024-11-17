import { useCallback, useEffect, useRef, useState } from "react";
// import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, num, char, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenrator(); 
  }, [length, num, char,passwordGenrator ]);
 
  return (
    
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-20   bg-gray-700 text-orange-500 ">
        <h1 className="text-center my-3 ">Password Genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            ref={passwordRef}
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="password"
            readOnly

          />
          
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0  " onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer "
              onChange={(e) => {
                setLength(e.target.value);
                // console.log(e);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              className="cursor-pointer "
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              className="cursor-pointer "
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
  );
}

export default App;
