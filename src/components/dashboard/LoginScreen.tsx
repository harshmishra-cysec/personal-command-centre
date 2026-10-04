import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

interface LoginScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function LoginScreen({ onBack, onSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const hasSucceededRef = useRef(false);

  // Focus the email field on mount
  useEffect(() => {
    emailInputRef.current?.focus({ preventScroll: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || hasSucceededRef.current) return;

    if (!isSupabaseConfigured) {
      setErrorMessage("Login isn't set up yet. Please check the Supabase settings.");
      return;
    }

    const emailTrimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailTrimmed) {
      setErrorMessage("Enter your email.");
      return;
    }

    if (!emailPattern.test(emailTrimmed)) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Enter your password.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailTrimmed,
        password,
      });

      if (error) {
        setPassword("");
        setLoading(false);

        const status = error.status;
        const msg = (error.message || "").toLowerCase();

        if (
          status === 429 ||
          msg.includes("rate limit") ||
          msg.includes("too many")
        ) {
          setErrorMessage("Too many attempts. Please wait a minute and try again.");
        } else if (
          status === 400 ||
          msg.includes("invalid login credentials") ||
          msg.includes("invalid credentials")
        ) {
          setErrorMessage("Incorrect email or password.");
        } else if (
          msg.includes("network") ||
          msg.includes("fetch") ||
          (typeof navigator !== "undefined" && !navigator.onLine)
        ) {
          setErrorMessage("Couldn't connect. Check your internet and try again.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        return;
      }

      // Success: call onSuccess exactly once
      if (!hasSucceededRef.current) {
        hasSucceededRef.current = true;
        onSuccess();
      }
    } catch (err: unknown) {
      setPassword("");
      setLoading(false);
      const errStr = String(err).toLowerCase();
      if (
        errStr.includes("network") ||
        errStr.includes("fetch") ||
        (typeof navigator !== "undefined" && !navigator.onLine)
      ) {
        setErrorMessage("Couldn't connect. Check your internet and try again.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      role="region"
      aria-label="Login"
      className="relative w-full max-w-[440px] my-auto rounded-none sm:rounded-sm pcc-login-card-in"
      style={{
        backgroundColor: "rgba(15, 21, 35, 0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Four Gold Corner Brackets (matching hero logo frame) */}
      <span aria-hidden className="absolute -top-[1px] -left-[1px] size-2.5 border-t-2 border-l-2 border-[#D4AF37]" />
      <span aria-hidden className="absolute -top-[1px] -right-[1px] size-2.5 border-t-2 border-r-2 border-[#D4AF37]" />
      <span aria-hidden className="absolute -bottom-[1px] -left-[1px] size-2.5 border-b-2 border-l-2 border-[#D4AF37]" />
      <span aria-hidden className="absolute -bottom-[1px] -right-[1px] size-2.5 border-b-2 border-r-2 border-[#D4AF37]" />

      <div className="p-5 sm:p-7">
        {/* Top Bar: Back Button */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="flex items-center gap-1.5 font-sans text-xs text-white/50 hover:text-white transition-colors cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Centered Logo Frame */}
        <div className="relative rounded-xl border border-white/10 bg-[#0F1523] p-2 shadow-xl w-full max-w-[240px] flex items-center justify-center overflow-hidden mx-auto mb-4">
          <span aria-hidden className="absolute top-1 left-1 size-2 border-t-2 border-l-2 border-[#D4AF37]" />
          <span aria-hidden className="absolute top-1 right-1 size-2 border-t-2 border-r-2 border-[#D4AF37]" />
          <span aria-hidden className="absolute bottom-1 left-1 size-2 border-b-2 border-l-2 border-[#D4AF37]" />
          <span aria-hidden className="absolute bottom-1 right-1 size-2 border-b-2 border-r-2 border-[#D4AF37]" />
          <img
            src="/movone-logo.svg"
            alt="MOVONE"
            loading="eager"
            decoding="async"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </div>

        {/* Centered Header Text */}
        <div className="mb-6 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-[28px] leading-tight text-white">
            Welcome back
          </h2>
          <p className="font-sans font-normal text-sm text-white/70 mt-1">
            Log in to continue to your dashboard.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Live error region */}
          <div aria-live="polite" className="min-h-[20px]">
            {errorMessage && (
              <p className="font-sans font-normal text-xs text-[#FCA5A5] text-left">
                {errorMessage}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="login-email"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1 block text-left"
            >
              Email
            </label>
            <input
              ref={emailInputRef}
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={loading}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              className={`w-full h-[44px] px-3 bg-[#0B1220] font-mono text-sm text-white border-[1.5px] rounded-none focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                errorMessage ? "border-[#EF4444]" : "border-white/25"
              }`}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="login-password"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1 block text-left"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                disabled={loading}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                className={`w-full h-[44px] pl-3 pr-11 bg-[#0B1220] font-mono text-sm text-white border-[1.5px] rounded-none focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errorMessage ? "border-[#EF4444]" : "border-white/25"
                }`}
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-0 top-0 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="pcc-login-btn w-full"
            >
              {loading ? "Logging you in" : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
