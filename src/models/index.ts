import { Schema, model, models, SchemaTypes } from "mongoose";
import { dbConnect } from "@/utils/db";

dbConnect()

export const ClientModel = models.clients || model('clients', new Schema({
  userId: {type: SchemaTypes.String, required: true, unique: true},
  accessToken: {type: SchemaTypes.String, required: true}, 
  refreshToken: {type: SchemaTypes.String, required: true}, 
}))