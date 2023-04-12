import { User } from 'models/user';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { LogInCredentials,  loginIn} from 'network/note_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInputField from 'components/form/TextInputField';
import { UnauthorisedError } from 'error/httpErrors';
import { log } from 'console';

interface LoginUpModalProps {
  handleClose: () => void;
  show: boolean;
  onLoginSuccessful: (user: User) => void;
}

export default function LoginUpModal({
  handleClose,
  show,
  onLoginSuccessful,
}: LoginUpModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LogInCredentials>();


  const [errorText, setErrorText] = useState<string | null>(null);

  const onSubmit = async (crendentials: LogInCredentials) => {
    try {
      const user = await loginIn(crendentials);
      onLoginSuccessful(user);
      reset();
    } catch (error) {

       
 
      if(error instanceof UnauthorisedError) {
        console.log(error.message);
        setErrorText(error.message);

      }else{
        alert(error)
      }

     
      
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant='danger'>{errorText}</Alert>}

        <Form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
    
          <TextInputField
            name="username"
            label="User name"
            type="text"
            placeholder="Enter Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          form="signUpForm"
          disabled={isSubmitting}
          className="w-100"
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

