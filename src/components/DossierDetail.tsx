"use client"
import { useEffect, useState } from "react"

import { useRouter, useSearchParams } from "next/navigation"

import { Card } from "primereact/card";
import { confirmDialog } from "primereact/confirmdialog";

import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons"

import { client, deleteClient, getDossierOnce, line } from "../services/db";
import SimpleEditor from "../components/SimpleEditor";
import BigButton from "../components/BigButton";
import { dossier } from "../services/db";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format, fromUnixTime } from "date-fns";

import { Accordion, AccordionTab } from 'primereact/accordion';

import { stringToNumber, calcPrice } from "../services/utils";

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

    function calc(prixHt: any, qte: any, tva: any, remise: any = 0) {
        if (typeof prixHt == "string") {
            prixHt = stringToNumber(prixHt)
        }

        if (typeof qte == "string") {
            qte = stringToNumber(qte)
        }

        if (typeof tva == "string") {
            tva = stringToNumber(tva)
        }

        if (typeof remise == "string") {
            remise = stringToNumber(remise)
        }

        return calcPrice(prixHt, qte, tva, remise)
    }

    return (
        <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-2">
            <Card title={titre()} className="overflow-y-auto col-span-2">
                <div className="flex flex-col gap-2">
                    <Accordion>
                        <AccordionTab header="Nuits">
                            <DataTable value={dossier?.nuits?.lines} size="small" emptyMessage="Pas de nuits">
                                <Column field="label" header="Type" />
                                <Column body={(data) => data.qte ? data.qte : 0} header="Qte" />
                                <Column body={(data) => data.prixHt ? data.prixHt : 0} header="Prix HT" />
                                <Column body={(data) => data.tva ? data.tva : 0} header="TVA" />
                                <Column body={(data) => data.remise ? data.remise : 0} header="Remise" />
                                <Column body={(data: line) => {
                                    return calc(data.prixHt, data.qte, data.tva, data.remise)+"€"
                                }} header="Total"></Column>
                            </DataTable>
                        </AccordionTab>
                        <AccordionTab header="Repas">
                            <DataTable value={dossier?.repas?.lines} size="small" emptyMessage="Pas de repas">
                                <Column field="label" header="Type" />
                                <Column body={(data) => data.qte ? data.qte : 0} header="Qte" />
                                <Column body={(data) => data.prixHt ? data.prixHt : 0} header="Prix HT" />
                                <Column body={(data) => data.tva ? data.tva : 0} header="TVA" />
                                <Column body={(data) => data.remise ? data.remise : 0} header="Remise" />
                                <Column body={(data) => calc(data.qte, data.prixHt, data.tva, data.remise)} header="Total" />
                            </DataTable>
                        </AccordionTab>
                        <AccordionTab header="Activités">
                            <DataTable value={dossier?.activite} size="small" emptyMessage="Pas d'activités">
                                <Column field="label" header="Nom" />
                                <Column body={(data) => data.qte ? data.qte : 0} header="Qte" />
                                <Column body={(data) => data.prixHt ? data.prixHt : 0} header="Prix HT" />
                                <Column body={(data) => data.tva ? data.tva : 0} header="TVA" />
                                <Column body={(data) => data.remise ? data.remise : 0} header="Remise" />
                                <Column body={(data) => calc(data.qte, data.prixHt, data.tva, data.remise)+"€"} header="Total" />
                            </DataTable>
                        </AccordionTab>
                        <AccordionTab header="Autre">
                            <DataTable value={dossier?.divers} size="small" emptyMessage="Rien d'autre">
                                <Column field="label" header="Nom" />
                                <Column body={(data) => data.qte ? data.qte : 0} header="Qte" />
                                <Column body={(data) => data.prixHt ? data.prixHt : 0} header="Prix HT" />
                                <Column body={(data) => data.tva ? data.tva : 0} header="TVA" />
                                <Column body={(data) => data.remise ? data.remise : 0} header="Remise" />
                                <Column body={(data) => calc(data.qte, data.prixHt, data.tva, data.remise)+"€"} header="Total" />
                            </DataTable>
                        </AccordionTab>
                    </Accordion>
                    <BigButton className="" text="Supprimer ce dossier" icon={faTrash} onClick={confirmSuppr} outlined={true} severity="danger" />
                </div>
            </Card>
            {cardClient}
        </div>
    );
}