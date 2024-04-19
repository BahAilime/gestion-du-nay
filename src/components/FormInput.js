import React from 'react';
import { InputText } from 'primereact/inputtext';

export default function FormInput({ label, name, value = "", onChange = (x) => {}, keyfilter = "" }) {
    return (
        <div className="flex flex-col gap-1 mt-2 mb-3 w-full">
            <label htmlFor={name}>{label}</label>
            <InputText value={value} id={name} aria-describedby={`${name}-help`} onChange={(e) => onChange(e.target.value)} keyfilter={keyfilter}/>
        </div>
    );
}
