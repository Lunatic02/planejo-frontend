export async function deleteClients(id : number) {
  try {
    const response = await fetch(`http://localhost:3333/clients/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const sells = await response.json();
      return sells
    } else {
      console.error('Erro ao deletar.');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}