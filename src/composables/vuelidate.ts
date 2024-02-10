import type { ErrorObject } from '@vuelidate/core'

export const useValidationErrors = <T extends Record<keyof T, string>>(
  errors: ErrorObject[]
): Record<keyof T, string> => {
  return errors.reduce(
    (acc, value) => {
      return { ...acc, [value.$property]: value.$message }
    },
    {} as Record<keyof T, string>
  )
}

export const useUsernameValidation = (value: string) => {
  const pattern = /^[a-zA-Z0-9_]+$/
  return pattern.test(value)
} 

export const useDateValidation = (date: Date) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() 
  const year = date.getFullYear()
  return currentYear > year
}

