    import { zodResolver } from "@hookform/resolvers/zod";
    import { useForm } from "react-hook-form";
    import * as z from "zod";
    import { registerUser } from "../../api/api"; 
    import { toast } from "sonner";
    import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

    // Zod schema for register
    const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
    });

    type RegisterForm = z.infer<typeof formSchema>;

    export function Register() {
        const {setUser} = useContext(AuthContext)
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
        setUser(response.data)
           toast.success("User registered")

        } catch (error) {
        console.error(error);
        toast.error("Something went wrong")
        }
    }

    useEffect(()=>{
        if(errors.email){
            toast("Invalid email",{
                description: "Please enter a valid email address",
            })
        }
    })

    return (
        <div className="min-h-auto flex items-center justify-center  p-5">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-black">
            
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 ">
                Name
                </label>
                <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your Name"
                />
                {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
                </label>
                <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="you@example.com"
                />
                {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
                </label>
                <input
                type="password"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="••••••••"
                />
                {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
                </label>
                <input
                type="password"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
                {isSubmitting ? "Creating Account..." : "Register"}
            </button>
            </form>
        </div>
        </div>
    );
    }
