
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormularioPage from "./pages/formulario";
import HomePage from "./pages/home";



const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <HomePage></HomePage>
  },
  {
    path: `/formulario/:idAluno`,
    element: <FormularioPage></FormularioPage>
  },
  {
    path: `/formulario`,
    element: <FormularioPage></FormularioPage>
  },
]);

function App() {
  return(
   <>
   <RouterProvider router = {router}></RouterProvider>
   </>
  )
  
}

export default App
