import { Provider } from "react-redux";
import { store } from "@/store";
import AuthLoader from "./components/AuthLoader";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <AuthLoader />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
