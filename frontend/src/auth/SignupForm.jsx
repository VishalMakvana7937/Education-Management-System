import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Container, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student',  // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // Save token and role in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', formData.role); // Save role
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select name="role" value={formData.role} onChange={handleChange}>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth color="primary" sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
