import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function ProductItem({product}){
    return(
        <div>
            <Link href={`/products/${product.slug}`}>
                <img className="w-full rounded-lg" src={product.picture} alt="" />
            </Link>
            <div className="mt-4">
                <Link className="text-sm block mb-2 line-clamp-1" href={`/products/${product.slug}`}>
                    {product.name}
                </Link>
                <div className="flex items-center justify-between text-sm">
                    <Link href={`/products?category=${product.category.slug}`}>
                        {product.category.name}
                    </Link>
                    <div>
                        {numberFormat(product.price)}
                    </div>
                </div>
            </div>
        </div>
    )
}

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