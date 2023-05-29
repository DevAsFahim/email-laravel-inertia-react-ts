<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate; 
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function emailTemplate($id = 1){
      
        $data = EmailTemplate::find($id);
        $savedTemplate = json_decode($data);
        
        return Inertia::render('Welcome', [  
            'templates' => $savedTemplate,
        ]);
    }

    public function addData(Request $request) {

        $data = new EmailTemplate();
        $data->name = $request->name;
        $data->source_code = $request->source_code;
        $data->save();

        return redirect()->back();
    }

    public function templates() {
        return Inertia::render('Templates');
    }

    public function templateEditor($id = 1) {
        $template = EmailTemplate::find($id);
        
        return Inertia::render('TemplateEditor', [
            'template' => $template,
        ]);
    }
    
}
