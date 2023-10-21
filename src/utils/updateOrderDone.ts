export async function updateOrderDone(id: number, done: BodyInit, token: any) {
  try {
    const response = await fetch(`http://localhost:3333/sells/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: done
    });

    if (!response.ok) {
      throw new Error('Erro na solicitação de update');
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
