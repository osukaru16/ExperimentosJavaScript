
/*
Resumen de funcionamiento:


En Comparador:

Comparador(): Usa el metodo this.leerCookie(nombre) para mirar si hay guardado algo en las cookies y lo guarda en la array this.listaObjetos.
			  Usa el atributo this.nombreCookie para saber el nombre de la cookie que tiene que buscar.


Atributos:
	this.nombreCookie: Contiene el nombre de la cookie.

	this.arrayKeysOrdenPintado: Contiene una array que hay que pones las keys que tiene el objeto y el orden determina la prioridad de pintado. 

	this.titulo: Contiene la key que has pusto para que el valor sea el titulo.

	this.id: Contiene la key que has pusto para que el valor sea la clave primaria del objeto.

	this.listaObjetos: Array donde se guardan los objetos que estan en las cookies o guardas tu.

	this.idHtml: Sirve para guardar el en nombre de la id del elemento html que se especifica en el metodo this.pintaTabla(idHtml) 
				 para de esta forma poder usarlo en otros sitios.





Metodos:
	this.addRecurso(Obj): 
						Con addRecurso le pasas el objeto que quieres poner en el array. 
						Usa el metodo this.comprobarRecursoExiste(objeto, key) para comprobar si objetos esta o no en el array.
						Usa el metodo this.escribirCookie(nombreCookie, objeto) para guardar los cambios en la cookie.
						Usa el atributo this.id para determinar la clave primaria.
						Usa el atributo this.listaObjetos para escribir el array en la cookie.
						Usa el atributo this.nombreCookie para saber el nombre de la cookie.
						Devuelve true si es ha hecho todo correctemente y false en caso que ya dicho objeto ya esta guardado.


	this.comprobarRecursoExiste(objeto, key): 
						Con comprobarRecursoExiste compruebas si el objeto que le pasas esta en el array usando la key que le pasas.
						Usa el atributo this.listaObjetos para comprobar si ese objeto ya esta o no.
						Devuelve true en caso que el objeto se encuetre y false si no esta en el array.


	this.leerCookie(nombre):
						Con leerCookie usando el nombre de la cookie mira el contenido.
						Usa el metodo this.descodificarObjecto(objeto) para que lo detecte como un json y no como texto.
						Devuelve el contenido de la cookie en caso de encontrar algo y null si no lo encuenta nada.


	this.escribirCookie(nombreCookie, objeto):
	 					Con escribirCookie creas la cookie con el nombre y guardas la informacion del objeto.
	 					Usa el metodo this.codificarObjecto(objeto) para poder recuperar el objeto guardado sin problemas.




	this.pintaTabla(idHtml): Nota: hay que eliminar el onclick='addRecurso();'  
						Con pintaTabla pintas la tabla en el elemento html con el id que le pasas y si hay menos de 4 recursos 
						crea el boton para poder poner mas recursos.
						Usa el metodo this.alturaBoton() para colocar el boton de nuevos recursos.
						Usa el metodo this.eventoAdd() para dar la funcion al boton recursos cuando lo clicas.
						Usa el metodo this.eventoEliminar() para dar la funcion al boton eliminar recurso.
						Usa el metodo this.pinta() para poder pintar la tabla.


	this.alturaBoton():
						Con alturaBoton determina las dimensones del boton de nuevos recursos que se 
						crea en this.pintaTabla(idHtml) y le la el mismo alto que el div con la clase contenedorTablaBoton.



	this.eventoAdd():
						Con eventoAdd le damos el evento que hace al pulsar el boton con la clase addRecurso. 
						Por ahora solo tiene un alert();




	this.eventoEliminar():
						Con eventoEliminar le damos el evento que hace al pulsar el boton con la clase eliminaRecurso.
						Coje la id del boton que es la clave primaria del objeto.
						Usa el metodo this.eliminaRecurso(keyValor) para que elimine el objeto del array.
						Usa el metodo this.pintaTabla(idHtml) para que vuelva a pinta la tabla.
						Usa el atributo this.idHtml para poder usar el this.pintaTabla(idHtml).


	this.pintarTitulos(titulos):
						Con pintarTitulos crea los thead de la tabla, pone los titulos de los objetos, 
						tambien se crea el boton con la clase eliminaRecurso y como id le pone la clave primaria del objeto. 
						Usa el atributo this.titulo para saber en que key contiene el nombre del titulo.
						


	this.pintaArray(key): Nota: hay que controlar que las keys que pasas son arrays.
						Con pintaArray usa la key que le pasas para pintar el titulo del array y despues el contenido.
						Usa el metodo this.comprobadorValor(lugar, valor) para poder saber si en la misma key comparten contenidos.
						Usa el metodo this.pintarValorOX(valor) para que te ponga el tik encaso de el contenido es true o nada en caso de false.
						Usa el atributo this.listaObjetos para buscar en los objetos guardados.


	this.pintaOtros(key):
						Con pintaOtros se en carga de pintar a los elemontos que no son arrays. Usa la key para pintar 
						el titulo del elemento y el contenido. Realiza distincion si la key que le pasas es boobleano o no.
						Usa el metodo this.pintarValorOXV2(valor) para los elementos booleanos que retorna un Gratuit en caso de true y No Gratuit en caso de false.
						Usa el atributo this.listaObjetos para buscar en los objetos guardados.


	this.pinta():
						Con pinta se encarga de crear la tabla y cumplir los requisitos para poder llamar a los otros metodos para que pinten.
						Usa el metodo this.pintarTitulos(titulos) para pode hacer el thead y poner los titulos.
						Usa el metodo this.pintaArray(key) para pintar los elementos arrays.
						Usa el metodo this.pintaOtros(key) para pintar los que no son arrays.
						Usa el atributo this.listaObjetos para buscar en los objetos guardados.
						Usa el atributo this.arrayKeysOrdenPintado para seguir el orden de pintado.
						Usa el atributo this.titulo para saber que key usar para sacar los titulos.



	this.comprobadorValor(lugar, valor):
						Con comprobadorValor se encarga de comprobar si el valor esta en el lugar que quieres buscar.
						Devuelve un array booleana.
						Usa el atributo this.listaObjetos para buscar en los objetos guardados.



	this.pintarValorOX(valor):
						Con pintarValorOX te da un tik si el valor el true y " " en si es false.

	this.pintarValorOXV2(valor):
						Con pintarValorOXV2 te da un "Gratuit" si el valor el true y "No Gratuit" en si es false.




	this.eliminarRecurso(objeto, key): Nota: este metodo no es usa, pero esta en caso de necesidad.
						Con eliminarRecurso elimina un objeto si le pasas el objeto en cuestion y la key para identificarlo.
						Usa el metodo this.escribirCookie(nombreCookie, objeto) para guardar los cambios realizados en this.listaObjetos.
						Usa el atributo this.listaObjetos es donde hace las modificaciones.
						Usa el atributo this.nombreCookie para poder reescribir la misma cookie.



	this.eliminarRecurso(key, keyValor): Nota: este metodo no es usa, pero esta en caso de necesidad.
						Con eliminarRecursoV2 elimina un objeto si le pasa la key para intentificarlo y 
						el keyValor es el valor que tiene que tener en esa key.
						Usa el metodo this.escribirCookie(nombreCookie, objeto) para guardar los cambios realizados en this.listaObjetos.
						Usa el atributo this.listaObjetos es donde hace las modificaciones.
						Usa el atributo this.nombreCookie para poder reescribir la misma cookie.




	this.eliminaRecurso(keyValor):
						Con eliminaRecurso solo hace falta el keyValor para saber la clave primaria.
						Usa el metodo this.escribirCookie(nombreCookie, objeto) para guardar los cambios realizados en this.listaObjetos.
						Usa el atributo this.listaObjetos es donde hace las modificaciones.
						Usa el atributo this.nombreCookie para poder reescribir la misma cookie.
						Usa el atributo this.id para saber que key es el de la clave primaria.



*/










