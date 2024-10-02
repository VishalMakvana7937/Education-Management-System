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
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const TeacherDashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Clear authentication token and local storage items
        localStorage.removeItem('token');
        setSnackbarMessage('You have been logged out successfully!');
        setSnackbarOpen(true);
        setAnchorEl(null);
        
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const isMenuOpen = Boolean(anchorEl);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
                <Box sx={{ width: 240, height: '100%', backgroundColor: '#1976d2', color: '#fff' }}>
                    <Typography variant="h6" sx={{ padding: '16px', textAlign: 'center', backgroundColor: '#1565c0' }}>
                        Teacher Dashboard
                    </Typography>
                    <List>
                        <ListItem component={Link} to="/dashboard/teacher" button>
                            <ListItemIcon sx={{ color: '#fff' }}><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" sx={{ color: 'black' }} />
                        </ListItem>
                        <ListItem component={Link} to="/students" button>
                            <ListItemIcon sx={{ color: '#fff' }}><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Students" sx={{ color: 'black' }} />
                        </ListItem>
                        <ListItem component={Link} to="/dashboard/teacheraddassignment" button>
                            <ListItemIcon sx={{ color: '#fff' }}><AssignmentIcon /></ListItemIcon>
                            <ListItemText primary="Assignments" sx={{ color: 'black' }} />
                        </ListItem>
                        <ListItem component={Link} to="/grades" button>
                            <ListItemIcon sx={{ color: '#fff' }}><SchoolIcon /></ListItemIcon>
                            <ListItemText primary="Grades" sx={{ color: 'black' }} />
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
                                placeholder="Search for students/assignments..."
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{ backgroundColor: '#fff', padding: '5px 10px', borderRadius: '5px', width: '50%' }}
                            />
                        </Box>
                        <IconButton>
                            <NotificationsIcon />
                        </IconButton>
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
                                <Typography variant="h4">200</Typography>
                                <Typography color="textSecondary">+5% from last month</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Assignments</Typography>
                                <Typography variant="h4">50</Typography>
                                <Typography color="textSecondary">+10% from last month</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Average Grade</Typography>
                                <Typography variant="h4">85%</Typography>
                                <Typography color="textSecondary">+2% from last month</Typography>
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

export default TeacherDashboard;
