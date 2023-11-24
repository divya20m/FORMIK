
import React from "react";
import { Button } from "@mui/material";

export function AllAuthors({ auth, onEdit, onDelete }) {
  return (
    <div className="allauthors">
      <div>Name: {auth.name}</div>
      <div>Date of Birth: {auth.dob}</div>
      <div>Summary: {auth.summary}</div>
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}