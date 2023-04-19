import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Container from "@/Components/Container";
import App from "@/Layouts/App";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";
import toast from 'react-hot-toast';


export default function Show({product, auth, isProductBought}){
    const addToCart = () => {
        Inertia.post(route('cart.store', product),{},{
            onSuccess: () => toast.success('Added to Cart'),
        });
    }
    return(
        <div>
        <Head title={product.name}/>
        <Container>
            <div className="flex gap-10">
                <div className="w-1/3">
                    <img className="w-full rounded-lg" src={product.picture} alt="" />
                </div>
                <div className="w-2/3 min-h-full flex flex-col justify-between">
                    <div className="flex-1">
                        <Link className="text-xs font-semibold px-2 py-1 inline-flex bg-blue-500 text-white rounded" href={`/products?category=${product.category.slug}`}>{product.category.name}</Link>
                        <h1 className="text-3xl font-semibold">{product.name}</h1>
                        <div className="leading-relaxed text-gray-500 my-5">{product.description}</div>
                        <div className="font-semibold text-4xl "><sup>Rp</sup> {numberFormat(product.price)}</div>
                    </div>
                    {auth.user ? <>
                        {isProductBought ? <ButtonLink href='/products/me'>Already Bought</ButtonLink> : <Button onClick={addToCart}>Add to Cart</Button>}
                    </> : <Button onClick={addToCart}>Add to Cart</Button>}
                </div>
            </div>
        </Container>
    </div>
    )
}

Show.layout = page => <App children={page}/>

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