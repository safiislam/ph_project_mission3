import { z } from "zod";


const createAcademicDepertmentvalidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic depertment must be string",
            required_error: "Name is required"
        }),
        academicFaculty: z.string({
            invalid_type_error: "Academic Faculty must be string",
            required_error: "Faculty is required"
        })
    })
})
const updateAcademicDepertmentvalidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic depertment must be string",
            required_error: "Name is required"
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: "Academic Faculty must be string",
            required_error: "Faculty is required"
        }).optional()
    })
})

export const AcademicDepertmentValidations = {
    createAcademicDepertmentvalidation,
    updateAcademicDepertmentvalidation
}