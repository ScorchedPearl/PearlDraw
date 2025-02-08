"use client";

import React, { useMemo, useState } from "react";
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { Label } from "@utils/components/ui/label";
import { Input } from "@utils/components/ui/input";

interface PasswordInputProps {
  className?: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const PasswordInput = React.forwardRef<
  HTMLDivElement,
  PasswordInputProps
>(({ className, password, setPassword }, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-gray-700";
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-orange-500";
    if (score === 4) return "bg-teal-500";
    return "bg-cyan-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score <= 3) return "Medium password";
    if (score === 4) return "Strong password";
    return "Very strong password";
  };

  return (
    <div className={`  bg-black/50 backdrop-blur-xl p-4 rounded-lg ${className}`} ref={ref}>
      <div className="space-y-2">
        <Label htmlFor="input-51" className="text-white">Password Strength</Label>
        <div className="relative">
          <Input
            id="input-51"
            className="pe-9 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:ring-cyan-500"
            placeholder="Password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={strengthScore < 5}
            aria-describedby="password-strength"
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-gray-400 outline-offset-2 transition-colors hover:text-cyan-400 focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500/70"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-700"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(
            strengthScore
          )} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 5) * 100}%` }}
        ></div>
      </div>

      <p
        id="password-strength"
        className="mb-2 text-sm font-medium text-cyan-400"
      >
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check
                size={16}
                className="text-teal-400"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-gray-400"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${
                req.met ? "text-teal-400" : "text-gray-400"
              }`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
