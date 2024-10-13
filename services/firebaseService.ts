import { initializeApp, type FirebaseApp, } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore, getFirestore, type WhereFilterOp } from 'firebase/firestore';
import { firebaseConfig } from "~/config/firebaseConfig";
import { doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, collection as firestoreCollection } from 'firebase/firestore';

export default class Firebse {

    private static app: FirebaseApp
    private static db: Firestore

    static init() {
        Firebse.app = initializeApp(firebaseConfig);
        Firebse.db = getFirestore(Firebse.app)
        // const analytics = getAnalytics(app);
    }

    /* ---------------------------- AUTH OPERATIONS ---------------------------- */
    static async createUser(email: string, password: string) {
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User created successfully:", user);
            return user;
        } catch (error: any) {
            console.error("Error creating user:", error.code, error.message);
            throw error;
        }
    }
    /* ---------------------------- AUTH OPERATIONS ---------------------------- */


    /* ---------------------------- CRUD OPERATIONS ---------------------------- */
    static async addData(collection: string, data: Record<string, any>) {
        try {
            const docRef = await addDoc(firestoreCollection(Firebse.db, 'users'), data);
            return docRef.id;
        } catch (e) {
            console.error('Error adding document to collection', collection, e);
            return null
        }
    }

    static async setData(collection: string, id: string, data: Record<string, any>) {
        try {
            await setDoc(doc(Firebse.db, collection, id), data);
            return true;

        } catch (e) {
            console.error('Error setting document to collection', collection, e);
            return false
        }
    }

    static async updateData(collection: string, id: string, data: Record<string, any>) {
        const userRef = doc(Firebse.db, collection, id);
        try {
            await updateDoc(userRef, data);
            return true
        } catch (e) {
            console.error('Error updating document to collection', collection, e);
            return false
        }
    }

    static async deleteData(collection: string, id: string) {
        await deleteDoc(doc(Firebse.db, collection, id));
        return true
    }

    static async getData(collection: string, id: string) {
        const docRef = doc(Firebse.db, collection, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }

    static async getAllData(collection: string) {
        const data: any[] = []
        const querySnapshot = await getDocs(firestoreCollection(Firebse.db, collection));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        return data;
    }

    static async query(collection: string, field: string, operator: WhereFilterOp, value: any) {
        const data: any[] = []
        const q = query(firestoreCollection(Firebse.db, collection), where(field, operator, value));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });

        return data
    }
    /* ---------------------------- CRUD OPERATIONS ---------------------------- */
}