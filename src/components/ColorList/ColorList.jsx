import './ColorList.css';
import { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';

export default function ColorList() {
    const randomNameInput = useRef(null);
    const pickerNameInput = useRef(null);

    const onInputFocus = (e) => {
        randomNameInput.current.ariaInvalid = "";
        pickerNameInput.current.ariaInvalid = "";
        e.target.select();
    }

    useEffect(() => {
        const randomInput = randomNameInput.current;
        const pickerInput = pickerNameInput.current;
        randomInput.ariaInvalid = "";
        pickerInput.ariaInvalid = "";

        randomInput.addEventListener("focus", onInputFocus);
        pickerInput.addEventListener("focus", onInputFocus);

        return (() => {
            randomInput.removeEventListener("focus", onInputFocus);
            pickerInput.removeEventListener("focus", onInputFocus);
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
    
    const addColor = (title, target, hex = "") => {
        randomNameInput.current.ariaInvalid = "";
        pickerNameInput.current.ariaInvalid = "";
        let error = "";

        if (title === '') error = "noname";
        else if (colors.filter(c => c.title === title).length > 0) error = "usedname";
        else if (colors.filter(c => c.hex === hex).length > 0) error = "color";

        if (target === "random") randomNameInput.current.ariaInvalid = error;
        else pickerNameInput.current.ariaInvalid = error;

        if (error === "") {
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
    }

    return (
        <>
            <ul className="cl-wrapper">
                {colors.map((c) => <li style={{color:c.hex}} key={c.title}>{c.title + "(" + c.red + "," + c.green + "," + c.blue + ")"}</li>)}
            </ul>
            <span className="cl-new-span">
                <div className="cl-new-random">
                    <h3 className="cl-new-random-h3">Zufällige Farbe</h3>
                    <div className="cl-new-input-wrapper">
                        <input ref={randomNameInput} id="randomName" className='cl-new-input' type="text" value={randomColorName} onChange={(e) => setRandomColorName(e.target.value)}/>
                        <label htmlFor='randomName'>Farbtitel</label>
                    </div>
                    <button className='cl-new-button' onClick={() => addColor(randomColorName, "random")}>Hinzufügen</button>
                </div>
                <div className="cl-new-picker">
                    <SketchPicker className="cl-picker" color={sketchColor} onChangeComplete={(color) => setSketchColor(color.hex)}/>
                    <div className="cl-new-input-wrapper">
                        <input ref={pickerNameInput} id="pickerName" className='cl-new-input' type="text" value={sketchColorName} onChange={(e) => setSketchColorName(e.target.value)}/>
                        <label htmlFor='pickerName'>Farbtitel</label>
                    </div>
                    <button className='cl-new-button' onClick={() => addColor(sketchColorName, "picker", sketchColor)}>Hinzufügen</button>
                </div>
            </span>
        </>
    );
}