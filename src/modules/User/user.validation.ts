import { z } from "zod";

const userValidationSchema = z.object({
    // id: z.string(),
    password: z.string({
        invalid_type_error: "Password Must be String"
    }).max(20, { message: 'password can not be 20 characters' }),
    // needsPasswordChange: z.boolean().optional().default(true),
    // role: z.enum(['student', 'admin', 'faculty']),
    // status: z.enum(['in-progress', "blocked"]).default("in-progress"),
    // isDeleted: z.boolean().optional().default(false)

})

export const UserValidation = {
    userValidationSchema
}