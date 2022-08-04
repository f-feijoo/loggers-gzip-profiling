const socket = io();

// ------------- PRODUCTOS -------------

socket.on("productos", (data) => {
  render(data);
});

// ------------- MOSTRAR PRODUCTOS -------------

const render = (data) => {
  let html = data
    .map((x) => {
      return `
        <tr>
        <th scope="row">${x.id}</th>
        <td>${x.title}</td>
        <td>$${x.price}</td>
        <td><img src=${x.thumbnail} width="40"
            height="40" alt="..."></td>
        </tr>
        `;
    })
    .join(" ");

  document.querySelector("#caja").innerHTML = html;
};

// ------------- AGREGAR PRODUCTOS -------------

const addInfo = () => {
  
  let dataObj = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#img").value,
  };
  socket.emit("dataMsn", dataObj);
  return false;
};

document.addEventListener("submit", (e) => {
  e.preventDefault();
});

//  ------------- MENSAJES -------------

socket.on("mensajes", (data) => {
  renderMs(data);
});

// ------------- AGREGAR MENSAJE -------------

const addMessage = () => {
  let msObj = {
    autor: {
      id: document.querySelector("#email").value,
      nombre: document.querySelector("#nombre").value,
      apellido: document.querySelector("#apellido").value,
      edad: document.querySelector("#edad").value,
      alias: document.querySelector("#alias").value,
      avatar: document.querySelector("#avatar").value,
    },
    texto: document.querySelector("#text").value,
  };
  document.querySelector("#text").value = "";
  socket.emit("Msn", msObj);
  return false;
};

// ------------- MOSTRAR MENSAJES -------------

const renderMs = (data) => {
    
  // ------------- DENORMALIZACION DE MENSAJES -------------

  const autorSchema = new normalizr.schema.Entity("autores");

  const mensajeSchema = new normalizr.schema.Entity("mensajes", {
    id: { type: String },
    autor: autorSchema,
    texto: "",
    timestamp: { type: String },
  });

  const chatSchema = new normalizr.schema.Entity("chats", {
    id: { type: String },
    nombre: "",
    mensajes: [mensajeSchema],
  });

  const denormalizedData = normalizr.denormalize(
    data.result,
    chatSchema,
    data.entities
  );

  // ------------- RENDERIZADO DE MENSAJES -------------

  let html = data.mensajes // Reemplazar data.mensajes por denormalizedData para usar denormalizacion y ver el backend
    .map((x) => {
      return `
        <div>
            <p style="color: brown;"><strong class="text-primary">${x.autor.alias}</strong> [${x.timestamp}] <i class="text-success">${x.texto}</i></p>
        </div>
        `;
    })
    .join(" ");

  document.querySelector("#c-mensajes").innerHTML = html;
};
