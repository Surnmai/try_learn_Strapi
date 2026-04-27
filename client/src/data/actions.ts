"use server";
// import Zod
import { z } from "zod";
import { subscribeService } from "./services";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export async function subscribeAction(prevState: any, formData: FormData) {
  // console.log("Our first server action");
  const email = formData.get("email");

  const validatedFields = subscribeSchema.safeParse({ email });
  if (!validatedFields.success) {
    // console.dir(validatedFields.error.flatten().fieldErrors, { depth: null });
    return {
      ...prevState,
      zodErrors: validatedFields.error?.flatten().fieldErrors,
      strapiErrors: null,
    };
  }
  const responseData = await subscribeService(validatedFields.data.email);

  // When there is an error specific to the server
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      errorMessage: "Ops! Something went wrong. Please try again",
    };
  }

  // When there is an error specific to the strapi
  // This will be triggered when an existing email is used
  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      errorMessage: "Failed to subscribe",
    };
  }

  // When there is no error
  return {
    ...prevState,
    strapiErrors: responseData.error,
    zodErrors: null,
    errorMessage: null,
    successMessage: "Successfully Subscribed!",
  };

  // console.log(email, "Our email input from form");
}
