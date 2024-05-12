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
import React from "react";
import CourseModel from "../models/courseModel";

const theme = createTheme();

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Home = () => {
  const classes = useStyles();

  // Sample data
  const courses = [
    new CourseModel(
      1,
      "Course 1",
      "Description 1",
      "Active",
      "2024-05-12",
      "2024-05-12"
    ),
    new CourseModel(
      2,
      "Course 2",
      "Description 2",
      "Inactive",
      "2024-05-11",
      "2024-05-12"
    ),
    new CourseModel(
      3,
      "Course 3",
      "Description 3",
      "Active",
      "2024-05-10",
      "2024-05-12"
    ),
  ];

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
