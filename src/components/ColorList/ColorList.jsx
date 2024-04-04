import './ColorList.css';
import { useState } from 'react';

export default function ColorList() {
    const data = [
        {title: 'red', red: 255, green: 0, blue: 0, html: '#FF0000'},
        {title: 'green', red: 0, green: 255, blue: 0, html: '#00FF00'},
        {title: 'blue', red: 0, green: 0, blue: 255, html: '#0000FF'},
    ];

    const [colors, setColors] = useState(data);
    return (
        <ul className="cl-wrapper">
            {colors.map((c) => <li style={{color:c.html}} key={c.title}>{c.title + "(" + c.red + "," + c.green + "," + c.blue + ")"}</li>)}
        </ul>
    );
}