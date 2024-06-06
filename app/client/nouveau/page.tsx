'use client'
import { useState } from 'react';
import ClientForm from "../../../src/components/ClientForm";
import { Card } from 'primereact/card';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import BigButton from "@/src/components/BigButton";
import { Client, newClient } from "@/src/services/db/Client";
import { useRouter } from 'next/navigation'


export default function Home() {
    const [data, setData] = useState<Client>();
    const router = useRouter()
    const searchParams = new URLSearchParams();
    
    function save() {
      if (!data) return
      newClient(data).then((client: Client) => {
        try {
          searchParams.append("firebase_id", client.firebase_id ?? "error")
          router.push(`/client/detail?${searchParams.toString()}`)
        } catch (error) {
          console.log(error)
        }
      })
    }

    return (
        <Card title="Client" className="min-w-1/2">
          <ClientForm onChange={(data) => setData(data)}/>
          <BigButton text="Enregistrer le client" onClick={save} icon={faSquareCheck} />
        </Card>
    );
  }