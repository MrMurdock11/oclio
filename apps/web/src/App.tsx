import { Provider } from "react-redux";
import { store } from "@/store";
import AuthLoader from "./components/AuthLoader";

function App() {
  return (
    <Provider store={store}>
      <AuthLoader />
    </Provider>
  );
}

export default App;
