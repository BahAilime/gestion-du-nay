import { db } from "@/src/services/firebase";
import { fromUnixTime } from "date-fns/fromUnixTime";
import { getUnixTime } from "date-fns/getUnixTime";
import { ref, child, get, push, update, remove, serverTimestamp, query, orderByChild, DatabaseReference} from "firebase/database";
import { Client, getClientOnce } from "./Client";
import { Line } from "./Line";

export type Dossier = {
    infos: {
        debut?: Date,
        fin?: Date,
        nuits: number,
        adultes: number,
        adolescents: number,
        enfants: number,
        petitdej: number,
        repas: number,
        gouter: number,
        piquenique: number,
        naturepeda: number,
        jardin: number,
        orientation: number,
        equestre: number,
        ref?: string,
    },
    client?: Client,
    idClient?: string,
    nuits: {
        drap: Line,
        lines: {
            adulte: Line,
            enfant: Line,
            autres?: Line[]
        }
    },
    repas: {
        servi: boolean,
        lines: {
            petitdej:Line,
            repasEnfant:Line,
            repasCollegien:Line,
            repasAdulte:Line,
            piquenique:Line,
            gouter:Line,
            autres?: Line[],
        }
    },
    activite: {
        naturepeda: Line,
        jardin: Line,
        equestre: Line,
        orientation: Line,
        autres?: Line[],
    },
    divers?: Line[],
    lastSeen?: any
    firebase_id?: string
}

export function dossierTemplate() {
    const dossier: Dossier = {
        infos: {
            nuits: 0,
            adultes: 0,
            adolescents: 0,
            enfants: 0,
            petitdej: 0,
            repas: 0,
            gouter: 0,
            piquenique: 0,
            naturepeda: 0,
            jardin: 0,
            orientation: 0,
            equestre: 0
        },
        nuits: {
            drap: {
                label: "Drap", qte: 0, prixHt: 0, tva: 0, remise: 0
            },
            lines: {
                adulte:{label: "Adulte", qte: 0, prixHt: 14.27, tva: 10, remise: 0},
                enfant:{label: "Enfant", qte: 0, prixHt: 13, tva: 10, remise: 0}
            }
        },
        repas: {
            servi: false,
            lines: {
                petitdej:{label: "Petit dej", qte: 0, prixHt: 4.82, tva: 10, remise: 0},
                repasEnfant:{label: "Repas enfant", qte: 0, prixHt: 7.55, tva: 10, remise: 0},
                repasCollegien:{label: "Repas collégien", qte: 0, prixHt: 8.45, tva: 10, remise: 0},
                repasAdulte:{label: "Repas adulte", qte: 0, prixHt: 10.18, tva: 10, remise: 0},
                piquenique:{label: "Piquenique", qte: 0, prixHt: 7.44, tva: 5.5, remise: 0},
                gouter:{label: "Gouter", qte: 0, prixHt: 1.85, tva: 5.5, remise: 0}
            }
        },
        activite: {
            naturepeda:{label: "Nature-peda", qte: 0, prixHt: 4.91, tva: 10, remise: 0},
            jardin:{label: "Jardin", qte: 0, prixHt: 6.36, tva: 10, remise: 0},
            orientation:{label: "Orientation", qte: 0, prixHt: 4.91, tva: 10, remise: 0},
            equestre:{label: "Equestre", qte: 0, prixHt: 11.38, tva: 5.5, remise: 0}
        },
        divers: [
            {key: "communs", label: "Gestion libre des lieux communs", qte: 0, prixHt: 95.45, tva: 10, remise: 0},
            {key: "menage", label: "Forfait ménage de fin de séjour", qte: 0, prixHt: 91.67, tva: 20, remise: 0},
        ]
    }

    return dossier
}

const dossierRef = ref(db, "dossier");


export async function newDossier(data:Dossier): Promise<Dossier> {
    if (data.firebase_id) throw Error("Dossier already created")
    data.lastSeen = serverTimestamp()
    delete data.client
    let dataTransition: any = data
    if (data.infos.debut) {
        dataTransition.infos.debut = getUnixTime(data.infos.debut)
    }
    if (data.infos.fin) {
        dataTransition.infos.fin = getUnixTime(data.infos?.fin)
    }

    const ref = await push(dossierRef, dataTransition)

    if (!ref.key) throw Error("Dossier not created")
    data.firebase_id = ref.key
    return data 
}

