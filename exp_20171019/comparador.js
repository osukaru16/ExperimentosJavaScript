





function Comparador(){
	this.nombreCookie = "compararRecursos";
	//this.idHtml="";

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





/*Nota la id que pide el metodo pintarTabla es la idHtml
de la etiqueta html*/

Comparador.prototype.pintarTabla = function(idHtml){
	//this.idHtml = idHtml;
	document.getElementById(idHtml).innerHTML = this.procesoPintarTabla();
}






Comparador.prototype.procesoPintarTabla = function(){


	if (this.listaObjetos.length === 0) {
		var textoHtml = "<p> No hay objetos o se han borrado las cookies </p>";
		return textoHtml;
	}

	
	// cabecera________
	var textoHtml = "<table><thead> <tr><th></th>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		textoHtml += "<th>"+this.listaObjetos[i].nom+"</th>";
	}

	textoHtml += "</tr></thead><tbody>";


	// medio____________________


	// todas las arrays
	for (var i = 0; i < this.getKeysArray(0).length; i++) {
		textoHtml += this.pintaFilasTituloArray(i);
		textoHtml += this.pintaFilasArray(i);
	}

	
	//Precio

	textoHtml += "<tr><td>Gratuit</td>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
			textoHtml += "<td>"+this.pintarValorOX(this.listaObjetos[i].gratuit)+"</td>";
	}
	textoHtml += "</tr>";



	//Lugar______________________

	textoHtml += "<tr><td>Territori</td>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		textoHtml += "<td>"+this.listaObjetos[i].territori+"</td>";
	}
	textoHtml += "</tr></tbody></table>";

	return textoHtml;


}



/*
	pintaFilasTituloArray:
	Se ha creado para reducir el codigo de pintaFilasArray.
*/


Comparador.prototype.pintaFilasTituloArray = function(posicion){	
	var textoHtml = "";
	var listaKeysArrays = this.getKeysArray(0);

	textoHtml += "<tr><td colspan="+this.listaObjetos.length+">"+listaKeysArrays[posicion]+"</td></tr>";
	/*for (var i = 0; i < this.listaObjetos.length; i++) {
		textoHtml += "<td>   </td>";
	}*/
	//textoHtml += "</tr>";

	return textoHtml;
}





/*

	pintaFilasArray:
	Devuelve un String con el html necesario para 
	pintar el array dereminado por la posicion de la array de keys que devuelve
	el metodo this.getKeysArray().
	nota: usa un for con this.getKeysArray().length

*/

Comparador.prototype.pintaFilasArray = function(posicion){	
	var textoHtml = "";
	var keyArray = this.getKeysArray(0)[posicion];

	for (var j = 0; j < this.valoresArray(keyArray).length; j++) {
		textoHtml += "<tr>";
		//textoHtml += "<td>"+this.listaObjetos[listaKeysArrays[posicion]][contador]+"</td>";
		//textoHtml += "<td>"+this.listaObjetos[keyArray][contador]+"</td>";
		textoHtml += "<td>"+this.valoresArray(keyArray)[j]+"</td>";
		var comprobadorValores = this.comprobadorValor(keyArray, this.valoresArray(keyArray)[j]);
		for (var g = 0; g < comprobadorValores.length; g++) {
			textoHtml += "<td>"+this.pintarValorOX(comprobadorValores[g])+"</td>";
		}
			
		textoHtml += "</tr>";
	}

	return textoHtml;
}





/*

Nota:
Aqui hay que escribir un metodo que mire en en la array ejemplo tipus y que 
salga una array con los valores sin repetir ninguno

valoresArray: lugar(Nombre del array)


*/
Comparador.prototype.valoresArray = function(lugar){
	var listaValores = new Array();
	for (var i = 0; i < this.listaObjetos.length; i++) {
		//alert(this.listaObjetos[i][lugar].length);
		//alert(this.listaObjetos[0][lugar][1]);
		for (var j = 0 ; j < this.listaObjetos[i][lugar].length ;  j++) {
			if ((listaValores.indexOf(this.listaObjetos[i][lugar][j])) === -1 ){
				listaValores.push(this.listaObjetos[i][lugar][j]);
			}
		}		
	}

	return listaValores;
}







