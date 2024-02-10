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

export const useDateValidation = (value: string) => {
  const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[01])\/(19|20)\d{2}$/
  return pattern.test(value)
} 