'use client'
import { Dossier, dossierTemplate, newDossier, updateDossier, deleteDossier } from '@/src/services/db/Dossier';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

export default function Page() {
   const [dossier, setDossier] = useState<Dossier>()
   const toast = useRef<Toast>(null);

    const showCool = (text: string) => {
        toast.current?.show({ severity: 'success', summary: 'Super !', detail: text });
    };

    const showNotCool = (text: string) => {
        toast.current?.show({ severity: 'error', summary: 'Aïe', detail: text });
    };

    return (
        <Card className='w-full min-h-full' title="Test db dossier">
            <Toast ref={toast} />
            <div className="flex gap-2">
                
                <Button outlined={true} label="Dossier template" onClick={() => {
                    setDossier(dossierTemplate())
                }} />
                
                <Button label="Save to DB" onClick={() => {
                    if (!dossier) return
                    newDossier(dossier)
                        .then((newDossier) => {
                            setDossier({... newDossier})
                            showCool("Client sauvegardé")
                        }).catch(() => {
                            showNotCool("Impossible de sauvegarder le dossier")
                        })
                }} />
                
                <Button outlined={true} label="Change dossier" onClick={() => {
                    if (dossier) {
                        dossier.infos.ref = "test"+Math.random().toFixed(3).toString()
                        setDossier({...dossier})}}
                    }
                />
                
                <Button label="Update dossier" onClick={() => {
                    if (!dossier?.firebase_id) return
                    updateDossier(dossier.firebase_id, dossier).then(() => {
                        showCool("Dossier mis à jour")
                    }).catch(() => {
                        showNotCool("Impossible de mettre à jour le dossier")
                    })
                    }} />
                
                <Button severity='danger' label="Suppr dossier" onClick={() => {
                    if (!dossier?.firebase_id) return
                    deleteDossier(dossier)
                        .then((dossier: Dossier) => {
                            if (!dossier) return
                            setDossier(dossier)
                            showCool("Dossier supprimé")
                        })
                        .catch(() => {
                            showNotCool("Impossible de supprimer le dossier")
                        })
                }} />
            </div>
            
            {dossier && <pre>{JSON.stringify(dossier.infos, null, 4)}</pre>}
            {dossier && JSON.stringify(dossier)}
        </Card>
    )
}