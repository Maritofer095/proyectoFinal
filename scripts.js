const ACCESS_TOKEN =
  "ya29.a0Aa4xrXNfjweIeYJJyOWzYgwOSYpu76prRfq2vjo2OlsMUiASLp89uBuYAEpwV5174hpzqJiiL_i5Uol4ER4r0Y86NtlykKGKo1KWOC71GXrRQh2Zu3ktiUJDbFqQOCo5CD6JSTqqXoI9X_P7PPGgzeu5Z65vaCgYKATASARISFQEjDvL9fNM_xczERFoNIm53cBRwoA0163";
 
const SHEET_ID = '1sVF8UEMNOdKV54t87seqHr39pDROjmuqlU2yfkO7dPE';


document.getElementById('fecha').valueAsDate = new Date();

const cards = document.querySelectorAll(".cartas");
const animacionPoint = 150;
const windowHeight = window.innerHeight;
//var str = text.innerHTML;
const animacion = ["fade-left","fade-right","fade-top","fade-bottom"];


function scrollAnimation(){
  cards.forEach(cartas => {
    cardTop = cartas.getBoundingClientRect().top;
    if(cardTop < windowHeight - animacionPoint){
      cartas.classList.add(animacion[0]);
    }else{
      cartas.classList.remove(animacion[0]);
    }
  })

} 
scrollAnimation();

window.addEventListener("scroll",scrollAnimation);



function onRegistrarGasto() {

 
  const nivel = document.getElementById('nivel').value;
  const nombreAlumno = document.getElementById('nombreAlumno').value;
  const nombrePadre = document.getElementById('nombrePadre').value;
  const fecha = document.getElementById('fecha').value;
  const nuemero = document.getElementById('numero').value;
  
 
  let data = {};
  
  let values = [];
  
  let fila = [nivel, nombreAlumno, nombrePadre, fecha, numero];

  values.push(fila);
  
 
  data.range = "hojaGastos";
  
  data.majorDimension = "ROWS";
  data.values = values;


  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaGastos:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(data)
    }
  ).then(function (response) {
    response.json().then(function (data) {
    
      alert("Su datos han sido procesado con éxito");
    });
  });

  
 
  document.getElementById('nombreAlumno').value = "";
  document.getElementById('nombrePadre').value = "";
  document.getElementById('fecha').valueAsDate = new Date();
  document.getElementById('numero').value = "";

};