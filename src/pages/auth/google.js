import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useAuth } from 'src/hooks/use-auth';
import {
  Card,
  CardHeader,
} from '@mui/material';

const Page = () => {
    const router = useRouter();
    const auth = useAuth();

    const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    localStorage.setItem('token', response.credential);
    if (userObject.sub) {
        console.log("login success")
        console.log("user:", userObject)
        try {
          auth.signIn(userObject);
          // which page user will be redirected to after login
          router.replace({
            pathname: '/images',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          });
        } catch(err){
          console.log(err)
        };
    }
    else{
        console.log("login failed")
        console.log("userObject",userObject)
    }
  }

  return (
    <div className="">
          <div className="">
            <center>
            <Card>
              <CardHeader title="Use Google Account" />
            <GoogleOAuthProvider
                clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
                >
             <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className=""
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
              shape='circle'
              useOneTap={true}
            />
            </GoogleOAuthProvider>
            </Card>
            </center>
          </div>
    </div>
  )
}


export default Page;
