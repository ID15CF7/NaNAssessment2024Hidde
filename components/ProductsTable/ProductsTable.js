"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Table } from "flowbite-react";
import Link from "next/link";
import ProductEditRow from './ProductEditRow';

const ProductsTable = ({ initialProducts }) => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [products, setProducts] = useState(initialProducts || []);
  const [editProductId, setEditProductId] = useState(null);
  const [descriptions, setDescriptions] = useState({});

  const loadProducts = async () => {
    try {
      const response = await fetch('https://assessment.notanumber.digital/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products); // Veronderstelt dat de API een object teruggeeft met een 'products' sleutel
      } else {
        console.error("Fout bij het laden van producten:", response.status);
      }
    } catch (error) {
      console.error("Er is een fout opgetreden bij het laden van producten:", error);
    }
  };

  useEffect(() => {
    if (editProductId === null || editProductId === undefined) {
      loadProducts(); 
    }
  }, [editProductId]);  

  useEffect(() => {
    if (selectedRowId !== null) {
      fetchDescription(selectedRowId);
    }
  }, [selectedRowId]);

  useEffect(() => {
    console.log('descriptions zijn bijgewerkt', descriptions);
  }, [descriptions]);
  

  const handleEditClick = (productId, e) => {
    e.stopPropagation(); 
    if (editProductId === productId) {
      setEditProductId(null);
    } else {
      setEditProductId(productId);
      setSelectedRowId(productId);
    }
  };

  const handleProductSave = async (editedProduct) => {
    try {
      const response = await fetch(`https://assessment.notanumber.digital/api/products/${editedProduct.id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log('Product ID:', updatedProduct.id);
        console.log('Bijgewerkt Op:', updatedProduct.bijgewerktOp);
        console.log('Product succesvol opgeslagen:', updatedProduct);

        setProducts((prevProducts) => 
        prevProducts.map((p) => p.id === updatedProduct.product.id ? updatedProduct.product : p)
      );
      setDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        [updatedProduct.product.id]: {
          ...prevDescriptions[updatedProduct.product.id],
          bijgewerktOp: updatedProduct.product.updated_at,
        },
      }));      

        setEditProductId(null);

      } else {
        console.error('Fout bij het opslaan van het product:', response.status);
      }
    } catch (error) {
      console.error('Er is een fout opgetreden:', error);
    }
  };

  const fetchDescription = async (productId) => {
    if (!descriptions[productId]) {
      const response = await fetch(`https://assessment.notanumber.digital/api/products/${productId}`);
      const data = await response.json();
      if (response.ok && data.success) {
        setDescriptions(prev => ({
          ...prev,
          [productId]: {
            description: data.product.description,
            voorraad: data.product.stock, 
            categorie: data.product.category,
            aangemaaktOp: data.product.created_at,
            bijgewerktOp: data.product.updated_at
          }
        }));
      } else {
        console.error("Fout bij het ophalen van de productomschrijving", response.status);
      }
    }
  };

  const handleDescriptionChange = (productId, e) => {
    const newDescriptions = { ...descriptions, [productId]: { ...descriptions[productId], description: e.target.value } };
    setDescriptions(newDescriptions);
  };
  
  const handleStockChange = (productId, e) => {
    const newDescriptions = { ...descriptions, [productId]: { ...descriptions[productId], voorraad: e.target.value } };
    setDescriptions(newDescriptions);
  };
  
  const handleCategoryChange = (productId, e) => {
    const newDescriptions = { ...descriptions, [productId]: { ...descriptions[productId], categorie: e.target.value } };
    setDescriptions(newDescriptions);
  };  

  const toggleRow = useCallback((id) => {
    if (id !== editProductId) {
      setSelectedRowId(selectedRowId === id ? null : id);
    }
  }, [selectedRowId, editProductId]);

  return (
    <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Naam</Table.HeadCell>
            <Table.HeadCell>Kleur</Table.HeadCell>
            <Table.HeadCell>Prijs</Table.HeadCell>
            <Table.HeadCell>Omschrijving</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.map((product) => (
              <React.Fragment key={product.id}>
                  {editProductId === product.id ? (
      // Gebruik ProductEditRow voor de bewerkbare rij
      <ProductEditRow product={product} onSave={(editedProduct) => handleProductSave(editedProduct)} />
    ) : (
      // Standaard rij weergave
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={() => toggleRow(product.id)}>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {product.title}
        </Table.Cell>
        <Table.Cell>{product.color}</Table.Cell>
        <Table.Cell>
          {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(product.price)}
        </Table.Cell>
        <Table.Cell>{product.short_description}</Table.Cell>
        <Table.Cell>
          <button className="btn-custom" onClick={(e) => { e.stopPropagation(); handleEditClick(product.id, e); }}>Bewerk</button>
        </Table.Cell>
      </Table.Row>
    )}
                {selectedRowId === product.id && (
                <Table.Row className="bg-gray-100 dark:bg-gray-700">
                  <Table.Cell colSpan={5}>
                    <div>
                    <p>Gedetailleerde Omschrijving: {editProductId === product.id ? (
                      <textarea
                        rows="4"
                        className="w-full p-2 border rounded"
                        value={descriptions[product.id]?.description || ''}
                        onChange={(e) => handleDescriptionChange(product.id, e)}
                      />
                    ) : descriptions[product.id]?.description || 'Omschrijving wordt geladen...'}</p>
                      <p>Voorraad: {editProductId === product.id ? (
                        <input type="number" value={descriptions[product.id]?.voorraad || ''} 
                          onChange={(e) => handleStockChange(product.id, e)} />
                      ) : descriptions[product.id]?.voorraad}</p>
                      <p>Categorie: {editProductId === product.id ? (
                        <select value={descriptions[product.id]?.categorie || ''}
                          onChange={(e) => handleCategoryChange(product.id, e)}>
                          <option value="fiets">Fiets</option>
                          <option value="auto">Auto</option>
                          <option value="motor">Motor</option>
                          <option value="bus">Bus</option>
                        </select>
                      ) : descriptions[product.id]?.categorie}</p>
                      <p>Aangemaakt op: {descriptions[product.id]?.aangemaaktOp && new Date(descriptions[product.id].aangemaaktOp).toLocaleDateString('nl-NL')}</p>
                      <p>Bijgewerkt op: {descriptions[product.id]?.bijgewerktOp && new Date(descriptions[product.id].bijgewerktOp).toLocaleDateString('nl-NL')}</p>
                      <Link href={`/products/${product.id}`} className="text-blue-600 hover:text-blue-800">Bekijk product</Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
                )}
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>
  );
}

export default ProductsTable;
