const d = document;

const textArea = d.querySelector(".text_in");
const imgResult = d.querySelector(".resultado_img");
const loaderC = d.querySelector(".loader");
const resultTitulo = d.querySelector(".resultado_titulo");
const resultTexto = d.querySelector(".resultado_nota");

const btn_encriptar = d.querySelector(".btn_blue");
const btn_Desencriptar = d.querySelector(".btn_white");
const btn_copiar = d.querySelector(".btn_copy");

const llaves =[
    ["e", "enter"], ["a","ai"], ["i","imes"], ["o","ober"], ["u", "ufat"]
];


function encriptar(mensaje){
    let mensajeEncriptado = "";

    for(let i=0; i<mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;

        for(let j=0; j<llaves.length; j++){
            if(letra==llaves[j][0]){
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

function desencriptar(mensaje){
   let mensajeDesencriptado = mensaje;

    for(let i=0; i <llaves.length; i++){ //llaves.length
        let auxRegex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(auxRegex, llaves[i][0]);  
    }
    return mensajeDesencriptado;
};

textArea.addEventListener("input", (e) =>{
    imgResult.style.display = "none";
    loaderC.style.display = "block";
    resultTitulo.textContent = "Capturando Mensaje";
    resultTexto.textContent = "";
});

btn_encriptar.addEventListener("click", (e) =>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptar(mensaje);
    resultTexto.textContent = mensajeEncriptado;
    resultTitulo.textContent = "Mensaje Encriptado";
    btn_copiar.style.display = "block";
});

btn_Desencriptar.addEventListener("click", (e) =>{
    e.preventDefault();
    btn_copiar.style.display = "block";
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptar(mensaje);
    resultTexto.textContent = mensajeDesencriptado;
    resultTitulo.textContent = "Mensaje Desencriptado";

});


btn_copiar.addEventListener("click", (e) =>{
    let textoCopiado = resultTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=>{
        btn_copiar.style.display = "none";
        imgResult.style.display = "block";
        loaderC.style.display = "none";
        resultTitulo.textContent = "Mensaje copiado";
        resultTexto.textContent = "";
        textArea.value = textoCopiado;

    });

})