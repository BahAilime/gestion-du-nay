import { db } from "@/src/services/firebase";
import { fromUnixTime } from "date-fns/fromUnixTime";
import { getUnixTime } from "date-fns/getUnixTime";
import { ref, child, get, onValue, push, update, remove, serverTimestamp, query, orderByChild, DatabaseReference} from "firebase/database";

export type client = {
    nom_cli: string;
    resp_cli?: string;
    email_cli?: string;
    tel_cli?: string;
    adr_cli?: string;
    ville_cli?: string;
    cp_cli?: string;
    type_cli?: string;
    notes_cli?: string;
    lastSeen?: any;
}

export type line = {
    key?: string,
    label?: string,
    qte?: number,
    prixHt?: number,
    tva?: number,
    remise?: number
}

export type dossier = {
    idClient?: string,
    client?: client,
    infos?: {
        debut?: Date,
        fin?: Date,
        adultes?: number,
        enfants?: number,
        nuits?: number
    }
    nuits?: {
        drap?: number,
        lines?: line[]},
    repas?: {
        servi?: boolean,
        lines?: line[]
    },
    activite?: line[],
    divers?: line[],
    lastSeen?: any,
    firebase_id?: string
}

type Dossier = {
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
    },
    client?: client,
    nuits: {
        drap: line,
        lines: {
            adulte: line,
            enfant: line,
            autres?: line[]
        }
    },
    repas: {
        servi: boolean,
        lines: {
            petitdej:line,
            repasEnfant:line,
            repasCollegien:line,
            repasAdulte:line,
            piquenique:line,
            gouter:line,
            autres?: line[],
        }
    },
    activite: {
        naturepeda: line,
        jardin: line,
        equestre: line,
        orientation: line,
        autres?: line[],
    },
    divers?: line[],
    lastSeen?: any
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
                adulte:{label: "Adulte", qte: 0, prixHt: 15.70, tva: 10, remise: 0},
                enfant:{label: "Enfant", qte: 0, prixHt: 14.3, tva: 10, remise: 0}

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
            naturepeda:{label: "Nature-peda", qte: 0, prixHt: 6.36, tva: 10, remise: 0},
            jardin:{label: "Jardin", qte: 0, prixHt: 6.36, tva: 10, remise: 0},
            orientation:{label: "Orientation", qte: 0, prixHt: 6.36, tva: 10, remise: 0},
            equestre:{label: "Equestre", qte: 0, prixHt: 12, tva: 10, remise: 0}
        },
        divers: [
            {key: "communs", label: "Gestion libre des lieux communs", qte: 0, prixHt: 95.45, tva: 10, remise: 0},
            {key: "menage", label: "Forfait ménage de fin de séjour", qte: 0, prixHt: 91.67, tva: 20, remise: 0},
        ]
    }

    return dossier
}

const clientsRef = ref(db, "client");
const dossierRef = ref(db, "dossier");

export function getClientOnce(id: number|string): Promise<client> {
    return get(child(clientsRef, `${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                update(snapshot.ref, {lastSeen: serverTimestamp()})
                return snapshot.val();
            } else {
                return {};
            }
        }).catch((error) => {
            console.warn("DB getClientOnce:", error);
        });
}

export function getClientsOnce(): Promise<client[]> {
    return get(query(clientsRef, orderByChild("lastSeen")))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const clients: any[] = []
                snapshot.forEach((snapClient) => {
                    clients.push({...snapClient.val(), firebase_id: snapClient.key});
                });
                return clients.reverse();
            } else {
                return [];
            }
        }).catch((error) => {
            console.warn("DB getClientsOnce:", error);
            return [];
        });
}

export function subscribeToClient(id: number|string, callback: (client: client) => void) {
    onValue(child(clientsRef, `${id}`), (snapshot) => {
        callback(snapshot.val());
      });
}

export function subscribeToClients(callback: (clients: client[]) => void) {
    onValue(clientsRef, (snapshot) => {
        callback(snapshot.val());
      });
}

// TODO: Make it return a client object
export function newClient(data: client, callback: (client: DatabaseReference) => void) {
    data.lastSeen = serverTimestamp()
    push(clientsRef, data)
        .then((newCli) => {
            callback(newCli)
        })
}

export function updateClient(id: number|string, data: client|any, callback: () => void) {
    data.lastSeen = serverTimestamp()
    get(child(clientsRef, `${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                update(snapshot.ref, data)
                    .then(() => callback())
            }
        })
}

export function deleteClient(id: number|string, callback: () => void) {
    get(child(clientsRef, `${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                remove(snapshot.ref)
                    .then(() => {
                        callback()
                    })
            }
        })
    }


export function newDossier(data:dossier, callback: (client: DatabaseReference) => void) {
    data.lastSeen = serverTimestamp()
    let dataTransition: any = data
    if (data.infos?.debut) {
        dataTransition.infos.debut = getUnixTime(data.infos.debut)
    }
    if (data.infos?.fin) {
        dataTransition.infos.fin = getUnixTime(data.infos?.fin)
    }

    push(dossierRef, dataTransition)
        .then((newDos) => {
            callback(newDos)
        })
}

export async function getDossiersOnce(): Promise<dossier[]> {
    try {
        const snapshot = await get(query(dossierRef, orderByChild("lastSeen")));
        if (!snapshot.exists()) {
            return [];
        }

        const dossiersPromises: Promise<dossier>[] = [];
        snapshot.forEach((snapDossier) => {
            let dossier: dossier = snapDossier.val();
            if (dossier.idClient) {
                const dossierPromise = getClientOnce(dossier.idClient)
                    .then((client) => {
                        const dossierComplet: dossier = { ...dossier, client, firebase_id: snapDossier.key };
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

export async function getDossierOnce(id: number | string): Promise<dossier> {
    const snapDossier = await get(child(dossierRef, `${id}`));

    if (snapDossier.exists()) {
        const dossier: dossier = snapDossier.val();
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

export function updateDossier(id: number|string, data: dossier|any, callback: () => void) {
    data.lastSeen = serverTimestamp()
    get(child(dossierRef, `${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                update(snapshot.ref, data)
                    .then(() => callback())
            }
        })
}

export function deleteDossier(id: string, callback: () => void) {
    get(child(dossierRef, `${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                remove(snapshot.ref)
                    .then(() => {
                        callback()
                    })
            }
        })
    }
