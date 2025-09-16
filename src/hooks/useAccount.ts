import { useState } from "react"
import { useDispatch } from "react-redux";
import { setAccount, setProfile } from "../store/slice";
import type { Profile, Account } from "../store/slice";

export const useAccount = (showSnackBar?: (msg: string, severity: "success" | "error" | "warning" | "info") => void) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const setInitialAccountValue = async (values: Account) => {
        try {
            dispatch(setAccount(values));
        } catch(error) {
            console.error("Failed to set initial account values:", error);
        } finally {
            console.log("Initial account values set");
        }
    }

    const editProfile = async (values: Profile) => {
        setLoading(true);
        try {
            dispatch(setProfile(values));
            showSnackBar?.("Profile is successfully edited", "success");
        } catch (error) {
            showSnackBar?.("Edit failed", "error");
        } finally {
            setLoading(false);
        }
    }

    return {
        editProfile: {
            loading,
            editProfile,
        },
        initialValue: {
            setInitialAccountValue,
        }
    }
}