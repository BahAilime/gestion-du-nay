'use client'
import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRouter } from 'next/navigation'
import Loading from '@/src/components/Loading';
import { getClientsOnce, getDossiersOnce } from '@/src/services/db';

export default function Home() {
    const [dossiers, setDossiers] = useState<any[]>();
    const router = useRouter();

    useEffect(() => {
        getDossiersOnce().then((data) => {
            setDossiers(data);
        });
    }, [])

    return (
        <Card title="Dossiers" className="w-full h-full">
            {JSON.stringify(dossiers)}
            {/* {client ?
            <DataTable  value={client} className="w-full" selectionMode="single" onSelectionChange={(e) => router.push(`/client/detail?firebase_id=${e.value.firebase_id}`)}>
                <Column field="nom_cli" header="Nom"></Column>
                <Column field="resp_cli" header="Resp"></Column>
                <Column field="email_cli" header="Email"></Column>
                <Column field="tel_cli" header="Tel"></Column>
            </DataTable>
            : <Loading text={"Chargement des clients..."}/>} */}
        </Card>
    );
  }