'use client'
import { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { getClientsOnce } from "@/src/services/db";

export default function ClientDropDown({ onChange = (x: any) => x }) {
    const [selectedCli, setSelectedCli] = useState(null);
    const [clients, setClients] = useState<any[]>();

    function clientsToDropdown(inputArray: any[]) {
        const grouped = inputArray.reduce((acc, client) => {
            let { type_cli, firebase_id, nom_cli, resp_cli } = client;
            if (!type_cli) {
                type_cli = "Inconnu";
            }
            if (!acc[type_cli]) {
                acc[type_cli] = [];
            }
            acc[type_cli].push({ label: `${nom_cli} (${resp_cli})`, value: firebase_id });
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
            .then((data: any[]) => {
                setClients(clientsToDropdown(data));
            })
    }, [])

    function groupedItemTemplate(option: any) {
        return (
            <p className="font-bold">{option.label}</p>
        );
    };

    if (!clients) return null

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