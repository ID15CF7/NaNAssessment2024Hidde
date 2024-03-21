"use client"
import { Table } from "flowbite-react";
import Link from "next/link";

const ProductsTable = ({products}) => {
    return (  
        <Table>
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
            <Table.Row
              key={product.id}
              className="bg-white "
            >
              <Table.Cell className="font-medium text-gray-900 whitespace-nowrap ">
                {product.title}
              </Table.Cell>
              <Table.Cell>{product.color}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.short_description}</Table.Cell>
              <Table.Cell>
                <Link
                  href={`/product/${product?.id}`}
                  className="font-medium text-cyan-600 hover:underline "
                >
                  Bewerk
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
}
 
export default ProductsTable;