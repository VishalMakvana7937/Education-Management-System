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
    TextField,
    Button,
    Snackbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MuiAlert from '@mui/material/Alert';

const Adminaddcourses = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [courseData, setCourseData] = useState({ title: '', description: '', startDate: '', endDate: '', teacher: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Handle profile menu open and close
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Perform logout actions (e.g., clear auth tokens, redirect to login page, etc.)
        console.log('Logout clicked');
        setAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 
        try {
            const response = await fetch('http://localhost:5000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(courseData),
            });
            if (!response.ok) throw new Error('Failed to create course');
            const course = await response.json();
            setSnackbarMessage(`Course "${course.title}" created successfully!`);
            setSnackbarOpen(true);
            setCourseData({ title: '', description: '', startDate: '', endDate: '', teacher: '' });
        } catch (err) {
            setSnackbarMessage(err.message);
            setSnackbarOpen(true);
        }
    };

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
                        <ListItem component={Link} to="/dashboard/admin" button>
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

                {/* Create Course Form */}
                <Card variant="outlined" sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Create New Course
                        </Typography>
                        <form onSubmit={handleCreateCourse}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Course Title"
                                        name="title"
                                        value={courseData.title}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={courseData.description}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Start Date"
                                        type="date"
                                        name="startDate"
                                        value={courseData.startDate}
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="End Date"
                                        type="date"
                                        name="endDate"
                                        value={courseData.endDate}
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Teacher"
                                        name="teacher"
                                        value={courseData.teacher}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Create Course
                                    </Button>
                                    <Button
                                        component={Link} // Use Link to navigate to another page
                                        to="/dashboard/adminviewcourses" // Change this to the desired path for viewing all courses
                                        variant="contained"
                                        sx={{ backgroundColor: '#4caf50', marginLeft: 2 }} // Change the background color here
                                    >
                                        View All Courses
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                {/* Snackbar for notifications */}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default Adminaddcourses;
