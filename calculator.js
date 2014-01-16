var isOperator;
var compute_arr=[];
function gen_esp_char(esp_char){
	var e = document.createElement('div')
	e.innerHTML=esp_char
	return e.textContent
}
function gen_html_ele(html_code,html_char){
	var ele=document.createElement(html_code);
	var node=document.createTextNode(html_char);
	ele.appendChild(node);
	return ele;
}
function factorial(n){
	//throw err if n is not int
	if (n <= 1) return 1;
	return n*factorial(n-1);
}

function compute(){
	correct_close_brackets();

	var result=0;
	if(compute_arr.length){
		result=eval(calc(compute_arr)[0]);
		result = (result!==undefined)?parseFloat(result.toPrecision(10)):'Error';
	}

	$('#calInfoOutPut').val(result);
}


function calc(Varr){
	console.log('in calc fn : '+Varr)
	var tmpVarr = [];

	// constants ...
	if(Varr[0]==='pi'){
		Varr[0] = 'Math.PI';
	}
	if(Varr[0]==='e'){
		Varr[0] = 'Math.E';
	}
	if(Varr[0]==='rnd'){
		Varr[0] = 'Math.random()';
	}

	// single fn/digit
	if(Varr.length===1){
		if(Varr[0]==='pi'){
			return ['Math.PI'];
		}
		if(Varr[0]==='e'){
			return ['Math.E'];
		}
		if(Varr[0]==='rnd'){
			return ['Math.random()'];
		}
		return [Varr[0]];
	}


	var j=0;

	// open bracket
	if(Varr[0]==='('){

		j=eq_close_bracket(Varr,0);
		Varr[0] = '('+calc(Varr.slice(1,j))+')';
		Varr.splice(1,j);
		return calc(Varr);
	}

	// prefns
	if( Varr[0]==='sin' ||Varr[0]==='cos' ||Varr[0]==='tan' ||
		Varr[0]==='asin'||Varr[0]==='acos'||Varr[0]==='atan'||
		Varr[0]==='ln'  ||Varr[0]==='log' ||Varr[0]==='ex'  ||
		Varr[0]==='10x' ||Varr[0]==='3_root_x'|| Varr[0]==='sqrt')
	{

		j=eq_close_bracket(Varr,1);
		switch (Varr[0]){
			case 'sin' :  case 'cos'  : case 'tan' :
			case 'asin' : case 'acos' : case 'atan':
				Varr[0] = 'Math.'+Varr[0]+'('+calc(Varr.slice(1,j+1))+')';
				break;

			case 'ln' : 
				Varr[0] = 'Math.log('+calc(Varr.slice(1,j+1))+')/Math.log(Math.E)'; 
				break;

			case 'log' :
				Varr[0] = 'Math.log('+calc(Varr.slice(1,j+1))+')/Math.LN10'; 
				break;

			case 'ex' :
				Varr[0] = 'Math.exp('+calc(Varr.slice(1,j+1))+')'; 
				break;

			case '10x' :
			 	Varr[0] = 'Math.pow(10,'+calc(Varr.slice(1,j+1))+')';
				break;

	 		case 'sqrt' :
	 			Varr[0] = 'Math.sqrt('+calc(Varr.slice(1,j+1))+')';
	 			break;

		 	case '3_root_x' :
		 		Varr[0] = 'Math.pow('+calc(Varr.slice(1,j+1))+', 1/3)'; 
		 		break;
		}
		Varr.splice(1,j);
		return calc(Varr);
	}

	//postfns
	if( Varr[1]==='1/x'||Varr[1]==='x2'||Varr[1]==='x3'||Varr[1]==='x!'){
		j=eq_close_bracket(Varr,2);
		switch(Varr[1]){
			case '1/x': Varr[0] = 'Math.pow('+Varr[0]+',-1)';break;
			case 'x2' : Varr[0] = 'Math.pow('+Varr[0]+',2)';break;
			case 'x3' : Varr[0] = 'Math.pow('+Varr[0]+',3)';break;
			case 'x!' : Varr[0] = 'factorial('+Varr[0]+')';break;
		}
		Varr.splice(1,1);
		return calc(Varr);
	}

	//prepost
	if( Varr[1]==='pow' || Varr[1]==='y_root_x'){
		j=eq_close_bracket(Varr,2);
		switch(Varr[1]){
			case 'pow':
				Varr[0] = 'Math.pow('+Varr[0]+','+calc(Varr.slice(2,j+1))+')';
				//console.log(Varr)
				break;
			case 'x_root_y':
				Varr[0] = 'Math.pow('+calc(Varr.slice(2,j))+',1/'+Varr[0]+')';
				break;
		}

		Varr.splice(1,j+1);
		return calc(Varr);

	}


	// + - * / 
	if( Varr[1]==='+'||Varr[1]==='-'||Varr[1]==='*'||Varr[1]==='/'){
		Varr[0] += Varr[1];
		Varr.splice(1,1);
		j=eq_close_bracket(Varr,1);
		tmpVarr = Varr.slice(1,j+1);
		Varr[0]+=calc(tmpVarr);
		Varr.splice(1,j);

		return Varr;
	}
	// %
	if(Varr[1]==='%'){
		Varr[0] += '/100';
		Varr.splice(1,1);
		return calc(Varr);
	}


	return -1;//use try-catch-throw instead
}

