





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












//Lugar______________________

	textoHtml += "<td>Territori</td>";
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


Comparador.prototype.getKeys = function(){	
	if (this.listaObjetos.length > 0) {
		var listaKeys =  Object.keys(this.listaObjetos[0]);
		return listaKeys;
	}else{
		return null;
	}
}

Comparador.prototype.buscaKeysArray = function(){

	

}





/*
Comparador.prototype.getNombres = function(){

	for (var i = 0; i < this.listaObjetos.length; i++) {
			alert(this.listaObjetos[i].nom);
	}


}
*/











