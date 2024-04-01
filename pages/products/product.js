import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import { useParams } from 'react-router-dom';

const ProductPage = () => { // Verwijder de { params } prop hier
  const { productId } = useParams(); 
  console.log(productId);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered for productId:', productId);
    const fetchProduct = async () => {
      console.log('Fetching product:', productId);
      const response = await fetch(`https://assessment.notanumber.digital/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      } else {
        console.error("Fout bij het laden van product", response.statusText);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Laden...</div>;
  }

  return (
    <div className="flex flex-col max-w-4xl gap-4 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <div>
        <Label htmlFor="title" value="Title" />
        <TextInput id="title" type="text" value={product.title || ''} readOnly />
      </div>
      <div>
        <Label htmlFor="description" value="Description" />
        <TextInput id="description" type="text" value={product.description || ''} readOnly />
      </div>
      <div>
        <Label htmlFor="price" value="Price" />
        <TextInput id="price" type="text" value={product.price || ''} readOnly />
      </div>
      <Button onClick={fetchProduct} type="button">Fetch Product Again</Button>
    </div>
  );
};

export default ProductPage;
