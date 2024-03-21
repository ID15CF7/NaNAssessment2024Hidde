import ProductsTable from "@/components/ProductsTable/ProductsTable";

export default function Home() {
  const products = [
    {
      id: 1,
      title: "Product 1",
      color: "Red",
      price: 15.99,
      short_description: "This is a product",
    },
    {
      id: 1,
      title: "Product 1",
      color: "Red",
      price: 15.99,
      short_description: "This is a product",
    },
  ];
  return (
    <>
      <h1>Producten</h1>
      <ProductsTable products={products} />
    </>
  );
}
