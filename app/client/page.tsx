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



export default function Home() {
    const [client, setClient] = useState<any[]>([]);
    const clientRef = ref(db, 'client');

    useEffect(() => {
        onValue(clientRef, (snapshot) => {
            const data = snapshot.val();
            const hahadata = []
            for (const key in data) {
                // add the key as a value
                data[key].firebase_id = key;
                console.log(key, data[key]);
                
                hahadata.push(data[key]);
            }
            setClient(hahadata);


        });
    }, [])

    return (
        <Card title="Client" className="w-full">
          <DataTable value={client} className='w-full'>
                <Column field="nom_cli" header="Nom"></Column>
                <Column field="resp_cli" header="Resp"></Column>
                <Column field="email_cli" header="Email"></Column>
                <Column field="tele_cli" header="Tel"></Column>
            </DataTable>
        </Card>
    );
  }