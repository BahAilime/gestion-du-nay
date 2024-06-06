import { ref, child, get, onValue, push, update, remove, serverTimestamp, query, orderByChild, DatabaseReference} from "firebase/database";
import { db } from "@/src/services/firebase";

export const clientsRef = ref(db, "client");

export type Client = {
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
    firebase_id?: string,
}

export function clientTemplate(): Client {
    return {
        nom_cli: "",
        resp_cli: "Resp",
        email_cli: "e@mail.com",
        tel_cli: "00 00 00 00 00",
        adr_cli: "1 rue du Template",
        ville_cli: "Templateburg",
        cp_cli: "00000",
        type_cli: "",
        notes_cli: "<strong>Oh oh oh</strong>",
    };
}

export function getClientOnce(id: string): Promise<Client> {
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

export function getClientsOnce(): Promise<Client[]> {
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

export function subscribeToClient(id: string, callback: (client: Client) => void) {
    onValue(child(clientsRef, `${id}`), (snapshot) => {
        callback(snapshot.val());
      });
}

export function subscribeToClients(callback: (clients: Client[]) => void) {
    onValue(clientsRef, (snapshot) => {
        callback(snapshot.val());
      });
}

export async function newClient(data: Client): Promise<Client> {
    data.lastSeen = serverTimestamp()
    const ref = await push(clientsRef, data)
    if (!ref.key) throw Error("Client not created")
    data.firebase_id = ref.key
    return data 
}

export function updateClient(id: string, data: Client): Promise<void> {
    data.lastSeen = serverTimestamp();
    return get(child(clientsRef, `${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                update(snapshot.ref, data)
            } else {
                throw new Error("Client not found");
            }
        });
}

export function deleteClient(client: Client): Promise<Client> {
    if (!client.firebase_id) throw Error("Client not found")
    return get(child(clientsRef, client.firebase_id))
        .then((snapshot) => {
            if (snapshot.exists()) {
                remove(snapshot.ref)
                return {... client, firebase_id: undefined}
            } else {
                throw new Error("Client not found");
            }
        })
    }
