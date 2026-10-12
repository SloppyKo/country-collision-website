"use server";

import { EMAIL_DISPLAY } from "@/lib/contact";

const FROM = "Country Collision Website <website@countrycollisionhanford.com>";

type Result = { ok: true } | { ok: false; error: string };

function field(data: FormData, name: string, maxLength: number) {
  return String(data.get(name) ?? "").trim().slice(0, maxLength);
}

export async function sendContactMessage(data: FormData): Promise<Result> {
  // Hidden field real visitors never see; bots that fill it get a silent "success".
  if (field(data, "company", 200)) return { ok: true };

  const name = field(data, "name", 200);
  const phone = field(data, "phone", 50);
  const email = field(data, "email", 200);
  const message = field(data, "message", 5000);

  if (!name || !message) {
    return { ok: false, error: "Please add your name and a message." };
  }
  if (!phone && !email) {
    return {
      ok: false,
      error: "Please add a phone number or email so we can reach you.",
    };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  const apiKey = process.env.CountryCollision_Email;
  if (!apiKey) {
    console.error("CountryCollision_Email is not set; contact form can't send.");
    return { ok: false, error: "Something went wrong. Please call or text us instead." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [EMAIL_DISPLAY],
      ...(email ? { reply_to: email } : {}),
      subject: `New website message from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone || "-"}`,
        `Email: ${email || "-"}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Resend error", response.status, await response.text());
    return { ok: false, error: "Something went wrong. Please call or text us instead." };
  }

  return { ok: true };
}
