import React from "react";
import { Button } from "@mui/material";


export function AllLists({ lists, id, onEdit, onDelete  }) {
  return (
    <div className="arrangement">
      <div>Title:{lists.title}</div>
      <div> Author:{lists.author}</div>
      <div>ISBN Number:{lists.isbn}</div>
      <div>Date Of Publication:{lists.dop}</div>
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}
