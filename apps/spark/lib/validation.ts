import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  redirect: z.string().optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  redirect: z.string().optional(),
});

/** Connect/disconnect an add-on from the account. */
export const toggleAddOnSchema = z.object({
  addOnId: z.string().min(1),
  active: z.boolean(),
});

/** Change the account's mobile plan. */
export const changePlanSchema = z.object({
  planId: z.string().min(1),
});

export const updateSettingsSchema = z.object({
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  mobile: z.string().min(6).optional(),
  notifications: z
    .object({
      billing: z.boolean().optional(),
      usageAlerts: z.boolean().optional(),
      roamingTips: z.boolean().optional(),
      marketing: z.boolean().optional(),
    })
    .optional(),
  privacy: z
    .object({
      shareUsageForOffers: z.boolean().optional(),
      twoFactor: z.boolean().optional(),
    })
    .optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ToggleAddOnInput = z.infer<typeof toggleAddOnSchema>;
export type ChangePlanInput = z.infer<typeof changePlanSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
