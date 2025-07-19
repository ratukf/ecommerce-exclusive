import { Paper } from "@mui/material";
import type React from "react";

export const WhitePaper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Paper elevation={1} sx={{ padding: '2rem', borderRadius: '4px', boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)' }}>
            {children}
        </Paper>
    )

}