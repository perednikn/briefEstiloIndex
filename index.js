//Selector del div donde mostrará los resultados
const ficha = $("#producto");

//Calcula el porcentaje de descuento
const porcentajeDescuento = (original, final) => {
    let montoDto = original - final;
    let porcentajeDto = parseInt((montoDto * 100) / original);
    return porcentajeDto;
}

//Agrega punto al precio
const precioPunto = (precio) => {
    let precioPunto = precio.toString()
    precioPunto = (precioPunto).slice(0, 1) + "." + (precioPunto).slice(1);
    return precioPunto;
}

//Consulta a la API del producto 1, muestra resultado en pantalla
function productoUno(){
    let urlProdUno = "https://api.mercadolibre.com/items/MLA901055568";
    $.getJSON(urlProdUno, (response, status) =>{
        if(status === "success"){
            //Almacena datos a utilizar en la ficha
            let foto = response.thumbnail;
            let precio = response.price; 
            let cuotas = response.accepts_mercadopago; 
            let titulo = response.title;
            let precioPantalla = precioPunto(precio);
            
            //Evalúa si la propiedad accepts_mercadopago es true, para determinar si acepta cuotas y calcula el valor de las mismas
            if (cuotas === true){
                let valorCuota = (precio/6).toFixed(2);
                var muestraCuotas = `6x $ ${valorCuota} sin interés`
            }
            //Maqueta Ficha producto
            let fichaContenido = 
            `<div class="ficha">
                <img src="${foto}" alt="foto producto" class="fotoFicha">
                <p class="precio">$ ${precioPantalla}</p>
                <p class="cuotasUno">${muestraCuotas}</p>
                <p class="titulo"> ${titulo}</p>
            </div>`
            //Inserta ficha en DOM
            ficha.html(fichaContenido);
        }
    })
}

//Consulta a la API del producto 2, muestra resultado en pantalla
function productoDos(){
    let urlProdDos = "https://api.mercadolibre.com/items/MLA646715969"
    $.getJSON(urlProdDos, (response, status) =>{
        if(status === "success"){
            //Almacena datos a utilizar en la ficha
            let fotoDos = response.thumbnail;
            let precioOriginal = response.original_price; 
            let precioDto = response.price;
            let envio = response.shipping.free_shipping;
            let titulo = response.title;
            let envioGratis = ""
            
            //Evalúa si tiene envío Gratis:
            if (envio) envioGratis = `<i class="material-icons iconEnvio">local_shipping</i>`;
            
            //Calcula porcentaje descuento
            let porcentajeDesc = porcentajeDescuento(precioOriginal, precioDto);
            
            //Agrega punto al precio que muestra en pantalla
            precioOriginal = precioPunto(precioOriginal);
            precioDto = precioPunto(precioDto);

            //Maqueta ficha producto
            let fichaContenido = 
            `<div class="ficha">
                <img src="${fotoDos}" alt="foto producto" class="fotoFicha">
                <div class="separador"> ${envioGratis}</div>
                <p class="precioAnt">$${precioOriginal}</p>
                <span class="precio">$${precioDto}</span> <span class="descuento">${porcentajeDesc} % OFF</span>
                <p class="titulo"> ${titulo}</p>
            </div>`
            //Inserta ficha en DOM
            ficha.html(fichaContenido);

        }
    })
}

//Consulta a la API del producto 3, muestra resultado en pantalla
const productoTres = () => {
    let urlProdTres = "https://api.mercadolibre.com/items/MLA906258237"
    $.getJSON(urlProdTres, (response, status) =>{
        if(status === "success"){
            let fotoTres = response.thumbnail;
            let precioOriginal = response.original_price; 
            let precioDto = response.price;
            let titulo = response.title;
            let envioGratis = response.shipping.free_shipping;
            let ciudadVendedor = response.seller_address.state.name;
            
            //Analiza cantidad de variantes publicadas
            let variantesDisp  = response.variations;
            let coloresCant = variantesDisp.length;

            //Evalúa cantidad vendida para saber si es más vendido
            //Criterio para catalogar 'Más vendido': Stock inicial mayor o igual a 1000 con 40% del stock vendido
            let masVendido = ""
            let stockOriginal = response.initial_quantity;
            let stockVendido = response.sold_quantity;

            if (stockOriginal >= 1000){
                let porcentajeVenta = (stockVendido / stockOriginal) * 100;
                if (porcentajeVenta >= 40){
                   masVendido = "MÁS VENDIDO";
                 }}
            
            //Calcula porcentaje descuento
            let porcentajeDesc = porcentajeDescuento(precioOriginal, precioDto);

            //Agrega punto al precio que muestra en pantalla
            precioOriginal = precioOriginal.toString()
            precioDto = precioDto.toString()
            precioOriginal = precioOriginal.slice(0, 2) + "." + precioOriginal.slice(2);
            precioDto =  precioDto.slice(0, 2) + "." + precioDto.slice(2);
             
            //Si ofrece envío gratis, evalúa ciudad comprador para corroborar que llegue en el día
            if (envioGratis) {
                //Simulo que la ciudad es la misma a fines del Brief
                let ciudadComprador = "Capital Federal";
                if (ciudadVendedor === ciudadComprador){
                    envioGratis = "Llega gratis hoy"
                }
            }

            //Maqueta ficha producto
            let fichaContenido = 
            `<div class="ficha">
                <img src="${fotoTres}" alt="foto producto" class="fotoFicha">
                <div class="separadorColores"> <span class="variantes">${coloresCant} colores</span></div>
            
                <p class="masVendido">${masVendido}</p>
                <p class="precioAnt">$ ${precioOriginal}</p>
                <span class="precio">$ ${precioDto} <span class="descuento"> ${porcentajeDesc} % OFF</span></span>
                <p class="gratisHoy"> ${envioGratis}</p>
                <p class="titulo"> ${titulo}</p>
            </div>`
            //Inserta ficha en DOM
            ficha.html(fichaContenido);
        }})

}