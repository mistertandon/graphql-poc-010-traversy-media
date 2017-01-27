<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use Session;

class CategoryController extends Controller {

    public function __construct() {

        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {

        $categories = array();
        $categories = Category::All();

        return view('categories.index')->withCategories($categories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        $this->validate($request, array(
            'name' => 'required|min:3|max:255'
        ));

        $category = new Category;

        $category->name = $request->input('name');
        $category->save();

        Session::flash('success', "Category with \"$category->name\" added successfully.");

        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {

        $editCategory = array();
        $restCategories = array();

        $editCategory = Category::find($id);

        $restCategories = Category::all()->where('id', '!=', $id);

        return view('categories.show')->with('editCategory', $editCategory)->with('restCategories', $restCategories);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        
        $this->validate($request, array(

            'name'=>'required|min:4|max:255'
        ));

        $existedCategory = $category = array();
        
        $existedCategory = Category::find($id);
        $existedCategory->name = $request->input('name');

        $existedCategory->save();
        
        Session::flash('success', "Category has been updated.");

        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        //
    }

}
