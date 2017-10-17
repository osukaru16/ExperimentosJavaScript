





function Comparador(){
	this.nombreCookie = "compararRecursos";
	

	if (this.leerCookie(this.nombreCookie) === null) {
		this.listaObjetos = new Array();
		
	}else{
		this.listaObjetos = this.leerCookie(this.nombreCookie);

	}




}

Comparador.prototype.addRecurso = function(objeto){


	if (!this.comprobarRecursoExiste(objeto)) {
		this.listaObjetos.push(objeto);
		this.escribirCookie(this.nombreCookie,this.listaObjetos);
		return true;
	}else{
		return false;
	}

}

Comparador.prototype.comprobarRecursoExiste = function(objeto){
	
	for (var i =0; i < this.listaObjetos.length ;  i++) {
		if (this.listaObjetos[i].id === objeto.id) {
			return true;
		}
	}

	return false;
	
	
}



Comparador.prototype.leerCookie = function(nombre) {

		  var nombreEQ = nombre + "="; 
		  var coma = document.cookie.split(';');

		  for(var i=0;i < coma.length;i++) {

		    var cookie = coma[i];
		    while (cookie.charAt(0)==' ') cookie = cookie.substring(1,cookie.length);
		    if (cookie.indexOf(nombreEQ) == 0) {
		      return this.descodificarObjecto(decodeURIComponent( cookie.substring(nombreEQ.length,cookie.length) ));
		    }

		  }

		  return null;

}

Comparador.prototype.escribirCookie = function(nombreCookie, objeto) {

	document.cookie = nombreCookie+"="+this.codificarObjecto(objeto);

}


Comparador.prototype.codificarObjecto = function(objeto){
	return JSON.stringify(objeto);
} 


Comparador.prototype.descodificarObjecto = function(objeto){
	return JSON.parse(objeto);
} 







Comparador.prototype.pintarTabla = function(id){

	//var textoHtml = "";

	var textoHtml = "<table><thead> <tr><th></th>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		//alert(this.listaObjetos[i].nom);
		textoHtml += "<th>"+this.listaObjetos[i].nom+"</th>";
		//textoHtml += "<th>"+i+"</th>";
		//alert(this.listaObjetos.length);
	}


	textoHtml += "</tr></thead><tbody>";


// medio____________________

/*
	//textoHtml += "<tr>";
	var listaKeys = this.getKeys()
	//var listaKeysArrays = this.getKeysArray();
	var listaValores
	for (var i = 0; i < this.listaObjetos.length ; i++) {
		
		for (var j = 2; j < listaKeys.length ; j++) {
			if (Array.isArray(listaValores[j])){




			}else{


			}
		}

	}

*/
	for (var i = 0; i < this.getKeysArray(0).length ; i++) {
		textoHtml += this.pintaFilasTituloArray(i);

	}




//Lugar______________________

	textoHtml += "<tr><td>Territori</td>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		textoHtml += "<td>"+this.listaObjetos[i].territori+"</td>";
	}

	textoHtml += "</tr></tbody></table>";

/*
	var terminar = false;
	while(!terminar){

	

	}

*/

	//textoHtml = "hey";

	//alert(textoHtml);
	document.getElementById(id).innerHTML = textoHtml;


}



/*
	pintaFilasTituloArray:
	Se ha creado para reducir el codigo de pintaFilasArray y posibles bugs.
*/


Comparador.prototype.pintaFilasTituloArray = function(posicion){	
	var textoHtml = "";
	var listaKeysArrays = this.getKeysArray(0);


	textoHtml += "<tr><td>"+listaKeysArrays[posicion]+"</td>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		textoHtml += "<td>   </td>";
	}
	textoHtml += "</tr>";



	return textoHtml;
}












/*

	pintaFilasArray:
	Devuelve un String con el html necesario para 
	pintar el array dereminado por la posicion de la array de keys que devuelve
	el metodo this.getKeysArray().

*/

