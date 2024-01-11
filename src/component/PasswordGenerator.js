import { useState, useCallback, useEffect, useRef } from 'react'
import './PasswordGenerator.scss'

function PasswordGenerator() {

  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isSecurePassword, setIsSecurePassword] = useState(false);
  const [isStrongPassword, setIsStrongPassword] = useState(false);


  const passwordRef = useRef(null);


   


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed])




    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
    }, [password])
  

    useEffect(() => {
      passwordGenerator()
    }, [length, numberAllowed, charAllowed, passwordGenerator])


    useEffect(() => {
      
      if (numberAllowed && charAllowed ) {
        document.body.style.backgroundColor = '#D2E3C8'; 
        setIsSecurePassword(true);
      } 
      else if (numberAllowed ||charAllowed ) {
        document.body.style.backgroundColor = '#FF8080'; 
        setIsSecurePassword(false);
      } 

      else {
        document.body.style.backgroundColor = ''; 
        setIsSecurePassword(false);
      }
    }, [charAllowed,numberAllowed]);

  return (
    <div className='container'>
      <h1 className='heading'>Passcode Generator</h1>
      <div className='inputbox'>
      <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        >copy</button>

      </div>

      <div className='attributes'>
      <div className='range'>
        <input 
        type="range"
        min={6}
        max={40}
        value={length}
         
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="numberAllowed">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="CharAllowed">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Special Characters</label>
      </div>
    </div>
    <button className="show" onClick={() => setPasswordVisible((prev) => !prev)}>
    {passwordVisible ? "Hide" : "Show"}
  </button>

       <div className='message'>
        {isSecurePassword ? 'Strong Password' : (charAllowed||numberAllowed)? 'Moderate Strong Password': 'Weak Password'}
      </div>
    </div>
  )
}

export default PasswordGenerator
