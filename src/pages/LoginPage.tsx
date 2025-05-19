
import React from 'react';
import AuthLayout from '@/components/layout/auth-layout';
import LoginForm from '@/components/login/login-form';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
