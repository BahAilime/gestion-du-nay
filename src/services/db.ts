import { db } from "@/src/services/firebase";
import { ref, child, get, onValue, push, update, remove, serverTimestamp, query, orderByChild} from "firebase/database";


const clientsRef = ref(db, "client");

export function getClientOnce(id: number|string): Promise<any> {
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

export function getClientsOnce(): Promise<any[]> {
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

export function subscribeToClient(id: number, callback: (client: any) => void) {
    onValue(child(clientsRef, `${id}`), (snapshot) => {
        callback(snapshot.val());
      });
}

export function subscribeToClients(callback: (clients: any) => void) {
    onValue(clientsRef, (snapshot) => {
        callback(snapshot.val());
      });
}

export function newClient(data: any, callback: (client: any) => void) {
    data.lastSeen = serverTimestamp()
    push(clientsRef, data)
        .then((newCli) => {
            callback(newCli)
        })
}

export function updateClient(id: number|string, data: any, callback: () => void) {
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