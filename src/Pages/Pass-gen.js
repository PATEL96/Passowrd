import React, { useState } from "react";
import './Pass-gen.css';
import {numbers, uppercase, lowercase, symbols} from './Characters';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './Message';

function PassGen() {
    const [password, setPassword] = useState('');
    const [passLength, setPasswordLength] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(false);
    const [includeLower, setIncludelower] = useState(false);
    const [includeNumber, setIncludeNumber] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);

    const handleGeneratePassword = (e) => {
        let characterList = ''
        if(!includeLower && !includeNumber && !includeSymbols && !includeUpper) {
            notify("Please select At Least One", true)
        }

        if(includeUpper) {
            characterList = characterList + uppercase
        }

        if(includeLower) {
            characterList = characterList + lowercase
        }

        if(includeNumber) {
            characterList = characterList + numbers
        }

        if(includeSymbols) {
            characterList = characterList + symbols
        }

        setPassword(createPassword(characterList))
    }

    const createPassword = (characterList) => {
        let password = ''
        const characterListLength = characterList.length

        for(let i=0; i < passLength; i++) {
            const characterIndex = Math.round(Math.random() * characterListLength)
            password = password + characterList.charAt(characterIndex)
        }
        return password;
    }

    const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea')
        newTextArea.innerText = password
        document.body.appendChild(newTextArea)
        newTextArea.select()
        document.execCommand('copy')
        newTextArea.remove()
    }

    const notify = (message, hasError = false) => {
        if(hasError) {
            toast(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } else {
            toast(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        
    }

    const handleCopyPassword = (e) => {
        copyToClipboard()
        notify(COPY_SUCCESS)
    }

    return (
        <div className="Pass-info">
            Password Generator
            <div className="area-dis">
                <div className="pass-name">
                    {password}
                </div>
                <button onClick={handleCopyPassword} className="Copy-btn">
                    <i className="fas fa-clipboard"></i>
                </button>
            </div>
            {/* done */}
            <div className="Pre-req">
                <div className="length">
                    <label htmlFor="password-length" className="password-length">Password Length</label>
                    <input type="number" id="password-length" defaultValue={passLength} name="password-length" max="30" min="6" className="length-box" onChange={(e) => setPasswordLength(e.target.value)} />
                </div>
                <div className="Upper-case">
                    <label htmlFor="upper-case" className="Upper-case-pos">Include Upper Case Letters</label>
                    <input type="checkbox" id="upper-case" name="upper-case" className="Upper-case-check" checked={includeUpper}  onChange={(e) => setIncludeUpper(e.target.checked)}/>
                </div>
                <div className="Lower-case">
                    <label htmlFor="lower-case" className="Lower-case-pos">Include Lower Case Letters</label>
                    <input type="checkbox" id="lower-case" name="lower-case" className="Lower-case-check" checked={includeLower} onChange={(e) =>setIncludelower(e.target.checked)} />
                </div>
                <div className="Numbers">
                    <label htmlFor="numbers" className="Numbers-pos">Include Numers</label>
                    <input type="checkbox" id="numbers" name="numbers" className="Numbers-check" checked={includeNumber} onChange={(e) => setIncludeNumber(e.target.checked)} />
                </div>
                <div className="Symbols">
                    <label htmlFor="symbols" className="Symbols-pos">Include Symbols</label>
                    <input type="checkbox" id="symbols" name="symbols" className="Symbols-check" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)}/>
                </div>
                <button className="Generate-btn" onClick={handleGeneratePassword} >Generate Password</button>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    )
}

export default PassGen;