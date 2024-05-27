"use client"
import { useEffect, useState, useMemo } from "react"

import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic";

import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { faTrash, faUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons"

import useFindCoordinates from "../hooks/useFindCoordinates";

import { client, deleteClient, getClientOnce } from "../services/db";
import Loading from "../components/Loading";
import SimpleEditor from "../components/SimpleEditor";
import BigButton from "../components/BigButton";

export default function ClientDetail() {
    const Map = useMemo(() => dynamic(
        () => import("../components/Map"),
        { 
          loading: () => <Loading text={"Chargement de la carte..."} />,
          ssr: false
        }
      ), [])

    const [user, setUser] = useState<client>()
    const params = useSearchParams()
    const firebase_id = params.get("firebase_id")
    const { coordinates, setSearchInfos } = useFindCoordinates()
    const router = useRouter();

    const confirmSuppr = () => {
        confirmDialog({
            message: "Êtes-vous sûr de vouloir supprimer ce client ?",	
            header: "Suppression",
            acceptLabel: "Oui",
            rejectLabel: "Non",
            accept,
        });
    };

    function accept() {
        if (!firebase_id) {
            router.push("/client")
            return
        }
        deleteClient(firebase_id, () => {
            router.push("/client")
        })
    }

    useEffect(() => {
        if (!firebase_id) {
            router.push("/client")
            return
        }
        getClientOnce(firebase_id).then((user) => {  
            console.log("OW !!!!") 
            const addressComponents = [
                user.adr_cli,
                user.ville_cli,
                user.cp_cli
            ].filter(Boolean);

            // setSearchInfos(addressComponents);
            setUser(user)
        }).catch((error) => {
            console.error(error);
        });
    }, [firebase_id])

    
    
    if (user) {
        const { adr_cli, ville_cli, cp_cli, nom_cli, tel_cli, resp_cli, email_cli, notes_cli}: client = user;
        const address = adr_cli && ville_cli && cp_cli ? `${adr_cli}, ${cp_cli.toUpperCase()} ${ville_cli.toUpperCase()}` : null;
        
        return (
            <div className="flex gap-4 h-full">
                <ConfirmDialog />
                <Card title={nom_cli ?? "Client"} className="flex-1 overflow-y-auto">
                    {resp_cli && <><h1 className="my-1 font-bold">Responsable</h1><p>{resp_cli}</p></>}
                    {(email_cli && tel_cli) && <div className="flex gap-2">
                        <div className="flex-1">
                            <h1 className="my-1 font-bold">Email</h1>
                            <p>{email_cli}</p>
                        </div>
                        <div className="flex-1">
                            <h1 className="my-1 font-bold">Téléphone</h1>
                            <p>{tel_cli}</p>
                        </div>
                    </div>}
                    {address && <>
                        <h1 className="my-1 font-bold">Adresse</h1>
                        <p>{address}</p>
                    </>}
                    {notes_cli && <><h1 className="my-1 font-bold">Notes</h1><SimpleEditor value={notes_cli} readOnly={true} /> </>}
                    <div className="flex gap-2">
                        <BigButton className="" text="Modifier le client" icon={faPenToSquare} onClick={() => { router.push(`/client/modifier?firebase_id=${firebase_id}`)}} />
                        <BigButton className="w-fit" text="Supprimer" icon={faTrash} onClick={confirmSuppr} outlined severity="danger"/>
                    </div>
                </Card>
                {/* {coordinates && (
                    <Card title="Carte" className="flex-1 overflow-y-auto">
                        {address && <p>{address}</p>}
                        <Map position={coordinates} zoom={6} icon={faUser}/>
                    </Card>
                ) } */}
            </div>
        );
    }
}