import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { Axios } from "../Axios.service";
import { auth, firebaseObserver } from "../Firebase/Firebase.service";

const createUserAccount = async data => {
    const res = await Axios.post("/signup", data);

    return res.data;
};

const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const signOut = async () => {
    return firebaseSignOut(auth);
};

onAuthStateChanged(auth, () => {
    firebaseObserver.publish("authStateChanged", signedIn());
});

const signedIn = () => {
    return !!auth.currentUser;
};

onAuthStateChanged(auth, async () => {
    firebaseObserver.publish("hasAdminClaim", await isAdmin());
});

const isAdmin = async () => {
    return await auth?.currentUser
        ?.getIdTokenResult()
        .then(token => !!token.claims.admin);
};

const fetchUserToken = async () => {
    return await auth?.currentUser?.getIdToken();
};

export const AuthService = {
    createUserAccount,
    signIn,
    signOut,
    signedIn,
    isAdmin,
    fetchUserToken,
};
