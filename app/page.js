"use client";
import React, { useState, useEffect } from 'react';
import ProductsTable from "../components/ProductsTable/ProductsTable";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://assessment.notanumber.digital/api/products');
        if (!response.ok) {
          throw new Error('Netwerkrespons was niet ok');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Fout bij het ophalen van productgegevens:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Producten</h1>
      <ProductsTable products={products} />
    </>
  );
}