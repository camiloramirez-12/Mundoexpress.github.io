let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (let i = currentItem; i < currentItem + 4 && i < boxes.length; i++) {
        boxes[i].style.display = 'inline-block';
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// carrito
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.closest('.box');
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100" height="150px">
        </td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td><a href="#" class="borrar" data-id="${elemento.id}">X</a></td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.closest('.box').remove();
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}

function buscarProducto() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const productos = document.querySelectorAll('.box');

    productos.forEach(producto => {
        const titulo = producto.querySelector('h3').textContent.toLowerCase();
        if (titulo.includes(texto)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}


function buscarProducto() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const productos = document.querySelectorAll('.box');

    productos.forEach(producto => {
        const titulo = producto.querySelector('h3').textContent.toLowerCase();
        if (titulo.includes(texto)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const carrito = [];
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  const comprarBtn = document.getElementById('comprar-btn');

  if (botonesAgregar) {
    botonesAgregar.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.box');
        const titulo = producto.querySelector('h3').textContent;
        carrito.push(titulo);
        
      });
    });
  }

  if (comprarBtn) {
    comprarBtn.addEventListener('click', () => {
      if (carrito.length === 0) {
        
      } else {
        window.location.href = "login.html";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const carrito = [];
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  const carritoContainer = document.getElementById('carrito');
  const comprarBtn = document.getElementById('comprar-btn');

  function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    carrito.forEach((producto, i) => {
      const li = document.createElement('li');
      li.textContent = producto;
      lista.appendChild(li);
    });
  }

  if (botonesAgregar) {
    botonesAgregar.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.box');
        const titulo = producto.querySelector('h3').textContent;
        carrito.push(titulo);
        actualizarCarrito();
      });
    });
  }

  if (comprarBtn) {
    comprarBtn.addEventListener('click', () => {
      if (carrito.length === 0) {
        
      } else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.href = "login.html";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const carrito = [];
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  const lista = document.getElementById('lista-carrito');
  const vaciarBtn = document.getElementById('vaciar-btn');
  const nombreUsuario = localStorage.getItem('usuarioNombre');
  const usuarioLabel = document.getElementById('usuario-nombre');

  if (usuarioLabel && nombreUsuario) {
    usuarioLabel.textContent = "Hola, " + nombreUsuario;
  }

  function actualizarCarrito() {
    lista.innerHTML = '';
    carrito.forEach((producto, index) => {
      const li = document.createElement('li');
      const container = document.createElement('div');
      container.className = 'carrito-item';
      const img = document.createElement('img');
      img.src = producto.imagen;
      const span = document.createElement('span');
      span.textContent = producto.titulo;
      const eliminarBtn = document.createElement('button');
      eliminarBtn.className = 'eliminar-btn';
      eliminarBtn.innerHTML = '&times;';
      eliminarBtn.onclick = () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      };
      container.appendChild(img);
      container.appendChild(span);
      li.appendChild(container);
      li.appendChild(eliminarBtn);
      lista.appendChild(li);
    });
  }

  if (botonesAgregar) {
    botonesAgregar.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.box');
        const titulo = producto.querySelector('h3').textContent;
        const imagen = producto.querySelector('img').src;
        carrito.push({ titulo, imagen });
        actualizarCarrito();
      });
    });
  }

  if (vaciarBtn) {
    vaciarBtn.addEventListener('click', () => {
      carrito.length = 0;
      actualizarCarrito();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const carrito = [];
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  const lista = document.getElementById('lista-carrito');
  const vaciarBtn = document.getElementById('vaciar-btn');
  const pagarBtn = document.getElementById('pagar-btn');
  const nombreUsuario = localStorage.getItem('usuarioNombre');
  const usuarioLabel = document.getElementById('usuario-nombre');

  if (usuarioLabel && nombreUsuario) {
    usuarioLabel.textContent = "Hola, " + nombreUsuario;
  }

  function actualizarCarrito() {
    lista.innerHTML = '';
    carrito.forEach((producto, index) => {
      const li = document.createElement('li');
      const container = document.createElement('div');
      container.className = 'carrito-item';
      const img = document.createElement('img');
      img.src = producto.imagen;
      const span = document.createElement('span');
      span.textContent = producto.titulo;
      const eliminarBtn = document.createElement('button');
      eliminarBtn.className = 'eliminar-btn';
      eliminarBtn.innerHTML = '&times;';
      eliminarBtn.onclick = () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      };
      container.appendChild(img);
      container.appendChild(span);
      li.appendChild(container);
      li.appendChild(eliminarBtn);
      lista.appendChild(li);
    });
  }

  if (botonesAgregar) {
    botonesAgregar.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.box');
        const titulo = producto.querySelector('h3').textContent;
        const imagen = producto.querySelector('img').src;
        carrito.push({ titulo, imagen });
        actualizarCarrito();
      });
    });
  }

  if (vaciarBtn) {
    vaciarBtn.addEventListener('click', () => {
      carrito.length = 0;
      actualizarCarrito();
    });
  }

  if (pagarBtn) {
    pagarBtn.addEventListener('click', () => {
      if (!nombreUsuario) {
        window.location.href = "login.html";
      } else if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
      } else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.href = "pago.html";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const carrito = [];
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  const lista = document.getElementById('lista-carrito');
  const vaciarBtn = document.getElementById('vaciar-btn');
  const pagarBtn = document.getElementById('pagar-btn');
  const cerrarSesionBtn = document.getElementById('cerrar-sesion-btn');
  const nombreUsuario = localStorage.getItem('usuarioNombre');

  function actualizarCarrito() {
    lista.innerHTML = '';
    carrito.forEach((producto, index) => {
      const li = document.createElement('li');
      const info = document.createElement('div');
      info.className = 'carrito-item-info';
      const img = document.createElement('img');
      img.src = producto.imagen;
      const span = document.createElement('span');
      span.textContent = producto.titulo;
      info.appendChild(img);
      info.appendChild(span);
      const eliminarBtn = document.createElement('button');
      eliminarBtn.className = 'eliminar-btn';
      eliminarBtn.innerHTML = '&times;';
      eliminarBtn.onclick = () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      };
      li.appendChild(info);
      li.appendChild(eliminarBtn);
      lista.appendChild(li);
    });
  }

  if (botonesAgregar) {
    botonesAgregar.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.box');
        const titulo = producto.querySelector('h3').textContent;
        const imagen = producto.querySelector('img').src;
        carrito.push({ titulo, imagen });
        actualizarCarrito();
      });
    });
  }

  if (vaciarBtn) {
    vaciarBtn.addEventListener('click', () => {
      carrito.length = 0;
      actualizarCarrito();
    });
  }

  if (pagarBtn) {
    pagarBtn.addEventListener('click', () => {
      if (!nombreUsuario) {
        window.location.href = "login.html";
      } else if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
      } else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.href = "pago.html";
      }
    });
  }

  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', () => {
      localStorage.removeItem('usuarioNombre');
      localStorage.removeItem('usuarios');
      window.location.reload();
    });
  }
});

