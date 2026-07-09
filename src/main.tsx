import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from "@vercel/analytics/react" // 1. Added import

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics /> {/* 2. Added component */}
  </>
);