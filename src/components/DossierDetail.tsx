"use client"
import { useEffect, useState } from "react"

import { useRouter, useSearchParams } from "next/navigation"

import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { faSquarePen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"

import { Dossier, deleteDossier, getDossierActivitesLines, getDossierNuitsLines, getDossierOnce, getDossierRepasLines } from "../services/db/Dossier";
import { Client, deleteClient } from "../services/db/Client";
import SimpleEditor from "../components/SimpleEditor";
import BigButton from "./BigButton";
import { format } from "date-fns/format";
import { fromUnixTime } from "date-fns/fromUnixTime";
import { fr } from "date-fns/locale";

import { Accordion, AccordionTab } from 'primereact/accordion';

import LineTable from "./LineTable";

export default function ClientDetail() {
    const [dossier, setDossier] = useState<Dossier>()
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
        if (!dossier) {
            router.push("/dossier")
            return
        }
        deleteDossier(dossier).then(() => {
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
        const { nom_cli, tel_cli, resp_cli, email_cli, notes_cli } : Client = dossier.client;
        const firebase_id = dossier.idClient
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
            if (typeof dossier.infos.debut === 'number' && typeof dossier.infos.fin === 'number') {
                const debDate = fromUnixTime(dossier.infos.debut)
                const finDate = fromUnixTime(dossier.infos.fin)
                const debYear = format(debDate, "yyyy")
                const finYear = format(finDate, "yyyy")
                const debMonth = format(debDate, "MMMM", { locale: fr })
                const finMonth = format(finDate, "MMMM", { locale: fr })
                if (debYear !== finYear) {
                    const deb = format(fromUnixTime(dossier.infos.debut), "dd/MM/yyyy")
                    const fin = format(fromUnixTime(dossier.infos.fin), "dd/MM/yyyy")
                    return `Séjour du ${deb} au ${fin}`
                } else if (debMonth != finMonth) {
                    const deb = format(debDate, "dd MMMM", { locale: fr })
                    const fin = format(finDate, "dd MMMM yyyy", { locale: fr })
                    return `Séjour du ${deb} au ${fin}`
                } else {
                    const deb = format(debDate, "dd", { locale: fr })
                    const fin = format(finDate, "dd MMMM yyyy", { locale: fr })
                    return `Séjour du ${deb} au ${fin}`
                }
            }
        }
    }

    return (
        <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-2">
            <Card title={titre()} className="overflow-y-auto col-span-2">
                <div className="flex flex-col gap-2">
                    {dossier &&
                        <Accordion>
                            <AccordionTab header="Nuits" ><LineTable lines={getDossierNuitsLines(dossier)} emptyMessage="Pas de nuits" /></AccordionTab>
                            <AccordionTab header="Repas" ><LineTable lines={getDossierRepasLines(dossier)} emptyMessage="Pas de repas" /></AccordionTab>
                            <AccordionTab header="Activités" ><LineTable lines={getDossierActivitesLines(dossier)} emptyMessage="Pas d'activités" /></AccordionTab>
                            <AccordionTab header="Autre" ><LineTable lines={dossier?.divers} emptyMessage="Rien d'autre" /></AccordionTab>
                        </Accordion>
                    }
                    <div className="flex gap-2 flex-wrap">
                        <BigButton className="min-w-fit flex-1" text="Modifier ce dossier" icon={faSquarePen} onClick={() => { router.push(`/dossier/modifier?firebase_id=${firebase_id}`)}} outlined={true} />
                        <ConfirmDialog />
                        <BigButton className="min-w-fit flex-1" text="Supprimer ce dossier" icon={faTrash} onClick={confirmSuppr} outlined={true} severity="danger" />
                    </div>
                </div>
            </Card>
            {cardClient}
        </div>
    );
}