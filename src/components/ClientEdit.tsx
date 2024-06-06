'use client'
import { useEffect, useState } from 'react';
import ClientForm from "@/src/components/ClientForm";
import { Card } from 'primereact/card';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import BigButton from "@/src/components/BigButton";
import { Client, getClientOnce, updateClient } from "@/src/services/db/Client";
import { redirect, useRouter, useSearchParams } from 'next/navigation'

export default function ClientEdit() {
    const [data, setData] = useState<Client>();
    const [client, setClient] = useState<Client>();
    const router = useRouter()
    const params = useSearchParams()
    const firebase_id = params.get("firebase_id")

    useEffect(() => {
      if (!firebase_id) {
        redirect("/client")
      }
      getClientOnce(firebase_id).then((client: Client) => {   
          setClient(client)
      }).catch((error) => {
          console.error(error);
      });
  }, [firebase_id])
    
    function update() {
      if (!firebase_id) {
        redirect("/client")
      }

      if (!data) return

      updateClient(firebase_id, data).then(() => {
          router.push(`/client/detail?${params.toString()}`)
        })
    }

    return (
        <Card title="Client" className="min-w-1/2">
          {client && <ClientForm onChange={(data) => setData(data)} dataImport={client}/>}
          <BigButton text="Modifier le client" onClick={update} icon={faSquareCheck} />
        </Card>
    );
}