import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { AuthManager } from "../utils/slogs-firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const logsCollection = collection(db, 'incidentLogs');

export function useAuth() {
    const [currentAccount, setCurrentAccount] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (account) => {
            const accountInfo = account !== null ? await AuthManager.getOrganizationInfo(account.uid) : null;

            if (account !== null && accountInfo !== null && accountInfo.success) {
                setCurrentAccount({ ...accountInfo.result, uid: account.uid, email: account.email });
            } else {
                setCurrentAccount(null);
            }
        })
        return () => unsubscribe();
    }, []);

    return { authenticated: currentAccount !== null, currentAccount };
}

export function useIncidentLogs() {
    const { currentAccount } = useAuth();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        if (currentAccount === null) { setLogs([]); return; }

        const q = query(logsCollection, where("organizationId", "==", currentAccount.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const returnedLogs = querySnapshot.docs.map((document) => (
                { id: document.id, ...document.data() }
            ));
            setLogs(returnedLogs);
        });
        return () => unsubscribe();
    }, [currentAccount])

    return { logs };
}