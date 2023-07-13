import { customFetch } from "../services";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const user = await customFetch('user')

  if(!user) return NextResponse.json({message: 'User not found'})

  return NextResponse.json(user)
}