import React from "react";
import Container from "@/Components/Container";
import { usePage } from "@inertiajs/inertia-react";
import NavLink from "@/Components/NavLink";
import ApplicationLogo from "@/Components/ApplicationLogo";
import DropdownMenu from "@/Components/DropdownMenu";

export default function Navbar(){
    const {auth, categories_global, carts_global_count} = usePage().props;
    return(
        <nav className="bg-white py-2">
            <Container>
                <div className="flex items-center justify-between">
                    <ApplicationLogo/>
                    <div className="flex items-center gap-x-6">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/products">Products</NavLink>
                        <DropdownMenu label='Categories'>
                            {categories_global.map(category => (
                                <DropdownMenu.Link key={category.slug} href={`/products?category=${category.slug}`}>{category.name}</DropdownMenu.Link>
                            ))}
                        </DropdownMenu>
                        {auth.user ? (
                            <>
                            <DropdownMenu label={auth.user.name}>
                                <DropdownMenu.Link href="/profile">Profile</DropdownMenu.Link>
                                <DropdownMenu.Link href="/dashboard">Dashboard</DropdownMenu.Link>
                                <DropdownMenu.Link href="/carts">Your Cart</DropdownMenu.Link>
                                <DropdownMenu.Link href="/products/me">Your Product</DropdownMenu.Link>
                                <DropdownMenu.Link href="/history">Your History</DropdownMenu.Link>
                                <DropdownMenu.Link href="/logout" method="post">Logout</DropdownMenu.Link>
                            </DropdownMenu>
                            <NavLink className='flex items-center gap-x-2' href='/carts'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {carts_global_count > 0 ? carts_global_count : null}
                            </NavLink>
                            </>  
                        ) : (
                            <>
                                <NavLink href="/login">Login</NavLink>
                                <NavLink href="/register">Register</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </nav>
    )
}