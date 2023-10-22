export async function deleteSells(id : number, token: any) {
  try {
    const response = await fetch(`https://planejo-backend-zl87.vercel.app/sells/${id}`, {
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