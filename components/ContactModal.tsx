"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { sendContactMessage } from "@/lib/sendContactMessage";
import {
  EMAIL_DISPLAY,
  EMAIL_HREF,
  HOURS,
  PHONE_DISPLAY,
  PHONE_HREF,
  SERVICE_AREA,
} from "@/lib/contact";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

const labelClasses = "font-body text-sm text-foreground";
const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted/60 focus:border-brand focus:outline-none";
const linkClasses =
  "font-body text-sm text-foreground underline underline-offset-4 hover:text-brand";

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleClose() {
    document.body.style.overflow = "";
    setSent(false);
    setError("");
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!phone && !email) {
      setError("Please add a phone number or email so we can reach you.");
      return;
    }

    setError("");
    setSending(true);
    try {
      const result = await sendContactMessage(data);
      if (result.ok) setSent(true);
      else setError(result.error);
    } catch {
      setError("Something went wrong. Please call or text us instead.");
    } finally {
      setSending(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={(event) => {
        // Clicks on the dialog element itself are clicks on the backdrop.
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      aria-labelledby="contact-modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-4xl rounded-lg border border-border bg-surface p-0 text-left text-foreground shadow-2xl backdrop:bg-black/70"
    >
      <div className="relative p-6 md:p-8">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
          className="absolute right-3 top-3 cursor-pointer rounded-md p-2 text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_3fr] md:gap-0">
          <div className="text-left md:pr-8">
            <h2
              id="contact-modal-title"
              className="font-heading text-3xl text-foreground"
            >
              Contact Us
            </h2>

            <h3 className="mt-10 font-heading text-lg text-foreground">Hours</h3>
            <p className="mt-1 font-body text-sm text-muted">
              {HOURS.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <h3 className="mt-8 font-heading text-lg text-foreground">
              Location
            </h3>
            <p className="mt-1 font-body text-sm text-muted">{SERVICE_AREA}</p>

            <h3 className="mt-8 font-heading text-lg text-foreground">
              Call or Text
            </h3>
            <a href={PHONE_HREF} className={linkClasses}>
              {PHONE_DISPLAY}
            </a>

            <h3 className="mt-8 font-heading text-lg text-foreground">Email</h3>
            <a href={EMAIL_HREF} className={`${linkClasses} break-all`}>
              {EMAIL_DISPLAY}
            </a>
          </div>

          <div className="border-t border-border pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            {sent ? (
              <div className="flex h-full flex-col items-start justify-center text-left">
                <h3 className="font-heading text-2xl text-foreground">
                  Thanks, we got your message.
                </h3>
                <p className="mt-2 font-body text-sm text-muted">
                  Levi will be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className={labelClasses}>
                  Name
                  <input
                    name="name"
                    type="text"
                    required
                    autoFocus
                    autoComplete="name"
                    className={inputClasses}
                  />
                </label>
                <label className={labelClasses}>
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClasses}
                  />
                </label>
                <label className={labelClasses}>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputClasses}
                  />
                </label>
                <label className={labelClasses}>
                  Message
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className={`${inputClasses} resize-y`}
                  />
                </label>

                <input
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {error && (
                  <p className="font-body text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={sending}
                  className="mt-2 w-full disabled:cursor-wait disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
