import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface UserProfile {
    uid: string;
    name?: string;
    email?: string;
}

export const createUserProfile = async (user: UserProfile) => {
    const profileData = {
        user_id: user.uid,
        profile: {
            name: user.name ?? '',
            email: user.email ?? '',
            firstName: '',
            lastName: '',
            photoUrl: '',
        },
        addressBooks: [],
        orders: [],
        wishList: []
    };

    await setDoc(doc(db, "userProfiles", user.uid), profileData);

    return profileData;
}