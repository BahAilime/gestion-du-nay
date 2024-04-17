import React from 'react';
import { InputText } from 'primereact/inputtext';

export default function FormInput({ label, name, value = "", onChange = (x) => {}}) {
    return (
        <div className="flex flex-col gap-1 text-nay-white-100 my-4">
            <label htmlFor={name} value={value}>{label}</label>
            <InputText id={name} aria-describedby={`${name}-help`} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}
