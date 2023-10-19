export async function postClient(clients: BodyInit) {
  try{
    fetch('http://localhost:3333/clients/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: clients
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação POST');
      }
      return response.json();
    })
    .then(data => {
      window.location.href = '/clientes/todos';
    })
  }catch(error){
    console.log(error)
  }
}