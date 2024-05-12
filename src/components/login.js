import {
  Button,
  Container,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          // Save token in cookies
          document.cookie = `authorization=${data.token}`;
          navigate("/");
        }
      } else {
        // Handle other status codes
        let errorMessage = "Error de servidor";
        if (response.status === 401) {
          errorMessage = "Credenciales inválidas";
        } else if (response.status === 500) {
          errorMessage = "Error interno del servidor";
        }
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Ocurrió un error al procesar la solicitud");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="alert alert-danger">{error}</div>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
