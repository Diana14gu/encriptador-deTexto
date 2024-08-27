const textArea = document.querySelector(".text_in");
const imgResult = document.querySelector(".resultado_img");
const loaderC = document.querySelector(".loader");
const resultTitulo = document.querySelector(".resultado_titulo");
const resultTexto = document.querySelector(".resultado_nota");

const btn_encriptar = document.querySelector(".btn_blue");
const btn_Desencriptar = document.querySelector(".btn_white");
const btn_copiar = document.querySelector(".btn_copy");

///// ------------------------------------------------------------- //////


//reglas para cambio en las vocales
const llaves =[ ["e", "enter"], ["a","ai"], ["i","imes"], ["o","ober"], ["u", "ufat"] ];

// Funcion Encriptar
function encriptar(mensaje){
    let mensajeEncriptado = "";  //Inicializar 
    for(let i=0; i<mensaje.length; i++){
        let letra = mensaje[i]; 
        let encriptada = letra;
        for(let j=0; j<llaves.length; j++){
            if(letra==llaves[j][0]){
                encriptada = llaves[j][1]; // Remplazar
                break;
            }
        }
        mensajeEncriptado += encriptada; // Concatenar Datos
    }
    return mensajeEncriptado;
};

// Funcion Desencriptar
function desencriptar(mensaje){
    let mensajeDesencriptado = mensaje;    
    let reglas = { "ai": "a", "enter": "e", "imes": "i", "ober": "o", "ufat": "u" }; //reglas para cambio en las vocales
    for (let clave in reglas) {
        let valor = reglas[clave];
        mensajeDesencriptado = mensajeDesencriptado.split(clave).join(valor);
    }
    return mensajeDesencriptado;
};

// TextArea - Captura de Datos
textArea.addEventListener("input", (e) =>{
    imgResult.style.display = "none"; // Img Result (monito) Ocultar
    loaderC.style.display = "block"; // Animacion carga - Mostrar
    resultTitulo.textContent = "Capturando Mensaje"; // Actualizar Mensaje principal en Resultados
    resultTexto.textContent = ""; // Actualizar Resultado
    btn_copiar.style.display = "none"; // Ocultar Btn Copiar
});

// Boton - Encriptar - Event Click 
btn_encriptar.addEventListener("click", (e) =>{
    e.preventDefault(); // Evitar eventos defaults
    imgResult.style.display = "block"; // Img Result (monito) Mostrar
    loaderC.style.display = "none"; // Animacion carga - Ocultar
    let mensaje = textArea.value.toLowerCase(); // Convertir a minusculas
    let mensajeEncriptado = encriptar(mensaje);
    resultTexto.textContent = mensajeEncriptado; // Actualizar Resultado
    resultTitulo.textContent = "Mensaje Encriptado"; // Actualizar Mensaje principal en Resultados
    btn_copiar.style.display = "block";
});

// Boton - Desencriptar - Event Click 
btn_Desencriptar.addEventListener("click", (e) =>{
    e.preventDefault(); // Evitar eventos defaults
    imgResult.style.display = "block"; // Img Result (monito) Mostrar
    loaderC.style.display = "none"; // Animacion carga - Ocultar
    btn_copiar.style.display = "block"; // Mostrar Btn Copiar
    let mensaje = textArea.value.toLowerCase(); // Convertir a minusculas
    let mensajeDesencriptado = desencriptar(mensaje);
    resultTexto.textContent = mensajeDesencriptado; // Actualizar Resultado
    resultTitulo.textContent = "Mensaje Desencriptado"; // Actualizar Mensaje principal en Resultados
});

// Boton - Copy - Event Click 
btn_copiar.addEventListener("click", (e) =>{
    let textoCopiado = resultTexto.textContent; // Copiar Texto en Area de Resultado
        navigator.clipboard.writeText(textoCopiado).then(()=>{
        btn_copiar.style.display = "none"; // Ocultar Btn Copiar
        imgResult.style.display = "block"; // Img Result (monito) Mostrar
        loaderC.style.display = "none"; // Animacion carga - Ocultar
        resultTitulo.textContent = "Mensaje copiado"; // Actualizar Mensaje principal en Resultados
        resultTexto.textContent = ""; // Actualizar Resultado
        textArea.value = textoCopiado; // Mover datos copiados al Area de Input
    });

})
