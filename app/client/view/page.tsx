'use client'
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic";
import { ref, child, get } from "firebase/database";
import { db } from "@/src/services/firebase";
import { Card } from "primereact/card";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useMemo } from "react"
import useFindCoordinates from "@/src/hooks/useFindCoordinates";

export default function Home() {
    const Map = useMemo(() => dynamic(
        () => import('@/src/components/Map'),
        { 
          loading: () => <p>A map is loading</p>,
          ssr: false
        }
      ), [])

    const [user, setUser] = useState()
    const params = useSearchParams()
    const firebase_id = params.getAll("firebase_id")
    const [coo, setQuery] = useFindCoordinates()

    useEffect(() => {
        const usersRef = ref(db, "client");
        get(child(usersRef, `${firebase_id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const userSnap = snapshot.val()
                console.log("snap", userSnap);
                
                const addressComponents = [
                    userSnap.adr_cli,
                    userSnap.ville_cli,
                    userSnap.cp_cli
                ];
                const address = addressComponents.filter(Boolean);
                if (setQuery) {
                    setQuery(address);
                }
                setUser(userSnap)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])
    
    if (user) {
        const { adr_cli, ville_cli, cp_cli, nom_cli }:
            { adr_cli?: string, ville_cli?: string, cp_cli?: string, nom_cli?: string } = user;
        const address = adr_cli && ville_cli && cp_cli ? `${adr_cli}, ${cp_cli.toUpperCase()} ${ville_cli.toUpperCase()}` : null;
        
        return (
            <div className="flex gap-4 h-full">
                <Card title="Informations" className="flex-1">
                    <h1>{nom_cli}</h1>
                </Card>
                {coo && (
                    <Card title="Carte" className="flex-1">
                        {address && <p>{address}</p>}
                        <div style={{ height: '400px' }}>
                            <Map position={coo} zoom={6} icon={faUser} />
                        </div>
                    </Card>
                )}
            </div>
        );
    }

    return (<div>
        <h1>Chargement</h1>
    </div>);
}