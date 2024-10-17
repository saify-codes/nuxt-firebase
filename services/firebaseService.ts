import { firebaseConfig } from "~/config/firebaseConfig";
import { initializeApp, type FirebaseApp, } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signOut,
    type User
} from "firebase/auth";
import {
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    writeBatch,
    limit,
    QuerySnapshot,
    Firestore,
    getFirestore,
    type WhereFilterOp,
    collection as firestoreCollection
} from 'firebase/firestore';

export default class {

    private static app: FirebaseApp
    private static db: Firestore

    static init() {
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app)
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

    static authenticated() {

        return new Promise<User | null>(res => {
            onAuthStateChanged(getAuth(), user => {
                res(user)
            })
        })
    }

    static async login(email: string, password: string, remember: boolean) {
        const auth = getAuth();
        const persistence = remember ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence); // Set persistence based on the remember me checkbox
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    }

    static async logout() {
        const auth = getAuth();
        try {
            await signOut(auth);
            return true;
        } catch (error: any) {
            console.error("Error signing out:", error.code, error.message);
            return false;
        }
    }

    /* ---------------------------- AUTH OPERATIONS ---------------------------- */


    /* ---------------------------- CRUD OPERATIONS ---------------------------- */
    static async addData(collection: string, data: Record<string, any>) {
        try {
            const docRef = await addDoc(firestoreCollection(this.db, 'users'), data);
            return docRef.id;
        } catch (e) {
            console.error('Error adding document to collection', collection, e);
            return null
        }
    }

    static async setData(collection: string, id: string, data: Record<string, any>) {
        try {
            await setDoc(doc(this.db, collection, id), data);
            return true;

        } catch (e) {
            console.error('Error setting document to collection', collection, e);
            return false
        }
    }

    static async updateData(collection: string, id: string, data: Record<string, any>) {
        const userRef = doc(this.db, collection, id);
        try {
            await updateDoc(userRef, data);
            return true
        } catch (e) {
            console.error('Error updating document to collection', collection, e);
            return false
        }
    }

    static async deleteData(collection: string, id: string) {
        await deleteDoc(doc(this.db, collection, id));
        return true
    }

    static async getData(collection: string, id: string) {
        const docRef = doc(this.db, collection, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }

    static async getAllData(collection: string) {
        const data: any[] = []
        const querySnapshot = await getDocs(firestoreCollection(this.db, collection));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        return data;
    }

    static async query(collection: string, field: string, operator: WhereFilterOp, value: any) {
        const data: any[] = []
        const q = query(firestoreCollection(this.db, collection), where(field, operator, value));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });

        return data
    }
    static async deleteCollection(collectionPath: string) {
        const collectionRef = firestoreCollection(this.db, collectionPath);
        const batchSize = 500;
        let querySnapshot: QuerySnapshot;

        try {
            do {
                const q = query(collectionRef, limit(batchSize));
                querySnapshot = await getDocs(q);

                if (querySnapshot.size === 0) {
                    break;
                }

                const batch = writeBatch(this.db);
                querySnapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                await batch.commit();
            } while (querySnapshot.size >= batchSize);

            return true;
        } catch (e) {
            console.error('Error deleting collection', collectionPath, e);
            return false;
        }
    }

    /* ---------------------------- CRUD OPERATIONS ---------------------------- */
}