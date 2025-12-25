import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Login } from "./Login";
import { Register } from "./Register";
import { useState } from "react";

const Auth = () => {
  const [value, setValue] = useState<string>("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient p-4">
      <div className="w-full max-w-md sm:max-w-lg">
        <Tabs
          value={value}
          onValueChange={setValue}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Tab List */}
          <TabsList className="flex bg-green-50 p-1 rounded-xl mx-4 mt-4">
            <TabsTrigger
              value="login"
              className="flex-1 text-center py-2 text-lg font-semibold rounded-xl 
                         data-[state=active]:bg-green-100 data-[state=active]:shadow-md 
                         data-[state=active]:text-green-900 transition-colors"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="flex-1 text-center py-2 text-lg font-semibold rounded-xl 
                         data-[state=active]:bg-green-100 data-[state=active]:shadow-md 
                         data-[state=active]:text-green-900 transition-colors"
            >
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="p-6 relative">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-900">
                  Welcome Back 👋
                </CardTitle>
                <CardDescription className="text-green-700">
                  Enter your email and password to log in to your account.
                </CardDescription>
              </CardHeader>
              <CardContent
                className={`transition-all duration-300 ease-in-out ${
                  value === "login"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 absolute"
                }`}
              >
                <Login />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="p-6 relative">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-900">
                  Create Account ✨
                </CardTitle>
                <CardDescription className="text-green-700">
                  Fill in your details to sign up and start using the app.
                </CardDescription>
              </CardHeader>
              <CardContent
                className={`transition-all duration-300 ease-in-out ${
                  value === "register"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 absolute"
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
