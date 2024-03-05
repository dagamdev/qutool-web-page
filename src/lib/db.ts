import { connect, set } from 'mongoose'

set('strictQuery', true)
let isConnected = false

export async function dbConnect() {
  try {
    if(isConnected) return

    await connect(process.env.CONNECT_MONGO || '')
    isConnected = true
    console.log('✅ Connected to database')

  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}