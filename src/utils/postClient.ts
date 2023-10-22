export async function postClient(clients: BodyInit, token: any) {
  try{
    fetch('https://planejo-backend-zl87.vercel.app/clients/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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