export async function getDossiersOnce(): Promise<Dossier[]> {
    try {
        const snapshot = await get(query(dossierRef, orderByChild("lastSeen")));
        if (!snapshot.exists()) {
            return [];
        }

        const dossiersPromises: Promise<Dossier>[] = [];
        snapshot.forEach((snapDossier) => {
            let dossier: Dossier = snapDossier.val();
            if (dossier.idClient) {
                const dossierPromise = getClientOnce(dossier.idClient)
                    .then((client) => {
                        const dossierComplet: Dossier = { ...dossier, client, firebase_id: snapDossier.key };
                        if (typeof dossier.infos?.debut == "number") {
                            dossier.infos.debut = fromUnixTime(dossier.infos.debut)
                        }
                        if (typeof dossier.infos?.fin == "number") {
                            dossier.infos.fin = fromUnixTime(dossier.infos?.fin)
                        }
                        return dossierComplet;
                    });
                dossiersPromises.push(dossierPromise);
            } else {
                dossiersPromises.push(Promise.resolve(dossier));
            }
        });

        const dossiers = await Promise.all(dossiersPromises);
        return dossiers.reverse();
    } catch (error) {
        console.warn("DB getDossiersOnce:", error);
        return [];
    }
}

export async function getDossierOnce(id: number | string): Promise<Dossier> {
    const snapDossier = await get(child(dossierRef, `${id}`));

    if (snapDossier.exists()) {
        const dossier: Dossier = snapDossier.val();
        await update(snapDossier.ref, { lastSeen: serverTimestamp() });

        if (dossier.idClient) {
            const clientData = await getClientOnce(dossier.idClient);
            dossier.client = clientData;
        }

        return dossier
    } else {
        throw new Error("Dossier introuvable");
    }
}

export function updateDossier(id: string, data: Dossier): Promise<void> {
    data.firebase_id = undefined
    data.lastSeen = serverTimestamp();
    return get(child(dossierRef, id))
        .then((snapshot) => {
            if (snapshot.exists()) {
                update(snapshot.ref, data)
            } else {
                throw new Error("Dossier not found");
            }
        });
}

export function deleteDossier(dossier: Dossier): Promise<Dossier> {
    if (!dossier.firebase_id) throw Error("Dossier not found")
    return get(child(dossierRef, dossier.firebase_id))
        .then((snapshot) => {
            if (snapshot.exists()) {
                remove(snapshot.ref)
                return {... dossier, firebase_id: undefined}
            } else {
                throw new Error("Dossier not found");
            }
        })
    }

    export function getDossierNuitsLines(dossier: Dossier): Line[] {
        const lines = []
        console.log("nuits", dossier)

        lines.push(dossier.nuits.lines.adulte)
        lines.push(dossier.nuits.lines.enfant)
        if (dossier.nuits.lines.autres) {
            lines.concat(dossier.nuits.lines.autres)
        }
        
        return lines;
    }

    export function getDossierRepasLines(dossier: Dossier): Line[] {
        const lines = []

        lines.push(dossier.repas.lines.repasAdulte)
        lines.push(dossier.repas.lines.repasCollegien)
        lines.push(dossier.repas.lines.repasEnfant)
        lines.push(dossier.repas.lines.gouter)
        lines.push(dossier.repas.lines.piquenique)
        if (dossier.repas.lines.autres) {
            lines.concat(dossier.repas.lines.autres)
        }
        
        return lines;
    }

    export function getDossierActivitesLines(dossier: Dossier): Line[] {
        const lines = []
        
        lines.push(dossier.activite.naturepeda)
        lines.push(dossier.activite.jardin)
        lines.push(dossier.activite.equestre)
        lines.push(dossier.activite.orientation)

        if (dossier.activite.autres) {
            lines.concat(dossier.activite.autres)
        }

        return lines;
    }
