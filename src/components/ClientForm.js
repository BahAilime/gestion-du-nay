import React, { useEffect } from 'react';

import useMultiState from "../hooks/useMultiState";
import FormInput from "./FormInput";
import SimpleEditor from "./SimpleEditor";

import { useMountEffect } from 'primereact/hooks'; 

export default function ClientForm({ dataImport={}, onChange = (x) => {} }) {
    const [ data, addState, getState, deleteState, setState ] = useMultiState();

    useMountEffect(() => {
        setState(dataImport);
    })

    useEffect(() => {
        onChange(data)
    }, [data])

    return (
        <>
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
            <SimpleEditor value={data.notes_cli} label="Notes" onChange={(text) => addState("notes_cli", text)} />
        </>
    );
}
