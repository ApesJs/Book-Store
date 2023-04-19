import Card from "@/Components/Card";
import Container from "@/Components/Container";
import DropdownMenu from "@/Components/DropdownMenu";
import Header from "@/Components/Header";
import Table from "@/Components/Table";
import App from "@/Layouts/App";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";
import toast from 'react-hot-toast';


export default function Index({carts}){
    const onDeleteHandler = (cart_id) => {
        Inertia.post(route('cart.delete', cart_id),{
            _method:'delete'
        }, {
            onSuccess: () => toast.success('Removed'),
        })
    }
    let subtotal = carts.reduce((acc, cart) => acc + cart.price, 0);
    // let ppn = (11/100) * subtotal;
    // let total = ppn + subtotal;
    let total = subtotal;
    return(
        <div>
            <Head title="Your Carts"/>
            <Header title="Your Carts" description="The Product that you add"/>
            <Container>
                <Card>
                    <Card.Header>Your Cart</Card.Header>
                    <Card.Table>
                        <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-0'}>#</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Price</Table.Th>
                                <Table.Th>Tools</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {carts.length ? <>
                                {carts.map((cart, i) => (
                                    <tr key={cart.id}>
                                        <Table.Td className={'w-0'}>{i + 1}</Table.Td>
                                        <Table.Td>
                                            <Link href={`/products/${cart.product.slug}`}>
                                                {cart.product.name}
                                            </Link>
                                        </Table.Td>
                                        <Table.Td>Rp {numberFormat(cart.price)}</Table.Td>
                                        <Table.Td>
                                            <button onClick={() => onDeleteHandler(cart.id)} className="focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </Table.Td>
                                    </tr>
                                ))}
                                {/* <tr>
                                    <Table.Td></Table.Td>    
                                    <Table.Td>PPN ( 11% )</Table.Td>
                                    <Table.Td>Rp {numberFormat(ppn)}</Table.Td>
                                    <Table.Td></Table.Td>
                                </tr> */}
                                <tr className="bg-green-200 text-green-800 font-semibold">
                                    <Table.Td></Table.Td>    
                                    <Table.Td>Total</Table.Td>
                                    {/* <Table.Td>Rp {numberFormat(carts.reduce((acc, cart) => acc + cart.price, 0)+ppn)}</Table.Td> */}
                                    <Table.Td>Rp {numberFormat(carts.reduce((acc, cart) => acc + cart.price, 0))}</Table.Td>
                                    <Table.Td></Table.Td>
                                </tr> 
                                </> : <Table.Empty colSpan={4} message={<>
                                        The Cart is Empty
                                        <br/>
                                        <Link href="/products" className="text-blue underline">Try add some items</Link>
                                </>} />}
                            </Table.Tbody>
                        </Table>
                    </Card.Table>
                </Card>
                {carts.length > 0 ?
                <div className="mt-4 flex justify-center">
                    <DropdownMenu buttonClassName="bg-blue-600 text-white px-4 py-2 rounded-lg" label='Choose Your Payment Method'>
                        <DropdownMenu.Link href='/invoice' method="post" as="button" data={{ carts: carts, total: total, payment_type:'gopay'}}>Gopay</DropdownMenu.Link>
                        <DropdownMenu.Divider/>
                        <DropdownMenu.Link href='/invoice' method="post" as="button" data={{ carts: carts, total: total, payment_type:'bank_transfer', bank : 'bni'}}>BNI Virtual Account</DropdownMenu.Link>
                        <DropdownMenu.Link href='/invoice' method="post" as="button" data={{ carts: carts, total: total, payment_type:'bank_transfer', bank : 'bca'}}>BCA Virtual Account</DropdownMenu.Link>
                    </DropdownMenu>
                </div>
                : null}
            </Container>
        </div>
    )
}

Index.layout = page => <App children={page}/>

export const numberFormat = (number, decimals, dec_point, thousands_sep = '.') => {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
        dec = typeof dec_point === 'undefined' ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};