/*
 *	param array of expression
 *	param reqd. start 
 *  returns closing bracket positon in the array
 */
function eq_close_bracket(Arr,startIndex){

	if(startIndex===Arr.length){return startIndex;}

	var count=0;
	for(i=startIndex;i<Arr.length;i++){
		if(Arr[i]==='('){
			count++;
			continue;
		}
		if(Arr[i]===')'){
			count--;

			if(count===0 && Arr[startIndex]==='('){
				return i;
			}

			if(count<0 && Arr[startIndex]!=='('){
				return i-1;
			} 
		}
	}
	return Arr.length-1;
}

function key_p(A){
	console.log(compute_arr)

	switch(A){
		case '(':case ')':
			$('#enterString').html($('#enterString').html()+' '+A+' ');
			compute_arr.push(A)
			isOperator=true;
			break;

		//fns post
		case '1/x': 
			$('#enterString').html($('#enterString').html()+' <sup>-1</sup> ');
			compute_arr.push(A)
			isOperator=true;
			break;
		case 'x2':  
			$('#enterString').html($('#enterString').html()+' <sup>2</sup> ');
			compute_arr.push(A)
			isOperator=true;
			break;
		case 'x3':  
			$('#enterString').html($('#enterString').html()+' <sup>3</sup> ');
			compute_arr.push(A)
			isOperator=true;
			break;

		//case '3x':  custom_A = gen_html_ele('sup','3')+gen_html_ele('span','&radic;'); break;
		case 'x!':
			$('#enterString').html($('#enterString').html()+'! ');
			compute_arr.push(A)
			isOperator=true;
			break;
		case '%':
			$('#enterString').html($('#enterString').html()+'% ');
			compute_arr.push(A)
			isOperator=true;
			break;

		//fns pre
		case 'ex': 
			$('#enterString').html($('#enterString').html()+' e^ ( ');
			compute_arr.push(A);
			compute_arr.push('(');
			isOperator=true;
			break;
		case '10x'	: 
			$('#enterString').html($('#enterString').html()+' 10^ ( ');
			compute_arr.push(A)
			compute_arr.push('(');
			isOperator=true;
			break;
		case '3x'	: 
			$('#enterString').html($('#enterString').html()+' 3^ ( ');
			compute_arr.push(A)
			compute_arr.push('(');
			isOperator=true;
			break;

		case 'sqrt':
			$('#enterString').html($('#enterString').html()+' &radic; ( ');
			compute_arr.push(A)
			compute_arr.push('(');
			isOperator=true;
			break;
		case 'sin': case 'cos' 	: case 'tan': case 'asin': 
		case 'acos':case 'atan'	: case 'ln'	: case 'log': 
			$('#enterString').html($('#enterString').html()+' '+A+' ( ');
			compute_arr.push(A)
			compute_arr.push('(');
			isOperator=true;
			break;
		case '3_root_x':
			$('#enterString').html($('#enterString').html()+' 3&radic; (');
			compute_arr.push(A)
			compute_arr.push('(');
			isOperator=true;
			break;

		//fns prepost
		case 'pow': 
			$('#enterString').html($('#enterString').html()+' ^ (');
			compute_arr.push(A)
			compute_arr.push('(');
			isOperator=true;
			break;
		case 'apow':
			$('#enterString').html(' ^ (');
			compute_arr.push(A)
			compute_arr.push('(');
			isOperator=true;
			break;
		case 'y_root_x':
			$('#enterString').html($('#enterString').html()+' &radic; (');
			compute_arr.push(A)
			compute_arr.push('(');
			isOperator=true;
			break;

		//consts.
		case 'pi':
			$('#enterString').html($('#enterString').html()+' &pi; ');
			compute_arr.push(A)
			isOperator=true;
			break;
		case 'e':
		case 'rnd':
			$('#enterString').html($('#enterString').html()+' '+A+' ');
			compute_arr.push(A)
			isOperator=true;
			break;

		//numbers
		case 0:case 1:case 2:case 3:case 4:
		case 5:case 6:case 7:case 8:case 9:case '.':
			A = A.toString()

			//after operator
			if(isOperator){
				$('#enterString').text($('#enterString').text()+' '+A);
				compute_arr.push(A)

			//after numeric
			}else{
				$('#enterString').text($('#enterString').text()+A);

				if(compute_arr.length){
					compute_arr[compute_arr.length-1]=compute_arr[compute_arr.length-1]+A
				}else{
					compute_arr.push(A)
				}
			}

			isOperator=false;
			break;

		//fns prepost
		case '+':case '-':case '*':case '/':
			var html_A='';
			switch(A){
				case '*': html_A=gen_esp_char('&times;'); break;
				case '/': html_A=gen_esp_char('&divide;'); break;
				case '+':case '-':html_A=A; break;
			}
			$('#enterString').html($('#enterString').html()+' '+html_A+' ');
			compute_arr.push(A)
			isOperator=true;
			break;

		case '+/-':
			$('#enterString').html($('#enterString').html()+' -');
			compute_arr.push('-');
			isOperator=false;
			break;

		case '=':
			compute();
			break;

		case "C":
			$('#enterString').html('');
			$('#calInfoOutPut').val('0');
			compute_arr=[];
			break;
	}
	document.getElementById('enterBtn').focus();
	return false;
}

