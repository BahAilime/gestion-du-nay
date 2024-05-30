'use client'
import { useEffect, useState } from 'react';
import DossierForm from "@/src/components/DossierForm";
import { faSquarePen } from '@fortawesome/free-solid-svg-icons'
import { client, dossier, getClientOnce, getDossierOnce, updateClient } from "@/src/services/db";
import { redirect, useRouter, useSearchParams } from 'next/navigation'

export default function DossierEdit() {
    const [data, setData] = useState({});
    const [dossier, setDossier] = useState<dossier>();
    const router = useRouter()
    const params = useSearchParams()
    const firebase_id = params.get("firebase_id")

    useEffect(() => {
      if (!firebase_id) {
        redirect("/dossier")
      }
      getDossierOnce(firebase_id).then((dos) => {   
          setDossier(dos)
          console.log(dos);
          
      }).catch((error) => {
          console.error(error);
      });
  }, [firebase_id])
    
    function update() {
      if (!firebase_id) {
        redirect("/dossier")
      }

      updateClient(firebase_id, data, () => {
          router.push(`/dossier/detail?${params.toString()}`)
        })
    }

    return (
      <>
          {dossier && <DossierForm dossierImport={dossier} onFormSubmit={(dossier) => setData(dossier)} buttonText="Modifier le dossier" buttonIcon={faSquarePen}/>}
      </>
    );
}