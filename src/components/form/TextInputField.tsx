import React from 'react'
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { Form } from "react-bootstrap";

interface TextInputFieldFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any
}

function TextInputField({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldFieldProps) {
  return (
    <>
      <Form.Group className="mb-3" controlId={`${name}-input`}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          {...props}
          {...register(name, registerOptions)}
          isInvalid={!!error}
        />

        <Form.Control.Feedback type="invalid">
            {error?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default TextInputField