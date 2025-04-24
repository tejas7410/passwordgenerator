import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [password, setpassword] = useState("")
  const [length, setlength] = useState(8)
  const [numberallowed, setnumerallowed] = useState(false)
  const [charallowed, setcharallowe] = useState(false)
  const passwordgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    console.log(numberallowed);
    console.log(charallowed);
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "~!@#$%^&*"
    console.log(str);
    for (let i = 0; i < length; i++) {
      let c = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(c)
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword])
  const copypasstoclipboard = useCallback(() => {
    passref.current?.select();
    // passref.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password);
  }, [password])
  useEffect(() => { passwordgen() }, [length, numberallowed, charallowed, passwordgen]);
  const passref = useRef(null)

  return (
    <>
      <div className="w-screen h-screen bg-gray-700">
        <div className='w-1/2 py-10 m-auto border-2 border-white'>
          <div className='text-3xl text-center text-white'>Random Password Generator</div>
          <div className=" flex gap-6 mb-4 overflow-hidden text-white rounded-lg shadow">
            <input
              type='text'
              value={password}
              className='border-6 rounded-1xl w-full px-3 py-1 ml-2 text-black bg-white border-white'
              placeholder="Password"
              readOnly
              ref={passref}
            />
            <button onClick={copypasstoclipboard} className='rounded-3xl shrink-0 px-6 mr-3 text-2xl border-2'>Copy</button>
          </div>
          <div className=' flex flex-wrap gap-4 ml-5 mr-5 text-2xl'>
            <div className='flex gap-2'>

              <input
                type='range'
                value={length}
                min={8}
                max={20}
                className='cursor-pointer'
                onChange={(e) => { setlength(e.target.value) }}
              />
              <label>Length: {length}</label>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                defaultChecked={numberallowed}
                id='numberInput'
                onChange={() => { setnumerallowed((prev) => !prev); }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                defaultChecked={charallowed}
                id='characterInput'
                onChange={() => { setcharallowe((prev) => !prev); }}
              />
              <label htmlFor='CharacterInput'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
