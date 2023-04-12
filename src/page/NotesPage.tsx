import React from 'react';
import styles from './Notes.module.scss'
import { Container } from 'react-bootstrap';
import NotePageLoggedInView from 'components/notePageLoggedInView/NotePageLoggedInView';
import { User } from 'models/user';

interface NotesPageProps {
  loggedInUser: User | null
}

const NotePage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container>
      <>
        <NotePageLoggedInView />
      </>
    </Container>
  );
};

export default NotePage;
