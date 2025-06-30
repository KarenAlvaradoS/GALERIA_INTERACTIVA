const galeria = document.getElementById("galeria");
const btnAgregar = document.getElementById("btnAgregar");
const btnEliminar = document.getElementById("btnEliminar");
const urlInput = document.getElementById("urlImagen");
const inputArchivo = document.getElementById("inputArchivo");


// Crear span para mostrar nombre archivo con estilo
const nombreArchivo = document.getElementById("nombreArchivo");
nombreArchivo.style.color = "red";
nombreArchivo.style.fontWeight = "bold";
nombreArchivo.style.marginLeft = "10px";
nombreArchivo.textContent = "Ningún archivo seleccionado";
inputArchivo.parentNode.insertBefore(nombreArchivo, inputArchivo.nextSibling);

let imagenSeleccionada = null;

// Función para crear imagen con evento de selección
function crearImagen(src) {
  const img = document.createElement("img");
  img.src = src;
  img.style.cursor = "pointer";

  img.addEventListener("click", () => {
    if (imagenSeleccionada) {
      imagenSeleccionada.classList.remove("seleccionada");
    }
    imagenSeleccionada = img;
    img.classList.add("seleccionada");
  });

  return img;
}

// Agregar imagen desde URL
btnAgregar.addEventListener("click", () => {
  const url = urlInput.value.trim();
  if (url === "") {
    alert("Por favor ingresa una URL de imagen.");
    return;
  }
  const img = crearImagen(url);
  galeria.appendChild(img);
  urlInput.value = "";
});

// Agregar imagen desde archivo local
inputArchivo.addEventListener("change", () => {
  if (inputArchivo.files.length > 0) {
    nombreArchivo.textContent = inputArchivo.files[0].name;
    const lector = new FileReader();
    lector.onload = function (e) {
      const img = crearImagen(e.target.result);
      galeria.appendChild(img);
    };
    lector.readAsDataURL(inputArchivo.files[0]);
  } else {
    nombreArchivo.textContent = "Ningún archivo seleccionado";
  }
});

// Eliminar imagen seleccionada
btnEliminar.addEventListener("click", () => {
  if (imagenSeleccionada) {
    galeria.removeChild(imagenSeleccionada);
    imagenSeleccionada = null;
  } else {
    alert("Selecciona una imagen para eliminarla.");
  }
});

