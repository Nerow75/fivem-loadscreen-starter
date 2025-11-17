// main.jsx

// Importation des modules
import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx"; // Remplacer par App.jsx pour le thème normal
import App from "./App.christmas.jsx"; // Remplacer par App.christmas.jsx pour le thème Noël
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Ajoute la langue de l'application
document.documentElement.setAttribute("lang", "fr");
if (!document.title) document.title = "Loading Screen";

// Création de la racine de l'application
const rootEl = document.getElementById("root");
if (!rootEl) {
  const el = document.createElement("div");
  el.id = "root";
  document.body.appendChild(el);
}

// Création de l'application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
