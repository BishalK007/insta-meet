import { NextResponse } from "next/server";

export const GET = async (request: Request): Promise<NextResponse> => {
    return new NextResponse(
        "hello",
    )
}