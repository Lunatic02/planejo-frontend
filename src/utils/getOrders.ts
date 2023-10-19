export async function getOrders() {
  try {
    const response = await fetch(`http://localhost:3333/sells/encomendas`, {
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