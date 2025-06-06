import * as React from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  className,
}: OTPInputProps) {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (value.length <= length) {
      const otpArray = value.split("");
      const filledArray = [
        ...otpArray,
        ...new Array(length - otpArray.length).fill(""),
      ];
      setOtp(filledArray);
    }
  }, [value, length]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    onChange(newOtp.join(""));

    // Focus next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, length);
    const otpArray = pasteData.split("");
    const filledArray = [
      ...otpArray,
      ...new Array(length - otpArray.length).fill(""),
    ];
    setOtp(filledArray);
    onChange(pasteData);
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          disabled={disabled}
          className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-doc-primary focus:outline-none text-lg font-semibold transition-colors"
        />
      ))}
    </div>
  );
}
