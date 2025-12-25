import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginUser } from "../../api/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Eye, EyeClosed } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof formSchema>;

export function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
  } = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: LoginForm) {
    try {
      const response = await LoginUser(data);
      setUser(response.data);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  }

  return (
    <div className="min-h-auto flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-green-50 rounded-3xl shadow-lg p-6 sm:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-black"
        >
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white py-2.5 rounded-xl font-semibold hover:bg-green-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
