<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{

    public function index(Request $request){
        $carts = Cart::query()->with('product')->whereBelongsTo($request->user())->whereNull('paid_at')->get();
        return Inertia('Cart/Index',[
            'carts' => CartResource::collection($carts),
        ]);
    }

    public function store(Request $request, Product $product){
        //sintak di bawah ini bisa input 1 barang berkali kali 
        // $product->carts()->create([
        //     'user_id' => $request->user()->id,
        //     'price' => $product->price,
        // ]);
        $product->carts()->updateOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $product->id,
        ],[
            'user_id' => $request->user()->id,
            'price' => $product->price,
        ]);
        
        return redirect('/products');
    }

    public function destroy(Cart $cart){
        $cart->delete();
        return back();
    }
}
