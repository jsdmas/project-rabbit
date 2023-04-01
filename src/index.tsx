import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 다른탭을 보다가 데이터 불러오는것을 방지
      refetchOnWindowFocus: false
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);
