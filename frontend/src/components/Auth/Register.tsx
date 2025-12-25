import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerUser } from "../../api/api";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Eye, EyeClosed } from "lucide-react";

const formSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof formSchema>;

export function Register() {
  const { setUser } = useContext(AuthContext);
  const [type, setType] = useState<string>("password");

  const passwordToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: RegisterForm) {
    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setUser(response.data);
      toast.success("User registered");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    if (errors.email) {
      toast("Invalid email", {
        description: "Please enter a valid email address",
      });
    }
  }, [errors.email]);

  return (
    <div className="min-h-auto  flex items-center justify-center ">
      <div className="w-full max-w-sm bg-green-50 rounded-3xl shadow-lg p-6 sm:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-black"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={type}
                {...register("password")}
                className="w-full px-4 py-2 pr-12 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={passwordToggle}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-700 hover:text-green-900 transition"
              >
                {type === "password" ? <EyeClosed /> : <Eye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-green-900 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white py-2.5 rounded-xl font-semibold hover:bg-green-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
