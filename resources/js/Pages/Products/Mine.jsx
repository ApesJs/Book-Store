import Card from "@/Components/Card";
import Container from "@/Components/Container";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import App from "@/Layouts/App";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

export default function Mine(props){
    const {data: products, meta, links} = props.products;
    return(
        <div>
            <Head title="My Products" />
            <Container>
                <Card>
                    <Card.Header>MY PRODUCTS</Card.Header>
                    <Card.Table>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th className='w-0'>#</Table.Th>
                                    <Table.Th>Products</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {products.length ? <>
                                    {products.map((product, i) => (
                                        <tr key={product.id}>
                                            <Table.Td className='w-0'>{meta.from + i}</Table.Td>
                                            <Table.Td>
                                                <a className="text-blue-600 underline" href={product.url} target="_blank" rel="noopener noreferrer">
                                                    {product.name}
                                                </a>
                                            </Table.Td>
                                        </tr>
                                    ))}
                                </> : <Table.Empty colSpan={2} />}
                            </Table.Tbody>
                        </Table>
                        <Card.Footer>
                            <Pagination marginTop="0" meta={meta} links={links} />
                        </Card.Footer>
                    </Card.Table>
                </Card>
            </Container>
        </div>
    )
}

Mine.layout = page => <App children={page} />