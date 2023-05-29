<?php

namespace App\Http\Controllers;

use App\Models\Mjml;
use Illuminate\Http\Request;

class MjmlController extends Controller
{
    public function addData(Request $request) {
        $data = new Mjml();
        $data->name = $request->name;
        $data->save();
        return redirect('/');
    }
}
