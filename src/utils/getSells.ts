export async function getSells() {
  try {
    const response = await fetch(`https://planejo-backend-zl87.vercel.app/sells`, {
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