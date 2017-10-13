





function Comparador(){
	this.nombreCookie = "compararRecursos";


	if (this.leerCookie(this.nombreCookie) == null) {
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
		if (this.listaObjetos[i].id == objeto.id) {
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

	var textoHtml = "<table><thead> <tr>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
			textoHtml += "<th>"+this.listaObjetos[i].nom+"</th>";
	}
	textoHtml += "</tr></thead></table>";

/*
	var terminar = false;
	while(!terminar){

	

	}

*/




	document.getElementById(id).innerhtml = textoHtml;


}












