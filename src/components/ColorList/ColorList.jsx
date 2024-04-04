import './ColorList.css';
import { useState } from 'react';

export default function ColorList() {
    const data = [
        {title: 'red', red: 255, green: 0, blue: 0, html: '#FF0000'},
        {title: 'green', red: 0, green: 255, blue: 0, html: '#00FF00'},
        {title: 'blue', red: 0, green: 0, blue: 255, html: '#0000FF'},
    ];

    const [colors, setColors] = useState(data);
    const [newColor, setNewColor] = useState('');
    
    const addColor = () => {
        if (newColor === '') return;
        if (colors.filter(c => c.title === newColor).length === 0) {
            const red = Math.floor(Math.random() * 255);
            const green = Math.floor(Math.random() * 255);
            const blue = Math.floor(Math.random() * 255);
            const html = ('#' + red.toString(16) + green.toString(16) + blue.toString(16)).toUpperCase();
            setColors([{title:newColor, red, green, blue, html} , ...colors]);
        }

        setNewColor('');
    }

    return (
        <>
            <ul className="cl-wrapper">
                {colors.map((c) => <li style={{color:c.html}} key={c.title}>{c.title + "(" + c.red + "," + c.green + "," + c.blue + ")"}</li>)}
            </ul>
            <span clasName="cl-new-span">
                <input className='cl-new-input' type="text" value={newColor} onChange={(e) => setNewColor(e.target.value)}/>
                <button className='cl-new-button' onClick={addColor}>Hinzufügen</button>
            </span>

        </>
    );
}