import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export const useFirebase = (callback: () => void) => {
    const firebaseConfig = {
        apiKey: "AIzaSyCo5iLG68aDBeA2E2LEg4gzLb2Vjt7WtdE",
        authDomain: "virtual-lab-35ad3.firebaseapp.com",
        projectId: "virtual-lab-35ad3",
        storageBucket: "virtual-lab-35ad3.firebasestorage.app",
        messagingSenderId: "685543038975",
        appId: "1:685543038975:web:096b8d6f8d91eaa8fb91ca",
        measurementId: "G-9K1VN8DB93"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const db = getFirestore(app);

    let user: User | null = null;

    // get user
    const getUser = () => {
        return user;
    }
      
    // get firebase app
    const getFirebaseApp = () => {
        return app;
    }

    // get firebase analytics
    const getFirebaseAnalytics = () => {
        return getAnalytics(app);
    }

    // create user
    const createUser = async (email: string, password: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            user = response.user;
            return response; 
        } catch (error) {
            console.log(error);
        }
        
    }

    // sign in
    const signIn = async (email: string, password: string) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            user = response.user;
            return response; 
        } catch (error) {
            console.log(error);
        }
        
    }

    // log activity
    const logActivity = async (text: string) => {
        const usersCollectionRef = collection(db, 'activity');
        try {
            const response = await addDoc(usersCollectionRef, {
                name: user?.displayName,
                text,
                user_id: user?.uid,
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    onAuthStateChanged(auth, (u) => {
        if (u) {
          user = u;
        } else {
          user = null;
        }
    });

    return { getFirebaseApp, getFirebaseAnalytics, createUser, signIn, getUser, logActivity }
}