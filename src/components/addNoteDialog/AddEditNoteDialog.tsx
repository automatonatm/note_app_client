import React from "react";
import Button from "react-bootstrap/Button";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "models/note";
import { NoteInput, createNote, updateNote } from "network/note_api";
import TextInputField from "components/form/TextInputField";

interface AddEditNoteDialogProps {
  handleClose: () => void,
  show: boolean,
  onNoteSaved: (note: Note) => void,
  noteToEdit? : Note
}

const AddEditNoteDialog = ({
  noteToEdit,
  handleClose,
  show,
  onNoteSaved,
}: AddEditNoteDialogProps) => {

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
       title: noteToEdit?.title || "",
       text: noteToEdit?.text || ""
    }
  });

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: Note
      if(noteToEdit) {
        console.log("editing....")
        noteResponse = await updateNote(noteToEdit.id, input)
      } else {
        noteResponse = await createNote(input);    
      }

    
      onNoteSaved(noteResponse);

      reset();

    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>

          <TextInputField
          name="title"
          label="Title"
          type="text"
          placeholder="title"
          register={register}
          registerOptions={{required: "Required"}}
          error={errors.title}

          />

          <TextInputField
          name="text"
          label="Text"
          as="textarea"
          placeholder="Type your text"
          register={register}
        
          error={errors.text}
           rows={5}
          />
    
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          form="addNoteForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
