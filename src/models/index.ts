import { Schema, model, models, SchemaTypes, Model } from 'mongoose'
import { dbConnect } from '@/utils/db'
import type { Session } from '@/types'

dbConnect()

const modelName = 'discord-session'

export const SessionModel: Model<Session> = models[modelName] ?? model(modelName, new Schema({
  accessToken: {
    type: SchemaTypes.String,
    required: true
  }, 
  refreshToken: {
    type: SchemaTypes.String,
    required: true
  } 
}))