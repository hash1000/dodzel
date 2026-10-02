import { NextResponse, type NextRequest } from "next/server";
import { IS_PRODUCTION } from "@/lib/constants";
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const review = request.nextUrl.searchParams.get("review");
  if (review === "0" || review === "1")
    response.cookies.set("dodzel-review", review, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
  if (!IS_PRODUCTION) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|media/|studio|favicon.ico).*)"],
};
