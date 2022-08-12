import React, { useState, useEffect } from "react";
import { Container, Form, Card, Row, Col, Table, Button, Modal, InputGroup, FormControl } from "react-bootstrap";

import { v4 as uuidv4 } from "uuid";
import Product from "./Product";
import AddProduct from "./AddProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Fetch Product Data
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((response) => setProducts(response));
  }, []);

  //Search Product
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //Delete Product
  const handleRemove = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  }

  //Add Product
  const addProduct = (newProduct) => {
    setProducts([{ ...newProduct, id: uuidv4() }, ...products]);
  };

  //Edit Product
  const editProduct = (e, editedProduct) => {
    e.preventDefault();
    const newProductList = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(newProductList);
  };

  //searchBar
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().startsWith(search.toLowerCase());
  });

  return (
    <div>
     <Container>
       <InputGroup size="lg" className="mb-4">
         <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
         <Form.Control
           placeholder="Search Product"
           aria-label="Search Product"
           aria-describedby="basic-addon1"
           value={search}
           onChange={handleSearch}
         />
       </InputGroup>

       {/* Total Items */}
        <div className="mb-4 p-3 bg-dark text-white rounded" >
          <b>Total:</b> {products.length} products
          <div className="float-end" style={{margin: "-8px 0 0 0"}}>
            <Button className="button" variant="primary" onClick={handleShow}>
               Add Product
            </Button>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>Add Product</Modal.Header>
          <Modal.Body>
            <AddProduct addProduct={addProduct} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Go Back to Store
            </Button>
          </Modal.Footer>
        </Modal>

       {filteredProducts.length > 0 ? (
          <Row>
            {filteredProducts.map((product) => (
              <Product
                {...product}
                key={product.id}
                handleRemove={handleRemove}
                editProduct={editProduct}
              />
            ))}
          </Row>
        ) : (
          <div className="bg-danger p-4 text-white">No Record Found!</div>
        )}
     </Container>
    </div>
  );
};

export default ProductList;