/* === FUNCIONES AÑADIDAS DEL SCRIPT CÓSMICO === */

const productos = [
    { nombre: "Starlink", precio: 340000 },
    { nombre: "Modelo Starship", precio: 670000 },
    { nombre: "Mug térmico de Acero Inoxidable", precio: 90000 },
    { nombre: "Motor Raptor", precio: 42000 }
];

const crew = [
    "Juan Camilo Ramirez - CEO",
    "Gwynne Shotwell - Presidenta",
    "Tom Mueller - Propulsión",
    "Hans Koenigsmann - Ingeniería",
    "Jessica Jensen - Misiones Tripuladas"
];

function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("clave").value;
    if (user.includes("@spacex.com") && pass === "falcon9") {
        document.getElementById("login-box").classList.add("hidden");
        document.getElementById("main-panel").classList.remove("hidden");
        mostrarPanel("productos");
        cargarProductos();
        cargarTripulacion();
    } else {
        alert("Credenciales inválidas.");
    }
}

function mostrarPanel(id) {
    document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));
    document.getElementById("panel-" + id).classList.remove("hidden");
}

function cargarProductos() {
    const grid = document.getElementById("productos-grid");
    productos.forEach(p => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `<h4>${p.nombre}</h4><p>USD $${p.precio.toLocaleString()}</p>`;
        grid.appendChild(div);
    });
}

function cargarTripulacion() {
    const ul = document.getElementById("crew-list");
    crew.forEach(m => {
        const li = document.createElement("li");
        li.textContent = m;
        ul.appendChild(li);
    });
}


