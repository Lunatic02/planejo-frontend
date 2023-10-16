export async function getSells() {
  try {
    const response = await fetch(`http://localhost:3333/sells`, {
      method: 'GET',
    });

    if (response.ok) {
      const sells = await response.json();
      return sells
    } else {
      console.error('Erro ao buscar dados das vendas.');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}