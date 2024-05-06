import React, { useState } from 'react';
import { Editor } from 'primereact/editor';

export default function FormInput({ label = "", value = "", onChange = (x: any) => {x}, readOnly = false } : 
                        { label?: string, value?: string, onChange?: (x: any) => void, readOnly?: boolean }) {
    const [text, setText] = useState(value);

    const renderHeader = () => {
        return (
            <>
                <select className="ql-size">
                    <option value="huge">Enorme</option>
                    <option value="large">Grand</option>
                    <option selected>Normal</option>
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
            {(label && !readOnly) && <label>{label}</label> }
            <Editor
                value={text}
                onTextChange={(e) => {
                    if (e.htmlValue) {
                        setText(e.htmlValue)
                    }
                    onChange(e.htmlValue)
                }}
                headerTemplate={readOnly ? <>{label}</> : header}
                style={{ height: '200px' }}
                className='mt-2'
                readOnly={readOnly}
            />
        </div>
    )
}
