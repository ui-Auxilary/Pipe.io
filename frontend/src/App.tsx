import Home from "./pages/Home";

import FormProvider from "components/Form/FormProvider";

export default function App() {
  return (
    <FormProvider>
      <Home />
    </FormProvider>
  );
}
