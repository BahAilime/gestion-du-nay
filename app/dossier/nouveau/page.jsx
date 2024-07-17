'use client'
import DossierForm from "@/src/components/DossierForm";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { newDossier } from "@/src/services/db/Dossier";
import { newClient } from "@/src/services/db/Client";
import { useRouter } from "next/navigation";


export default function Home() {
  const router =useRouter()

  return <DossierForm buttonText="Nouveau dossier" buttonIcon={faFolderPlus} onFormSubmit={(dossier) => {
    if (dossier.idClient) {
      newDossier(dossier)
        .then((dossier) => {
          router.push(`/dossier/detail?firebase_id=${dossier.firebase_id}`)          
        } )
    } else if (dossier.client) {

      newClient(dossier.client, (client) => {
        if (!client.key) return

        dossier.idClient = client.key
        dossier.client = undefined
        newDossier(dossier)
        .then((dossier) => {
          router.push(`/dossier/detail?firebase_id=${dossier.firebase_id}`)          
        } )
      });
    }
  }} />
}
