import { db } from "@/src/services/firebase";
import { ref, child, get, onValue, push, update, remove} from "firebase/database";


const clientsRef = ref(db, "client");

export function getClientOnce(id: number|string): Promise<any> {
    return get(child(clientsRef, `${id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return {};
            }
        }).catch((error) => {
            console.warn("DB getClientOnce:", error);
        });
}

export function getClientsOnce() {
    return get(clientsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return {};
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

export function updateClient(id: number|string, data: object, callback: () => void) {
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
            console.log("cool1 !!!")
            if (snapshot.exists()) {
                console.log("cool2 !!!")
                remove(snapshot.ref)
                    .then(() => {
                        callback()
                        console.log("cool3 !!!")
                    })
            }
        })
    }