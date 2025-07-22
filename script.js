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
