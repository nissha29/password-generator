import { useCallback, useEffect, useRef, useState } from "react";
import { FaClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charactersAllowed, setCharactersAllowed] = useState(false)
  const [iconColor, setIconColor] = useState("#000"); 
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const passwordRef = useRef(null)

  const generatePassword = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numbersAllowed) str += "01234567890123456789"
    if(charactersAllowed) str += "!@#$%&!@#$%&"

    for(let i=0; i<length; i++){
      let index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }
    setPassword(pass)
  }, [length, numbersAllowed, charactersAllowed])

  const copyPasswordToClipBoard = useCallback( () => {
    window.navigator.clipboard.writeText(password)
    setIconColor("#7f641e");
    setShowCheckIcon(true)
    setTimeout(() => {
      setIconColor("#000")
      setShowCheckIcon(false)
    }, 2000);
  }, [password])

  useEffect( () => {
    generatePassword()
  }, [generatePassword, length, numbersAllowed, charactersAllowed])

  return (
    <>
      <h1 className="flex justify-center pt-44 text-black font-[650] tracking-wider text-[27px] sm:text-[35px]">Password Generator</h1>

      <div className="flex flex-wrap gap-5 justify-center items-center pt-5">
        <div className="relative w-[30rem] mx-3">
          <input
            value={password}
            readOnly
            type="text"
            className="outline-none w-full h-[3rem] border border-[#000] rounded-xl bg-transparent text-[#7f641e] text-[20px] font-semibold px-5"
            placeholder="Here is your Password..."
            ref={passwordRef}
          />
          <div className="absolute right-2 top-[25%] flex items-center">
          {showCheckIcon ? (
              <FaClipboardCheck
                style={{ color: iconColor }}
                className="text-[25px] hover:text-[#595757e1]"
              />
            ) : (
              <FaClipboard
                onClick={copyPasswordToClipBoard}
                style={{ color: iconColor }}
                className="text-[25px] hover:text-[#595757e1]"
                title="copy to clipboard"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-5">
        <div className="flex flex-wrap justify-center items-center gap-5">
          <label htmlFor="range" className="text-[19px] font-semibold mt-9">Length: {length}</label>
          <input 
            value={length} 
            onChange={ (e) => setLength(e.target.value)}
            type="range" 
            className=" mt-10 accent-black h-1 cursor-pointer hover:h-[5px]"
            min={8}
            max={100}
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5">
          <label htmlFor="range" className="text-[19px] font-semibold mt-9">Numbers</label>
          <input 
            defaultChecked={numbersAllowed}
            onChange={() => setNumbersAllowed( (prev) => !prev)}
            type="checkbox" 
            className="mt-10 accent-black cursor-pointer"
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5">
          <label htmlFor="range" className="text-[19px] font-semibold mt-9">Characters</label>
          <input 
             defaultChecked={numbersAllowed}
             onChange={() => setCharactersAllowed( (prev) => !prev)}
            type="checkbox" 
            className="mt-10 accent-black cursor-pointer"
          />
        </div>
      </div>
    </>
  )
}

export default App
