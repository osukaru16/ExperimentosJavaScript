





function Comparador(){
	this.nombreCookie = "compararRecursos";
	this.arrayKeysOrdenPintado = new Array("tematica","territori","tipus", "gratuit");
	this.titulo = "nom";
	this.id = "id";
	//this.arrayKeysOrdenPintado = new Array("gratuit");
	//this.idHtml="";

	if (this.leerCookie(this.nombreCookie) === null) {
		this.listaObjetos = new Array();
		
	}else{
		this.listaObjetos = this.leerCookie(this.nombreCookie);

	}
}



Comparador.prototype.addRecurso = function(objeto){


	if (!this.comprobarRecursoExiste(objeto,this.id)) {
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

Comparador.prototype.pintaTabla = function(idHtml){
	//this.idHtml = idHtml;
	//document.getElementById(idHtml).innerHTML = this.nuevoProcesoPintarTabla();

	document.getElementById(idHtml).innerHTML = this.pinta();


	if (this.listaObjetos.length < 4) {
		var textoHtml ="<div id='contenedorBotonAgregar'><button onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button></div>";
		//alert("Ahora");
		document.getElementById(idHtml).innerHTML = this.pinta()+textoHtml;
	}




}




Comparador.prototype.pintarTitulos = function(titulos){

	var that = this;

	var textoHtml = "<thead><tr><td class='noPintar'></td>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		//id='"+this.listaObjetos[i][this.id]+"' //Fragmento quitado
		textoHtml += "<th><button onclick='eliminaRecurso(\""+this.listaObjetos[i][this.id]+"\");' >X</button> <p>"+this.listaObjetos[i][titulos]+"</p></th>";
		


		/*
		textoHtml += "<th><button onclick='"+ function(){
			this.eliminaRecurso(this.listaObjetos[i][this.id]);
		};

		textoHtml += "<th><button onclick=' comparador.eliminaRecurso(\""+this.listaObjetos[i][this.id]+"\");'";

		textoHtml += "'>X</button><p>"+this.listaObjetos[i][titulos]+"</p></th>";
	
	*/



	}
	return textoHtml += "</tr></thead>";
}



/*
Comparador.prototype.pintaBotonEliminar = function(idValor){
	var textoHtml = "";

//<button id="pkm">PKM</button>
	textoHtml = "<button id='"+key+"'>X</button>";

	return textoHtml;
}*/


Comparador.prototype.pintaArray = function(key){

	var textoHtml = "";
	var arrayValores = new Array();
	//var arrayPintar = this.listaObjetos[0][key];

	//var listaKeysArrays = this.arrayKeysOrdenPintado;
	//this.listaObjetos


	textoHtml += "<tr><td colspan="+this.listaObjetos.length+1+" class='tituloArray'>"+key+"</td></tr>";

	for (var i = 0; i < this.listaObjetos.length; i++) {
		for (var j = 0; j < this.listaObjetos[i][key].length; j++) {
			if ((arrayValores.indexOf(this.listaObjetos[i][key][j])) === -1 ){
				arrayValores.push(this.listaObjetos[i][key][j]);
				textoHtml += "<tr>";
				textoHtml += "<td class='titulosPropiedades'>"+this.listaObjetos[i][key][j]+"</td>";
				var comprobadorValores = this.comprobadorValor(key, this.listaObjetos[i][key][j]);
				for (var g = 0; g < comprobadorValores.length; g++) {
					textoHtml += "<td>"+this.pintarValorOX(comprobadorValores[g])+"</td>";
				}
				textoHtml += "</tr>";
			}
		}
	}



	return textoHtml;


}



Comparador.prototype.pintaOtros = function(key){

	var textoHtml = "";

	textoHtml += "<tr><td class='titulosPropiedades otrosTitulos'>"+key+"</td>";
	if(typeof this.listaObjetos[0][key] === typeof true){
		for (var i = 0;  i < this.listaObjetos.length ; i++) {
			textoHtml += "<td>"+ this.pintarValorOXV2(this.listaObjetos[i][key]) +"</td>";
		}
	}else{
		for (var i = 0;  i < this.listaObjetos.length ; i++) {
			textoHtml += "<td>"+ this.listaObjetos[i][key] +"</td>";
		}
	}
	textoHtml += "</tr>";
	return textoHtml;

}






Comparador.prototype.pinta = function(){
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
		//return "O";
		return "<span class='valorTrue glyphicons glyphicons-tick'></span>";
	}
	//return "X";
	return " ";
}


Comparador.prototype.pintarValorOXV2 = function(valor){
	if (valor) {
		//return "O";
		return "Gratuit";
	}
	//return "X";
	return "No Gratuit";
}





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






/*eliminaRecurso:
Este metodo elimina el objeto del array usando el valor de la id.
*/

Comparador.prototype.eliminaRecurso = function(keyValor){

	for (var i = 0; i < this.listaObjetos.length; i++) {
		if(this.listaObjetos[i][this.id] === keyValor){
			this.listaObjetos.splice(i, 1);
			this.escribirCookie(this.nombreCookie,this.listaObjetos);
			//this.pintarTabla(this.idHtml);
		}
	}
}






