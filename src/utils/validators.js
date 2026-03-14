// ═══════════════════════════════════════════════════════════════════
// ✅ FORM VALIDATORS
// ═══════════════════════════════════════════════════════════════════

import { z } from 'zod'

export const identitySchema = z.object({
  firstName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be under 30 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Please enter a valid name'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(30, 'Last name must be under 30 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Please enter a valid name'),
  gender: z
    .string()
    .min(1, 'Please select your cosmic identity'),
})

export const birthSchema = z.object({
  day: z
    .number({ invalid_type_error: 'Enter a valid day' })
    .min(1, 'Day must be 1-31')
    .max(31, 'Day must be 1-31'),
  month: z
    .number({ invalid_type_error: 'Select a month' })
    .min(1, 'Select a month')
    .max(12, 'Select a valid month'),
  year: z
    .number({ invalid_type_error: 'Enter a valid year' })
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  birthTime: z.string().optional(),
})

export const soulSchema = z.object({
  intention: z
    .string()
    .min(1, 'Choose your cosmic intention'),
  mood: z
    .string()
    .min(1, 'Select your current mood'),
})

export const relationshipSchema = z.object({
  relationshipStatus: z.string().optional(),
  partnerSign: z.string().optional(),
})

export const validateStep = (step, data) => {
  const schemas = {
    1: identitySchema,
    2: birthSchema,
    3: soulSchema,
    4: relationshipSchema,
  }

  const schema = schemas[step]
  if (!schema) return { success: true, errors: {} }

  try {
    schema.parse(data)
    return { success: true, errors: {} }
  } catch (error) {
    const errors = {}
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        errors[err.path[0]] = err.message
      })
    }
    return { success: false, errors }
  }
}