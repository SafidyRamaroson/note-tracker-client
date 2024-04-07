import { Link, useLocation } from "react-router-dom";
import {
    Box,
    List,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Divider,
    Drawer
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";


function NavigationBar() {
    const location = useLocation();
    const path = location.pathname;
    
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: "250px",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: "250px",
                    backgroundColor:"rgb(54, 162, 235)",
                    boxSizing: 'border-box',
                    borderWidth:0
                }
            }}
        >
            <Box p={2} sx={{ textAlign: "center"}}>
                <h1 style={{color:"#fff",fontFamily:"Arial",fontSize:"25px"}}>Student Note Management</h1>
            </Box>
            <Divider />
            <List>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton
                        style={{
                            backgroundColor:(path === "/dashboard") ? "#fff":null,
                        }}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" style={{color:(path === "/dashboard") ? "rgb(54, 162, 235)":"#FFF"}}/>
                    </ListItemButton>
                </Link>
                <Link to="/students/notes" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton
                        style={{
                            backgroundColor:(path === "/students/notes") ? "#fff":null,
                        }}
                    >
                        <ListItemIcon>
                            <PeopleIcon color="#fff"/>
                        </ListItemIcon>
                        <ListItemText primary="Students" style={{color:(path === "/students/notes") ? "rgb(54, 162, 235)":"#FFF"}}/>
                    </ListItemButton>
                </Link>
            </List>
        </Drawer>
    );
}

export default NavigationBar;
