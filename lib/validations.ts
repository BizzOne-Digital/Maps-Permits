export type ValidationResult = { valid: boolean; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadInput(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};
  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();

  if (!name) errors.name = "Name is required.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "A valid email is required.";
  if (!message) errors.message = "Please include a short message.";

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateServiceInput(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};
  const title = String(data.title || "").trim();
  const slug = String(data.slug || "").trim();
  const shortDescription = String(data.shortDescription || "").trim();
  const description = String(data.description || "").trim();

  if (!title) errors.title = "Title is required.";
  if (!slug) errors.slug = "Slug is required.";
  else if (!/^[a-z0-9-]+$/.test(slug))
    errors.slug = "Slug can only contain lowercase letters, numbers and hyphens.";
  if (!shortDescription) errors.shortDescription = "Short description is required.";
  if (!description) errors.description = "Description is required.";

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateTestimonialInput(
  data: Record<string, unknown>
): ValidationResult {
  const errors: Record<string, string> = {};
  const name = String(data.name || "").trim();
  const quote = String(data.quote || "").trim();
  const rating = Number(data.rating);

  if (!name) errors.name = "Name is required.";
  if (!quote) errors.quote = "Quote is required.";
  if (!rating || rating < 1 || rating > 5)
    errors.rating = "Rating must be between 1 and 5.";

  return { valid: Object.keys(errors).length === 0, errors };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
