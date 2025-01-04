import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apollo/apolloConfig.mjs";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>
);
