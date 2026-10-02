"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rfqSchema, type RfqValues } from "@/lib/rfq-schema";
import { sectors, serviceGroups } from "@/lib/nav";
import { submitRfq } from "@/app/request-a-quote/actions";
import { placeholders } from "@/content/placeholder";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function RfqForm() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RfqValues>({
    resolver: zodResolver(rfqSchema),
    defaultValues: { website: "", sector: "", service: "" },
  });
  const submit = async (values: RfqValues) => {
    setSuccess(false);
    const form = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) form.append(key, value);
    });
    try {
      const result = await submitRfq(form);
      if (result.ok) {
        setSuccess(true);
      } else {
        Object.entries(result.errors).forEach(([key, messages]) => {
          if (messages?.[0])
            setError(key as keyof RfqValues, { message: messages[0] });
        });
      }
    } catch {
      setError("root", {
        message: "Validation could not complete. Please try again.",
      });
    }
  };
  const fieldClass =
    "mt-2 min-h-12 w-full border border-line bg-surface px-4 py-3 text-ink";
  const error = (name: keyof RfqValues) =>
    errors[name] && (
      <p id={`${name}-error`} role="alert" className="mt-2 text-sm text-error">
        {errors[name]?.message}
      </p>
    );
  const a11y = (name: keyof RfqValues) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  return (
    <div className="max-w-3xl">
      <p className="mb-8 border-s-4 border-accent bg-surface p-5 text-sm leading-relaxed">
        {placeholders.rfq.notice} <TodoBadge />
      </p>
      <form
        onSubmit={handleSubmit(submit)}
        noValidate
        encType="multipart/form-data"
        className="grid gap-6 sm:grid-cols-2"
      >
        {(
          [
            {
              name: "name",
              label: "Full name",
              autocomplete: "name",
              type: "text",
            },
            {
              name: "company",
              label: "Company",
              autocomplete: "organization",
              type: "text",
            },
            {
              name: "email",
              label: "Email",
              autocomplete: "email",
              type: "email",
            },
            { name: "phone", label: "Phone", autocomplete: "tel", type: "tel" },
          ] as const
        ).map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label} <span aria-hidden="true">*</span>
            </label>
            <input
              id={field.name}
              type={field.type}
              autoComplete={field.autocomplete}
              required
              {...register(field.name)}
              {...a11y(field.name)}
              className={fieldClass}
            />
            {error(field.name)}
          </div>
        ))}
        <div>
          <label htmlFor="sector" className="text-sm font-medium">
            Sector *
          </label>
          <select
            id="sector"
            required
            {...register("sector")}
            {...a11y("sector")}
            className={fieldClass}
          >
            <option value="">Choose a sector</option>
            {sectors.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
          {error("sector")}
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-medium">
            Service *
          </label>
          <select
            id="service"
            required
            {...register("service")}
            {...a11y("service")}
            className={fieldClass}
          >
            <option value="">Choose a service</option>
            {serviceGroups.map((group) => (
              <optgroup key={group.title} label={group.title}>
                {group.services.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </optgroup>
            ))}
          </select>
          {error("service")}
          <p className="mt-3 text-xs text-muted">
            {placeholders.rfqServiceReview.text}{" "}
            <ReviewBadge {...placeholders.rfqServiceReview} />
          </p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="scope" className="text-sm font-medium">
            Project scope *
          </label>
          <textarea
            id="scope"
            rows={6}
            required
            {...register("scope")}
            {...a11y("scope")}
            className={fieldClass}
          />
          {error("scope")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="file" className="text-sm font-medium">
            Supporting file (optional)
          </label>
          <p id="file-help" className="mt-2 text-xs text-muted">
            PDF, DOCX or XLSX. Maximum 10 MB.
          </p>
          <input
            id="file"
            type="file"
            accept=".pdf,.docx,.xlsx"
            onChange={(event) =>
              setValue("file", event.target.files?.[0], {
                shouldValidate: true,
              })
            }
            aria-invalid={!!errors.file}
            aria-describedby={`file-help${errors.file ? " file-error" : ""}`}
            className={`${fieldClass} file:me-4 file:border-0 file:bg-paper file:px-3 file:py-2`}
          />
          {error("file")}
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        <div className="sm:col-span-2">
          <p className="mb-4 text-xs text-muted">* Required fields</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-12 rounded-card bg-accent px-6 py-3 font-semibold text-surface-dark disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "Validating…" : "Validate quote request"}
          </button>
          {errors.root && (
            <p role="alert" className="mt-4 text-sm text-error">
              {errors.root.message}
            </p>
          )}
          {success && (
            <p role="status" className="mt-6 border border-line bg-surface p-5">
              {placeholders.rfq.success} <TodoBadge />
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
