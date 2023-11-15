import React from "react";
import { AllAuthors } from './AllAuthors';
import { useState } from "react";
import { TextField, Button } from "@mui/material";

export function Authors({ authors, setAuthors }) {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [summary, setSummary] = useState('');

  const handleEdit = (index) => {
    const authorToEdit = authors[index];
    setEditingId(index);
    setName(authorToEdit.name);
    setDob(authorToEdit.dob);
    setSummary(authorToEdit.summary);
  };

  const handleUpdate = () => {
    const updatedAuthors = [...authors];
    updatedAuthors[editingId] = { name, dob, summary };
    setAuthors(updatedAuthors);
    setEditingId(null);
    setName('');
    setDob('');
    setSummary('');
  };

  const handleDelete = (index) => {
    const updatedAuthors = authors.filter((_, i) => i !== index);
    setAuthors(updatedAuthors);
  };

  return (
    <div>
      <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name" variant="outlined" />
      <TextField value={dob} onChange={(e) => setDob(e.target.value)} label="Date of Birth" variant="outlined" />
      <TextField value={summary} onChange={(e) => setSummary(e.target.value)} label="Summary" variant="outlined" />
      {editingId !== null ? (
        <Button onClick={handleUpdate}>Update</Button>
      ) : (
        <Button onClick={() => {
          const newAuthor = { name, dob, summary };
          setAuthors([...authors, newAuthor]);
          setName('');
          setDob('');
          setSummary('');
        }}>Add Author</Button>
      )}

      {authors.map((auth, index) => (
        <AllAuthors key={index} authors={auth} id={index} onEdit={() => handleEdit(index)} onDelete={() => handleDelete(index)} />
      ))}
    </div>
  );
}
