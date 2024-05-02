'use client'
import { useState } from 'react';
import ClientForm from "../../../src/components/ClientForm";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { ref, push } from "firebase/database"
import { db } from "@/src/services/firebase";
import { useRouter } from 'next/navigation'


export default function Home() {
    const [data, setData] = useState({});
    const router = useRouter()
    const searchParams = new URLSearchParams();
    
    function save() {
      const clientRef = ref(db, "client")
      push(clientRef, data)
          .then((oh) => {
            try {
              searchParams.append("firebase_id", oh.key ?? "error")
          router.push(`/client/detail?${searchParams.toString()}`)
            } catch (error) {
              console.log(error)
            }
          })
    }


    return (
        <Card title="Client" className="min-w-1/2">
          <ClientForm onChange={(x) => setData(x)} dataImport={{nom_cli: "Euuhhh"}}/>
          <Button onClick={save} className="w-full flex justify-center gap-2">
            <FontAwesomeIcon icon={faSquareCheck} />
            Enregistrer le client
          </Button>
        </Card>
    );
  }