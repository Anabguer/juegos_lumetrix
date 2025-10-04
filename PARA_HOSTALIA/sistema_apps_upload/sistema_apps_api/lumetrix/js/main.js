import { mount } from './game.bundle.js'

const root = document.getElementById('gameRoot')
if (root && typeof mount === 'function') {
  mount(root)
} else {
  console.error('Lumetrix: mount(root) no encontrado en game.bundle.js')
}
