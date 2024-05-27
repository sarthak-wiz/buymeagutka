import clientPromise from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";


export const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GLE_CLIENT_ID as string,
          clientSecret: process.env.GLE_CLIENT_SECRET as string,
        }),
      ],
      adapter: MongoDBAdapter(clientPromise),
} as AuthOptions;