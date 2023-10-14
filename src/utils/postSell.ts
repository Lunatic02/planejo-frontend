export async function postSell(sell: any) {
  try{
    fetch('http://localhost:3333/sells/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: sell
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação POST');
      }
      return response.json();
    })
    .then(data => {
      window.location.href = '/vendas/todas';
    })
  }catch(error){
    console.log(error)
  }
}