function Comparador(){
	this.nombreCookie = "compararRecursos";
	this.arrayKeysOrdenPintado = new Array("tematica","territori","tipus", "gratuit");
	this.titulo = "nom";
	this.id = "id";
	//this.arrayKeysOrdenPintado = new Array("gratuit");
	this.idHtml="";
	

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

Comparador.prototype.comprobarRecursoExiste = function(objeto, key){
	
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





/*Nota la id que pide el metodo pintaTabla es la idHtml
de la etiqueta html*/

Comparador.prototype.pintaTabla = function(idHtml){
	var textoHtmlDiv ="<div class='contenedorTablaBoton'>";
	var textoHtml ="";
	this.idHtml = idHtml;
	




	if (this.listaObjetos.length === 0) {
		textoHtml +="<div id='contenedorBotonAgregar'><button class='addRecurso primerAddRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button>";
		textoHtml +="<button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button>";
		textoHtml +="<button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button>";
		textoHtml +="<button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button></div>";
		textoHtml +="</div>";

		//alert("Ahora");
		document.getElementById(idHtml).innerHTML = textoHtmlDiv+this.pinta()+textoHtml;
		//document.getElementById(idHtml).innerHTML = this.pinta()+textoHtml;
		this.eventoEliminar();
		this.eventoAdd();
		this.alturaBoton();
	}

	else if (this.listaObjetos.length === 1) {
		textoHtml +="<div id='contenedorBotonAgregar'><button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button>";
		textoHtml +="<button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button>";
		textoHtml +="<button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button></div>";
		textoHtml +="</div>";

		//alert("Ahora");
		document.getElementById(idHtml).innerHTML = textoHtmlDiv+this.pinta()+textoHtml;
		//document.getElementById(idHtml).innerHTML = this.pinta()+textoHtml;
		this.eventoEliminar();
		this.eventoAdd();
		this.alturaBoton();
	}
	
	else if (this.listaObjetos.length === 2) {

		textoHtml +="<div id='contenedorBotonAgregar'><button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button>";
		textoHtml +="<button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button></div>";
		textoHtml +="</div>";

		//alert("Ahora");
		document.getElementById(idHtml).innerHTML = textoHtmlDiv+this.pinta()+textoHtml;
		//document.getElementById(idHtml).innerHTML = this.pinta()+textoHtml;
		this.eventoEliminar();
		this.eventoAdd();
		this.alturaBoton();



	}

	else if (this.listaObjetos.length === 3) {
		textoHtml +="<div id='contenedorBotonAgregar'><button class='addRecurso' onclick='addRecurso();'> <span class='glyphicon glyphicon-plus-sign'></span> Nou recurs</button></div>";
		textoHtml +="</div>";

		//alert("Ahora");
		document.getElementById(idHtml).innerHTML = textoHtmlDiv+this.pinta()+textoHtml;
		//document.getElementById(idHtml).innerHTML = this.pinta()+textoHtml;
		this.eventoEliminar();
		this.eventoAdd();
		this.alturaBoton();
	}else{
		textoHtml +="</div>";
		document.getElementById(idHtml).innerHTML = textoHtmlDiv+this.pinta()+textoHtml;
		//document.getElementById(idHtml).innerHTML = this.pinta();
		this.eventoEliminar();

	}




}


Comparador.prototype.eventoAdd = function(){


	$('.addRecurso').on("click",function(){

		


		alert("Nyan");
	});

}



/*

alturaBoton: es para que la altura del div contenedorBotonAgregar igual 
a la altura del div tablaComparacion.
Nota: si encuentro una forma de hacerlo con los css esta forma se quitara.

*/


Comparador.prototype.alturaBoton = function(){


	//var nuevaAltura = $('#tablaComparacion').height();
	var nuevaAltura = $('.contenedorTablaBoton').height();

	$('#contenedorBotonAgregar').height(nuevaAltura);


}


/*
html = '<a class="boton" id="boton1" data-info="1"></a>';

jQuery('body').append(html);

jQuery('.boton').on("click",function(){
	var num = jQuery(this).data("info");
	...
});

*/

Comparador.prototype.eventoEliminar = function(){
	var that = this;

	$('.eliminaRecurso').on("click",function(){

		var id = $(this).attr("id");
		that.eliminaRecurso(id);
		//that.pintaTabla("tablaComparacion");
		that.pintaTabla(that.idHtml);

		


		
	});


}


Comparador.prototype.pintarTitulos = function(titulos){

	var textoHtml = "<thead><tr><td class='noPintar'></td>";
	for (var i = 0; i < this.listaObjetos.length; i++) {
		//id='"+this.listaObjetos[i][this.id]+"' //Fragmento quitado
		//textoHtml += "<th><button onclick='eliminaRecurso(\""+this.listaObjetos[i][this.id]+"\");' >X</button> <p>"+this.listaObjetos[i][titulos]+"</p></th>";
		

		textoHtml += "<th><button class='eliminaRecurso' id='"+this.listaObjetos[i][this.id]+"'>X</button> <p>"+this.listaObjetos[i][titulos]+"</p></th>";
		
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
	var longitudArray = this.listaObjetos.length+1;
	//var arrayPintar = this.listaObjetos[0][key];

	//var listaKeysArrays = this.arrayKeysOrdenPintado;
	//this.listaObjetos


	textoHtml += "<tr><td colspan="+longitudArray+" class='tituloArray'>"+key+"</td></tr>";

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

	//textoHtml += "<div class='contenedorTablaBoton'><table>";
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

	//textoHtml += "</div></table>";

	textoHtml += "</table>";


	return textoHtml;
}




/*

	comprobadorValor:
	comprueba si el valor(String) que se quiere esta en la array(lugar(Nombre del array)) que se quiere buscar
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

/*
this.pintarValorOX(valor):



*/

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
		}
	}
}






