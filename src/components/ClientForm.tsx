import React, { useEffect, useState } from 'react';

import useMultiState from "../hooks/useMultiState";
import FormInput from "./FormInput";
import SimpleEditor from "./SimpleEditor";

import { useMountEffect } from 'primereact/hooks'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faSchool, faPersonShelter, faGift, faWheelchairMove, faGraduationCap, faEye } from '@fortawesome/free-solid-svg-icons'

import { SelectButton } from 'primereact/selectbutton';

export default function ClientForm({ dataImport={}, onChange = (x: any) => {x} }) {
    const [ data, addState,,, setState ] = useMultiState();
    const [ready, setReady] = useState(false)

    useMountEffect(() => {
        setState(dataImport);
        setReady(true)
    })

    useEffect(() => {
        onChange(data)
        console.log(data);
    }, [data])

    // TODO: rendre ca configurable
    const optionsBtn = [
        {icon: faQuestion, value: 'Inconnu'},
        {icon: faSchool, value: 'École'},
        {icon: faPersonShelter, value: 'CLSH/CE/ASS'},
        {icon: faWheelchairMove, value: 'Handi'},
        {icon: faGraduationCap, value: 'Formation'},
        {icon: faGift, value: 'Privé'},
        {icon: faEye, value: 'Autre'},
    ];

    const templateBtn = (option: {icon: any, value: string}) => {
        return (
        <div className="flex flex-col items-center, justify-center">
            <FontAwesomeIcon icon={option.icon} className="text-xl"/>
            <h1>{option.value}</h1>
        </div>
    );
    }

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <SelectButton
                    value={data.type_cli}
                    onChange={(type) => addState("type_cli", type.value)}
                    itemTemplate={templateBtn}
                    optionLabel="value"
                    options={optionsBtn}
                />
            </div>
            <FormInput value={data.nom_cli} label="Nom de la structure" name="name" onChange={(name) => addState("nom_cli", name)}/>
            <FormInput value={data.resp_cli} label="Nom du responsable" name="resp" onChange={(resp) => addState("resp_cli", resp)}/>
            <div className="flex w-full gap-4 flex-col lg:flex-row flex-wrap">
                <FormInput value={data.email_cli} label="Email" name="email" onChange={(email) => addState("email_cli", email)}  keyfilter="email"/>
                <FormInput value={data.tel_cli} label="Téléphone" name="tel" onChange={(tel) => addState("tel_cli", tel)}/>
            </div>
            <FormInput value={data.adr_cli} label="Adresse" name="adr" onChange={(adr) => addState("adr_cli", adr)}/>
            <div className="flex w-full gap-4 flex-wrap">
                <FormInput value={data.ville_cli} label="Ville" name="ville" onChange={(ville) => addState("ville_cli", ville)}/>
                <FormInput value={data.cp_cli} label="Code postal" name="cp" onChange={(cp) => addState("cp_cli", cp)} keyfilter="pnum"/>
            </div>
            {ready && <SimpleEditor value={data.notes_cli} label="Notes" onChange={(text) => addState("notes_cli", text)} />}
        </>
    );
}
