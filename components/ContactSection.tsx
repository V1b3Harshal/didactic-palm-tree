"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Unknown error");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 py-20 bg-gradient-to-br from-blue-50 via-slate-100 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-raleway text-4xl md:text-5xl text-gray-800 mb-4">
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
              <h3 className="font-raleway text-2xl text-gray-800 mb-6">Let's Connect</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We're here to help you revolutionize your business with AI-powered
                voice agents. Reach out to us and let's start building the future together.
              </p>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-neumorphic">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">hello@convis.ai</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-neumorphic">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                {/* Office */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-neumorphic">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Office</p>
                    <p className="text-gray-600">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="neumorphic-card rounded-3xl p-8">
            <h3 className="text-2xl font-raleway text-gray-800 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* name & email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 border-0 rounded-2xl shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 border-0 rounded-2xl shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 border-0 rounded-2xl shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              {/* message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 border-0 rounded-2xl shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                />
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full neumorphic-button-primary px-8 py-4 rounded-2xl text-lg font-raleway transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>
                  {status === "loading"
                    ? "Sending..."
                    : status === "success"
                    ? "Sent!"
                    : "Send Message"}
                </span>
              </button>

              {/* feedback */}
              {status === "error" && (
                <p className="text-red-600 mt-2">{errorMsg}</p>
              )}
              {status === "success" && (
                <p className="text-green-600 mt-2">
                  Thanks for your message—we’ll be in touch soon!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
