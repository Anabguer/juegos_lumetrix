import { mount } from './game.bundle.js?v=20251008-1650'

const root = document.getElementById('gameRoot')
if (root && typeof mount === 'function') {
  mount(root)
} else {
  console.error('Lumetrix: mount(root) no encontrado en game.bundle.js')
}