const empleados = ['Astronauta 1 - Piloto', 'Astronauta 2 - Ingeniero', 'Astronauta 3 - Mecánico', 'Astronauta 4 - Analista', 'Astronauta 5 - Supervisor', 'Astronauta 6 - Técnico', 'Astronauta 7 - Logística', 'Astronauta 8 - Explorador', 'Astronauta 9 - Piloto', 'Astronauta 10 - Ingeniero', 'Astronauta 11 - Mecánico', 'Astronauta 12 - Analista', 'Astronauta 13 - Supervisor', 'Astronauta 14 - Técnico', 'Astronauta 15 - Logística', 'Astronauta 16 - Explorador', 'Astronauta 17 - Piloto', 'Astronauta 18 - Ingeniero', 'Astronauta 19 - Mecánico', 'Astronauta 20 - Analista', 'Astronauta 21 - Supervisor', 'Astronauta 22 - Técnico', 'Astronauta 23 - Logística', 'Astronauta 24 - Explorador', 'Astronauta 25 - Piloto', 'Astronauta 26 - Ingeniero', 'Astronauta 27 - Mecánico', 'Astronauta 28 - Analista', 'Astronauta 29 - Supervisor', 'Astronauta 30 - Técnico', 'Astronauta 31 - Logística', 'Astronauta 32 - Explorador', 'Astronauta 33 - Piloto', 'Astronauta 34 - Ingeniero', 'Astronauta 35 - Mecánico', 'Astronauta 36 - Analista', 'Astronauta 37 - Supervisor', 'Astronauta 38 - Técnico', 'Astronauta 39 - Logística', 'Astronauta 40 - Explorador', 'Astronauta 41 - Piloto', 'Astronauta 42 - Ingeniero', 'Astronauta 43 - Mecánico', 'Astronauta 44 - Analista', 'Astronauta 45 - Supervisor', 'Astronauta 46 - Técnico', 'Astronauta 47 - Logística', 'Astronauta 48 - Explorador', 'Astronauta 49 - Piloto', 'Astronauta 50 - Ingeniero', 'Astronauta 51 - Mecánico', 'Astronauta 52 - Analista', 'Astronauta 53 - Supervisor', 'Astronauta 54 - Técnico', 'Astronauta 55 - Logística', 'Astronauta 56 - Explorador', 'Astronauta 57 - Piloto', 'Astronauta 58 - Ingeniero', 'Astronauta 59 - Mecánico', 'Astronauta 60 - Analista', 'Astronauta 61 - Supervisor', 'Astronauta 62 - Técnico', 'Astronauta 63 - Logística', 'Astronauta 64 - Explorador', 'Astronauta 65 - Piloto', 'Astronauta 66 - Ingeniero', 'Astronauta 67 - Mecánico', 'Astronauta 68 - Analista', 'Astronauta 69 - Supervisor', 'Astronauta 70 - Técnico', 'Astronauta 71 - Logística', 'Astronauta 72 - Explorador', 'Astronauta 73 - Piloto', 'Astronauta 74 - Ingeniero', 'Astronauta 75 - Mecánico', 'Astronauta 76 - Analista', 'Astronauta 77 - Supervisor', 'Astronauta 78 - Técnico', 'Astronauta 79 - Logística', 'Astronauta 80 - Explorador', 'Astronauta 81 - Piloto', 'Astronauta 82 - Ingeniero', 'Astronauta 83 - Mecánico', 'Astronauta 84 - Analista', 'Astronauta 85 - Supervisor', 'Astronauta 86 - Técnico', 'Astronauta 87 - Logística', 'Astronauta 88 - Explorador', 'Astronauta 89 - Piloto', 'Astronauta 90 - Ingeniero', 'Astronauta 91 - Mecánico', 'Astronauta 92 - Analista', 'Astronauta 93 - Supervisor', 'Astronauta 94 - Técnico', 'Astronauta 95 - Logística', 'Astronauta 96 - Explorador', 'Astronauta 97 - Piloto', 'Astronauta 98 - Ingeniero', 'Astronauta 99 - Mecánico', 'Astronauta 100 - Analista', 'Astronauta 101 - Supervisor', 'Astronauta 102 - Técnico', 'Astronauta 103 - Logística', 'Astronauta 104 - Explorador'];

function cargarEmpleados() {
    const ul = document.getElementById("employee-list");
    empleados.forEach(e => {
        const li = document.createElement("li");
        li.textContent = e;
        ul.appendChild(li);
    });
}

function accederZona() {
    const clave = document.getElementById("clave-secreta").value;
    if (clave === "starlink42") {
        document.getElementById("zona-confidencial").classList.remove("hidden");
    } else {
        alert("Acceso denegado.");
    }
}

function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("clave").value;
    if (user.includes("@spacex.com") && pass === "falcon9") {
        document.getElementById("login-box").classList.add("hidden");
        document.getElementById("main-panel").classList.remove("hidden");
        mostrarPanel("productos");
        cargarProductos();
        cargarTripulacion();
        cargarEmpleados();
    } else {
        alert("Credenciales inválidas.");
    }
}

function isUserLoggedIn() {
    return sessionStorage.getItem("loggedIn") === "true";
}

function goToCheckout() {
    if (isUserLoggedIn()) {
        window.location.href = "pago.html";
    } else {
        alert("Debes iniciar sesión primero.");
        window.location.href = "login.html";
    }
}

function goToCart() {
    alert("Aquí iría la lógica del carrito. (Aún no implementada por completo)");
}