/*
	arrayPintar:
	Es para facilitar el proceso de pintado de la pagina
	devuelve un array con todos los elementos necesarios
*/
/*
Comparador.prototype.arrayPintar = function(){
	var pintaLista = new Array();

	for (var i = 0; i < this.listaObjetos.length; i++) {
		var contador = 0;
		for (var valor in this.listaObjetos[i]) {
			pintaLista[i][contador] = valor;
			contador++;
		}
	}
	return pintaLista;
	
}
*/









/*

	comprobadorValor:
	comprueba si el valor(String) que se quiere esta en la array(lugar(Nombre del array)) que se quiere
	devuelve un array booleana

*/

Comparador.prototype.comprobadorValor = function(lugar, valor){
	var listaValores = new Array();
	for (var i = 0; i < this.listaObjetos.length; i++) { 
		if ((this.listaObjetos[i][lugar].indexOf(valor)) !== -1 ){
			listaValores.push(true);
		}else{
			listaValores.push(false);
		}

	}
	return listaValores;
}



Comparador.prototype.pintarValorOX = function(valor){
	if (valor) {
		return "O";
	}
	return "X";
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
	var listaValores = new Array();
	if (this.listaObjetos.length > 0) {
		listaValores =  Object.values(this.listaObjetos[posicion]);
		return listaValores;
	}
		
	//alert(listaValores.length);
	return listaValores;
	
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
		}
		


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



/*


Comparador.prototype.getArray = function(){
	return this.listaObjetos;
}

*/


Comparador.prototype.eliminarRecurso = function(objeto){
	//alert("objeto.id");

	

	for (var i = 0; i < this.listaObjetos.length; i++) {
		if(this.listaObjetos[i].id === objeto.id){
			this.listaObjetos.splice(i, 1);
			this.escribirCookie(this.nombreCookie,this.listaObjetos);
			//this.pintarTabla(this.idHtml);
		}
	}

}


Comparador.prototype.getKeysNoArray = function(posicion){
	var listaSB = new Array();

	for (var j = 0; j < this.getKeys(posicion).length; j++) {
		//alert(typeof this.listaObjetos[i][this.getKeys(i)[j]]);
		if (typeof this.listaObjetos[posicion][this.getKeys(posicion)[j]] !== typeof {}){
			//alert("non obj");
			listaSB.push(this.getKeys(posicion));
		}
	}

	return listaSB;
}


Comparador.prototype.getValoresNoArray = function(posicion){
	var listaSB = new Array();

	for (var j = 0; j < this.getKeys(posicion).length; j++) {
		//alert(typeof this.listaObjetos[i][this.getKeys(i)[j]]);
		if (typeof this.listaObjetos[posicion][this.getKeys(posicion)[j]] !== typeof {}){
			//alert("non obj");
			listaSB.push(this.listaObjetos[posicion][this.getKeys(posicion)[j]]);
		}
	}

	return listaSB;
}


Comparador.prototype.pintarNoArray = function(posicion){
	var textoHtml = "";

	for (var i = 0; i < this.getKeysNoArray(posicion).length; i++) {




	}

}





Comparador.prototype.analizadorRecursos = function(){
	var listaSB = new Array();

	for (var i = 0; i < this.listaObjetos.length; i++) {
		for (var j = 0; j < this.getKeys(i).length; j++) {
			//alert(typeof this.listaObjetos[i][this.getKeys(i)[j]]);
			if (typeof this.listaObjetos[i][this.getKeys(i)[j]] !== typeof {}){
				//alert("non obj");
				listaSB.push(this.getKeys(i));

			}

			/*if (typeof this.listaObjetos[i][this.getKeys(i)[j]] == typeof "String") {
				alert("miau");
			}else if (typeof this.listaObjetos[i][this.getKeys(i)[j]] == typeof true){
				alert("ffff");
			}else if (typeof this.listaObjetos[i][this.getKeys(i)[j]] == typeof {}){
				alert("obj");
			}*/


		}
	}
}














