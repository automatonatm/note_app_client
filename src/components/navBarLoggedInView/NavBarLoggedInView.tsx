import { User } from 'models/user'
import React from 'react'
import { logout as logOutUser } from 'network/note_api'
import { Button, Navbar } from 'react-bootstrap';

interface NavBarLoggedInViewProps {
    user: User,
    onLogOutSuccessful: () => void
}

export default function NavBarLoggedInView({
  user,
  onLogOutSuccessful,
}: NavBarLoggedInViewProps) {

    async function logout() {
        try {
            
          await logOutUser();
          onLogOutSuccessful()
        
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

  return (
    <>
      <Navbar.Text className="me-2">
        Signed in as: {user.username}
      </Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  )
}
