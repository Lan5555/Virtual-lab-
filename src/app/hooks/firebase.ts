import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AppUser {
    user_id: string | null;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
}

interface Res {
    success: boolean;
    data?: any,
    message?: string;
}
export const useFirebase = () => {
    const emptyUser: AppUser = { 
        user_id: null,
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
    };

    const [user, setUser] = useState(() => {
        try {
          const item = window.localStorage.getItem('user');
          return item ? JSON.parse(item) : emptyUser;
        } catch (error) {
          return emptyUser;
        }
    });

    useEffect(() => {
        // Prevent storage on server-side rendering
        if (typeof window === 'undefined') {
          return;
        }
        window.localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const router = useRouter();

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    const auth = getAuth(app);
    const db = getFirestore(app);

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

    /*
    * authentication
    */

    // create user
    const createUser = async (email: string, password: string): Promise<Res> => {
        try {
            const data =  await createUserWithEmailAndPassword(auth, email, password);
            return {
                success: true,
                data,
                message: "User created successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        
    }

    // sign in
    const signIn = async (email: string, password: string): Promise<Res> => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // get user information
            const userInfoRef = collection(db, 'user-info');
            const q = query(userInfoRef, where("user_id", "==", response.user.uid));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return {
                    success: false,
                    message: "Could not complete sign in",
                }
            } 

            const doc = querySnapshot.docs[0];
            localStorage.setItem('user', JSON.stringify({ ...doc.data(), email: response.user.email }));
            setUser({ ...doc.data(), email: `${response.user.email}` })

            return {
                success: true,
                data: user,
                message: "User created successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        
    }

    /*
    * end authentication
    */ 

    /*
    * fire store
    */

    // log activity
    const logActivity = async (text: string): Promise<Res> => {
        try {
            const activityRef = collection(db, 'activity');
            const data = await addDoc(activityRef, {
                name: `${user.first_name} ${user.last_name}`,
                text,
                user_id: user.user_id,
                date: new Date(),
            });
            return {
                success: true,
                data,
                message: "Activity logged",
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
    }

    // get user activities
    const getUserActivities = async (): Promise<Res> => {
        try {
            const activityRef = collection(db, 'activity');
            const q = query(activityRef, where("user_id", "==", user.user_id));
            const querySnapshot = await getDocs(q);

            const activities = querySnapshot.docs.map((doc) => ({ 
                id: doc.id, 
                name: doc.data().name,
                action: `${doc.data().date.toDate()}: ${doc.data().text}`, 
             }));
            return {
                success: true,
                data: activities,
                message: "Activities fetched",
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
    }

    // user info
    const addUserInfo = async (first_name: string, last_name: string, phone: string, userRes: User): Promise<Res> => {
        const userInfoRef = collection(db, 'user-info');
        try {
            const response = await addDoc(userInfoRef, {
                first_name,
                last_name,
                phone,
                user_id: userRes?.uid,
            });

            // store user
            const userInfo = { first_name, last_name, phone, user_id: userRes.uid, email: `${userRes.email}` };
            localStorage.setItem('user', JSON.stringify(userInfo));
            setUser(userInfo)


            return {
                success: true,
                data: response,
                message: "User info added",
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
    }

     // score
     const updateScore = async (subject: string, value: string): Promise<Res> => {
        const scoreRef = collection(db, 'score');
        try {
            const response = await addDoc(scoreRef, {
                subject,
                value,
                user_id: user.user_id,
            });
            return {
                success: true,
                data: response,
                message: "Score Updated",
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
    }

    // get user subject score
    const getScore = async (): Promise<Res> => {
        try {
            const scoreRef = collection(db, 'score');
            const q = query(scoreRef, where("user_id", "==", user.user_id));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return {
                    success: false,
                    message: "No Score was found",
                }
            } 
            
            const score = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            return {
                success: true,
                data: score,
                message: "Score Updated",
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
    }

    // send feedback
    const sendFeedback = async (comment: string): Promise<Res> => {
        const feedbackRef = collection(db, 'feedback');
        try {
            const response = await addDoc(feedbackRef, {
                name: `${user.first_name} ${user.last_name}`,
                comment: `${new Date().toISOString()}: ${comment}`,
                user_id: user.user_id,
            });
            return {
                success: true,
                data: response,
                message: "Feedback sent successfully",
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            } 
        }
    }

    const getFeedbacks = async (): Promise<Res> => {
        try {
            const feedbackRef = collection(db, 'feedback');
            const q = query(feedbackRef, where("user_id", "==", user.user_id));
            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map((doc) => ({ 
                id: doc.id, 
                name: doc.data().name,
                comment: doc.data().comment,
             }));

            return {
                success: true,
                data,
                message: "Feedback sent successfully",
            }
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            } 
        }
    }
         

    /*
    * end fire store
    */

    // watch auth state
    onAuthStateChanged(auth, (u) => {
        if (u) {
          user.user_id = u.uid
        } else {
          user.user_id = null;
          router.push('/pages/login');
        }
    });

    return { 
        getFirebaseApp, 
        getFirebaseAnalytics, 
        createUser, 
        signIn, 
        getUser, 
        logActivity, 
        addUserInfo, 
        updateScore, 
        getUserActivities, 
        getScore,
        sendFeedback,
        getFeedbacks,
    }
}