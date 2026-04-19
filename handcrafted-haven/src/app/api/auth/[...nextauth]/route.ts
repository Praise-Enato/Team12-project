import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getArtisanForAuth } from '@/data/db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Artisan Login',
      credentials: {
        artisanId: { label: "Artisan ID (e.g. 1)", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.artisanId || !credentials?.password) {
          return null;
        }
        const artisan = await getArtisanForAuth(credentials.artisanId);
        if (!artisan) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, artisan.password_hash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: artisan.id,
          name: artisan.name,
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
