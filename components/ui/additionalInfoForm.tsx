"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  TagsInput
} from "@/components/ui/tags-input"
import {
  PhoneInput
} from "@/components/ui/phone-input";
import {
  Input
} from "@/components/ui/input"

const formSchema = z.object({
  name_8716040558: z.array(z.string()).nonempty("Please at least one item"),
  name_5314857821: z.string(),
  name_5700438196: z.string().optional(),
  name_0085759423: z.string()
});

export default function additionalInfoForm() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "name_8716040558": ["test"]
    },
  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="name_8716040558"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Which musical genres do you enjoy?</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>Add genres.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
          <FormField
            control={form.control}
            name="name_5314857821"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="Placeholder"
                    {...field}
                    defaultCountry="TR"
                  />
                </FormControl>
              <FormDescription>Enter your phone number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            
        
        <FormField
          control={form.control}
          name="name_5700438196"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input 
                placeholder="e.g. hackscofficial"
                
                type=""
                {...field} />
              </FormControl>
              <FormDescription>Enter your Instagram username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_0085759423"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord</FormLabel>
              <FormControl>
                <Input 
                placeholder="e.g. qepsi"
                
                type=""
                {...field} />
              </FormControl>
              <FormDescription>Enter your Discord username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
