import React, { useState, useEffect } from "react";
import "./App.scss";

import { Container } from "react-bootstrap";
import SignUpModal from "components/signUpModal/signUpModal";
import LoginUpModal from "components/loginUpModal/LoginUpModal";
import NavBar from "components/navBar/NavBar";
import { User } from "models/user";
import { getAuthUser } from "network/note_api";
import NotePageLoggedInView from "components/notePageLoggedInView/NotePageLoggedInView";
import { Route, Routes } from "react-router-dom";
import NotePage from "page/NotesPage";
import PrivacyPage from "page/PrivacyPage";
import NotFound from "page/NotFound";



function App() {


  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false);


  useEffect(() => {

    async function fetLogedInUser() {
      try {
        const user = await getAuthUser();

        setLoggedInUser(user)

      } catch (error) {
       // alert(error)
        console.log(error)
      }
      
    }

    fetLogedInUser()



  }, [])



 
  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => {
          setShowSignUpModal(true);
        }}
        onLogedInClicked={() => {
          setShowLoginModal(true);
        }}
        onLogutSuccessful={() => {
          setLoggedInUser(null);
        }}
      />

      <Container>
        <Routes>
          <Route path="/" element={<NotePage loggedInUser={loggedInUser} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>

      {
        <SignUpModal
          show={showSignUpModal}
          handleClose={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      }

      {
        <LoginUpModal
          show={showLoginModal}
          handleClose={() => {
            setShowLoginModal(false);
          }}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      }
    </div>
  );
}

export default App;
