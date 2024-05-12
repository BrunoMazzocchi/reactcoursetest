import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Home = () => {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = Cookie.get("authorization");
      if (!token) {
        // Token missing, handle accordingly
        console.log("Token missing");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/courses/courses",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            // Invalid token
            console.log("Invalid token");
            // Remove from cookies and redirect to login
            Cookie.remove("authorization");
            navigate("/login");
          } else if (response.status === 404) {
            // Resource not found
            console.log("Resource not found");
          } else {
            // Other errors
            console.error("Error fetching courses:", response.statusText);
          }
          return;
        }
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.course_id}>
                <TableCell>{course.course_id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.state}</TableCell>
                <TableCell>{course.created_at}</TableCell>
                <TableCell>{course.last_updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Home;
