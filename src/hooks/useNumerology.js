// ═══════════════════════════════════════════════════════════════════
// 🔢 NUMEROLOGY HOOK
// ═══════════════════════════════════════════════════════════════════

import { useMemo } from 'react'
import {
  calculateLifePathNumber,
  calculateSoulUrge,
  calculateDestinyNumber,
} from '@utils/calculations'
import { LIFE_PATH_MEANINGS } from '@data/numerology'

const useNumerology = (formData) => {
  const numerology = useMemo(() => {
    if (!formData?.day || !formData?.month || !formData?.year) {
      return null
    }

    const lifePathNumber = calculateLifePathNumber(
      formData.day,
      formData.month,
      formData.year
    )

    const soulUrge = formData.firstName
      ? calculateSoulUrge(formData.firstName)
      : null

    const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim()
    const destinyNumber = fullName
      ? calculateDestinyNumber(fullName)
      : null

    const lifePathMeaning =
      LIFE_PATH_MEANINGS[lifePathNumber] ||
      LIFE_PATH_MEANINGS[lifePathNumber % 9 || 9]

    return {
      lifePathNumber,
      lifePathMeaning,
      soulUrge,
      destinyNumber,
    }
  }, [formData?.day, formData?.month, formData?.year, formData?.firstName, formData?.lastName])

  return numerology
}

export default useNumerology