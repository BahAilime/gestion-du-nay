import React, { useState } from 'react';
import { Editor } from 'primereact/editor';

export default function FormInput({ label = "", value = "", onChange = (x) => {} }) {
    const [text, setText] = useState('<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>');

    const renderHeader = () => {
        return (
            <>
                <select className="ql-size">
                    <option value="huge">Enorme</option>
                    <option value="large">Grand</option>
                    <option select="true">Normal</option>
                    <option value="small">Petit</option>
                </select>
                <span className="ql-formats">
                    <button className="ql-bold" aria-label="Bold"></button>
                    <button className="ql-italic" aria-label="Italic"></button>
                    <button className="ql-underline" aria-label="Underline"></button>
                </span>
            </>
        );
    };

    const header = renderHeader();

    return (
        <div className="my-2">
            {label && <label value={value}>{label}</label> }
            <Editor
                value={text}
                onTextChange={(e) => {
                    setText(e.htmlValue)
                    onChange(e.htmlValue)
                }}
                headerTemplate={header}
                style={{ height: '320px' }}
                className='mt-2'
            />
        </div>
    )
}
