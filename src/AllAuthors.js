import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export function AllAuthors({ authors, onEdit, onDelete }) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    dob: Yup.string()
    .matches(/^[0-9/]+$/, "Date of Birth must contain only numbers and /")
    .required("Date of Birth is required"),
    summary: Yup.string().required("Summary is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: authors.name || "",
      dob: authors.dob || "",
      summary: authors.summary || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="allauthors">
      <div>
        <TextField
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>
      <div>
        <TextField
          name="dob"
          label="DOB"
          type="date"
          value={formik.values.dob}
          onChange={formik.handleChange}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
        />
      </div>
      <div>
        <TextField
          name="summary"
          label="About"
          multiline
          rows={4}
          value={formik.values.summary}
          onChange={formik.handleChange}
          error={formik.touched.summary && Boolean(formik.errors.summary)}
          helperText={formik.touched.summary && formik.errors.summary}
        />
      </div>
      <Button type="submit">Submit</Button>
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </form>
  );
}
