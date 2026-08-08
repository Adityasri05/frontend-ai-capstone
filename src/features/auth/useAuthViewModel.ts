import { useState } from 'react';
import { useAuth } from './AuthContext';
import { validateEmail, validatePassword } from './AuthModel';
import { useRouter } from 'next/navigation';

export function useAuthViewModel(mode: 'login' | 'register') {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear errors
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setSubmitError(null);

    let isValid = true;

    // Validate inputs
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must contain at least 6 characters.');
      isValid = false;
    }

    if (mode === 'register' && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      router.push('/');
    } catch (err: any) {
      setSubmitError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    submitError,
    loading,
    handleFormSubmit
  };
}
