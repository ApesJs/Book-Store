<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PaymentNotificationController extends Controller
{
    public function hit(Request $request){
        $invoice = Invoice::where('order_id', $request->order_id)->first();
        //SHA512(order_id+status_code+gross_amount+ServerKey)
        $signature_key = hash('sha512', $request->order_id . $request->status_code . $invoice->gross_amount . '.00' . config('services.midtrans.server_key'));
        if ($request->signature_key = $signature_key) {
            $invoice->update([
                'succeeded_at' => $request->settlement_time,
            ]);
            Cart::whereIn('id', $invoice->cart_ids)->update([
                'paid_at' => $request->settlement_time,
            ]);

            $product_ids = Cart::whereIn('id', $invoice->cart_ids)->pluck('product_id');
            $user = User::find($invoice->user_id);
            $user->products()->attach($product_ids);

            Cache::forget('carts_global_count');
        }
    }
}
