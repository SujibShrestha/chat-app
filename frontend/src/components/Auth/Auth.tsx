import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Login } from './Login';
import { Register } from './Register';
import { useState } from 'react';

const Auth = () => {
  const [value, setValue] = useState<string>('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="w-full max-w-md">
        <Tabs value={value} onValueChange={setValue} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab List */}
          <TabsList className="bg-indigo-50 my-5 w-full">
            <TabsTrigger value="login" className="text-lg font-semibold">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="text-lg font-semibold">
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="p-6 relative">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back 👋</CardTitle>
                <CardDescription className="text-gray-500">
                  Enter your email and password to log in to your account.
                </CardDescription>
              </CardHeader>
              <CardContent
                className={`transition-all duration-300 ease-in-out ${
                  value === 'login' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'
                }`}
              >
                <Login />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="p-2 relative">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Create Account ✨</CardTitle>
                <CardDescription className="text-gray-500">
                  Fill in your details to sign up and start using the app.
                </CardDescription>
              </CardHeader>
              <CardContent
                className={`transition-all duration-300 ease-in-out ${
                  value === 'register' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute'
                }`}
              >
                <Register />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
