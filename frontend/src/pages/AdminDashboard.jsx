import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    IconButton,
    Grid,
    Card,
    CardContent,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Snackbar,
    Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate from react-router-dom
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state for logout feedback
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for snackbar
    const navigate = useNavigate(); // Hook for navigation

    // Handle profile menu open and close
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear authentication token
        setSnackbarMessage('You have been logged out successfully!'); // Set logout message
        setSnackbarOpen(true); // Open snackbar
        setAnchorEl(null);

        // Redirect to login page after a short delay
        setTimeout(() => {
            navigate('/login');
        }, 2000); // Redirect after 2 seconds
    };

    const isMenuOpen = Boolean(anchorEl);

    // Handle Snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
                <Box sx={{ width: 240, height: '100%', backgroundColor: '#1976d2', color: '#fff' }}>
                    <Typography variant="h6" sx={{ padding: '16px', textAlign: 'center', backgroundColor: '#1565c0' }}>
                        Admin Dashboard
                    </Typography>
                    <List>
                        <ListItem component={Link} to="/" button>
                            <ListItemIcon sx={{ color: '#fff' }}><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" sx={{ color: 'black' }} />
                        </ListItem>
                        <ListItem component={Link} to="/students" button>
                            <ListItemIcon sx={{ color: '#fff' }}><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Students" sx={{ color: 'black' }} />
                        </ListItem>
                        <ListItem component={Link} to="/dashboard/adminaddcourses" button>
                            <ListItemIcon sx={{ color: '#fff' }}><SchoolIcon /></ListItemIcon>
                            <ListItemText primary="Courses" sx={{ color: 'black' }} />
                        </ListItem>
                        <ListItem component={Link} to="/payment" button>
                            <ListItemIcon sx={{ color: '#fff' }}><PaymentIcon /></ListItemIcon>
                            <ListItemText primary="Payment" sx={{ color: 'black' }} />
                        </ListItem>
                        <ListItem component={Link} to="/settings" button>
                            <ListItemIcon sx={{ color: '#fff' }}><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Settings" sx={{ color: 'black' }} />
                        </ListItem>
                    </List>
                    <Box sx={{ padding: '16px', marginTop: 'auto' }}>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToAppIcon /> Logout
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* Topbar */}
                <AppBar position="static" elevation={0} sx={{ backgroundColor: '#f5f5f5', color: '#000', mb: 3 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Dashboard
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 2 }}>
                            <InputBase
                                placeholder="Search for students/teachers..."
                                inputProps={{ 'aria-label': 'search' }}
                                startAdornment={<SearchIcon sx={{ marginRight: 1 }} />}
                                sx={{ backgroundColor: '#fff', padding: '5px 10px', borderRadius: '5px', width: '50%' }}
                            />
                        </Box>
                        <IconButton>
                            <NotificationsIcon />
                        </IconButton>
                        {/* Profile Button */}
                        <IconButton onClick={handleProfileMenuOpen}>
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Profile Menu */}
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

                {/* Dashboard Content */}
                <Grid container spacing={3} sx={{ padding: '16px' }}>
                    {/* Top Metrics */}
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Students</Typography>
                                <Typography variant="h4">2000</Typography>
                                <Typography color="textSecondary">+34% from last month</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Courses</Typography>
                                <Typography variant="h4">356</Typography>
                                <Typography color="textSecondary">+34% from last month</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Teachers</Typography>
                                <Typography variant="h4">64</Typography>
                                <Typography color="textSecondary">-12% from last month</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Snackbar for user feedback */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;
