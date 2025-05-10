import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGO } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, setEmail, verifyOtp } from "../redux";
import { loginValidationSchema } from "../validation";
import { RootState } from "../../../app/store";

export const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmitEmail = (data: { email: string }) => {
    dispatch(setEmail(data.email));
    console.log(data.email, "email submitted");
    setShowOtp(true);
  };

  const onSubmitOtp = () => {
    const enteredOtp = otp.join("");
    console.log("OTP Submitted:", enteredOtp);
    if (enteredOtp.length === 4) {
      dispatch(verifyOtp());
      dispatch(authenticate());
      console.log("Authenticated:", auth.email);
    } else {
      console.log("Please enter a valid 4-digit OTP.");
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const value = e.target.value.replace(/\D/, ""); // Ensure only numbers are entered
    if (value.length > 1) return; // Prevent entering more than one character

    const updatedOtp = [...otp];
    updatedOtp[idx] = value;
    setOtp(updatedOtp);

    // Move to next input if value entered
    if (value && idx < 3) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  // Function to handle backspace and focus on previous input
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  // Disable submit button until OTP is complete
  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm transform rounded-xl bg-white p-6 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_rgba(255,191,0,0.5)]">
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
              className={`focus:ring-primary mt-3 w-full rounded-md border border-gray-400 px-3 py-2 focus:ring-2 focus:outline-none ${
                errors.email ? "border-red-500" : ""
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
              className="bg-primary hover:text-primary mt-1 mb-4 w-full rounded py-2 font-medium text-black transition hover:bg-black"
            >
              Send OTP
            </button>
          )}
        </form>

        {showOtp && (
          <>
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
                <div className="mt-4 flex justify-between gap-2">
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
                      className="focus:ring-primary w-[60px] rounded-md border border-gray-400 p-2 text-center text-lg focus:ring-2 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!isOtpComplete}
                className={`bg-primary hover:text-primary w-full rounded py-2 font-medium text-black transition hover:bg-black ${
                  !isOtpComplete && "cursor-not-allowed opacity-50"
                }`}
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
