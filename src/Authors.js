import React from "react";
import { TextField, Button } from "@mui/material";
import { AllAuthors } from "./AllAuthors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export function Authors({ authors, setAuthors }) {
  const [editingId, setEditingId] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    summary: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Summary should contain only letters and spaces")
    .test(
      "word-count",
      "Summary should have at least 15 words",
      (value) => value.split(/\s+/).filter(Boolean).length >= 15
    )
    .required("Summary is required"),
    dob: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Date of Birth must be in DD/MM/YYYY format")
    .required("Date of Birth is required")
  });
  const handleEdit = (index) => {
    const bookToEdit = authors[index];
    setEditingId(index);
    formik.setValues(bookToEdit);
  };

  const handleDelete = (index) => {
    const updatedAuthors = authors.filter((_, i) => i !== index);
    setAuthors(updatedAuthors);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      dob: '',
      summary: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (editingId !== null) {
        const updatedAuthors = [...authors];
        updatedAuthors[editingId] = values;
        setAuthors(updatedAuthors);
        setEditingId(null);
      } else {
        setAuthors([...authors, values]);
      }
      resetForm();
    },
  });

  return (
    
    <form onSubmit={formik.handleSubmit}>
      <div className="add-form">
      <TextField
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label="Name"
        variant="outlined"
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        style={{margin:"20px"}}
      />
      <TextField
        name="dob"
        value={formik.values.dob}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label="Date of Birth"
        variant="outlined"
        error={formik.touched.dob && Boolean(formik.errors.dob)}
        helperText={formik.touched.dob && formik.errors.dob}
        style={{margin:"20px"}}
      />
      <TextField
        name="summary"
        value={formik.values.summary}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label="Summary"
        variant="outlined"
        error={formik.touched.summary && Boolean(formik.errors.summary)}
        helperText={formik.touched.summary && formik.errors.summary}
        style={{margin:"20px"}}
      />
       {editingId !== null ? (
          <Button variant="contained" style={{margin:"20px"}} type="submit">Update</Button>
        ) : (
          <Button variant="contained" style={{margin:"20px"}} type="submit">Add Lists</Button>
        )}
    
    </div>
    <div className="arranging">
    {authors.map((auth, index) => (
          <AllAuthors
            key={index}
            auth={auth}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
  </div>
  </form>
  );
}


