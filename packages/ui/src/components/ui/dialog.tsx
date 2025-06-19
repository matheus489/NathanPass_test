import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const dialogVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
  {
    variants: {
      variant: {
        default: "bg-black/50",
        secondary: "bg-secondary/50",
        ghost: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dialogVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Dialog.displayName = "Dialog";

export { Dialog, dialogVariants }; 