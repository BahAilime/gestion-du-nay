import { getDossiersBdeOnce } from "./db/DossierBde";
import { getDossiersOnce } from "./db/Dossier";

export async function getAllDossierOnce() {
    const dossier = await getDossiersOnce()
    const dossierBde = await getDossiersBdeOnce()
    const allDossiers = [...dossier, ...dossierBde]

    allDossiers.sort((a, b) => {
        if (a.lastSeen < b.lastSeen) return 1
        if (a.lastSeen > b.lastSeen) return -1
        return 0
    })

    return allDossiers
}

