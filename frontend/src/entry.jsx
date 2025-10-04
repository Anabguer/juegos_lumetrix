import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export function mount(el){
  const root = createRoot(el)
  root.render(<App />)
  el.__lum_unmount = () => root.unmount?.()
}

export function unmount(el){
  try { el.__lum_unmount?.() } catch {}
}

