import { db } from "@/src/services/firebase";
import { fromUnixTime, getUnixTime } from "date-fns";
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
    idClient: string,
    client?: client,
    infos?: {
        debut?: Date|number,
        fin?: Date|number,
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
    if (data.infos?.debut) {
        data.infos.debut = getUnixTime(data.infos.debut)
    }
    if (data.infos?.fin) {
        data.infos.fin = getUnixTime(data.infos?.fin)
    }

    push(dossierRef, data)
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
        });

        const dossiers = await Promise.all(dossiersPromises);
        return dossiers.reverse();
    } catch (error) {
        console.warn("DB getDossiersOnce:", error);
        return [];
    }
}

export function getDossierOnce(id: number|string): Promise<dossier> {
    return get(child(dossierRef, `${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                update(snapshot.ref, {lastSeen: serverTimestamp()})
                return snapshot.val();
            } else {
                return {};
            }
        }).catch((error) => {
            console.warn("DB getDossierOnce:", error);
        });
}
