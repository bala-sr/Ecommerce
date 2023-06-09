import Home from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/Navigation";
import Shop from "./routes/Shop";
import Authentication from "./routes/Authentication";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />      
        <Route path="shop" element={<Shop />} />      
        <Route path="auth" element={<Authentication />} />      
      </Route>
    </Routes>
  );
}

export default App;
