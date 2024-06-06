import { db } from "@/src/services/firebase";
import { fromUnixTime } from "date-fns/fromUnixTime";
import { getUnixTime } from "date-fns/getUnixTime";
import { ref, child, get, push, update, remove, serverTimestamp, query, orderByChild, DatabaseReference} from "firebase/database";
import { Client, getClientOnce } from "./Client";
import { Line } from "./Line";

export type DossierBde = {
    infos: {
        debut?: Date,
        fin?: Date,
        nuits: number,
        adultes: number,
        enfants: number,
        petitdej: number,
        repas: number,
        gouter: number,
        piquenique: number,
        naturepeda: number,
        jardin: number,
        orientation: number,
        ref?: string,
    },
    client?: Client,
    idClient?: string,
    nuits: {
        drap: Line,
        Lines: {
            nuitAvecDrapDessus: Line,
            nuitSansDrapDessus: Line,
            autres?: Line[]
        }
    },
    repas: {
        servi: boolean,
        Lines: {
            petitdej:Line,
            repas:Line,
            piquenique:Line,
            gouter:Line,
            autres?: Line[],
        }
    },
    activite: {
        naturepeda: Line,
        jardin: Line,
        orientation: Line,
        autres?: Line[],
    },
    divers?: Line[],
    lastSeen?: any,
    firebase_id?: string,
}


export function dossierBdeTemplate() {
    const dossier: DossierBde = {
        infos: {
            nuits: 0,
            adultes: 0,
            enfants: 0,
            petitdej: 0,
            repas: 0,
            gouter: 0,
            piquenique: 0,
            naturepeda: 0,
            jardin: 0,
            orientation: 0,
        },
        nuits: {
            drap: {
                label: "Drap", qte: 0, prixHt: 0, tva: 0, remise: 0
            },
            Lines: {
                nuitAvecDrapDessus:{label: "Nuitée avec drap du dessus", qte: 0, prixHt: 19.09, tva: 10, remise: 0},
                nuitSansDrapDessus:{label: "Nuitée sans drap du dessus", qte: 0, prixHt: 17.27, tva: 10, remise: 0}
            }
        },
        repas: {
            servi: false,
            Lines: {
                petitdej:{label: "Petit déjeuner servi", qte: 0, prixHt: 5.27, tva: 10, remise: 0},
                repas:{label: "Repas servi", qte: 0, prixHt: 9.09, tva: 10, remise: 0},
                piquenique:{label: "Pique-nique individuel", qte: 0, prixHt: 7.48, tva: 5.5, remise: 0},
                gouter:{label: "Goûter", qte: 0, prixHt: 2.74, tva: 5.5, remise: 0}
            }
        },
        activite: {
            naturepeda:{label: "Nature-peda", qte: 0, prixHt: 4.91, tva: 10, remise: 0},
            jardin:{label: "Jardin", qte: 0, prixHt: 6.36, tva: 10, remise: 0},
            orientation:{label: "Orientation", qte: 0, prixHt: 4.91, tva: 10, remise: 0},
        },
    }

    return dossier
}

const dossierBdeRef = ref(db, "dossierBde");

export async function newDossierBde(data:DossierBde): Promise<DossierBde> {
    if (data.firebase_id) throw Error("DossierBde already created")
    data.lastSeen = serverTimestamp()
    delete data.client
    let dataTransition: any = data
    if (data.infos.debut) {
        dataTransition.infos.debut = getUnixTime(data.infos.debut)
    }
    if (data.infos.fin) {
        dataTransition.infos.fin = getUnixTime(data.infos?.fin)
    }

    const ref = await push(dossierBdeRef, dataTransition)

    if (!ref.key) throw Error("DossierBde not created")
    data.firebase_id = ref.key
    return data 
}

export async function getDossiersBdeOnce(): Promise<DossierBde[]> {
    try {
        const snapshot = await get(query(dossierBdeRef, orderByChild("lastSeen")));
        if (!snapshot.exists()) {
            return [];
        }

        const dossiersPromises: Promise<DossierBde>[] = [];
        snapshot.forEach((snapDossier) => {
            let dossier: DossierBde = snapDossier.val();
            if (dossier.idClient) {
                const dossierPromise = getClientOnce(dossier.idClient)
                    .then((client) => {
                        const dossierComplet: DossierBde = { ...dossier, client, firebase_id: snapDossier.key };
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

export async function getDossierBdeOnce(id: number | string): Promise<DossierBde> {
    const snapDossier = await get(child(dossierBdeRef, `${id}`));

    if (snapDossier.exists()) {
        const dossier: DossierBde = snapDossier.val();
        await update(snapDossier.ref, { lastSeen: serverTimestamp() });

        if (dossier.idClient) {
            const clientData = await getClientOnce(dossier.idClient);
            dossier.client = clientData;
        }

        return dossier
    } else {
        throw new Error("DossierBde introuvable");
    }
}

export function updateDossierBde(id: string, data: DossierBde): Promise<void> {
    const dataupdate = { ...data }
    delete dataupdate.firebase_id
    dataupdate.lastSeen = serverTimestamp();
    return get(child(dossierBdeRef, id))
        .then((snapshot) => {
            if (snapshot.exists()) {
                update(snapshot.ref, data)
            } else {
                throw new Error("DossierBde not found");
            }
        });
}

export function deleteDossierBde(dossier: DossierBde): Promise<DossierBde> {
    if (!dossier.firebase_id) throw Error("DossierBde not found")
    return get(child(dossierBdeRef, dossier.firebase_id))
        .then((snapshot) => {
            if (snapshot.exists()) {
                remove(snapshot.ref)
                delete dossier.firebase_id
                return {... dossier}
            } else {
                throw new Error("DossierBde not found");
            }
        })
    }
