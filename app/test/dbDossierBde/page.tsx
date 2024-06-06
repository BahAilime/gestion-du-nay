'use client'
import { DossierBde, newDossierBde, updateDossierBde, deleteDossierBde, dossierBdeTemplate } from '@/src/services/db/DossierBde';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

export default function Page() {
   const [dossierBde, setDossierBde] = useState<DossierBde>()
   const toast = useRef<Toast>(null);

    const showCool = (text: string) => {
        toast.current?.show({ severity: 'success', summary: 'Super !', detail: text });
    };

    const showNotCool = (text: string) => {
        toast.current?.show({ severity: 'error', summary: 'Aïe', detail: text });
    };

    return (
        <Card className='w-full min-h-full' title="Test db dossier BDE">
            <Toast ref={toast} />
            <div className="flex gap-2">
                
                <Button outlined={true} label="Dossier template" onClick={() => {
                    setDossierBde(dossierBdeTemplate())
                }} />
                
                <Button label="Save to DB" onClick={() => {
                    if (!dossierBde) return
                    newDossierBde(dossierBde)
                        .then((newDossier) => {
                            setDossierBde({... newDossier})
                            showCool("Client sauvegardé")
                        }).catch(() => {
                            showNotCool("Impossible de sauvegarder le dossier")
                        })
                }} />
                
                <Button outlined={true} label="Change dossier" onClick={() => {
                    if (dossierBde) {
                        dossierBde.infos.ref = "test"+Math.random().toFixed(3).toString()
                        setDossierBde({...dossierBde})}}
                    }
                />
                
                <Button label="Update dossier" onClick={() => {
                    if (!dossierBde?.firebase_id) {
                        showNotCool("Pas de firebase id ?")
                        return
                    }
                    updateDossierBde(dossierBde.firebase_id, dossierBde).then(() => {
                        showCool("Dossier mis à jour")
                    }).catch((e) => {
                        showNotCool("Impossible de mettre à jour le dossier")
                    })
                    }} />
                
                <Button severity='danger' label="Suppr dossier" onClick={() => {
                    
                    if (!dossierBde?.firebase_id) {
                        showNotCool("Pas de firebase id ?")
                        return
                    }

                    console.log("J'AI UNE ID YOUHOU");

                    deleteDossierBde(dossierBde)
                        .then((dossierBde: DossierBde) => {
                            if (!dossierBde) return
                            setDossierBde(dossierBde)
                            showCool("Dossier supprimé")
                        })
                        .catch(() => {
                            showNotCool("Impossible de supprimer le dossier")
                        })
                }} />
            </div>
            
            {dossierBde && <pre>{JSON.stringify(dossierBde.infos, null, 4)}</pre>}
            {dossierBde && JSON.stringify(dossierBde)}
        </Card>
    )
}