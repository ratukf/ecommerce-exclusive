import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../store/asyncAction";
import type { AppDispatch } from "../store/store";

export const useLogin = (
    showSnackBar?: (msg: string, severity?: "success" | "error" | "warning" | "info") => void
) => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const logIn = async () => {
        setLoading(true);
        try {
            const resultAction = await dispatch(signIn({ email, password }));
            if (signIn.rejected.match(resultAction)) {
                showSnackBar?.("Login failed", "error");
            } else {
                showSnackBar?.("Login successful", "success");
            }
        } catch (error) {
            showSnackBar?.(`An unexpected error occurred: ${error}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        password,
        loading,
        handleEmailChange,
        handlePasswordChange,
        logIn,
    };
};