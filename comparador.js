





function Comparador(){

	if (leerCookie("recursosComparar") == null) {
		var listaObjetos = new Array();
	}else{
		var listaObjetos = leerCookie("recursosComparar");
	}




}

Comparador.prototype.addRecurso = function(objeto){


	if (!this.comprobarRecursoExiste(objeto)) {
		listaObjetos.push(objeto);
	}

}

Comparador.prototype.comprobarRecursoExiste = function(objeto){

	for (var i =0; i < this.listaObjetos.length ;  i++) {
		if (this.listaObjetos.id === objeto.id) {
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

Comparador.prototype.escribirCookie = function(objeto) {

	document.cookie = "recursosComparar="+this.codificarObjecto(objeto);

}


Comparador.prototype.codificarObjecto = function(objeto){
	return JSON.stringify(objeto);
} 


Comparador.prototype.descodificarObjecto = function(objeto){
	return JSON.parse(objeto);
} 







Comparador.prototype.pintarTabla = function(id){

	//var textoHtml = "";

	var textoHtml = "<thead> <tr>";
	for (var i = 0; this.listaObjetos.length; i++) {
			textoHtml += "<th>"+this.listaObjetos[i].nom+"</th>";
	}
	textoHtml += "</tr></thead>";

/*
	var terminar = false;
	while(!terminar){

	

	}

*/




	document.getElementById(id).innerhtml = textoHtml;


}












