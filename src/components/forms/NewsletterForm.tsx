"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { newsletterSchema, type NewsletterInput } from "@/lib/validators";

type Status = "idle" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "", company: "" } });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json()) as { message?: string };
      if (!res.ok) throw new Error(json.message ?? "Something went wrong.");
      setStatus("success");
      setMessage("Thanks for subscribing!");
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4">
      <div className="flex overflow-hidden rounded-pill bg-white p-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby="newsletter-status"
          className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-ink-2 placeholder:text-muted-2 focus:outline-none"
          {...register("email")}
        />
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("company")} />
        <button type="submit" disabled={isSubmitting} className="rounded-pill bg-primary px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      <p id="newsletter-status" role="status" className="type-small mt-2 min-h-5">
        {errors.email ? <span className="text-[#FF8A8A]">{errors.email.message}</span> : status !== "idle" && <span className={status === "success" ? "text-[#65C98A]" : "text-[#FF8A8A]"}>{message}</span>}
      </p>
    </form>
  );
}
