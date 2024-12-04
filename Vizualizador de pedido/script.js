const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCliente = document.querySelector('#m-cliente')
const sCodigo = document.querySelector('#m-codigo')
const sPedido = document.querySelector('#m-pedido')
const sEstrutura = document.querySelector('#m-estrutura')
const sDesenvolvimento = document.querySelector('#m-desenvolvimento')
const sStatus = document.querySelector('#m-status')
const sEntrega = document.querySelector('#m-entrega')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active') 

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sCliente.value = itens[index].cliente
    sCodigo.value = itens[index].codigo
    sPedido.value = itens[index].pedido
    sEstrutura.value = itens[index].estrutura
    sDesenvolvimento.value = itens[index].desenvolvimento
    sStatus.value = itens[index].status
    sEntrega.value = formatDate (itens[index].entrega)  
    id = index
  } else {
    sCliente.value = ''
    sCodigo.value = ''
    sPedido.value = ''
    sEstrutura.value = ''
    sDesenvolvimento.value = ''
    sStatus.value = ''
    sEntrega.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.cliente}</td>
    <td>${item.codigo}</td>
    <td>${item.pedido}</td>
    <td>${item.estrutura}</td>
    <td>${item.desenvolvimento}</td>
    <td>${item.status}</td>
    <td>${item.entrega}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  e.preventDefault();

  if (
    sCliente.value === '' ||
    sCodigo.value === '' ||
    sPedido.value === '' ||
    sEstrutura.value === '' ||
    sDesenvolvimento.value === '' ||
    sStatus.value === '' ||
    sEntrega.value === ''
  ) {
    return;
  }

  if (id !== undefined) {
    // Atualizar item existente
    itens[id].cliente = sCliente.value;
    itens[id].codigo = sCodigo.value;
    itens[id].pedido = sPedido.value;
    itens[id].estrutura = sEstrutura.value;
    itens[id].desenvolvimento = sDesenvolvimento.value;
    itens[id].status = sStatus.value;
    itens[id].entrega = sEntrega.value;
  } else {
    // Criar novo item
    itens.push({
      cliente: sCliente.value,
      codigo: sCodigo.value,
      pedido: sPedido.value,
      estrutura: sEstrutura.value,
      desenvolvimento: sDesenvolvimento.value,
      status: sStatus.value,
      entrega: sEntrega.value,
    });
  }

  setItensBD();
  loadItens();
  modal.classList.remove('active');
  id = undefined; // Redefinir após salvar
};

modal.onclick = e => {
  if (e.target.className.indexOf('modal-container') !== -1) {
    modal.classList.remove('active');
    id = undefined; // Redefinir ao fechar o modal
  }
};

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
