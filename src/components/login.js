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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
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
