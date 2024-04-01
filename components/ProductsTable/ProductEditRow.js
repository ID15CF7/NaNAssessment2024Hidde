import React, { useState } from 'react';
import { Table } from "flowbite-react";

const ProductEditRow = ({ product, onSave }) => {
  const [editProduct, setEditProduct] = useState(product);

  const handleSaveClick = () => {
    onSave(editProduct);
  };

  const handleChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell><input type="text" name="title" value={editProduct.title} onChange={handleChange} /></Table.Cell>
      <Table.Cell><input type="text" name="color" value={editProduct.color} onChange={handleChange} /></Table.Cell>
      <Table.Cell><input type="text" name="price" value={editProduct.price} onChange={handleChange} /></Table.Cell>
      <Table.Cell><input type="text" name="short_description" value={editProduct.short_description || ''} onChange={handleChange} /></Table.Cell>
      <Table.Cell><button className="btn-custom" onClick={handleSaveClick}>Opslaan</button></Table.Cell>
    </Table.Row>
  );
};

export default ProductEditRow;
