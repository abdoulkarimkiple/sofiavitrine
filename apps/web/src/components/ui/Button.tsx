import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-sofia-gold text-black hover:bg-sofia-gold-light",
    secondary: "border border-sofia-gold/70 text-sofia-gold hover:bg-sofia-gold hover:text-black",
    ghost: "text-sofia-cream hover:bg-white/10",
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sofia-gold disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
