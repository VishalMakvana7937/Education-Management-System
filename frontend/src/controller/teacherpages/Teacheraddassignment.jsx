import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Button,
    Snackbar,
    Alert,
    IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    School as SchoolIcon,
    ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import axios from 'axios';

const CreateAssignment = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        fileAttachment: '',
        maxMarks: 100,
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/assignments', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSnackbarMessage('Assignment created successfully!');
            setSnackbarOpen(true);
            resetForm();
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            fileAttachment: '',
            maxMarks: 100,
        });
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

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
                        <IconButton color="inherit" >
                            <ExitToAppIcon /> Logout
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <AppBar position="static" elevation={0} sx={{ backgroundColor: '#f5f5f5', color: '#000', mb: 3 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>Create Assignment</Typography>
                    </Toolbar>
                </AppBar>

                {/* Assignment Form */}
                <Typography variant="h4" sx={{ marginBottom: 2 }}>Create New Assignment</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="title"
                        label="Assignment Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        name="fileAttachment"
                        label="File Attachment"
                        value={formData.fileAttachment}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        name="maxMarks"
                        label="Max Marks"
                        type="number"
                        value={formData.maxMarks}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Create Assignment
                    </Button>
                    <Button
                        component={Link} // Use Link to navigate to another page
                        to="/dashboard/teacher/assignments" // Change this to the desired path for viewing all courses
                        variant="contained"
                        sx={{ backgroundColor: '#4caf50', marginLeft: 2 }} // Change the background color here
                    >
                        View All Assignment
                    </Button>
                </form>

                {/* Snackbar for success messages */}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default CreateAssignment;
