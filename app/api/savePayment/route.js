import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
     console.log(request.body)
    // const payload = JSON.parse(request.body);
   return NextResponse.json({"ji":request})
}