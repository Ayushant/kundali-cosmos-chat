
import React from 'react';
import AuthLayout from '@/components/layout/auth-layout';
import SignupForm from '@/components/signup/signup-form';
import { Helmet } from 'react-helmet-async';

const SignupPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sign up | Kundali Cosmos</title>
      </Helmet>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </>
  );
};

export default SignupPage;
