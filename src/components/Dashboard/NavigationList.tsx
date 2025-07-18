import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { NAV_LIST } from "../../constants/navigation";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface NavigationListProps {
    handleClick: (index: number) => void;
    openIndex: number | null;
}

export const NavigationList = ({ handleClick, openIndex }: NavigationListProps) => {
    return (
        <List sx={{ paddingY: 4 }}>
            {NAV_LIST.map((item, idx) => (
                <Box key={item.label}>
                    {item.children ? (
                        <>
                            <ListItemButton onClick={() => handleClick(idx)} sx={{ pl: 0 }}>
                                <ListItemText primary={item.label} />
                                {openIndex === idx ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openIndex === idx} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((child) => (
                                        <ListItemButton key={child.label} sx={{ pl: 4 }}>
                                            <ListItemText primary={child.label} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </>
                    ) : (
                        <ListItemButton sx={{ pl: 0 }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    )}
                </Box>
            ))}
        </List>
    )
}