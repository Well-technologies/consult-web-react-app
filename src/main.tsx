import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppProviders } from "@/providers/AppProviders.tsx";
// import { Notifications } from "@/ui/molecules/notifications/Notifications.tsx";

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
      {/* <Notifications /> */}
    </AppProviders>
  </StrictMode>,
)
