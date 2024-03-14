import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "routes/Router";
import defaultOptions from "configs/reactQuery";
import Layout from "layout/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
          <Toaster />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
