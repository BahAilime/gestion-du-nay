import { db } from "@/src/services/firebase";
import { ref, child, get, onValue, push} from "firebase/database";


const clientsRef = ref(db, "client");

export function getClientOnce(id: number) {
        get(child(clientsRef, `${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val()
                } else {
                    return {}
                }
            }).catch((error) => {
                console.warn("DB getClientOnce:", error);
            });
}

export function getClientsOnce() {
    get(clientsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                return {}
            }
        }).catch((error) => {
            console.warn("DB getClientsOnce:", error);
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

export function newClient(data: object, callback: (client: any) => void) {
    push(clientsRef, data)
        .then((newCli) => {
            callback(newCli)
        })
}