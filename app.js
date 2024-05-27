function generarCURP() { // Función para generar el CURP
    
    // Obtener valores de los campos del formulario
    var nombres = document.getElementById("nombres").value; // Obtener nombres
    var apellidoPa = document.getElementById("apellidoPa").value; // Obtener apellido paterno
    var apellidoMa = document.getElementById("apellidoMa").value; // Obtener apellido materno
    var dia = parseInt(document.getElementById("dia").value); // Obtener día de nacimiento
    var mes = parseInt(document.getElementById("mes").value); // Obtener mes de nacimiento
    var año = parseInt(document.getElementById("año").value); // Obtener año de nacimiento
    var sexo = document.getElementById("sexo").value.toUpperCase(); // Obtener sexo y convertir a mayúsculas
    var entidadNacimiento = document.getElementById("entidadNacimiento").value.toUpperCase(); // Obtener entidad de nacimiento y convertir a mayúsculas
    var curp = ''; // Variable para almacenar el CURP generado
    
    curp += apellidoPa.charAt(0); // Agregar la primera letra del apellido paterno al CURP
    
    var primerVocal = ''; // Variable para almacenar la primera vocal encontrada
    
    // Bucle para encontrar la primera vocal en el apellido paterno
    for (var j = 1; j < apellidoPa.length; j++) {
        var letra = apellidoPa.charAt(j).toLowerCase(); // Obtener la letra actual del apellido paterno en minúscula
        if ('aeiou'.includes(letra)) { // Si la letra es una vocal
            primerVocal = letra; // Almacenar la vocal
            break; // Salir del bucle
        }
    }


    // Se añade la primera vocal del apellido al CURP.
curp += primerVocal; 
// Se añade la primera letra del apellido materno al CURP.
curp += apellidoMa.charAt(0); 
// Se añade la primera letra del primer nombre al CURP.
curp += nombres.charAt(0); 


var fechaNacimiento = año.toString().substring(2); 
// Se convierte el año a cadena de texto y se toma solo los dos últimos dígitos.
// Por ejemplo, si el año es 1990, se tomará '90'.
if (mes < 10) {// Se verifica si el mes es menor que 10 para añadir un '0' al principio si es necesario.
    fechaNacimiento += '0' + mes.toString(); 
    // Si el mes es menor que 10, se agrega un '0' seguido del mes convertido a cadena de texto.
} else {
    fechaNacimiento += mes.toString(); 
    // Si el mes es mayor o igual a 10, se agrega solo el mes convertido a cadena de texto.
}
// Se verifica si el día es menor que 10 para añadir un '0' al principio si es necesario.
if (dia < 10) {
    fechaNacimiento += '0' + dia.toString(); 
    // Si el día es menor que 10, se agrega un '0' seguido del día convertido a cadena de texto.
} else {
    fechaNacimiento += dia.toString(); 
    // Si el día es mayor o igual a 10, se agrega solo el día convertido a cadena de texto.
}


// Se añade la fecha de nacimiento al CURP.
curp += fechaNacimiento; 
// Se añade el sexo al CURP.
curp += sexo;
 

    switch (entidadNacimiento) { // Inicia un bloque de código que evalúa la variable 'entidadNacimiento'
        case 'AS':
        case 'BC':
        case 'BS':
        case 'CC':
        case 'CS':
        case 'CH':
        case 'CL':
        case 'CM':
        case 'DG':
        case 'GT':
        case 'GR':
        case 'HG':
        case 'JC':
        case 'MC':
        case 'MN':
        case 'MS':
        case 'NT':
        case 'NL':
        case 'OC':
        case 'PL':
        case 'QT':
        case 'QR':
        case 'SP':
        case 'SL':
        case 'SR':
        case 'TC':
        case 'TS':
        case 'TL':
        case 'VZ':
        case 'YN':
        case 'ZS':
            curp += entidadNacimiento; // Agrega el valor de 'entidadNacimiento' a la variable 'curp'
        break; // Termina el caso actual y sale del bloque switch
    case 'CDMX': // Si el valor de 'entidadNacimiento' es 'CDMX'
        curp += 'DF'; // Agrega 'DF' a la variable 'curp' (antiguo nombre para Ciudad de México)
        break; // Termina el caso actual y sale del bloque switch
    default: // Si el valor de 'entidadNacimiento' no coincide con ningún caso anterior
        curp += 'XX'; // Agrega 'XX' a la variable 'curp' (como un valor predeterminado)
}

    var homoclave = ''; // Se declara una variable homoclave inicializada como una cadena vacía.
var caracteresHomoclave = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Se define una cadena de caracteres que contiene dígitos numéricos y letras mayúsculas, que se utilizará para generar la homoclave.
for (var i = 0; i < 5; i++) { // Se inicia un bucle que se ejecutará 5 veces.
    var indice = Math.floor(Math.random() * caracteresHomoclave.length); // Se genera un índice aleatorio dentro del rango de la longitud de la cadena de caracteresHomoclave.
    homoclave += caracteresHomoclave.charAt(indice); // Se agrega el carácter correspondiente al índice generado en la cadena homoclave.
}

curp += homoclave; // Se agrega la homoclave generada a la variable curp.


    function censurarPalabrasInapropiadas(curp) { // Función para censurar palabras inapropiadas en una CURP.
        var palabrasInapropiadas = ['BUEI','BUEY','CACA','CACO','CAGA','CAGO','CAKA','CAKO','COGE','COJA','COJE','COJI','COJO','CULO','FETO','GUEY','JOTO','KACA','KACO','KAGA','KAGO','KOGE','KOJO','KAKA','KULO','MAME','MAMO','MEAR','MEAS','MEON','MION','MOCO','MULA','PEDA','PEDO','PENE','PUTA','PUTO','QULO','RATA']; // Array que contiene palabras inapropiadas.
        
        palabrasInapropiadas.forEach(function(palabra) { // Iterar sobre cada palabra inapropiada.
            var regex = new RegExp(palabra, 'gi'); // Crear una expresión regular para la palabra actual, 'gi' para que la búsqueda sea global e insensible a mayúsculas y minúsculas.
            curp = curp.replace(regex, function(match) { // Reemplazar cada coincidencia de la palabra inapropiada en la CURP.
                return match.substring(0, 2) + 'X' + match.substring(3); // Reemplazar la palabra por "XX" + la letra en la posición 3.
            });
        });
        
        return curp; // Devolver la CURP con palabras inapropiadas censuradas.
    }
    
    
    
    // Llama a la función 'censurarPalabrasInapropiadas' pasando el valor de 'curp' como argumento y asigna el resultado a 'curp'.
curp = censurarPalabrasInapropiadas(curp);

// Actualiza el elemento del documento HTML con el id "curp" con el texto "Tu CURP es: " seguido del valor de 'curp' convertido a mayúsculas.
document.getElementById("curp").innerText = "Tu CURP es: " + curp.toUpperCase(); 

}