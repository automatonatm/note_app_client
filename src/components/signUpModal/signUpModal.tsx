import { User } from 'models/user';
import React from 'react'
import { useForm } from "react-hook-form";
import { SignUpCredentials,  signUp} from 'network/note_api';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputField from 'components/form/TextInputField';

interface signUpModalProps {
  handleClose: () => void;
  show: boolean;
  onSignUpSuccessful: (user: User) => void;
}

export default function SignUpModal({
  handleClose,
  show,
  onSignUpSuccessful,
}: signUpModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const onSubmit = async (crendentials: SignUpCredentials) => {
    try {
      const newUser = await signUp(crendentials);
      onSignUpSuccessful(newUser);
      reset()
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />

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
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

