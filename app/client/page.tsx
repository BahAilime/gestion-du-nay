'use client'
import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ref, onValue } from "firebase/database"
import { db } from "@/src/services/firebase";
import { useRouter } from 'next/navigation'

export default function Home() {
    const [client, setClient] = useState<any[]>([]);
    const clientRef = ref(db, 'client');
    const router = useRouter();

    useEffect(() => {
        onValue(clientRef, (snapshot) => {
            const data = snapshot.val();
            const hahadata = []
            for (const key in data) {
                // add the key as a value
                data[key].firebase_id = key;                
                hahadata.push(data[key]);
            }
            setClient(hahadata);


        });
    }, [])

    return (
        <Card title="Clients" className="w-full h-full">
            <DataTable value={client} className="w-full" selectionMode="single" onSelectionChange={(e) => router.push(`/client/view?firebase_id=${e.value.firebase_id}`)}>
                <Column field="nom_cli" header="Nom"></Column>
                <Column field="resp_cli" header="Resp"></Column>
                <Column field="email_cli" header="Email"></Column>
                <Column field="tele_cli" header="Tel"></Column>
            </DataTable>
        </Card>
    );
  }