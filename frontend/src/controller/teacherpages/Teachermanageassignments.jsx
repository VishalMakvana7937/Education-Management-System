import React, { useEffect, useState } from 'react';
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
    Card,
    CardContent,
    TextField,
    Button,
    Snackbar,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    School as SchoolIcon,
    ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Teachermanageassignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editAssignment, setEditAssignment] = useState(null);  // For editing assignment
    const [editedAssignment, setEditedAssignment] = useState({
        title: '',
        description: '',
        dueDate: '',
        maxMarks: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/assignments', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAssignments(response.data.assignments);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/assignments/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSnackbarMessage('Assignment deleted successfully!');
            setSnackbarOpen(true);
            fetchAssignments();
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    const handleComment = async (id) => {
        if (!commentText.trim()) return;
        try {
            await axios.post(`http://localhost:5000/api/assignments/${id}/comments`, { comment: commentText }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCommentText('');
            fetchAssignments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleEditClick = (assignment) => {
        setEditAssignment(assignment); // Open edit modal with the selected assignment
        setEditedAssignment({
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            maxMarks: assignment.maxMarks
        });
    };

    const handleEditChange = (e) => {
        setEditedAssignment({ ...editedAssignment, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/assignments/${editAssignment._id}`, editedAssignment, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSnackbarMessage('Assignment updated successfully!');
            setSnackbarOpen(true);
            fetchAssignments();
            setEditAssignment(null); // Close the modal
        } catch (error) {
            console.error('Error updating assignment:', error);
        }
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
                        <Typography variant="h6" noWrap>Manage Assignments</Typography>
                    </Toolbar>
                </AppBar>

                <Typography variant="h4" sx={{ marginBottom: 2 }}>Manage Assignments</Typography>

                {assignments.map((assignment) => (
                    <Card key={assignment._id} sx={{ marginBottom: 3 }}>
                        <CardContent>
                            <Typography variant="h6">{assignment.title}</Typography>
                            <Typography>{assignment.description}</Typography>
                            <Typography>Due Date: {assignment.dueDate}</Typography>
                            <Typography>Max Marks: {assignment.maxMarks}</Typography>

                            {/* Edit button */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEditClick(assignment)}
                                sx={{ marginRight: 2 }}
                            >
                                Edit
                            </Button>

                            {/* Delete button */}
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDelete(assignment._id)}
                                sx={{ marginRight: 2 }}
                            >
                                Delete
                            </Button>

                            {/* Add comment */}
                            <TextField
                                label="Add Comment"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                sx={{ marginBottom: 2 }}
                                fullWidth
                            />
                            <Button variant="contained" color="primary" onClick={() => handleComment(assignment._id)}>
                                Add Comment
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                {/* Edit Assignment Modal */}
                <Dialog open={!!editAssignment} onClose={() => setEditAssignment(null)}>
                    <DialogTitle>Edit Assignment</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Title"
                            name="title"
                            value={editedAssignment.title}
                            onChange={handleEditChange}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={editedAssignment.description}
                            onChange={handleEditChange}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Due Date"
                            name="dueDate"
                            type="date" // Changed to proper date input
                            value={editedAssignment.dueDate}
                            onChange={handleEditChange}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Max Marks"
                            name="maxMarks"
                            value={editedAssignment.maxMarks}
                            onChange={handleEditChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditAssignment(null)}>Cancel</Button>
                        <Button onClick={handleEditSubmit} variant="contained" color="primary">Save</Button>
                    </DialogActions>
                </Dialog>

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

export default Teachermanageassignments;
