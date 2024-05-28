'use client'
import { useState } from 'react';
import ClientForm from "../../../src/components/ClientForm";
import { Card } from 'primereact/card';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import BigButton from "@/src/components/BigButton";
import { client, newClient } from "@/src/services/db";
import { useRouter } from 'next/navigation'


export default function Home() {
    const [data, setData] = useState<client>();
    const router = useRouter()
    const searchParams = new URLSearchParams();
    
    function save() {
      if (!data) return
      newClient(data, (client) => {
        try {
          searchParams.append("firebase_id", client.key ?? "error")
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