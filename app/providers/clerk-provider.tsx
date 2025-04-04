import { ClerkProvider } from "@clerk/nextjs";

function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default ClerkProviderWrapper;