// ═══════════════════════════════════════════════════════════════════
// 🎨 Procedural Texture Generators
// Creates star, nebula, and crystal textures at runtime
// ═══════════════════════════════════════════════════════════════════

export function createStarTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  const center = 64

  // Radial glow
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.05, 'rgba(255, 250, 230, 0.9)')
  gradient.addColorStop(0.15, 'rgba(255, 213, 79, 0.5)')
  gradient.addColorStop(0.4, 'rgba(255, 213, 79, 0.1)')
  gradient.addColorStop(0.7, 'rgba(124, 58, 237, 0.02)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)

  // Diffraction spikes
  ctx.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 4; i++) {
    ctx.save()
    ctx.translate(center, center)
    ctx.rotate((i * Math.PI) / 2)

    const spike = ctx.createLinearGradient(0, 0, 60, 0)
    spike.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
    spike.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)')
    spike.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = spike
    ctx.fillRect(0, -0.5, 60, 1)
    ctx.restore()
  }

  return canvas
}

export function createNebulaTexture(width = 512, height = 512) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Black base
  ctx.fillStyle = '#050510'
  ctx.fillRect(0, 0, width, height)

  // Random nebula clouds
  const colors = [
    'rgba(124, 58, 237, 0.15)',
    'rgba(236, 72, 153, 0.12)',
    'rgba(6, 182, 212, 0.1)',
    'rgba(76, 29, 149, 0.18)',
  ]

  for (let i = 0; i < 15; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const r = Math.random() * 200 + 50
    const color = colors[Math.floor(Math.random() * colors.length)]

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, color)
    grad.addColorStop(1, 'transparent')

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)
  }

  // Stars
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const r = Math.random() * 1.5 + 0.5
    const brightness = Math.random() * 0.8 + 0.2

    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
    ctx.fill()
  }

  return canvas
}

export function createCrystalTexture(size = 512) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Base purple crystal color
  const baseGrad = ctx.createLinearGradient(0, 0, size, size)
  baseGrad.addColorStop(0, '#4c1d95')
  baseGrad.addColorStop(0.3, '#7c3aed')
  baseGrad.addColorStop(0.6, '#6d28d9')
  baseGrad.addColorStop(1, '#4c1d95')

  ctx.fillStyle = baseGrad
  ctx.fillRect(0, 0, size, size)

  // Crystal facet lines
  ctx.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 20; i++) {
    const x1 = Math.random() * size
    const y1 = Math.random() * size
    const x2 = x1 + (Math.random() - 0.5) * 200
    const y2 = y1 + (Math.random() - 0.5) * 200

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = `rgba(255, 213, 79, ${Math.random() * 0.3})`
    ctx.lineWidth = Math.random() * 2 + 0.5
    ctx.stroke()
  }

  // Internal light refractions
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * 80 + 20

    const refraction = ctx.createRadialGradient(x, y, 0, x, y, r)
    refraction.addColorStop(0, 'rgba(255, 213, 79, 0.3)')
    refraction.addColorStop(0.5, 'rgba(124, 58, 237, 0.1)')
    refraction.addColorStop(1, 'transparent')

    ctx.fillStyle = refraction
    ctx.fillRect(0, 0, size, size)
  }

  return canvas
}
