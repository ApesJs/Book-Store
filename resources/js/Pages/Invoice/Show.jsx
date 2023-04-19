import Container from "@/Components/Container";
import App from "@/Layouts/App";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

export default function Show({invoice}){
    return(
        <div>
            <Head title={`Your Order - ${invoice.order_id}`} />
            <Container>
                <div>
                    <div className="grid grid-cols-2 gap-10">
                        {invoice.qr_code ? <img className="border shadow-sm rounded-lg" src={invoice.qr_code} alt="" /> : ''}
                        
                        {invoice.bank ? 
                            <div>
                                <div className="p-2 rounded-lg text-orange-900 bg-gradient-to-r from-orange-300">
                                    <div className="font-semibold text-xl uppercase">{invoice.bank.name} <br /> Virtual Account Number</div>
                                    {invoice.bank.va_number}
                                </div>
                            </div>
                        : null}
                        <div>
                            <div className="prose">
                                <h2>Instruction</h2>
                                <p>Follow the Instruction if you dont understand how to pay!</p>
                                <ol>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

Show.layout = page => <App children={page}/>