function change_selector(mode){
	switch(mode){
		case 'sci':
			document.getElementById('stat').style.display = 'none';
			document.getElementById('scientific').style.display = 'block';
			break;
		case 'stat':
			document.getElementById('scientific').style.display = 'none';
			document.getElementById('stat').style.display = 'block';
			break;
		case 'basic': default:
			document.getElementById('stat').style.display = 'none'
			document.getElementById('scientific').style.display = 'none'
	}
}
function show_calc(){
	document.getElementById('calculator').style.display="block";
	document.getElementById('overlay').style.display="block";
}
function close_calc(){

	var all = document.getElementById('calculator_wrapper').childNodes

	for (each in all){
	    if(all[each].nodeType === 1){
	        all[each].style.display = 'none';
	    }
	}
}
var shiftpressed=false;
function onup(e){
console.log(e.keyCode)
	if(e.keyCode===16){
		shiftpressed=false;
		return false;
	}
	if(!shiftpressed){
		if(e.keyCode===27){ // esc
			key_p('C');
			return false;
		}
		if(e.keyCode>=48 && e.keyCode<=57){ //0-9
			key_p(e.keyCode - 48);
			return false;
		}
		if(e.keyCode>=96 && e.keyCode<=105){//0-9
			key_p(e.keyCode - 96);
			return false;
		}
		if(e.keyCode===190){ // .
			key_p('.');
			return false;
		}
		if(e.keyCode===61||e.keyCode===107){ //+	
			key_p('+');
			return false;
		}
		if(e.keyCode===173||e.keyCode===109){ //-
			key_p('-');
			return false;
		}
		if(e.keyCode===56||e.keyCode===106){//*
			key_p('*');
			return false;
		}
		if(e.keyCode===191||e.keyCode===111){// /
			key_p('/');
			return false;
		}
		if(e.keyCode===190||e.keyCode==110){// .
			key_p('.')
			return false;
		}
		if(e.keyCode===13){// enter
			key_p('=')
			return false;
		}
	}else{
		if(e.keyCode===61||e.keyCode===107){ // +
			key_p('+');
			return false;
		}
		if(e.keyCode===173||e.keyCode===109){ // -
			key_p('-');
			return false;
		}
		if(e.keyCode===56||e.keyCode===106){ // *
			key_p('*');
			return false;
		}
		if(e.keyCode===57){ // (
			key_p('(');
			return false;
		}
		if(e.keyCode===48){ // )
			key_p(')');
			return false;
		}
	}
}


function ondown(e){
	if(e.keyCode===16){
		shiftpressed=true;
		return false;
	}
}

function correct_close_brackets(){
	var count = 0;

	for(var i=0;i<compute_arr.length;i++){
		if(compute_arr[i]==='('){
			count++;
		}else if(compute_arr[i]===')'){
			count--;
		}
	}

	if(count>0){
		for(i=0;i<count;i++){
			compute_arr.push('(')
		}

	}
}
