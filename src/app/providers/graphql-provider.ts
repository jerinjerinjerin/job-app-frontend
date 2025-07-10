import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client"; 
import { toast } from "sonner";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let handled = false;

  if (graphQLErrors?.length) {
    graphQLErrors.forEach(({ message, extensions }) => {
      const code = extensions?.code ?? "UNKNOWN_ERROR";
      const toastMessages: Record<string, string> = {
        UNAUTHENTICATED: "Invalid credentials. Please check your login details.",
        BAD_USER_INPUT: "Invalid input.",
        FORBIDDEN: "You don’t have permission to do that.",
        INTERNAL_SERVER_ERROR: "Server error. Try again later.",
      };

      const userFriendlyMessage =
        toastMessages[code as keyof typeof toastMessages] || message;

      toast.error(userFriendlyMessage);
      handled = true;
    });
  }

  if (!handled && networkError) {
    toast.error(
      networkError.message.includes("500")
        ? "Server error. Try again later."
        : `Network error: ${networkError.message}`
    );
  }
});

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  credentials: "include",
});

const client = new ApolloClient({
  link: from([errorLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default client;