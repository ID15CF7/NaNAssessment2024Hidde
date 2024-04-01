import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Button, TextInput, Label } from "flowbite-react";

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: 0,
    stock: 0,
    short_description: '',
    description: '',
    color: '',
    aangemaaktOp: '',
    bijgewerktOp: '',
  }); 
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchProduct = async () => {
    if (productId) {
      const response = await fetch(`https://assessment.notanumber.digital/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct({
          ...data.product,
          aangemaaktOp: data.product.created_at,
          bijgewerktOp: data.product.updated_at,
          price: parseFloat(data.product.price),
        });
      } else {
        console.error("Fout bij het laden van product", response.statusText);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    if (name === 'category') {
      validateCategory(value); // Valideer categorie wanneer het verandert
    }
  };

  const validateCategory = (value) => {
    const allowedCategories = ["fiets", "auto", "motor", "bus"];
    if (!allowedCategories.includes(value)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        category: "Categorie moet fiets, auto, motor of bus zijn",
      }));
    } else {
      setErrors((currentErrors) => {
        const newErrors = { ...currentErrors };
        delete newErrors.category;
        return newErrors;
      });
    }
  };  

  const saveChanges = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`https://assessment.notanumber.digital/api/products/${productId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  
    if (response.ok) {
        const updatedData = await response.json();
    
        setProduct(prevState => ({
            ...prevState,
            ...updatedData, 
            aangemaaktOp: updatedData.aangemaaktOp || prevState.aangemaaktOp,
            bijgewerktOp: updatedData.bijgewerktOp || prevState.bijgewerktOp
        }));
        setIsEditing(false);
    } else {
        console.error("Fout bij het bijwerken van het product", await response.text());
    }    
  };
  
  if (!product) {
    return <div>Laden...</div>;
  }

  return (
    <div className="flex justify-center items-center p-4">
    <Card>
        <div className="flex flex-col items-center p-6 w-full max-w-4xl">
                {isEditing ? (
                <form onSubmit={saveChanges} className="w-full">
                    {/* Titel */}
                    <Label htmlFor="title">Naam</Label>
                    <TextInput 
                        id="title" 
                        name="title" 
                        value={product.title} 
                        onChange={handleInputChange} 
                        className="w-full mb-4" 
                    />
                    
                    {/* Beschrijving */}
                    <Label htmlFor="description">Gedetailleerde Omschrijving</Label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        className="w-full mb-4 p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="4"
                    />

                    {/* Kleur */}
                    <Label htmlFor="color">Kleur</Label>
                    <TextInput 
                        id="color" 
                        name="color" 
                        value={product.color} 
                        onChange={handleInputChange} 
                        className="w-full mb-4" 
                    />

                    {/* Prijs */}
                    <Label>Prijs</Label>
                    <TextInput 
                        id="price" 
                        name="price" 
                        type="number" 
                        value={product.price} 
                        onChange={handleInputChange} 
                        className="w-full mb-4" 
                    />

                    {/* Categorie */}
                    <Label htmlFor="category">Categorie</Label>
                    <TextInput 
                        id="category" 
                        name="category" 
                        value={product.category} 
                        onChange={handleInputChange} 
                        className="w-full mb-4" 
                    />
                    {errors.category && <div className="text-red-500">{errors.category}</div>} 

                    {/* Voorraad */}
                    <Label htmlFor="stock">Voorraad</Label>
                    <TextInput 
                        id="stock" 
                        name="stock" 
                        type="number" 
                        value={product.stock} 
                        onChange={handleInputChange} 
                        className="w-full mb-4" 
                    />

                    <Button type="submit">Opslaan</Button>
                </form>
                ) : (
                // Weergave buiten bewerkingsmodus
                <div className="flex flex-col gap-4 w-full">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                    <span>Kleur: {product.color}</span>
                    <span>Prijs: € {(product.price || 0).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span>Categorie: {product.category}</span>
                    <span>Beschikbaar: {product.stock > 0 ? 'Op voorraad' : 'Niet op voorraad'}</span>
                    <p>Aangemaakt op: {product.aangemaaktOp && new Date(product.aangemaaktOp).toLocaleDateString('nl-NL')}</p>
                    <p>Bijgewerkt op: {product.bijgewerktOp && new Date(product.bijgewerktOp).toLocaleDateString('nl-NL')}</p>
                    <Button onClick={() => setIsEditing(true)}>Bewerk</Button>
                </div>
                )}
        </div>
    </Card>
    </div>
  );
};

export default ProductPage;
