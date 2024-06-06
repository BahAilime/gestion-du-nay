'use client'
import { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Client, getClientsOnce } from "@/src/services/db/Client";
import Loading from "./Loading";

export default function ClientDropDown({value="", onChange = (x: any) => x }) {
    const [selectedCli, setSelectedCli] = useState<string>(value);
    const [clients, setClients] = useState<{ label: string, items: any }[]>();

    function clientsToDropdown(inputArray: Client[]) {
        const grouped = inputArray.reduce((acc: any, client) => {
            let { type_cli, firebase_id, nom_cli, resp_cli } = client;
            if (!type_cli) {
                type_cli = "Inconnu";
            }
            if (!acc[type_cli]) {
                acc[type_cli] = [];
            }
            acc[type_cli].push({ label: `${nom_cli} ${resp_cli ? `(${resp_cli})` : ""}`, value: firebase_id });
            return acc;
        }, {});

        const result = Object.keys(grouped).map(type_cli => ({
            label: type_cli,
            items: grouped[type_cli]
        }));

        return result;
    }

    useEffect(()=>{
        getClientsOnce()
            .then((data: Client[]) => {
                setClients(clientsToDropdown(data));
            })
    }, [])

    function groupedItemTemplate(option: any) {
        return <p className="font-bold">{option.label}</p>;
    };

    if (!clients) return <Loading text={"Chargement des clients..."} className="my-6"/>

    return <Dropdown
        value={selectedCli}
        onChange={(e) => {
            setSelectedCli(e.value)
            onChange(e.value)}
        }
        options={clients}
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        optionGroupTemplate={groupedItemTemplate}
        className="w-full my-3"
        placeholder="Selectionne un client"
        filter
    />
}