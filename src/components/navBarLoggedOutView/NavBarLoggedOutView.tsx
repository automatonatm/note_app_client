import React from 'react'
import { Button } from 'react-bootstrap';

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLogedInClicked: () => void;

}
export default function NavBarLoggedOutView({onLogedInClicked, onSignUpClicked} : NavBarLoggedOutViewProps) {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>

      <Button onClick={onLogedInClicked}>Sign In</Button>
    </>
  );
}
