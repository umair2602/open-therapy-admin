import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export const showSuccessToast = (text: string) => {
  toast(text, {
    icon: (
      <div className="h-5 w-5 rounded-full flex justify-center items-center bg-green-500">
        <Check color="#fff" size={12} />
      </div>
    ),
  });
};

export const showErrorToast = (text: string) => {
  toast(text, {
    icon: (
      <div className="h-5 w-5 rounded-full flex justify-center items-center bg-red-500">
        <X color="#fff" size={12} />
      </div>
    ),
  });
};
