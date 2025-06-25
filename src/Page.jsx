/* eslint-disable no-unused-vars */
import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const styles = {
  Page: { padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh",fontFamily:"'Nunito', sans-serif" },
  Header: { textAlign: "center", marginBottom: "2rem" },
  HeaderText: { fontSize: "2rem", fontWeight: "bold" },
};

const Page = () => {
  const [marks, setMarks] = React.useState([{ subject: "", grade: "" }]);
  const [totalMarks, setTotalMarks] = React.useState(0);
  const [showGradePoint, setShowGradePoint] = React.useState(false);
  const grades = [
    { grade: "O", value: 10 },
    { grade: "A+", value: 9 },
    { grade: "A", value: 8 },
    { grade: "B+", value: 7 },
    { grade: "B", value: 6 },
    { grade: "C", value: 5 },
    { grade: "D", value: 4 },
  ];
  const handleChange = (index, field, value) => {
    setMarks((prev) =>
      prev.map((mark, i) => (i === index ? { ...mark, [field]: value } : mark))
    );
  };

  const handleAddSubject = () => {
    setMarks((prev) => [...prev, { subject: "", grade: "" }]);
  };
  const handleCalculateGPA = () => {
    let totalPoints = 0;
    let totalSubjects = 0;

    marks.forEach((mark) => {
      if (mark.grade) {
        const gradeValue = grades.find(
          (grade) => grade.value === mark.grade
        )?.value;
        if (gradeValue) {
          totalPoints += gradeValue;
          totalSubjects += 1;
        }
      }
    });

    const gpa = totalSubjects ? (totalPoints / totalSubjects).toFixed(2) : 0;
    setTotalMarks(gpa);
    setShowGradePoint(true);
  };
  return (
    <Box sx={styles.Page}>
      <Box sx={styles.Header}>
        <Typography sx={styles.HeaderText}>Grade Point Calculator</Typography>
      </Box>

      {marks.map((mark, index) => (
        <Grid
          container
          key={index}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "20px" }}
        >
          <Grid item>
            <TextField
              label="Enter Subject"
              variant="outlined"
              required
              value={mark.subject}
              onChange={(e) => handleChange(index, "subject", e.target.value)}
              sx={{ backgroundColor: "#fff", width: "300px" }}
            />
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              sx={{ backgroundColor: "#fff", width: "300px" }}
            >
              <Select
                value={mark.grade}
                onChange={(e) => handleChange(index, "grade", e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Grade
                </MenuItem>
                {grades.map((grade) => (
                  <MenuItem key={grade.grade} value={grade.value}>
                    {grade.grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ))}

      <Grid container justifyContent="center" sx={{ marginTop: "30px" }}>
        <Button variant="contained" onClick={handleAddSubject}>
          + Add Subject
        </Button>
        <Button
          variant="contained"
          onClick={handleCalculateGPA}
          sx={{ marginLeft: "20px" }}
        >
          Calculate GPA
        </Button>
      </Grid>
       <Grid container justifyContent="center" sx={{ marginTop: "30px" }}>
        
        { showGradePoint && <Box>
        <Typography variant="h6">
          Total GPA: {totalMarks ? totalMarks : "0.00"}
        </Typography>
        </Box> }
      </Grid>
    </Box>
  );
};

export default Page;
