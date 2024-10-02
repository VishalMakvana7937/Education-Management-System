import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Link } from '@mui/material';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
        const decoded = JSON.parse(atob(data.token.split('.')[1])); // Decode JWT to get role
        localStorage.setItem('role', decoded.role); 
        localStorage.setItem('userId', decoded.id); 
        window.location.href = `/dashboard/${decoded.role.toLowerCase()}`;
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained" fullWidth color="primary" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/signup" underline="hover">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
