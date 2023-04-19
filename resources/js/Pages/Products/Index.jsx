import React from "react";
import App from "@/Layouts/App";
import { Head } from "@inertiajs/inertia-react";
import Container from "@/Components/Container";
import ProductItem from "@/Components/ProductItem";
import Header from "@/Components/Header";
import Pagination from "@/Components/Pagination";

export default function Index(props){
    const {data: products, meta, links} = props.products;
    return(
        <div>
            <Head title="Product"/>
            <Header title="Product" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus voluptate suscipit veritatis. Laboriosam doloribus deleniti ad fuga corrupti esse earum amet inventore perferendis voluptatum quibusdam ipsam cum optio provident porro adipisci vel eligendi, laborum perspiciatis tempora omnis voluptatibus. Commodi odio exercitationem atque facere corrupti eos dolores ipsam quas eaque recusandae?"/>
            <Container>
                <h1>Products</h1>
                {products.length ? 
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {products.map(product => (<ProductItem product={product} key={product.id}/>))}
                    </div>
                : null}
                <Pagination meta={meta} links={links}/>
            </Container>
        </div>
    )
}

Index.layout = page => <App children={page}/>