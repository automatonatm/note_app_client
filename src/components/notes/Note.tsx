
import styles from "./Notes.module.scss"
import React from 'react'
import { Card } from 'react-bootstrap'
import { Note as NoteModel } from 'models/note'
import {formatDate} from "utils/formatDate";
import {MdDelete} from 'react-icons/md'

interface NoteProps {
    note: NoteModel,
    onDeleteNoteClicked: (note: NoteModel) => void,
    onNoteClicked: (note: NoteModel) => void
}

export const Note = ({ note, onDeleteNoteClicked, onNoteClicked }: NoteProps) => {
  
  const { id, title, text, createdAt, updatedAt } = note;

  let dateDisplay: string = `Created: ${formatDate(createdAt)}`;

  if (updatedAt > createdAt) {
    dateDisplay = `Updated: ${formatDate(updatedAt)}`;
  }

  return (
    <div>
      <Card className={styles.note__card} onClick={() => onNoteClicked(note)}>
        <Card.Body className={styles.card__body}>
          <Card.Title className="d-flex  justify-content-between align-items-center">
            {title}

            <MdDelete
              onClick={(e) => {
                onDeleteNoteClicked(note);
                e.stopPropagation();
              }}
            />
          </Card.Title>
          <Card.Text className={styles.card__text}>{text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{dateDisplay}</Card.Footer>
      </Card>
    </div>
  );
};
