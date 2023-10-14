export async function getClientInfo() {
  try {
    const response = await fetch(`http://localhost:3333/clients`, {
      method: 'GET',
    });

    if (response.ok) {
      const user = await response.json();
      return user
    } else {
      console.error('Erro ao buscar dados do usuário.');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}