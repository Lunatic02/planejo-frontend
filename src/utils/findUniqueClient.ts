export async function findUniqueClient(id : number) {
  try {
    const response = await fetch(`http://localhost:3333/clients/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      const user = await response.json();
      return user
    } else {
      console.error('Erro ao buscar dados do cliente unico.');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}