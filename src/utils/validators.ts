export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateForm = (data: Record<string, string>, rules: Record<string, { required?: boolean; minLength?: number; email?: boolean; phone?: boolean }>): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = data[field] || '';

    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
    } else if (rule.minLength && !validateMinLength(value, rule.minLength)) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    } else if (rule.email && !validateEmail(value)) {
      errors[field] = 'Invalid email address';
    } else if (rule.phone && !validatePhone(value)) {
      errors[field] = 'Invalid phone number';
    }
  });

  return errors;
};
