import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../store/asyncAction";
import type { AppDispatch } from "../store/store";
import { useNavigate } from "react-router";

export const useAuth = (
    showSnackBar?: (msg: string, severity?: "success" | "error" | "warning" | "info") => void
) => {
    const dispatch = useDispatch<AppDispatch>();

    // Login state & logic
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const handleLoginEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value);
    const handleLoginPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value);

    const logIn = async () => {
        setLoginLoading(true);
        try {
            const resultAction = await dispatch(signIn({ email: loginEmail, password: loginPassword }));
            if (signIn.rejected.match(resultAction)) {
                showSnackBar?.("Login failed", "error");
            } else {
                showSnackBar?.("Login successful", "success");
            }
        } catch (error) {
            showSnackBar?.(`An unexpected error occurred: ${error}`, "error");
        } finally {
            setLoginLoading(false);
        }
    };

    // Signup state & logic
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);
    const nav = useNavigate();

    const handleSignupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignupName(e.target.value);
    const handleSignupEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignupEmail(e.target.value);
    const handleSignupPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignupPassword(e.target.value);

    const signUpUser = async () => {
        setSignupLoading(true);
        try {
            const resultAction = await dispatch(
                signUp({ name: signupName, email: signupEmail, password: signupPassword })
            );
            if (signUp.rejected.match(resultAction)) {
                showSnackBar?.("Sign up failed", "error");
            } else {
                showSnackBar?.("Account created successfully!", "success");
                setTimeout(() => {
                    nav('/login')
                }, 2000);
            }
        } catch (error) {
            showSnackBar?.(`An unexpected error occurred: ${error}`, "error");
        } finally {
            setSignupLoading(false);
        }
    };

    return {
        useLogin: {
            email: loginEmail,
            password: loginPassword,
            loading: loginLoading,
            handleEmailChange: handleLoginEmailChange,
            handlePasswordChange: handleLoginPasswordChange,
            logIn,
        },
        useSignup: {
            name: signupName,
            email: signupEmail,
            password: signupPassword,
            loading: signupLoading,
            handleNameChange: handleSignupNameChange,
            handleEmailChange: handleSignupEmailChange,
            handlePasswordChange: handleSignupPasswordChange,
            signUp: signUpUser,
        },
    };
};