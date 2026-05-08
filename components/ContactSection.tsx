"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast.success("Message sent successfully!");
      reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="px-6 py-24 bg-gradient-to-br from-blue-50 via-slate-100 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-raleway text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's discuss how our
            voice agents can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Panel */}
          <div className="space-y-8">
            <div className="neumorphic-card rounded-3xl p-8">
              <h3 className="font-raleway text-2xl font-semibold text-gray-800 mb-6">Let's Connect</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We're here to help you revolutionize your business with AI-powered
                voice agents. Reach out to us and let's start building the future together.
              </p>
              <div className="space-y-6">
                <ContactInfoItem 
                  icon={<Mail className="w-5 h-5 text-white" />} 
                  title="Email" 
                  value="hello@convis.ai" 
                  gradient="from-blue-500 to-purple-500"
                />
                <ContactInfoItem 
                  icon={<Phone className="w-5 h-5 text-white" />} 
                  title="Phone" 
                  value="+1 (555) 123-4567" 
                  gradient="from-purple-500 to-pink-500"
                />
                <ContactInfoItem 
                  icon={<MapPin className="w-5 h-5 text-white" />} 
                  title="Office" 
                  value="San Francisco, CA" 
                  gradient="from-green-500 to-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="neumorphic-card rounded-3xl p-8">
            <h3 className="text-2xl font-raleway font-semibold text-gray-800 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  id="name"
                  register={register("name")}
                  error={errors.name?.message}
                  placeholder="John Doe"
                />
                <FormInput
                  label="Email Address"
                  id="email"
                  type="email"
                  register={register("email")}
                  error={errors.email?.message}
                  placeholder="john@example.com"
                />
              </div>

              <FormInput
                label="Company Name"
                id="company"
                register={register("company")}
                error={errors.company?.message}
                placeholder="Your Company"
              />

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  placeholder="Tell us about your project..."
                  className={`w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 border-0 rounded-2xl shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none ${
                    errors.message ? "ring-2 ring-red-500" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full neumorphic-button-primary px-8 py-4 rounded-2xl text-lg font-raleway font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoItem = ({ icon, title, value, gradient }: { icon: React.ReactNode, title: string, value: string, gradient: string }) => (
  <div className="flex items-center space-x-4">
    <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-neumorphic`}>
      {icon}
    </div>
    <div>
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

const FormInput = ({ label, id, type = "text", register, error, placeholder }: any) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 border-0 rounded-2xl shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
        error ? "ring-2 ring-red-500" : ""
      }`}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

