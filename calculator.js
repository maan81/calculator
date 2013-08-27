var result=0;
var disp='';
var buffer=0;
var times=$('<div/>').html('&times;').text();
var divide=$('<div/>').html('&divide;').text();

function display( disp){
	$('input').val(disp);
}

function calc_sin(x){result = Math.sin(eval(x));};
function calc_tan(x){result = Math.tan(eval(x));};
function calc_cos(x){result = Math.cos(eval(x));};
function calc_inv(x){result = 1/eval(x);};
function calc_log(x){result = Math.log(eval(x));};
function calc_pi(){result = 3.141592654;};
function calc_sqrt(x){result = Math.sqrt(eval(x));};

function calc_plus(x,y){result = eval(x)+eval(y);};
function calc_minus(x,y){result= eval(x)-eval(y);};
function calc_mult(x,y){result = eval(x)*eval(y);};
function calc_div(x,y){	result = eval(x)/eval(y);};
function calc_perc(x){	result = eval(x)/100;};

function calc( disp){

	var arr = disp.split(' ');

	arr = arr.slice();
	for(var i in arr){


		switch(arr[i]){

			//case 08:$('#del').trigger('click');break;
			//case 13:$('#equals').trigger('click');break;

			case '+':	calc_plus(arr[parseInt(i)-1],arr[parseInt(i)+1]);break;
			case '-':	calc_minus(arr[parseInt(i)-1],arr[parseInt(i)+1]);break;
			case times:	calc_mult(arr[parseInt(i)-1],arr[parseInt(i)+1]);break;
			case divide:calc_div(arr[parseInt(i)-1],arr[parseInt(i)+1]);break;
			case '%':	calc_perc(arr[parseInt(i)-1]);break;




			case 'Sin':	
				calc_sin(arr[parseInt(i)+1]);
				break;
			case 'Tan': calc_tan(arr[parseInt(i)+1]);break;
			case 'Cos' :calc_cos(arr[parseInt(i)+1]);break;
			//case 72:$('#hyp').trigger('click');break;
			case '-1': calc_inv(arr[parseInt(i)-1]);break;
			case 'Log': calc_log(arr[parseInt(i)+1]);break;
			//case 77:$('#mem_p').trigger('click');break;
			//case 78:$('#mem_c').trigger('click');break;
			case 'π': 	calc_pi();break;
			case '√': 	calc_sqrt(arr[parseInt(i)+1]);break;
		}
	}



	$('#result').children('span').text(result);
}


$(function(){


	//bind keyboard letters
	$(document).keyup(function(e){
		switch(e.which){


			case 08:$('#del').trigger('click');break;
			case 13:$('#equals').trigger('click');break;
			case 27:$('#c').trigger('click');break;

			case 48:case 49:case 50:case 51:case 52:
			case 53:case 54:case 55:case 56:case 57:
				$('#_'+e.which).trigger('click');
				break;

			case 67:$('#cos').trigger('click');break;
			case 72:$('#hyp').trigger('click');break;
			case 73:$('#inv').trigger('click');break;
			case 76:$('#log').trigger('click');break;
			case 77:$('#mem_p').trigger('click');break;
			case 78:$('#mem_c').trigger('click');break;
			case 80:$('#pi').trigger('click');break;
			case 81:$('#sqrt').trigger('click');break;
			case 83:$('#sin').trigger('click');break;
			case 84:$('#tan').trigger('click');break;

			default:
		}
	});



	$('.number').click(function(){
		var n = $(this).children('span').text();




		disp += n;

		display(disp);
	})


	$('#equals').click(function(){

		calc(disp);
	})


	$('#plus').click(function(){
		disp += ' + ';
		display(disp);
	})
	$('#minus').click(function(){
		disp += ' - ';
		display(disp);
	})
	$('#multiply').click(function(){
		disp += ' '+times+' ';
		display(disp);
	})
	$('#divide').click(function(){
		disp += ' '+divide+' ';
		display(disp);
	})
	$('#percent').click(function(){
		disp += ' % ';
		display(disp);
	})
	$('#c').click(function(){
		disp='';
		display(disp);
		$('#result').children('span').text('0');
	})



	$('#sin').click(function(){
		disp += ' Sin ';
		display(disp);
	})
	$('#cos').click(function(){
		disp += ' Cos ';
		display(disp);
	})
	$('#tan').click(function(){
		disp += ' Tan ';
		display(disp);
	})
	$('#log').click(function(){
		disp += ' Log ';
		display(disp);
	})
	$('#e').click(function(){
		disp += ' e ';
		display(disp);
	})
	$('#hyp').click(function(){
		disp += ' Hyp ';
		display(disp);
	})
	$('#sqrt').click(function(){
		disp += ' '+$('<div/>').html('&radic;').text()+' ';
		display(disp);
	})
	$('#power').click(function(){
		disp += ' ^ ';
		display(disp);
	})
	$('#inv').click(function(){
		disp += ' -1 ';
		display(disp);
	})
	$('#square').click(function(){
		disp += ' '+$('<div/>').html('&sup2;').text()+' ';
		display(disp);
	})
	$('#open').click(function(){
		disp += ' ( ';
		display(disp);
	})
	$('#close').click(function(){
		disp += ' ) ';
		display(disp);
	})
})

