import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../../firebase/firebase';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore'

export class AuthManager {
    static async registerOrganization(form = { email: '', password: '', name: '', phone: '' }) {
        return await genericResponse(async () => {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
            const docRef = doc(db, "organization", userCredential.user.uid);

            delete form.email;
            delete form.password;

            await setDoc(docRef, form);
        });
    }

    static async loginAccount(form = { email: '', password: '' }) {
        return await genericResponse(async () => (
            await signInWithEmailAndPassword(auth, form.email, form.password)
        ));
    }

    static async logoutUser() {
        return await genericResponse(async () => (
            await signOut(auth)
        ));
    }

    static async getOrganizationInfo(userId) {
        return await genericResponse(async () => {
            const docRef = doc(db, "organization", userId);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) return { success: true, result: docSnap.data() };
            return { success: false };
        });
        
    }
}

export class OrganizationManager {
    static logsCollection = collection(db, 'incidentLogs');

    static async addIncidentLog(form = { title: '', description: '', urgency: '', uid: '', organizationId: '', createdDateTime }) {
        return await genericResponse(async () => {
            await addDoc(this.logsCollection, form);
        });
    }
}

async function genericResponse(promise) {
    try {
        const response = await promise();
        return (
            response.success === undefined
                ? { success: true }
                : response
        );
    }
    catch (error) {
        return { success: false, errorCode: error.code, errorMessage: error.message };
    }
}