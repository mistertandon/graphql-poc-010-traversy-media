@extends('layouts.static_pages')

@section('title', '| Create Post')

@section('container')
<div class="row">
    <div class="col-md-8 col-md-offset-2">
        <div class="form-group">
            <h1>Create New Post</h1>
            <hr>
            {!! Form::open(array('route'=> 'posts.store')) !!}

            {{Form::label('title', 'Title : ')}}
            {{Form::text('title', null, array("class"=>"form-control"))}}

            {{Form::label('body', 'Body : ')}}
            {{Form::textarea('body',  null, array('class'=>'form-control'))}}

            {{Form::submit('Create Post', array("class"=>"btn btn-success btn-lg btn-block", "style"=>"margin-top: 20px;"))}}

            {!! Form::close() !!}
        </div>
    </div>
</div>
@endsection