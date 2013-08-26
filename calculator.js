var result=0;
var disp='';
var buffer=0;

function display( disp){
	$('input').val(disp);
}

function calc( disp){

	$('#result').children('span').text('')
}


$(function(){

	$('.number').click(function(){
		var n = $(this).children('span').text();




		disp += n;

		display(disp);

		buffer = eval(disp);


	})


	$('#equals').click(function(){

		calc(disp);
	})

<div id="percent" class="basic_fn button tmp_color"><span>%</span></div>
<div id="multiply" class="basic_fn button tmp_color"><span>&multiply;</span></div>
<div id="plus" class="basic_fn button tmp_color"><span>+</span></div>
<div id="divide" class="basic_fn button tmp_color"><span>&divide;</span></div>
<div id="minus" class="basic_fn button tmp_color"><span>-</span></div>
<div id="equals" class="basic_fn button tmp_color"><span>=</span></div>
	$('#multiply').click(function(){
		buffer 	
	})

})

