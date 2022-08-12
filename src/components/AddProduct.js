import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const AddProduct = (props) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addProduct(product);
    var messagebox = document.getElementById('messagebox');
    messagebox.innerHTML = '<p class="my-2 p-3 bg-success text-white">Product was successfully added.</p>'
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" name="title" value={product.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" name="description" value={product.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" placeholder="Enter Category" name="category" value={product.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="Enter Price" name="price" value={product.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" placeholder="Enter Image URL" name="image" value={product.image} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <span id="messagebox"></span>
      </Form>
    </>
  );
};

export default AddProduct;
