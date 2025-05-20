
import React from 'react';
import AuthLayout from '@/components/layout/auth-layout';
import LoginForm from '@/components/login/login-form';
import { Helmet } from 'react-helmet-async';

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login | Kundali Cosmos</title>
        <meta name="description" content="Login to your Kundali Cosmos account" />
      </Helmet>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
