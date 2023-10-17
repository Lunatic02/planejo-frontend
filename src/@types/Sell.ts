export interface Sell {
  id: number,
date: string
amount: number
paymentType: string
products	:{
  product: string
}
order?: boolean
supplier?: string
deliveryDate? : string
clientId: number
sellerId: number
client	:{
  id: number
name: string
email: string
cellphone: string
gender: string
birthDate: string
interests: string
}
seller	: {
  id:	number
  name: string
  email: string
  cellphone: string
  cep: string
}
}