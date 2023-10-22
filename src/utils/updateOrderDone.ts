export async function updateOrderDone(id: number, done: BodyInit, token: any) {
  try {
    const response = await fetch(`https://planejo-backend-zl87.vercel.app/sells/${id}`, {
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
