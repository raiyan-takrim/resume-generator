import SignInButton from '@/components/auth/SignInButton';
import React from 'react';

const SignInPage = () => {

    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <div className='p-6 rounded-md w-96 border'>
                <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
                <p className='mb-4 sub'>Please sign in to continue.</p>
                <SignInButton />
                <p className='mt-4 text-sm sub'>By signing in, you agree to our <a href="#" className='text-foreground'>Terms of Service</a> and <a href="#" className='text-foreground'>Privacy Policy</a>.</p>
            </div>
        </div>
    );
};

export default SignInPage;