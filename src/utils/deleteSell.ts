export async function deleteSells(id : number, token: any) {
  try {
    const response = await fetch(`http://localhost:3333/sells/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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