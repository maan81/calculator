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


	//bind keyboard letters
	$(document).keyup(function(e){
		switch(e.which){
			case 48:case 49:case 50:case 51:case 52:
			case 53:case 54:case 55:case 56:case 57:
				$('#_'+e.which).trigger('click');
				break;
			default:
				console.log('u pressed a key')
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
		disp += '+';
		display(disp);
	})
	$('#minus').click(function(){
		disp += '-';
		display(disp);
	})
	$('#multiply').click(function(){
		disp += '&multiply;';
		display(disp);
	})
	$('#divide').click(function(){
		disp += '&divide;';
		display(disp);
	})
	$('#percent').click(function(){
		disp += '%';
		display(disp);
	})



	$('#sin').click(function(){
		disp += 'Sin ';
		display(disp);
	})
	$('#cos').click(function(){
		disp += 'Cos ';
		display(disp);
	})
	$('#tan').click(function(){
		disp += 'Tan ';
		display(disp);
	})
	$('#log').click(function(){
		disp += 'Log ';
		display(disp);
	})
	$('#e').click(function(){
		disp += 'e ';
		display(disp);
	})
	$('#hyp').click(function(){
		disp += 'Hype ';
		display(disp);
	})
	$('#sqrt').click(function(){
		disp += 'Sqrt ';
		display(disp);
	})
	$('#power').click(function(){
		disp += '^ ';
		display(disp);
	})
	$('#inv').click(function(){
		disp += '-1 ';
		display(disp);
	})
	$('#square').click(function(){
		disp += '^2 ';
		display(disp);
	})
	$('#open').click(function(){
		disp += '( ';
		display(disp);
	})
	$('#close').click(function(){
		disp += ') ';
		display(disp);
	})
})

