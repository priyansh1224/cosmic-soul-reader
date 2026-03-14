// ═══════════════════════════════════════════════════════════════════
// 🌌 COSMIC STORE - Main Application State
// ═══════════════════════════════════════════════════════════════════

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { SECTIONS, FORM_STEPS } from '@utils/constants'

const useCosmicStore = create(
  subscribeWithSelector((set, get) => ({
    // ─────────────────────────────────────────
    // Loading & Navigation States
    // ─────────────────────────────────────────
    isLoading: true,
    isCalculating: false,
    currentSection: SECTIONS.LOADER,
    previousSection: null,
    transitionDirection: 'forward', // 'forward' | 'backward'

    // ─────────────────────────────────────────
    // Form State
    // ─────────────────────────────────────────
    currentStep: FORM_STEPS.IDENTITY,
    totalSteps: 4,
    formData: {
      firstName: '',
      lastName: '',
      gender: '',
      day: '',
      month: '',
      year: '',
      birthTime: '',
      intention: '',
      mood: '',
      relationshipStatus: '',
      partnerSign: '',
    },
    formErrors: {},
    isFormValid: false,
    stepHistory: [FORM_STEPS.IDENTITY],

    // ─────────────────────────────────────────
    // Reading Results
    // ─────────────────────────────────────────
    reading: null,
    readingHistory: [],
    activeResultCard: null,
    revealedCards: new Set(),

    // ─────────────────────────────────────────
    // UI Interaction State
    // ─────────────────────────────────────────
    isMenuOpen: false,
    activeToast: null,
    toastQueue: [],
    modalContent: null,
    isModalOpen: false,
    hoveredElement: null,
    mousePosition: { x: 0, y: 0 },
    scrollProgress: 0,

    // ─────────────────────────────────────────
    // Actions: Loading & Navigation
    // ─────────────────────────────────────────
    setLoading: (isLoading) => set({ isLoading }),

    setSection: (section) => {
      const current = get().currentSection
      const sectionOrder = [SECTIONS.LOADER, SECTIONS.WELCOME, SECTIONS.FORM, SECTIONS.READING, SECTIONS.RESULTS]
      const currentIndex = sectionOrder.indexOf(current)
      const nextIndex = sectionOrder.indexOf(section)

      set({
        currentSection: section,
        previousSection: current,
        transitionDirection: nextIndex >= currentIndex ? 'forward' : 'backward',
      })
    },

    goToWelcome: () => {
      set({
        currentSection: SECTIONS.WELCOME,
        previousSection: SECTIONS.LOADER,
        transitionDirection: 'forward',
      })
    },

    goToForm: () => {
      set({
        currentSection: SECTIONS.FORM,
        previousSection: SECTIONS.WELCOME,
        transitionDirection: 'forward',
      })
    },

    goToReading: () => {
      set({
        currentSection: SECTIONS.READING,
        previousSection: SECTIONS.FORM,
        transitionDirection: 'forward',
        isCalculating: true,
      })
    },

    goToResults: () => {
      set({
        currentSection: SECTIONS.RESULTS,
        previousSection: SECTIONS.READING,
        transitionDirection: 'forward',
        isCalculating: false,
      })
    },

    // ─────────────────────────────────────────
    // Actions: Form
    // ─────────────────────────────────────────
    setStep: (step) => {
      const { stepHistory } = get()
      set({
        currentStep: step,
        stepHistory: [...stepHistory, step],
        formErrors: {},
      })
    },

    nextStep: () => {
      const { currentStep, totalSteps } = get()
      if (currentStep < totalSteps) {
        const newStep = currentStep + 1
        const { stepHistory } = get()
        set({
          currentStep: newStep,
          stepHistory: [...stepHistory, newStep],
          formErrors: {},
        })
      }
    },

    prevStep: () => {
      const { currentStep } = get()
      if (currentStep > 1) {
        const newStep = currentStep - 1
        set({
          currentStep: newStep,
          formErrors: {},
        })
      }
    },

    updateFormData: (data) => {
      set((state) => ({
        formData: { ...state.formData, ...data },
        formErrors: {},
      }))
    },

    setFormErrors: (errors) => set({ formErrors: errors }),

    clearFormErrors: () => set({ formErrors: {} }),

    resetForm: () => {
      set({
        currentStep: FORM_STEPS.IDENTITY,
        formData: {
          firstName: '',
          lastName: '',
          gender: '',
          day: '',
          month: '',
          year: '',
          birthTime: '',
          intention: '',
          mood: '',
          relationshipStatus: '',
          partnerSign: '',
        },
        formErrors: {},
        isFormValid: false,
        stepHistory: [FORM_STEPS.IDENTITY],
      })
    },

    // ─────────────────────────────────────────
    // Actions: Reading
    // ─────────────────────────────────────────
    setReading: (reading) => {
      const { readingHistory } = get()
      set({
        reading,
        readingHistory: [...readingHistory, reading],
      })
    },

    clearReading: () => set({ reading: null }),

    setActiveResultCard: (cardId) => set({ activeResultCard: cardId }),

    revealCard: (cardId) => {
      const { revealedCards } = get()
      const newRevealed = new Set(revealedCards)
      newRevealed.add(cardId)
      set({ revealedCards: newRevealed })
    },

    isCardRevealed: (cardId) => {
      return get().revealedCards.has(cardId)
    },

    // ─────────────────────────────────────────
    // Actions: UI
    // ─────────────────────────────────────────
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    closeMenu: () => set({ isMenuOpen: false }),

    showToast: (toast) => {
      const id = Date.now()
      const newToast = { ...toast, id }
      set({ activeToast: newToast })

      // Auto dismiss
      setTimeout(() => {
        const current = get().activeToast
        if (current?.id === id) {
          set({ activeToast: null })
        }
      }, toast.duration || 3000)
    },

    dismissToast: () => set({ activeToast: null }),

    openModal: (content) => set({ modalContent: content, isModalOpen: true }),
    closeModal: () => set({ modalContent: null, isModalOpen: false }),

    setHoveredElement: (element) => set({ hoveredElement: element }),
    clearHoveredElement: () => set({ hoveredElement: null }),

    setMousePosition: (position) => set({ mousePosition: position }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),

    // ─────────────────────────────────────────
    // Actions: Reset Everything
    // ─────────────────────────────────────────
    resetAll: () => {
      set({
        currentSection: SECTIONS.WELCOME,
        currentStep: FORM_STEPS.IDENTITY,
        formData: {
          firstName: '',
          lastName: '',
          gender: '',
          day: '',
          month: '',
          year: '',
          birthTime: '',
          intention: '',
          mood: '',
          relationshipStatus: '',
          partnerSign: '',
        },
        formErrors: {},
        isFormValid: false,
        reading: null,
        activeResultCard: null,
        revealedCards: new Set(),
        isCalculating: false,
        stepHistory: [FORM_STEPS.IDENTITY],
      })
    },

    // ─────────────────────────────────────────
    // Computed Values (as functions)
    // ─────────────────────────────────────────
    getStepProgress: () => {
      const { currentStep, totalSteps } = get()
      return (currentStep / totalSteps) * 100
    },

    isFirstStep: () => get().currentStep === 1,
    isLastStep: () => get().currentStep === get().totalSteps,

    getFormCompleteness: () => {
      const { formData } = get()
      const requiredFields = ['firstName', 'lastName', 'gender', 'day', 'month', 'year', 'intention', 'mood']
      const filled = requiredFields.filter((f) => formData[f] && String(formData[f]).trim() !== '')
      return Math.round((filled.length / requiredFields.length) * 100)
    },
  }))
)

export default useCosmicStore