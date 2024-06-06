'use client'
import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRouter } from 'next/navigation'
import Loading from '@/src/components/Loading';
import { Dossier } from '@/src/services/db/Dossier';
import { getAllDossierOnce } from '@/src/services/db';
import { format } from 'date-fns/format';

export default function Home() {
    const [dossiers, setDossiers] = useState<any[]>();
    const router = useRouter();

    useEffect(() => {
        getAllDossierOnce().then((data) => {
            setDossiers(data);
        });
    }, [])

    function dateTemplate(data: Dossier) {
        if (!data?.infos?.debut || !data?.infos?.fin) {
            return <div>Pas encore de dates</div>
        }
        const deb = format(data.infos.debut, "dd/MM/yyyy")
        const fin = format(data.infos.fin, "dd/MM/yyyy")
        const nuits = data.infos.nuits

        return <div>Du <span className="font-bold">{deb}</span> au <span className="font-bold">{fin}</span> ({nuits} nuits)</div>
    }

    return (
        <Card title="Dossiers" className="w-full min-h-full">
            {dossiers ?
            <DataTable  value={dossiers} className="w-full" selectionMode="single" onSelectionChange={(e) => router.push(`/dossier/detail?firebase_id=${e.value.firebase_id}`)}>
                <Column body={(data: Dossier) => <div><span className="font-bold">{data?.client?.nom_cli}</span><br/>{data?.client?.resp_cli}</div>} header="Client"></Column>
                <Column body={dateTemplate} header="Dates"></Column>
                <Column header="Effectif" body={(data: Dossier) => <div>{data?.infos?.enfants} enfants et {data?.infos?.adultes} adultes</div>}></Column>
            </DataTable>
            : <Loading text={"Chargement des dossiers..."}/>}
        </Card>
    );
  }