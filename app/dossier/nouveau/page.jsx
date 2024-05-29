'use client'
import DossierForm from "@/src/components/DossierForm";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { newClient, newDossier } from "@/src/services/db";
import { useRouter } from "next/navigation";


export default function Home() {
  const router =useRouter()

  return <DossierForm buttonText="Nouveau dossier" buttonIcon={faFolderPlus} onFormSubmit={(dossier) => {
    if (dossier.idClient) {
      newDossier(dossier, (dossier) => {
        router.push(`/dossier/detail?firebase_id=${dossier.key}`)
      })
    } else if (dossier.client) {

      newClient(dossier.client, (client) => {
        if (!client.key) return

        dossier.idClient = client.key
        newDossier(dossier, (dossier) => {
        router.push(`/dossier/detail?firebase_id=${dossier.key}`)
        })
      });
    }
  }} />
}
