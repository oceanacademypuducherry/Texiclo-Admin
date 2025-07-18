import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { loginValidationSchema } from "../validation";
import { LOGO } from "../../../assets";
import { SEND_LOGIN_OTP, VERIFY_LOGIN_OTP } from "../service";

type FormInputs = {
  email: string;
};

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{ email: string }>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmitEmail = async (data: FormInputs) => {
    try {
      await dispatch(SEND_LOGIN_OTP(data.email)).unwrap();
      setShowOtp(true);
    } catch (err: any) {
      console.error("OTP send error:", err.message || err);
    }
  };

  const onSubmitOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      console.warn("Incomplete OTP");
      return;
    }

    const email = auth.email || getValues("email");
    if (!email) {
      console.warn("Email not available for verification.");
      return;
    }

    try {
      await dispatch(VERIFY_LOGIN_OTP({ email, otp: enteredOtp })).unwrap();
    } catch (err: any) {
      console.error("OTP verification failed:", err.message || err);
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[idx] = value;
    setOtp(updatedOtp);

    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md transform rounded-xl bg-white p-6 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(255,191,0,0.5)]">
        <img src={LOGO} alt="logo" className="mx-auto mb-4 w-20" />

        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-700">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmitEmail)}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Enter Your Email :
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              {...register("email")}
              disabled={auth.loading}
              className={`focus:ring-primary mt-3 w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {!showOtp && (
            <button
              type="submit"
              disabled={auth.loading}
              className={`mt-1 mb-4 w-full rounded py-2 font-medium transition ${
                auth.loading
                  ? "cursor-not-allowed bg-gray-400 text-white"
                  : "bg-primary hover:text-primary text-black hover:bg-black"
              }`}
            >
              {auth.loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}
        </form>

        {showOtp && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitOtp();
            }}
          >
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Enter Your OTP :
              </label>
              <div className="mt-4 flex flex-nowrap justify-between gap-2 overflow-x-auto">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    className="focus:ring-primary w-10 rounded-md border border-gray-400 p-2 text-center text-lg focus:ring-2 focus:outline-none sm:w-12 md:w-14"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isOtpComplete || auth.loading}
              className={`w-full rounded py-2 font-medium transition ${
                !isOtpComplete || auth.loading
                  ? "cursor-not-allowed bg-gray-400 text-white"
                  : "bg-primary hover:text-primary text-black hover:bg-black"
              }`}
            >
              {auth.loading ? "Verifying OTP..." : "Submit"}
            </button>
          </form>
        )}

        {auth.error && (
          <p className="mt-4 text-center text-sm text-red-600">{auth.error}</p>
        )}
      </div>
    </div>
  );
};
