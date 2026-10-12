"use client";

import { useState } from "react";
import Button from "./Button";
import ContactModal from "./ContactModal";

type ContactButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function ContactButton({
  label,
  variant = "primary",
  className = "",
}: ContactButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={variant} className={className} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
