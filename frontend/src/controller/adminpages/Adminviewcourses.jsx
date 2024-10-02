import React, { useEffect, useState } from 'react';
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
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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

const Adminviewcourses = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [courses, setCourses] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/api/courses', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch courses');
                const coursesData = await response.json();
                setCourses(coursesData);
            } catch (err) {
                setSnackbarMessage(err.message);
                setSnackbarOpen(true);
            }
        };

        fetchCourses();
    }, []);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setSnackbarMessage('Logged out successfully');
        setSnackbarOpen(true);  
        setAnchorEl(null);
        navigate('/login');
    };

    const isMenuOpen = Boolean(anchorEl);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleEditDialogOpen = (course) => {
        setCurrentCourse(course);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setCurrentCourse(null);
    };

    const handleEditCourse = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${currentCourse._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentCourse),
            });
            if (!response.ok) throw new Error('Failed to update course');
            const updatedCourse = await response.json();
            setCourses((prevCourses) =>
                prevCourses.map((course) => (course._id === updatedCourse._id ? updatedCourse : course))
            );
            handleEditDialogClose();
            setSnackbarMessage('Course updated successfully');
            setSnackbarOpen(true);
        } catch (err) {
            setSnackbarMessage(err.message);
            setSnackbarOpen(true);
        }
    };

    const handleDeleteCourse = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete course');
            setCourses(courses.filter((course) => course._id !== id));
            setSnackbarMessage('Course deleted successfully');
            setSnackbarOpen(true);
        } catch (err) {
            setSnackbarMessage(err.message);
            setSnackbarOpen(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
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

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
                        <IconButton onClick={handleProfileMenuOpen}>
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>

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

                <Box sx={{ marginBottom: 2 }}>
                    <Button component={Link} to="/dashboard/adminaddcourses" variant="contained" color="primary">
                        Back to Courses
                    </Button>
                </Box>

                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course._id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {course.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {course.description}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Button variant="contained" onClick={() => handleEditDialogOpen(course)}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDeleteCourse(course._id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Course</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit the course details below:
                        </DialogContentText>
                        {currentCourse && (
                            <>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={currentCourse.title}
                                    onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={currentCourse.description}
                                    onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                                />
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={handleEditCourse}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default Adminviewcourses;
