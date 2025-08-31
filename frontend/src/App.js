import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/toaster";
import ErrorBoundary from "./components/ui/error-boundary";
import { DataProvider } from "./components/DataManager";

// Layout Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Pages
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Listen from "./pages/Listen";
import Submit from "./pages/Submit";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log("Backend connected:", response.data.message);
    } catch (e) {
      console.error("Backend connection failed:", e);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <ErrorBoundary>
      <DataProvider>
        <div className="App min-h-screen relative overflow-x-hidden">
          {/* Global background with fixed positioning */}
          <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 -z-10"></div>
          
          <BrowserRouter>
            <div className="flex flex-col min-h-screen relative">
              <Header />
              <main className="flex-grow relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/story/:id" element={<StoryDetail />} />
                  <Route path="/listen" element={<Listen />} />
                  <Route path="/submit" element={<Submit />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
          <Toaster />
        </div>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;