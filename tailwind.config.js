/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════
      // 🎨 COSMIC COLOR PALETTE
      // ═══════════════════════════════════════════════════════════
      colors: {
        cosmic: {
          // Primary darks
          void: '#050510',
          abyss: '#0a0a1a',
          deep: '#0d0d2b',
          dark: '#1a1a3e',
          
          // Purples
          purple: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
            950: '#2e1065',
          },
          
          // Pinks
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
            950: '#500724',
          },
          
          // Cyans
          cyan: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
            950: '#083344',
          },
          
          // Golds
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
            950: '#451a03',
            light: '#ffe082',
            DEFAULT: '#ffd54f',
            dark: '#ff8f00',
          },
          
          // Special accent colors
          nebula: '#ff6b9d',
          aurora: '#00ff88',
          stellar: '#00d4ff',
          quantum: '#bf5af2',
          plasma: '#ff3366',
          nova: '#ffaa00',
          eclipse: '#1a0033',
          stardust: '#e8d5ff',
        },
        
        // Glass morphism colors
        glass: {
          white: 'rgba(255, 255, 255, 0.05)',
          'white-10': 'rgba(255, 255, 255, 0.1)',
          'white-20': 'rgba(255, 255, 255, 0.2)',
          'white-30': 'rgba(255, 255, 255, 0.3)',
          dark: 'rgba(0, 0, 0, 0.3)',
          'dark-50': 'rgba(0, 0, 0, 0.5)',
          purple: 'rgba(124, 58, 237, 0.1)',
          pink: 'rgba(236, 72, 153, 0.1)',
          cyan: 'rgba(6, 182, 212, 0.1)',
          gold: 'rgba(255, 213, 79, 0.1)',
        },
      },

      // ═══════════════════════════════════════════════════════════
      // 🔤 TYPOGRAPHY
      // ═══════════════════════════════════════════════════════════
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Raleway', 'sans-serif'],
        script: ['Sacramento', 'cursive'],
        tech: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
        '12xl': ['14rem', { lineHeight: '1' }],
      },
      
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.5em',
      },

      // ═══════════════════════════════════════════════════════════
      // 📐 SPACING & SIZING
      // ═══════════════════════════════════════════════════════════
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      minHeight: {
        'screen-90': '90vh',
        'screen-80': '80vh',
      },

      // ═══════════════════════════════════════════════════════════
      // 🌈 GRADIENTS
      // ═══════════════════════════════════════════════════════════
      backgroundImage: {
        // Cosmic backgrounds
        'cosmic-dark': 'linear-gradient(135deg, #050510 0%, #0a0a1a 25%, #1a0533 50%, #0d1f3c 75%, #050510 100%)',
        'cosmic-radial': 'radial-gradient(ellipse at center, #1a0533 0%, #0a0a1a 50%, #050510 100%)',
        'cosmic-void': 'radial-gradient(ellipse at 50% 50%, #0d0d2b 0%, #050510 100%)',
        
        // Aurora gradients
        'aurora': 'linear-gradient(135deg, #7c3aed 0%, #ec4899 33%, #06b6d4 66%, #7c3aed 100%)',
        'aurora-vertical': 'linear-gradient(180deg, #7c3aed 0%, #ec4899 50%, #06b6d4 100%)',
        'aurora-soft': 'linear-gradient(135deg, rgba(124,58,237,0.5) 0%, rgba(236,72,153,0.5) 50%, rgba(6,182,212,0.5) 100%)',
        
        // Gold gradients
        'gold': 'linear-gradient(135deg, #ffd54f 0%, #ff8f00 100%)',
        'gold-shine': 'linear-gradient(135deg, #ffe082 0%, #ffd54f 25%, #ff8f00 50%, #ffd54f 75%, #ffe082 100%)',
        'gold-radial': 'radial-gradient(circle, #ffd54f 0%, #ff8f00 100%)',
        
        // Nebula gradients
        'nebula': 'linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #7c3aed 100%)',
        'nebula-blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)',
        'nebula-green': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        
        // Holographic
        'holographic': 'linear-gradient(135deg, #ff0080 0%, #ff8c00 14%, #40e0d0 28%, #7b68ee 42%, #ff0080 56%, #ff8c00 70%, #40e0d0 84%, #7b68ee 100%)',
        'holographic-soft': 'linear-gradient(135deg, rgba(255,0,128,0.3) 0%, rgba(255,140,0,0.3) 25%, rgba(64,224,208,0.3) 50%, rgba(123,104,238,0.3) 75%, rgba(255,0,128,0.3) 100%)',
        
        // Glass effects
        'glass-shine': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)',
        'glass-border': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.2) 100%)',
        
        // Special effects
        'quantum': 'conic-gradient(from 0deg, #7c3aed, #ec4899, #06b6d4, #7c3aed)',
        'quantum-spin': 'conic-gradient(from var(--angle), #7c3aed, #ec4899, #06b6d4, #10b981, #7c3aed)',
        'plasma': 'radial-gradient(ellipse at 30% 30%, #ff3366 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, #7c3aed 0%, transparent 50%)',
      },

      // ═══════════════════════════════════════════════════════════
      // ✨ ANIMATIONS
      // ═══════════════════════════════════════════════════════════
      animation: {
        // Float animations
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        
        // Pulse animations
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        
        // Spin animations
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 40s linear infinite',
        'spin-reverse': 'spinReverse 15s linear infinite',
        'spin-wobble': 'spinWobble 10s ease-in-out infinite',
        
        // Gradient animations
        'gradient-shift': 'gradientShift 5s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 8s linear infinite',
        'aurora-flow': 'auroraFlow 10s ease-in-out infinite',
        
        // Shimmer animations
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'shimmer-fast': 'shimmer 1.5s ease-in-out infinite',
        'shine': 'shine 4s ease-in-out infinite',
        
        // Twinkle animations
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'twinkle-delayed': 'twinkle 3s ease-in-out infinite 1.5s',
        'stars': 'stars 4s ease-in-out infinite',
        
        // Morph animations
        'morph': 'morph 8s ease-in-out infinite',
        'blob': 'blob 7s ease-in-out infinite',
        'liquid': 'liquid 10s ease-in-out infinite',
        
        // Entrance animations
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        
        // Special effects
        'ripple': 'ripple 1s ease-out forwards',
        'wave': 'wave 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        
        // Text animations
        'text-glow': 'textGlow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        
        // 3D animations
        'rotate-3d': 'rotate3d 10s linear infinite',
        'flip': 'flip 2s ease-in-out infinite',
        'swing': 'swing 2s ease-in-out infinite',
        
        // Portal/Dimensional
        'portal-spin': 'portalSpin 4s linear infinite',
        'dimensional-shift': 'dimensionalShift 8s ease-in-out infinite',
        'warp': 'warp 3s ease-in-out infinite',
        
        // Cosmic specific
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbitReverse 25s linear infinite',
        'comet': 'comet 5s linear infinite',
        'supernova': 'supernova 2s ease-out forwards',
        'nebula-drift': 'nebulaDrift 30s ease-in-out infinite',
        'constellation': 'constellation 5s ease-in-out infinite',
      },

      keyframes: {
        // Float
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        
        // Pulse
        pulseGlow: {
          '0%, 100%': { 
            opacity: '0.5', 
            transform: 'scale(1)',
            filter: 'blur(0px)',
          },
          '50%': { 
            opacity: '1', 
            transform: 'scale(1.05)',
            filter: 'blur(2px)',
          },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        
        // Spin
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        spinWobble: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(0.9)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        
        // Gradients
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 200%' },
        },
        auroraFlow: {
          '0%': { backgroundPosition: '0% 50%', filter: 'hue-rotate(0deg)' },
          '50%': { backgroundPosition: '100% 50%', filter: 'hue-rotate(30deg)' },
          '100%': { backgroundPosition: '0% 50%', filter: 'hue-rotate(0deg)' },
        },
        
        // Shimmer
        shimmer: {
          '0%': { left: '-100%', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        
        // Twinkle
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        stars: {
          '0%, 100%': { opacity: '0.5', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.5)' },
        },
        
        // Morph
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 60%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        liquid: {
          '0%, 100%': { 
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            transform: 'rotate(0deg)',
          },
          '25%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
          '50%': { 
            borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%',
            transform: 'rotate(180deg)',
          },
          '75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' },
        },
        
        // Entrance
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        
        // Effects
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-5px)' },
          '75%': { transform: 'translateY(5px)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
        
        // Text
        textGlow: {
          '0%': { textShadow: '0 0 10px rgba(255,213,79,0.5), 0 0 20px rgba(255,213,79,0.3)' },
          '100%': { textShadow: '0 0 20px rgba(255,213,79,0.8), 0 0 40px rgba(255,213,79,0.5), 0 0 60px rgba(255,213,79,0.3)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
        
        // 3D
        rotate3d: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
        },
        flip: {
          '0%': { transform: 'perspective(400px) rotateY(0)' },
          '100%': { transform: 'perspective(400px) rotateY(360deg)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate3d(0, 0, 1, 0deg)' },
          '20%': { transform: 'rotate3d(0, 0, 1, 15deg)' },
          '40%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 5deg)' },
          '80%': { transform: 'rotate3d(0, 0, 1, -5deg)' },
        },
        
        // Portal
        portalSpin: {
          '0%': { transform: 'rotate(0deg)', filter: 'hue-rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)', filter: 'hue-rotate(360deg)' },
        },
        dimensionalShift: {
          '0%, 100%': { 
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            filter: 'hue-rotate(0deg)',
          },
          '25%': { transform: 'perspective(1000px) rotateX(5deg) rotateY(10deg)' },
          '50%': { 
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            filter: 'hue-rotate(180deg)',
          },
          '75%': { transform: 'perspective(1000px) rotateX(-5deg) rotateY(-10deg)' },
        },
        warp: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' },
        },
        
        // Cosmic
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        orbitReverse: {
          '0%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
          '100%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
        },
        comet: {
          '0%': { 
            transform: 'translateX(-100%) translateY(-100%)',
            opacity: '0',
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { 
            transform: 'translateX(100vw) translateY(100vh)',
            opacity: '0',
          },
        },
        supernova: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.8' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
        nebulaDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(50px, -30px) scale(1.05)' },
          '50%': { transform: 'translate(20px, 40px) scale(0.95)' },
          '75%': { transform: 'translate(-30px, 10px) scale(1.02)' },
        },
        constellation: {
          '0%, 100%': { opacity: '0.5', filter: 'brightness(1)' },
          '25%': { opacity: '0.8', filter: 'brightness(1.2)' },
          '50%': { opacity: '1', filter: 'brightness(1.5)' },
          '75%': { opacity: '0.7', filter: 'brightness(1.1)' },
        },
      },

      // ═══════════════════════════════════════════════════════════
      // 🎭 TRANSITIONS
      // ═══════════════════════════════════════════════════════════
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1500': '1500ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'cosmic': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'spring': 'cubic-bezier(0.5, 1.5, 0.5, 1)',
      },

      // ═══════════════════════════════════════════════════════════
      // 🌟 BOX SHADOWS
      // ═══════════════════════════════════════════════════════════
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 213, 79, 0.3)',
        'glow': '0 0 20px rgba(255, 213, 79, 0.5), 0 0 40px rgba(255, 213, 79, 0.3)',
        'glow-lg': '0 0 30px rgba(255, 213, 79, 0.6), 0 0 60px rgba(255, 213, 79, 0.4), 0 0 90px rgba(255, 213, 79, 0.2)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.5), 0 0 40px rgba(124, 58, 237, 0.3)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
        'glow-aurora': '0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(236, 72, 153, 0.3), 0 0 90px rgba(6, 182, 212, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(255, 213, 79, 0.2)',
        'inner-glow-purple': 'inset 0 0 20px rgba(124, 58, 237, 0.2)',
        'cosmic': '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(124, 58, 237, 0.2)',
        'cosmic-lg': '0 35px 60px -15px rgba(0, 0, 0, 0.6), 0 0 50px rgba(124, 58, 237, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-lg': '0 15px 50px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.15)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
      },

      // ═══════════════════════════════════════════════════════════
      // 🔮 BACKDROP BLUR
      // ═══════════════════════════════════════════════════════════
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // ═══════════════════════════════════════════════════════════
      // 📱 SCREENS (Breakpoints)
      // ═══════════════════════════════════════════════════════════
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },

      // ═══════════════════════════════════════════════════════════
      // 🎯 Z-INDEX
      // ═══════════════════════════════════════════════════════════
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'cursor': '9999',
        'modal': '1000',
        'toast': '1100',
        'loader': '2000',
      },

      // ═══════════════════════════════════════════════════════════
      // 🖼️ ASPECT RATIOS
      // ═══════════════════════════════════════════════════════════
      aspectRatio: {
        'portrait': '3/4',
        'landscape': '4/3',
        'ultrawide': '21/9',
        'golden': '1.618/1',
      },

      // ═══════════════════════════════════════════════════════════
      // 🌀 BORDER RADIUS
      // ═══════════════════════════════════════════════════════════
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}