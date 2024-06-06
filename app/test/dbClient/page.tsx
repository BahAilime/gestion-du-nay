'use client'
import { Client, clientTemplate, deleteClient, newClient, updateClient } from '@/src/services/db/Client';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

export default function Page() {
   const [client, setClient] = useState<Client>()
   const toast = useRef<Toast>(null);

    const showCool = (text: string) => {
        toast.current?.show({ severity: 'success', summary: 'Super !', detail: text });
    };

    const showNotCool = (text: string) => {
        toast.current?.show({ severity: 'error', summary: 'Aïe', detail: text });
    };

    return (
        <Card className='w-full h-full' title="Test db client">
            <Toast ref={toast} />
            <div className="flex gap-2">
                
                <Button outlined={true} label="Client template" onClick={() => {
                    setClient(clientTemplate())
                }} />
                
                <Button label="Save to DB" onClick={() => {
                    if (!client) return
                    newClient(client)
                        .then((newClient) => {
                            setClient({... newClient})
                            showCool("Client sauvegardé")
                        }).catch(() => {
                            showNotCool("Impossible de sauvegarder le client")
                        })
                }} />
                
                <Button outlined={true} label="Change client" onClick={() => {
                    if (client) {
                        client.email_cli = "test"+Math.random().toFixed(3).toString()
                        setClient({...client})}}
                    }
                />
                
                <Button label="Update client" onClick={() => {
                    if (!client?.firebase_id) return
                    updateClient(client.firebase_id, client).then(() => {
                        showCool("Client mis à jour")
                    }).catch(() => {
                        showNotCool("Impossible de mettre à jour le client")
                    })
                    }} />
                
                <Button severity='danger' label="Suppr client" onClick={() => {
                    if (!client?.firebase_id) return
                    deleteClient(client)
                        .then((client: Client) => {
                            if (!client) return
                            setClient(client)
                            showCool("Client supprimé")
                        })
                        .catch(() => {
                            showNotCool("Impossible de supprimer le client")
                        })
                }} />
            </div>
            
            {client && <pre>{JSON.stringify(client, null, 4)}</pre>}
        </Card>
    )
}