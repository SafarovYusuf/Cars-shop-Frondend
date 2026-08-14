import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function UpdateCar({ isEdit, setIsEdit, updateTodo, editData, setEditData }) {
  const handleClose = () => setIsEdit(false);

  const handleChange = (e) => {
    setEditData(e.target.value);
  };

  const handleSubmit = (edit) => {
    edit.preventDefault();
    updateTodo(editData);
    setEditData("");
  };

  return (
    <>
      <Modal show={isEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update ToDo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="typing..."
                name="text"
                onChange={handleChange}
                value={editData}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateCar;
