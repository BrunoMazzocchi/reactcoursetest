import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Courses</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
