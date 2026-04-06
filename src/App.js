import { Routes, Route, useLocation } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Solutions from "./pages/Solutions";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import PostView from "./pages/PostView";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import { PostsProvider } from "./context/PostsContext";
import { ContactProvider } from "./context/ContactContext";

import "./App.css";

function AppInner() {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin" || location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/about"         element={<About />} />
        <Route path="/cta"           element={<HowItWorks />} />
        <Route path="/testimonials"  element={<Solutions />} />
        <Route path="/Contact"       element={<Contact />} />
        <Route path="/blog"          element={<Blog />} />
        <Route path="/posts/:slug"   element={<PostView />} />
        <Route path="/admin"         element={<AdminLogin />} />
        <Route path="/dashboard"     element={<Dashboard />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <PostsProvider>
      <ContactProvider>
        <AppInner />
      </ContactProvider>
    </PostsProvider>
  );
}

export default App;
