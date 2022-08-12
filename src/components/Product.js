import React, { useState } from "react";
import { Card, Row, Col, Modal, Button, Image, ListGroup, ButtonGroup , Form } from "react-bootstrap";

const Product = (props) => {
  const { id, title, description, category, price, image, editProduct } = props;
  //For the Check
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //For the Edit Modal
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [editedProduct, setEditedProduct] = useState({
    id: id,
    title: title,
    description: description,
    category: category,
    price: price,
    image: image,
  });

  //Edit Product
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct(e, editedProduct);
    var messagebox = document.getElementById('messagebox');
    messagebox.innerHTML = '<p class="my-2 p-3 bg-success text-white">Product was successfully updated.</p>'
  };

  return (
    <>
      <Col md="3" key={id} className="d-flex align-items-stretch">
        <Card className="mb-4 mx-auto w-100">
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>&#8369; {price}</Card.Subtitle>
            <Card.Text>{description}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="px-1">
            <ButtonGroup size="sm" style={{width:"100%"}}>
              <Button variant="primary" onClick={handleShow}>View</Button>
              <Button variant="warning" className="text-white" onClick={handleShowEdit}>Edit</Button>
              <Button variant="danger" onClick={() => {
                if(window.confirm("Do you want to delete this product?"))
                  props.handleRemove(id)
              }}>Delete</Button>
            </ButtonGroup>
          </Card.Footer>
        </Card>
      </Col>

      {/*View Product*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton> {title} </Modal.Header>
        <Modal.Body>
          <Image
            src={image}
            className="img-fluid mx-auto d-block"
            style={{ height: "200px", width: "200px" }}
          />
          <div className="mt-4">
            <ListGroup variant="flush">
              <ListGroup.Item>{description}</ListGroup.Item>
              <ListGroup.Item>Category: {category}</ListGroup.Item>
              <ListGroup.Item>Price: &#8369; {price}</ListGroup.Item>
            </ListGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Return
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Edit Product*/}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>Edit Product</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" defaultValue={title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" as="textarea" rows={4} defaultValue={description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" defaultValue={category} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" defaultValue={price} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="image" defaultValue={image} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleCloseEdit}>
              Update
            </Button>
            <span id="messagebox"></span>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Product;
