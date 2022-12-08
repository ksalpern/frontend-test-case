import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  getInputFormData: ({
    id,
    name,
    email,
    description,
  }: {
    id: string;
    name: string;
    email: string;
    description: string;
  }) => void;
}

const FormComponent: React.FC<ModalProps> = (props) => {
  const [validated, setValidated] = useState(false);

  const [id, setId] = useState<string>(``);
  const [name, setName] = useState<string>(``);
  const [email, setEmail] = useState<string>(``);
  const [description, setDescription] = useState<string>(``);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    props.getInputFormData({ id, name, email, description });
    setValidated(true);
  };

  const submitName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setId(event.target.value);
  };

  const submitEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const submitDescr = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  required
                  type="string"
                  placeholder="Id"
                  value={id}
                  onChange={submitId}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={submitName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="10" controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={submitEmail}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  required
                  value={description}
                  onChange={submitDescr}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit" variant="dark">
              Submit form
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormComponent;
