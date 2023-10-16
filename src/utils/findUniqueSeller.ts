export async function findUniqueSeller(id : number) {
  try {
    const response = await fetch(`http://localhost:3333/seller/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      const user = await response.json();
      return user
    } else {
      console.error('Erro ao buscar dados do vendedor unico.');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}