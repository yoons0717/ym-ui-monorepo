import React from "react";
import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드의 시각적 변형 */
  variant?: "default" | "error";
  /** 라벨 텍스트 */
  label?: string;
  /** 에러 메시지 */
  error?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      label,
      error,
      helperText,
      fullWidth = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    // 고유 ID 생성 (label과 연결용)
    const inputId = id || React.useId();
    const isError = variant === "error" || !!error;

    // 기본 클래스 (Button과 일관성)
    const baseClasses =
      "px-4 py-2 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm";

    // variant별 클래스
    const variantClasses = {
      default:
        "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring-blue-500",
      error:
        "border-red-500 bg-white text-gray-900 placeholder-gray-500 focus:border-red-600 focus:ring-red-500",
    };

    const inputClasses = clsx(
      baseClasses,
      variantClasses[isError ? "error" : "default"],
      fullWidth && "w-full",
      className
    );

    return (
      <div className={clsx("flex flex-col", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        {/* Input Field */}
        <input ref={ref} id={inputId} className={inputClasses} {...props} />

        {/* Error Message */}
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}

        {/* Helper Text */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
