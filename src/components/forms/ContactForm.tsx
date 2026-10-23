"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Textarea } from "@/components/ui/Textarea";
import { contactSchema, type ContactInput } from "@/lib/validators";

const defaults: ContactInput = { firstName: "", lastName: "", email: "", countryCode: "+1", phone: "", message: "", company: "" };

/** `placeholders` is opt-in so existing usages (home contact section) render exactly as before. */
export function ContactForm({ placeholders = false }: { placeholders?: boolean } = {}) {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: defaults });

  const onSubmit = async (data: ContactInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json()) as { message?: string; fieldErrors?: Partial<Record<keyof ContactInput, string[]>> };
      if (!res.ok) {
        if (json.fieldErrors) {
          for (const [field, msgs] of Object.entries(json.fieldErrors)) {
            if (msgs?.[0]) setError(field as keyof ContactInput, { message: msgs[0] });
          }
        }
        throw new Error(json.message ?? "Something went wrong. Please try again.");
      }
      reset(defaults);
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const closeModal = useCallback(() => setSuccess(false), []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5" aria-describedby={serverError ? "contact-error" : undefined}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First Name" id="firstName" required error={errors.firstName?.message}>
            <Input id="firstName" autoComplete="given-name" placeholder={placeholders ? "First Name" : undefined} invalid={!!errors.firstName} aria-required {...register("firstName")} />
          </Field>
          <Field label="Last Name" id="lastName" required error={errors.lastName?.message}>
            <Input id="lastName" autoComplete="family-name" placeholder={placeholders ? "Last Name" : undefined} invalid={!!errors.lastName} aria-required {...register("lastName")} />
          </Field>
        </div>
        <Field label="Email" id="email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" placeholder={placeholders ? "eg. johndoe@example.com" : undefined} invalid={!!errors.email} aria-required {...register("email")} />
        </Field>
        <Field label="Phone Number" id="phone" error={errors.phone?.message}>
          <Controller
            control={control}
            name="countryCode"
            render={({ field }) => <PhoneInput id="phone" placeholder={placeholders ? "Phone number" : undefined} invalid={!!errors.phone} countryCode={field.value} onCountryCodeChange={field.onChange} {...register("phone")} />}
          />
        </Field>
        <Field label="Message" id="message" error={errors.message?.message}>
          <Textarea id="message" placeholder={placeholders ? "Enter a description..." : undefined} invalid={!!errors.message} {...register("message")} />
        </Field>

        {/* Honeypot — hidden from people and assistive tech. */}
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="company">Company</label>
          <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        {serverError && (
          <p id="contact-error" role="alert" className="rounded-[10px] border border-danger/30 bg-[#FFF0F0] px-4 py-3 text-[14px] text-danger">
            {serverError}
          </p>
        )}

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:justify-self-start">
          {isSubmitting ? "Sending..." : "Submit"}
        </Button>
        <p className="text-[13px] leading-relaxed text-muted">
          By submitting this form, you agree to our{" "}
          <Link href="/axon-adhd-privacy-policy/" className="font-medium text-primary underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-conditions/" className="font-medium text-primary underline underline-offset-2">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </form>

      <Modal open={success} onClose={closeModal} title="Thank You!">
        <p>Thank you for contacting us. Your message has been successfully submitted.</p>
        <p className="mt-2">Our team will get back to you as soon as possible.</p>
      </Modal>
    </>
  );
}
