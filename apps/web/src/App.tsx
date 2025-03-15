import { Provider } from "react-redux";
import { store } from "@/store";
import AuthLoader from "./components/AuthLoader";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthLoader />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
