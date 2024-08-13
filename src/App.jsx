import { useCallback, useEffect, useRef, useState } from "react";
import { FaClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charactersAllowed, setCharactersAllowed] = useState(false)
  const [iconColor, setIconColor] = useState("#fff"); 
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const passwordRef = useRef(null)

  const generatePassword = useCallback( () => {
    let pass = ""
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"

    if(numbersAllowed) str = "Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9Kk0Ll1Mm2Nn3Oo4Pp5Qq6Rr7Ss8Tt9Uu0Vv1Ww2Xx3Yy4Zz5"
    if(charactersAllowed) str = "AaBb!@#$%&CcDdEeFf!@#$%&GgHhIiJjKkLlMmNnOoPpQqRrSsT!@#$%&tUuVvWwXx!@#$%&YyZz"

    for(let i=0; i<length; i++){
      let index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }
    setPassword(pass)
  }, [length, numbersAllowed, charactersAllowed])

  const handleKeyDown = (e) => {
    e.preventDefault()
  }

  const copyPasswordToClipBoard = useCallback( () => {
    window.navigator.clipboard.writeText(password)
    setIconColor("#7f641e");
    setShowCheckIcon(true)
    setTimeout(() => {
      setIconColor("#fff")
      setShowCheckIcon(false)
    }, 2000);
  }, [password])

  const generate = () => {
    generatePassword()
  }


  return (
    <>
      
      <div className="flex justify-center items-center pt-14">
        <h1 className="flex justify-center text-white font-[650] tracking-wider text-[25px]">Password Generator</h1>
      </div>

      <div className="flex gap-4 flex-wrap justify-center items-center pt-5 pr-32">
        <div className="relative w-[22rem] flex flex-wrap justify-center items-center ml-28">
          <input
            value={password}
            readOnly
            type="text"
            className="outline-none w-full h-[3rem] border border-[#fff] rounded-xl bg-transparent text-[#7f641e] text-[20px] font-semibold px-5"
            placeholder="Password"
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

      <div className="flex flex-wrap justify-center items-center gap-5 text-white">
      <div className="flex flex-wrap justify-center items-center gap-3">
        <label htmlFor="number" className="text-[19px] font-semibold mt-9">Length </label>
          <input 
            id="number" 
            value={length} 
            onChange={(e) => setLength(e.target.value)}
            type="number" 
            className="mt-10 accent-white h-7 w-10 text-black font-semibold text-center focus:outline-none" 
            min={8}
            max={100}
            onKeyDown={handleKeyDown} 
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5">
          <label htmlFor="checkbox" className="text-[19px] font-semibold mt-10">Numbers</label>
          <input 
            defaultChecked={numbersAllowed}
            onChange={() => setNumbersAllowed( (prev) => !prev)}
            type="checkbox" 
            className="mt-10 accent-white cursor-pointer"
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5">
          <label htmlFor="checkbox" className="text-[19px] font-semibold mt-10">Characters</label>
          <input 
             defaultChecked={numbersAllowed}
             onChange={() => setCharactersAllowed( (prev) => !prev)}
            type="checkbox" 
            className="mt-10 accent-white cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-5 mb-5">
        <button 
          onClick={generate}
          className="bg-white text-[#000] font-semibold tracking-wider text-[20px] px-4 py-2 rounded-md">Generate
        </button>
      </div>
    </>
  )
}

export default App
