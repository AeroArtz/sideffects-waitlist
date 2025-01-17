import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

//req is short for request
export async function POST(req: NextRequest) {
    const {email} = await req.json()


    try {

      const res = await db.select().from(users).where(eq(users.email, email));
      console.log(res)

      if (res.length > 0) {
        console.log("already exists")
        return NextResponse.json(
          { message: "You have already signed up with this email" },
          { status: 500 }
        );
      }

      // insert user
      await db.insert(users).values({ email: email });

      return NextResponse.json(
        { message: "Successfully added to waitlist" },
        { status: 200 }
      );


    } catch (err){
      console.log(err)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }

  
}