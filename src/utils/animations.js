// Animation utility functions
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 }
};

export const slideUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 },
  transition: { duration: 0.6 }
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.5 }
};

export const cosmicGlow = {
  initial: { 
    boxShadow: '0 0 0px rgba(124, 58, 237, 0)' 
  },
  animate: { 
    boxShadow: [
      '0 0 20px rgba(124, 58, 237, 0.3)',
      '0 0 40px rgba(124, 58, 237, 0.6)',
      '0 0 20px rgba(124, 58, 237, 0.3)'
    ]
  },
  transition: { 
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const rotateAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};