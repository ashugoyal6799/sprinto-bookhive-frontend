"use client";

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import "./globals.css";

import GoToHomePage from "../app/components/GoToHomePage";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoToHomePage />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
