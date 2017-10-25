





function Comparador(){
	this.nombreCookie = "compararRecursos";
	this.arrayKeysOrdenPintado = new Array("tematica","tipus", "gratuit", "territori");
	this.titulo = "nom";
	//this.arrayKeysOrdenPintado = new Array("gratuit");
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
	//document.getElementById(idHtml).innerHTML = this.nuevoProcesoPintarTabla();
	document.getElementById(idHtml).innerHTML = this.pintando();
}




Comparador.prototype.pintarTitulos = function(titulos){

	var textoHtml = "<thead><tr><th></th>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		textoHtml += "<th>"+this.listaObjetos[i][titulos]+"</th>";
	}
	return textoHtml += "</tr></thead>";
}




Comparador.prototype.pintaArray = function(key){

	var textoHtml = "";
	var arrayPintar = this.listaObjetos[0][key];

	//var listaKeysArrays = this.arrayKeysOrdenPintado;
	//this.listaObjetos


	textoHtml += "<tr><td colspan="+this.listaObjetos.length+">"+key+"</td></tr>";

	for (var j = 0; j < arrayPintar.length; j++) {
		textoHtml += "<tr>";
		textoHtml += "<td>"+arrayPintar[j]+"</td>";
		var comprobadorValores = this.comprobadorValor(key, arrayPintar[j]);
		for (var g = 0; g < comprobadorValores.length; g++) {
			textoHtml += "<td>"+this.pintarValorOX(comprobadorValores[g])+"</td>";
		}
			
		textoHtml += "</tr>";
	}



	return textoHtml;


}



Comparador.prototype.pintaOtros = function(key){

	var textoHtml = "";

	textoHtml += "<tr><td>"+key+"</td>";
	if(typeof this.listaObjetos[0][key] === typeof true){
		for (var i = 0;  i < this.listaObjetos.length ; i++) {
			textoHtml += "<td>"+ this.listaObjetos[i][key] +"</td>";
		}
	}else{
		for (var i = 0;  i < this.listaObjetos.length ; i++) {
			textoHtml += "<td>"+ this.listaObjetos[i][key] +"</td>";
		}
	}
	textoHtml += "</tr>";
	return textoHtml;

}






Comparador.prototype.pintando = function(){
	var textoHtml = "";
	var keyArray = this.arrayKeysOrdenPintado;
	var listaPrincipal = this.listaObjetos[0];

	if (this.listaObjetos.length === 0) {
		var textoHtml = "<p> No hay objetos o se han borrado las cookies </p>";
		return textoHtml;
	}

	textoHtml += "<table>";

	//cabezera
	textoHtml += this.pintarTitulos(this.titulo);

	textoHtml += "<tbody>";



	for (var i = 0; i < keyArray.length; i++) {
		
		if (Array.isArray(listaPrincipal[keyArray[i]])) {
			textoHtml += this.pintaArray(keyArray[i]);
		}
		else{
			textoHtml += this.pintaOtros(keyArray[i]);
		}
	
	}

	textoHtml += "</table>";


	return textoHtml;
}




/*

	comprobadorValor:
	comprueba si el valor(String) que se quiere esta en la array(lugar(Nombre del array)) que se quiere
	devuelve un array booleana
	lugar es la key y valor el valor a buscar.

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

