import './ColorList.css';
import { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';

export default function ColorList() {
    const randomNameInput = useRef(null);
    const pickerNameInput = useRef(null);

    const onInputFocus = (e) => {
        randomNameInput.current.ariaInvalid = false;
        pickerNameInput.current.ariaInvalid = false;
        e.target.select();
    }

    useEffect(() => {
        document.getElementById("pickerName").addEventListener("focus", onInputFocus);
        document.getElementById("randomName").addEventListener("focus", onInputFocus);

        return (() => {
            document.getElementById("pickerName").removeEventListener("focus", onInputFocus);
            document.getElementById("randomName").removeEventListener("focus", onInputFocus);
        });
    }, [])

    const data = [
        {title: 'red', red: 255, green: 0, blue: 0, hex: '#FF0000'},
        {title: 'green', red: 0, green: 255, blue: 0, hex: '#00FF00'},
        {title: 'blue', red: 0, green: 0, blue: 255, hex: '#0000FF'},
    ];

    const [colors, setColors] = useState(data);
    const [randomColorName, setRandomColorName] = useState('');
    const [sketchColor, setSketchColor] = useState('#000000');
    const [sketchColorName, setSketchColorName] = useState('');
    
    const addColor = (title, hex = "") => {
        randomNameInput.current.ariaInvalid = false;
        pickerNameInput.current.ariaInvalid = false;
        const isUnusedTitle = colors.filter(c => c.title === title).length === 0;

        if (title !== '' && isUnusedTitle) {
            let [red, green, blue] = [];
            if (hex !== "") {
                [red, green, blue] = hex.slice(1).match(/.{1,2}/g).map(c => Number.parseInt(c, 16));
            }
            else {
                red = Math.floor(Math.random() * 255);
                green = Math.floor(Math.random() * 255);
                blue = Math.floor(Math.random() * 255);
                hex = ('#' + red.toString(16) + green.toString(16) + blue.toString(16)).toUpperCase();
            }
            
            setColors([{title, red, green, blue, hex} , ...colors]);

            setSketchColorName('');
            setRandomColorName('');

        }
        else {
            console.log("sketchColor.hex: ", sketchColor);
            console.log("hex: ",hex);
            if (hex === "") {
                randomNameInput.current.ariaInvalid = true;
            }
            else {
                pickerNameInput.current.ariaInvalid = true;
            }
        }
    }

    return (
        <>
            <ul className="cl-wrapper">
                {colors.map((c) => <li style={{color:c.hex}} key={c.title}>{c.title + "(" + c.red + "," + c.green + "," + c.blue + ")"}</li>)}
            </ul>
            <span className="cl-new-span">
                <div className="cl-new-random">
                    <h3 className="cl-new-random-h3">Zufällige Farbe</h3>
                    <input ref={randomNameInput} id="randomName" className='cl-new-input' type="text" value={randomColorName} onChange={(e) => setRandomColorName(e.target.value)}/>
                    <button className='cl-new-button' onClick={() => addColor(randomColorName)}>Hinzufügen</button>
                </div>
                <div className="cl-new-picker">
                    <SketchPicker className="cl-picker" color={sketchColor} onChangeComplete={(color) => setSketchColor(color.hex)}/>
                    <input ref={pickerNameInput} id="pickerName" className='cl-new-input' type="text" value={sketchColorName} onChange={(e) => setSketchColorName(e.target.value)}/>
                    <button className='cl-new-button' onClick={() => addColor(sketchColorName, sketchColor)}>Hinzufügen</button>
                </div>
            </span>
        </>
    );
}