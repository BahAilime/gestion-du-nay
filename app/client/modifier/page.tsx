'use client'
import { useEffect, useState } from 'react';
import ClientForm from "../../../src/components/ClientForm";
import { Card } from 'primereact/card';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import BigButton from "@/src/components/bigButton";
import { getClientOnce, updateClient } from "@/src/services/db";
import { redirect, useRouter, useSearchParams } from 'next/navigation'


export default function Home() {
    const [data, setData] = useState({});
    const [client, setClient] = useState();
    const router = useRouter()
    const params = useSearchParams()
    const firebase_id = params.get("firebase_id")

    useEffect(() => {
      if (!firebase_id) {
          redirect("/client")
      }
      getClientOnce(firebase_id).then((user) => {   
          setClient(user)
      }).catch((error) => {
          console.error(error);
      });
  }, [])
    
    function update() {
      if (!firebase_id) {
        redirect("/client")
      }

      updateClient(firebase_id, data, () => {
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