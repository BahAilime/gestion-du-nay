'use client'
import { redirect, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic";
import { Card } from "primereact/card";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useMemo } from "react"
import useFindCoordinates from "@/src/hooks/useFindCoordinates";
import Loading from "@/src/components/Loading";
import SimpleEditor from "@/src/components/SimpleEditor";
import BigButton from "@/src/components/bigButton";
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { getClientOnce } from "@/src/services/db";

export default function Home() {
    const Map = useMemo(() => dynamic(
        () => import('@/src/components/Map'),
        { 
          loading: () => <Loading text={"Chargement de la carte..."} />,
          ssr: false
        }
      ), [])

    const [user, setUser] = useState()
    const params = useSearchParams()
    const firebase_id = params.get("firebase_id")
    const [coo, setQuery] = useFindCoordinates()

    useEffect(() => {
        if (!firebase_id) {
            redirect("/client")
        }
        getClientOnce(firebase_id).then((user) => {   
            const addressComponents = [
                user.adr_cli,
                user.ville_cli,
                user.cp_cli
            ].filter(Boolean);

            setQuery(addressComponents);
            setUser(user)
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    
    
    if (user) {
        const { adr_cli, ville_cli, cp_cli, nom_cli, tel_cli, resp_cli, email_cli, notes_cli}:
            { adr_cli: string, ville_cli: string, cp_cli: string, nom_cli: string, tel_cli: string, resp_cli: string, email_cli: string, notes_cli: string} = user;
        const address = adr_cli && ville_cli && cp_cli ? `${adr_cli}, ${cp_cli.toUpperCase()} ${ville_cli.toUpperCase()}` : null;
        
        return (
            <div className="flex gap-4 h-full">
                <Card title={nom_cli ?? "Client"} className="flex-1">
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
                    {notes_cli && <><h1 className="my-1 font-bold">Notes</h1><SimpleEditor value={notes_cli} readOnly={true} /> </>}
                    <BigButton text="Modifier le client" icon={faPenToSquare} onClick={() => {}} />
                </Card>
                {coo && (
                    <Card title="Carte" className="flex-1">
                        {address && <p>{address}</p>}
                        <Map position={coo} zoom={6} icon={faUser}/>
                    </Card>
                ) }
            </div>
        );
    }

    return (<Card className="flex h-full w-full justify-center items-center">
        <Loading text={"Chargement ds informations du client"} />
    </Card>);
}