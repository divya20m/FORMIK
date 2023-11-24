import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { AllLists } from "./AllLists";
import { useFormik } from "formik";
import * as Yup from "yup";

export function Lists({ lists, setLists }) {
  const [editingId, setEditingId] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string()
      .required("ISBN is required")
      .matches(/^\d{15}$/, "ISBN must contain exactly 15 numbers"),
      dob: Yup.string()
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Date of Birth must be in DD/MM/YYYY format")
      .required("Date of Birth is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      dob: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (editingId !== null) {
        const updatedLists = [...lists];
        updatedLists[editingId] = values;
        setLists(updatedLists);
        setEditingId(null);
      } else {
        setLists([...lists, values]);
      }
      resetForm();
    },
  });

  const handleEdit = (index) => {
    const bookToEdit = lists[index];
    setEditingId(index);
    formik.setValues(bookToEdit);
  };

  const handleDelete = (index) => {
    const updatedLists = lists.filter((_, i) => i !== index);
    setLists(updatedLists);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="add-form">
        <TextField
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          label="Title"
          variant="outlined"
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          style={{margin:"20px"}}
        />
        <TextField
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          label="Author"
          variant="outlined"
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
          style={{margin:"20px"}}
        />
        <TextField
          name="isbn"
          value={formik.values.isbn}
          onChange={formik.handleChange}
          label="ISBN"
          variant="outlined"
          error={formik.touched.isbn && Boolean(formik.errors.isbn)}
          helperText={formik.touched.isbn && formik.errors.isbn}
          style={{margin:"20px"}}
        />
        <TextField
          name="dob"
          value={formik.values.dob}
          onChange={formik.handleChange}
          label="Date of Publication"
          variant="outlined"
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
          style={{margin:"20px"}}
        />

        {editingId !== null ? (
          <Button type="submit" variant="contained" style={{margin:"20px"}}>Update</Button>
        ) : (
          <Button type="submit" variant="contained" style={{margin:"20px"}}>Add Lists</Button>
        )}
      </div>

      <div className="arranging">
        {lists.map((li, index) => (
          <div key={index}>
            <AllLists lists={li} onEdit={() => handleEdit(index)} onDelete={() => handleDelete(index)} />
          </div>
        ))}
      </div>
    </form>
  );
}
