import AddEditNoteDialog from 'components/addNoteDialog/AddEditNoteDialog';
import { Note } from 'components/notes/Note';
import React, { useEffect, useState } from 'react'
import { Button, Spinner, Row, Col } from 'react-bootstrap';
import { Note as NoteModel } from "models/note";
import * as NotesApi from "network/note_api";

export default function NotePageLoggedInView() {

      const [notes, setNotes] = useState<NoteModel[]>([]);
      const [noteLoading, setNotesLoading] = useState(false);
      const [noteLoadingError, setNotesLoadingError] = useState(false);

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

      useEffect(() => {
        async function loadNotes() {
          setNotesLoading(true);
          setNotesLoadingError(false);
          try {
            const notes = await NotesApi.fetchNotes();
            setNotes(notes);
            setNotesLoading(false);
          } catch (err) {
            setNotesLoadingError(true);
            setNotesLoading(false);
          }
        }

        loadNotes();
      }, []);

      const deleteNote = async (note: NoteModel) => {
        try {
          await NotesApi.deleteNote(note.id);
          setNotes(notes.filter((existingNote) => existingNote.id !== note.id));
        } catch (error) {
          console.error(error);
          alert(error);
        }
      };

        const NoteGrid = () => (
          <Row xs={1} md={2} xl={3} className="g-4">
            {notes.map((note) => (
              <Col key={note.id}>
                <Note
                  note={note}
                  onDeleteNoteClicked={deleteNote}
                  //onNoteClicked={(note) => setNoteToEdit(note)}
                  onNoteClicked={(note) => {
                    setNoteToEdit(note);
                    handleShow();
                  }}
                />
              </Col>
            ))}
          </Row>
        );

  return (
    <>
      <Button
        onClick={() => handleShow()}
        className="mb-2 mt-2 d-flex align-items-center justify-content-center"
      >
        Add New Note
      </Button>

      {noteLoadingError && <p className="text-danger">Something went wrong</p>}

      {noteLoading && <Spinner animation="border" variant="primary" />}

      {!noteLoading && !noteLoadingError && notes && (
        <>
          {notes && notes.length > 0 ? (
            <NoteGrid />
          ) : (
            <p className="text-secondary">No note available</p>
          )}
        </>
      )}

      {
        <AddEditNoteDialog
          show={show}
          handleClose={handleClose}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            handleClose();
          }}
        />
      }

      {noteToEdit && (
        <AddEditNoteDialog
          show={show}
          noteToEdit={noteToEdit}
          handleClose={() => {
            handleClose();
            setNoteToEdit(null);
          }}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote.id === updatedNote.id ? updatedNote : existingNote
              )
            );
            handleClose();
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
}
