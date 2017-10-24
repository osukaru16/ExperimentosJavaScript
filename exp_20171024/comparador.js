





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


	if (!this.comprobarRecursoExiste(objeto,"id")) {
		this.listaObjetos.push(objeto);
		this.escribirCookie(this.nombreCookie,this.listaObjetos);
		return true;
	}else{
		return false;
	}

}

/*
comprobarRecursoExiste: 
Te permite comprobar si el objeto que le pasas en la key tienen el mismo valor de los objetos del array.
devuelve un true si esta y false si no. 

Se utiliza principalmente para comprobar 
de no poner dos objetos con la misma id.
*/

Comparador.prototype.comprobarRecursoExiste = function(objeto, key ){
	
	for (var i =0; i < this.listaObjetos.length ;  i++) {
		if (this.listaObjetos[i][key] === objeto[key]) {
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
	document.getElementById(idHtml).innerHTML = this.nuevoProcesoPintarTabla();
}




/*

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

	
	textoHtml += this.pintarNoArray();


	//Precio

	//textoHtml += "</tr></tbody></table>";

	textoHtml += "</tbody></table>";

	return textoHtml;


}*/



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





/*
eliminarRecurso:
este metodo elimina el objeto de la array(this.listaObjetos) y
vuelve a llamara a this.escribirCookie para poner la nueva cookie

*/

Comparador.prototype.eliminarRecurso = function(objeto, key){
	//alert("objeto.id");
	
	for (var i = 0; i < this.listaObjetos.length; i++) {
		if(this.listaObjetos[i][key] === objeto[key]){
			this.listaObjetos.splice(i, 1);
			this.escribirCookie(this.nombreCookie,this.listaObjetos);
			//this.pintarTabla(this.idHtml);
		}
	}/*
	if (this.comprobarRecursoExiste(objeto, key)){
		this.listaObjetos.splice(i, 1);
		this.escribirCookie(this.nombreCookie,this.listaObjetos);
	}*/
}

/*eliminarRecursoV2:
Este metodo elimina el objeto del array usando el key y el valor que contiene en esa key.
*/

Comparador.prototype.eliminarRecursoV2 = function(key, keyValor){

	for (var i = 0; i < this.listaObjetos.length; i++) {
		if(this.listaObjetos[i][key] === keyValor){
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
		if (typeof this.getValor(posicion)[j] !== typeof {}){
			//alert("non obj");
			listaSB.push(this.getKeys(posicion)[j]);
		}
	}

	return listaSB;
}




Comparador.prototype.getValoresNoArray = function(posicion){
	var listaSB = new Array();

	for (var j = 0; j < this.getKeys(posicion).length; j++) {
		//alert(typeof this.listaObjetos[i][this.getKeys(i)[j]]);
		if (typeof this.getValor(posicion)[j] === typeof true){
			//alert(this.getValor(posicion));
			listaSB.push(this.pintarValorOX(this.getValor(posicion)[j]));
			//listaSB.push(this.getValor(posicion)[j]);
		}else if (typeof this.getValor(posicion)[j] !== typeof {}){
			
			listaSB.push(this.getValor(posicion)[j]);
		}
	}

	return listaSB;
}










/*
Comparador.prototype.pintarNoArray = function(){
	var posicion = 0;
	var textoHtml = "";

	for (var i = 0; i < this.getKeysNoArray(posicion).length; i++) {
		if ((this.getKeysNoArray(posicion)[i] !== "id")&&(this.getKeysNoArray(posicion)[i] !== "nom")) {
			textoHtml += "<tr> <td>"+this.getKeysNoArray(posicion)[i]+"</td>";
			for (var j = 0; j < this.listaObjetos.length; j++) {
				textoHtml += "<td>"+this.getValoresNoArray(j)[i]+"</td>";
			}
			textoHtml += "</tr>"
		}
	}

	return textoHtml;
}
*/




Comparador.prototype.pintarNoArray = function(){
	var posicion = 0;
	var textoHtml = "";
	//lista de no pintar
	var listaNoPintar = new Array("id","nom");

	
	
	for (var i = 0; i < this.getKeysNoArray(posicion).length; i++) {
		if (!this.keysNoPintar(i, listaNoPintar)) {
			textoHtml += "<tr> <td>"+this.getKeysNoArray(posicion)[i]+"</td>";
			for (var j = 0; j < this.listaObjetos.length; j++) {
				textoHtml += "<td>"+this.getValoresNoArray(j)[i]+"</td>";
			}
			textoHtml += "</tr>";
		}

	}

	return textoHtml;
}



Comparador.prototype.pintarNoArrayV2 = function(){
	var posicion = 0;
	
	var arrayOrdenacion = new Array();
	//lista de no pintar
	var listaNoPintar = new Array("id","nom");

	
	
	for (var i = 0; i < this.getKeysNoArray(posicion).length; i++) {
		var textoHtml = "";
		if (!this.keysNoPintar(i, listaNoPintar)) {
			textoHtml += "<tr> <td>"+this.getKeysNoArray(posicion)[i]+"</td>";
			for (var j = 0; j < this.listaObjetos.length; j++) {
				textoHtml += "<td>"+this.getValoresNoArray(j)[i]+"</td>";
			}
			textoHtml += "</tr>";
			arrayOrdenacion.push(textoHtml);
		}

	}

	return arrayOrdenacion;
}















/*

keysNoPintar:
Este metodo le pasas la posicion para el this.getKeysNoArray y 
una array de las key que compara y devuelve true o false

*/

Comparador.prototype.keysNoPintar = function(posicion, noPintarKeys){

	
		for (var x = 0; x < noPintarKeys.length; x++) {
			if (this.getKeysNoArray(0)[posicion] === noPintarKeys[x]) {
				return true;
			}
		}

	return false;
}









/*
Comparador.prototype.pintarNoArrayValor = function(posicion){
	var textoHtml = "";

	for (var i = 0; i < this.getKeysNoArray(posicion).length; i++) {
		for (var j = 0; j < this.listaObjetos.length; j++) {
			textoHtml += "<td>"+this.getValoresNoArray(j)[i]+"</td>";
		}
	}

	return textoHtml;
}

*/





/*
Comparador.prototype.analizadorRecursos = function(){
	var listaSB = new Array();

	for (var i = 0; i < this.listaObjetos.length; i++) {
		for (var j = 0; j < this.getKeys(i).length; j++) {
			//alert(typeof this.listaObjetos[i][this.getKeys(i)[j]]);
			if (typeof this.getValor(i)[j] !== typeof {}){
				alert(this.getValor(i)[j]);
				//listaSB.push(this.getKeys(i));

			}

			/*if (typeof this.listaObjetos[i][this.getKeys(i)[j]] == typeof "String") {
				alert("miau");
			}else if (typeof this.listaObjetos[i][this.getKeys(i)[j]] == typeof true){
				alert("ffff");
			}else if (typeof this.listaObjetos[i][this.getKeys(i)[j]] == typeof {}){
				alert("obj");
			}*/

/*
		}
	}
}
*/










/*
	arrayPintar:
	Es para facilitar el proceso de pintado de la pagina
	devuelve un array con todos los elementos necesarios
*/

/*
Comparador.prototype.arrayPintar = function(posicion){
	var pintaLista = new Array();

	for (var i = 0; i < this.listaObjetos.length; i++) {

		pintaLista[i][posicion] = this.listaObjetos[i][this.getValor(posicion)]




		var contador = 0;
		for (var valor in this.listaObjetos[i]) {
			pintaLista[i][contador] = valor;
			contador++;
		}




	}
	return pintaLista;
	
}
*/



/*pintarTitulos:
Le pasa el nombre de la key del nombre y te hace las
cabecers de la tabla


*/
/*
Comparador.prototype.pintarTitulos = function(titulos, titulosObj){
	//var textoHtml = "";
	//var textoHtml = "<table><thead> <tr><th></th>";
	//alert("nya: "+this.listaObjetos[0]["nom"]);
	var textoHtml = "<thead><tr><th></th>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		if (typeof this.listaObjetos[i][titulos] === typeof {}){
			//alert("miau");
			textoHtml += "<th>"+this.listaObjetos[i][titulos][titulosObj]+"</th>";
		}else{
			textoHtml += "<th>"+this.listaObjetos[i][titulos]+"</th>";
		//alert("nya: "+this.listaObjetos[i]["nom"]);
		}
	}
	//textoHtml += "</tr></thead><tbody>";
	return textoHtml += "</tr></thead>";
}*/




Comparador.prototype.pintarTitulos = function(titulos){

	var textoHtml = "<thead><tr><th></th>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		textoHtml += "<th>"+this.listaObjetos[i][titulos]+"</th>";
	}
	return textoHtml += "</tr></thead>";
}






Comparador.prototype.nuevoProcesoPintarTabla = function(){

	var textoHtml = "";
	var arrayOrdenacion = this.ordenacionPintado();

	//alert("este es el new");

	if (this.listaObjetos.length === 0) {
		var textoHtml = "<p> No hay objetos o se han borrado las cookies </p>";
		return textoHtml;
	}

	textoHtml += "<table>";



	// cabecera________
	//textoHtml += this.pintarTitulos("nom","nombre");
	textoHtml += this.pintarTitulos("nom");

	textoHtml += "<tbody>";


	textoHtml += arrayOrdenacion[0];
	textoHtml += arrayOrdenacion[1];
	textoHtml += arrayOrdenacion[2];
	textoHtml += arrayOrdenacion[3];


/*
	// todas las arrays
	for (var i = 0; i < this.getKeysArray(0).length; i++) {
		textoHtml += this.pintaFilasTituloArray(i);
		textoHtml += this.pintaFilasArray(i);
	}

	
	// todo no arrays
	textoHtml += this.pintarNoArray();
*/
	textoHtml += "</tbody></table>";

	return textoHtml;

}







Comparador.prototype.ordenacionPintado = function(){
	// todas las arrays
	//var objOrdenacion = {};
	var arrayOrdenacion = new Array();
	for (var i = 0; i < this.getKeysArray(0).length; i++) {
		var textoHtml = "";
		textoHtml += this.pintaFilasTituloArray(i);
		textoHtml += this.pintaFilasArray(i);
		arrayOrdenacion.push(textoHtml);
	}

	
	// todo no arrays
	//textoHtml += this.pintarNoArray();

	return arrayOrdenacion.concat(this.pintarNoArrayV2());
}



















