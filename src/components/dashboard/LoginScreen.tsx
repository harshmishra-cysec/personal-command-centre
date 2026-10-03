import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function LoginScreen({ onBack, onSuccess }: LoginScreenProps) {
  const [mode, setMode] = useState<"login" | "create">("login");
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const hasSubmittedRef = useRef(false);

  // Focus the first input field on mount and when switching tabs
  useEffect(() => {
    firstInputRef.current?.focus({ preventScroll: true });
  }, [mode]);

  const switchMode = (newMode: "login" | "create") => {
    setMode(newMode);
    setEmailOrId("");
    setPassword("");
    setFullName("");
    setEmail("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSubmittedRef.current || isSuccess) return;

    const newErrors: Record<string, string> = {};

    if (mode === "login") {
      if (!emailOrId.trim()) {
        newErrors.emailOrId = "Enter your email or operator ID.";
      }
      if (!password) {
        newErrors.password = "Enter your password.";
      }
    } else {
      if (!fullName.trim()) {
        newErrors.fullName = "Enter your full name.";
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailPattern.test(email.trim())) {
        newErrors.email = "Enter a valid email address.";
      }
      if (!password || password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      }
      if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSuccess(true);

    setTimeout(() => {
      if (!hasSubmittedRef.current) {
        hasSubmittedRef.current = true;
        onSuccess();
      }
    }, 600);
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
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={onBack}
            className="font-mono text-[11px] text-white/50 hover:text-white transition-colors cursor-pointer select-none"
          >
            &lt; BACK
          </button>
        </div>

        {/* Logo Frame */}
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

        {/* Segmented Tabs: LOGIN | CREATE ACCOUNT */}
        <div className="grid grid-cols-2 border-b border-white/10 mb-6">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`font-mono font-medium uppercase tracking-[0.15em] text-xs h-[44px] transition-colors cursor-pointer rounded-none border-b-2 ${
              mode === "login"
                ? "border-[#D4AF37] text-white"
                : "border-transparent text-white/50 hover:text-white/80"
            }`}
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => switchMode("create")}
            className={`font-mono font-medium uppercase tracking-[0.15em] text-xs h-[44px] transition-colors cursor-pointer rounded-none border-b-2 ${
              mode === "create"
                ? "border-[#D4AF37] text-white"
                : "border-transparent text-white/50 hover:text-white/80"
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Header Block Per Mode */}
        <div className="mb-6">
          <span className="font-mono text-[11px] font-medium tracking-[0.3em] uppercase text-[#00E5FF] block mb-1">
            {mode === "login" ? "[ ACCESS // OPERATOR LOGIN ]" : "[ ACCESS // NEW OPERATOR ]"}
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-[28px] leading-tight text-white">
            {mode === "login" ? "Welcome back, Operator." : "Create your account."}
          </h2>
          <p className="font-sans font-normal text-sm text-white/70 mt-1">
            {mode === "login"
              ? "Sign in to open your command deck."
              : "Set up your operator profile to get started."}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div aria-live="polite" className="sr-only">
            {Object.values(errors).join(" ")}
          </div>

          {mode === "login" ? (
            <>
              {/* Login Field: Email or Operator ID */}
              <div>
                <label
                  htmlFor="login-email-id"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1 block"
                >
                  EMAIL OR OPERATOR ID
                </label>
                <input
                  ref={firstInputRef}
                  id="login-email-id"
                  type="text"
                  autoComplete="username"
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  className={`w-full h-[44px] px-3 bg-[#0B1220] font-mono text-sm text-white border-[1.5px] rounded-none focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 ${
                    errors.emailOrId ? "border-[#EF4444]" : "border-white/25"
                  }`}
                />
                {errors.emailOrId && (
                  <p className="font-sans font-normal text-xs text-[#FCA5A5] mt-1">{errors.emailOrId}</p>
                )}
              </div>

              {/* Login Field: Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1 block"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full h-[44px] pl-3 pr-11 bg-[#0B1220] font-mono text-sm text-white border-[1.5px] rounded-none focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 ${
                      errors.password ? "border-[#EF4444]" : "border-white/25"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-0 top-0 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="font-sans font-normal text-xs text-[#FCA5A5] mt-1">{errors.password}</p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Create Field: Full Name */}
              <div>
                <label
                  htmlFor="create-name"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1 block"
                >
                  FULL NAME
                </label>
                <input
                  ref={firstInputRef}
                  id="create-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full h-[44px] px-3 bg-[#0B1220] font-mono text-sm text-white border-[1.5px] rounded-none focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 ${
                    errors.fullName ? "border-[#EF4444]" : "border-white/25"
                  }`}
                />
                {errors.fullName && (
                  <p className="font-sans font-normal text-xs text-[#FCA5A5] mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Create Field: Email */}
              <div>
                <label
                  htmlFor="create-email"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1 block"
                >
                  EMAIL
                </label>
                <input
                  id="create-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-[44px] px-3 bg-[#0B1220] font-mono text-sm text-white border-[1.5px] rounded-none focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 ${
                    errors.email ? "border-[#EF4444]" : "border-white/25"
                  }`}
                />
                {errors.email && (
                  <p className="font-sans font-normal text-xs text-[#FCA5A5] mt-1">{errors.email}</p>
                )}
              </div>

              {/* Create Field: Password */}
              <div>
                <label
                  htmlFor="create-password"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1 block"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="create-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full h-[44px] pl-3 pr-11 bg-[#0B1220] font-mono text-sm text-white border-[1.5px] rounded-none focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 ${
                      errors.password ? "border-[#EF4444]" : "border-white/25"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-0 top-0 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="font-sans font-normal text-xs text-[#FCA5A5] mt-1">{errors.password}</p>
                )}
              </div>

              {/* Create Field: Confirm Password */}
              <div>
                <label
                  htmlFor="create-confirm-password"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1 block"
                >
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="create-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full h-[44px] pl-3 pr-11 bg-[#0B1220] font-mono text-sm text-white border-[1.5px] rounded-none focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 ${
                      errors.confirmPassword ? "border-[#EF4444]" : "border-white/25"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-0 top-0 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="font-sans font-normal text-xs text-[#FCA5A5] mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSuccess}
              className="pcc-login-btn w-full"
            >
              {isSuccess ? "ACCESS GRANTED" : mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
            </button>
          </div>

          {/* Mode Switch Link */}
          <button
            type="button"
            onClick={() => switchMode(mode === "login" ? "create" : "login")}
            className="font-mono text-xs text-white/60 hover:text-white hover:underline transition-colors mt-3 text-center cursor-pointer block w-full"
          >
            {mode === "login" ? "New operator? Create account" : "Already registered? Login"}
          </button>
        </form>

        {/* Demo Notice */}
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 text-center mt-6 pt-4 border-t border-white/10">
          DEMO MODE // NO REAL AUTHENTICATION YET
        </p>
      </div>
    </div>
  );
}