Comparador.prototype.pintaFilasArray = function(posicion){	
	var textoHtml = "";
	//var listaKeysArrays = this.getKeysArray(0);
	var keyArray = this.getKeysArray(0)[posicion];
	//var valorArray = 
	//var listaValores = this.getValor(posicion);
	//this.listaObjetos
	//var valorArray = listaValores[posicion];


/*
	textoHtml += "<tr><td>"+listaKeysArrays[posicion]+"</td>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		textoHtml += "<td>   </td>";
	}
	textoHtml += "</tr>";
*/

	//var terminado = false;
	//var contador = 0; // contador el la variable que te permite moverte por el array que quieres pintar
	
	//while (!terminado) {

	for (var contador = 0; contador < this.listaObjetos[keyArray].length; contador++) {
		textoHtml += "<tr>";
		for (var i = 0; i < this.listaObjetos.length; i++) {  // esta parte es para las columnas en las pruebas son 2 columnas
			

			//textoHtml += "<td>"+this.listaObjetos[listaKeysArrays[posicion]][contador]+"</td>";
			textoHtml += "<td>"+this.listaObjetos[keyArray][contador]+"</td>";
			textoHtml += "<td>"+this.comprobadorValor()+"</td>";
			//var listaValores = this.getValor(i);
		

		}
		textoHtml += "</tr>";
	}


	return textoHtml;
}








/*

Nota:
Aqui hay que escribir un metodo que mire en en la array ejemplo tipus y que 
salga una array con los valores sin repetir ninguno

comprobadorValoresArray: lugar(Nombre del array)


*/
Comparador.prototype.comprobadorValoresArray = function(lugar){
	var listaValores = new Array();
	for (var i = 0; i < this.listaObjetos.length; i++) {

		

	}

	return listaValores;
}



/*

	comprobadorValor:
	comprueba si el valor(String) que se quiere esta en la array(lugar(Nombre del array)) que se quiere
	devuelve un array con O o X

*/

Comparador.prototype.comprobadorValor = function(lugar, valor){
	var listaValores = new Array();
	for (var i = 0; i < this.listaObjetos.length; i++) { 
		if ((this.listaObjetos[i][lugar].indexOf(valor)) !== -1 ){
			listaValores.push("O");
		}else{
			listaValores.push("X");
		}

	}
	return listaValores;
}









Comparador.prototype.getKeys = function(posicion){	
	if (this.listaObjetos.length > 0) {
		var listaKeys =  Object.keys(this.listaObjetos[posicion]);
		return listaKeys;
	}else{
		return null;
	}
	//return Object.keys(this.listaObjetos[0]);
}







/*
Comparador.prototype.getRecurso = function(){

	
}
*/







/* 
	getValor:
	Devuelve un array con e los valores de la posicion del Array de objetos. 

*/

Comparador.prototype.getValor = function(posicion){
	if (this.listaObjetos.length > 0) {
		var listaValores =  Object.values(this.listaObjetos[posicion]);
		return listaValores;
	}else{
		return null;
	}
}



/*
Comparador.prototype.getValor = function(){
	if (this.listaObjetos.length > 0) {
		var listaValores =  Object.values(this.listaObjetos[0]);
		return listaValores;
	}else{
		return null;
	}
}
*/









/*
	getKeysArray: 
	Busca entre las keys del objeto y te devuelve las que son arrays 
	pero tienes que decir en que posicion de la array de objetos 

*/

Comparador.prototype.getKeysArray = function(posicion){

	var listaKeys = this.getKeys(posicion);
	var listaValores = this.getValor(posicion);
	var listaKeysArrays = new Array();
	

	for (var i =0 ; i < listaKeys.length ; i++) {
		if (Array.isArray(listaValores[i])){
			listaKeysArrays.push(listaKeys[i]);
			//alert(listaKeys[i]);
		}
		//alert();


	}

	return listaKeysArrays;

}





/*
Comparador.prototype.getNombres = function(){

	for (var i = 0; i < this.listaObjetos.length; i++) {
			alert(this.listaObjetos[i].nom);
	}


}
*/



Comparador.prototype.getArray = function(){
	return this.listaObjetos;
}







