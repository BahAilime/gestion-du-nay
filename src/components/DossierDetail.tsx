"use client"
import { useEffect, useState } from "react"

import { useRouter, useSearchParams } from "next/navigation"

import { Card } from "primereact/card";
import { confirmDialog } from "primereact/confirmdialog";

import { faUser } from "@fortawesome/free-solid-svg-icons"

import { client, deleteClient, getDossierOnce } from "../services/db";
import SimpleEditor from "../components/SimpleEditor";
import BigButton from "../components/BigButton";
import { dossier } from "../services/db";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format, fromUnixTime } from "date-fns";

import { Accordion, AccordionTab } from 'primereact/accordion';

export default function ClientDetail() {
    const [dossier, setDossier] = useState<dossier>()
    const params = useSearchParams()
    const firebase_id = params.get("firebase_id")
    const router = useRouter();

    const confirmSuppr = () => {
        confirmDialog({
            message: "Êtes-vous sûr de vouloir supprimer ce dossier ?",	
            header: "Suppression",
            acceptLabel: "Oui",
            rejectLabel: "Non",
            accept,
        });
    };

    function accept() {
        if (!firebase_id) {
            router.push("/dossier")
            return
        }
        deleteClient(firebase_id, () => {
            router.push("/dossier")
        })
    }

    useEffect(() => {
        if (!firebase_id) {
            router.push("/dossier")
            return
        }
        getDossierOnce(firebase_id).then((dossier) => {   
            setDossier(dossier)
        }).catch((error) => {
            console.error(error);
        });
    }, [firebase_id, router])

    
    let cardClient = <>{JSON.stringify(dossier)}</>
    if (dossier?.client) {
        console.log(dossier?.client);
        
        const { nom_cli, tel_cli, resp_cli, email_cli, notes_cli } : client = dossier.client;
        cardClient = <Card title="Client" className="flex-1 overflow-y-auto">
        {nom_cli && <h1>{nom_cli}</h1>}
        {resp_cli && <h2>{resp_cli}</h2>}
        {email_cli && <p>{email_cli}</p>}
        {tel_cli && <p>{tel_cli}</p>}
        {notes_cli && <SimpleEditor value={notes_cli} readOnly={true} />}
        <BigButton className="" text="Plus d'infos" icon={faUser} onClick={() => { router.push(`/client/detail?firebase_id=${firebase_id}`)}} />
    </Card>
    }

    function titre() {
        if (!dossier || !dossier.infos || !dossier.infos.debut || !dossier.infos.fin) {
            return "Dossier"
        } else {
            if (typeof dossier.infos.debut === 'number') {
                const deb = format(fromUnixTime(dossier.infos.debut), "dd/MM/yyyy")
                const fin = format(dossier.infos.fin, "dd/MM/yyyy")
                return `Séjour du ${deb} au ${fin}`
            }
        }
    }

    function calcPrice(qte: number, price: number, tva: number) {
        return qte * price * (1 + tva / 100)
    }

    return (
        <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-2">
            <Card title={titre()} className="overflow-y-auto col-span-2">
                <div className="flex flex-col gap-2">
                    <Accordion>
                        <AccordionTab header="Nuits">
                            <DataTable value={dossier?.nuits?.lines} size="small" emptyMessage="Pas de nuits">
                                <Column field="label" header="Type"></Column>
                                <Column field="qte" header="Qte"></Column>
                                <Column field="prixHt" header="Prix HT"></Column>
                                <Column field="tva" header="TVA"></Column>
                                <Column field="remise" header="Remise"></Column>
                                <Column body={(data) => calcPrice(data.qte, data.prixHt, data.tva)+"€"} header="Total"></Column>
                            </DataTable>
                        </AccordionTab>
                        <AccordionTab header="Repas">
                            <DataTable value={dossier?.repas?.lines} size="small" emptyMessage="Pas de repas">
                                <Column field="label" header="Type"></Column>
                                <Column field="qte" header="Qte"></Column>
                                <Column field="prixHt" header="Prix HT"></Column>
                                <Column field="tva" header="TVA"></Column>
                                <Column field="remise" header="Remise"></Column>
                                <Column body={(data) => calcPrice(data.qte, data.prixHt, data.tva)} header="Total"></Column>
                            </DataTable>
                        </AccordionTab>
                        <AccordionTab header="Activités">
                            <DataTable value={dossier?.activite} size="small" emptyMessage="Pas d'activités">
                                <Column field="label" header="Nom"></Column>
                                <Column field="qte" header="Qte"></Column>
                                <Column field="prixHt" header="Prix HT"></Column>
                                <Column field="tva" header="TVA"></Column>
                                <Column field="remise" header="Remise"></Column>
                                <Column body={(data) => calcPrice(data.qte, data.prixHt, data.tva)+"€"} header="Total"></Column>
                            </DataTable>
                        </AccordionTab>
                        <AccordionTab header="Autre">
                            <DataTable value={dossier?.divers} size="small" emptyMessage="Rien d'autre">
                                <Column field="label" header="Nom"></Column>
                                <Column field="qte" header="Qte"></Column>
                                <Column field="prixHt" header="Prix HT"></Column>
                                <Column field="tva" header="TVA"></Column>
                                <Column field="remise" header="Remise"></Column>
                                <Column body={(data) => calcPrice(data.qte, data.prixHt, data.tva)+"€"} header="Total"></Column>
                            </DataTable>
                        </AccordionTab>
                    </Accordion>
                    <BigButton className="" text="Supprimer ce dossier" icon={faUser} onClick={confirmSuppr} />
                </div>
            </Card>
            {cardClient}
        </div>
    );
}