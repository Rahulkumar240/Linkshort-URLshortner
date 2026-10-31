
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Message:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const inputStyle =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-black outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100";

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link to="/" className="text-2xl font-extrabold tracking-tight text-purple-700">
            Linkly<span className="text-gray-900">.</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link to="/" className="transition hover:text-purple-700">
              Home
            </Link>

            <Link to="/dashboard" className="transition hover:text-purple-700">
              Dashboard
            </Link>

            <Link to="/contact" className="font-semibold text-purple-700">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium transition hover:border-purple-400 hover:text-purple-700"
            >
              ← Back
            </button>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
          Contact Linkly
        </span>

        <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-black sm:text-5xl md:text-6xl">
          Let's Talk About{" "}
          <span className="text-purple-700">Your Ideas.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
          Have a question, suggestion, or need technical assistance?
          We'd love to hear from you. Let's make something great together.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800"
          >
            Explore Linkly
          </Link>

          <Link
            to="/dashboard"
            className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-800 transition hover:border-purple-400 hover:text-purple-700"
          >
            Dashboard →
          </Link>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 lg:grid-cols-5">

        {/* Left Information */}
        <div className="space-y-8 lg:col-span-2">

          <div>
            <h2 className="text-3xl font-bold text-black">
              Get in Touch
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Our team is always ready to help. Reach out to us
              and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="flex gap-4 rounded-2xl border border-purple-100 bg-purple-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-700 text-xl text-white">
              ✉
            </div>

            <div>
              <h3 className="font-bold text-black">Email Support</h3>
              <p className="mt-2 text-sm text-gray-500">
                For general inquiries and questions.
              </p>
              <a
                href="mailto:hello@linkly.app"
                className="mt-2 inline-block font-semibold text-purple-700 hover:underline"
              >
                hello@linkly.app
              </a>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-purple-100 bg-purple-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-700 text-xl text-white">
              💬
            </div>

            <div>
              <h3 className="font-bold text-black">Technical Support</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Having trouble creating or managing your shortened links?
                We're here to help.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-purple-100 bg-purple-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-700 text-xl text-white">
              ⚡
            </div>

            <div>
              <h3 className="font-bold text-black">Quick Assistance</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                We aim to respond to your questions promptly.
              </p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-xl shadow-purple-100/50 sm:p-10 lg:col-span-3">

          <h2 className="text-2xl font-bold text-black">
            Send Us a Message
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below and tell us how we can help.
          </p>

          {submitted && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              ✓ Your message was submitted successfully (demo only).
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Subject
              </label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={inputStyle}
              >
                <option value="">Choose a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="5"
                required
                className={`${inputStyle} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-700 px-6 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:bg-purple-800 active:translate-y-0"
            >
              Send Message →
            </button>

            <p className="text-center text-xs text-gray-400">
              Your information is used only to respond to your inquiry.
            </p>

          </form>
        </div>

      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-purple-50/50 px-6 py-20">

        <div className="mx-auto max-w-4xl">

          <div className="mb-12 text-center">
            <span className="font-semibold text-purple-700">
              FAQs
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-black">
              Frequently Asked Questions
            </h2>

            <p className="mt-3 text-gray-500">
              Find answers to some common questions.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is Linkly?",
                a: "Linkly is a URL shortening platform that helps you create, manage, and track short links."
              },
              {
                q: "Can I track my shortened URLs?",
                a: "Yes! Linkly provides analytics to help you understand clicks and link performance."
              },
              {
                q: "Can I customize my short links?",
                a: "Linkly can support custom aliases so your shortened URLs are easier to recognize and share."
              },
              {
                q: "How can I report an issue?",
                a: "Submit the contact form above and select Technical Support or Bug Report."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-purple-100 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-black">
                  {faq.q}
                  <span className="text-xl text-purple-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">

          <Link to="/" className="text-2xl font-extrabold text-purple-700">
            Linkly.
          </Link>

          <p className="text-sm text-gray-500">
            © 2026 Linkly. Built to make links work better.
          </p>

          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="text-gray-600 hover:text-purple-700">
              Home
            </Link>

            <Link to="/dashboard" className="text-gray-600 hover:text-purple-700">
              Dashboard
            </Link>

            <Link to="/contact" className="text-purple-700">
              Contact
            </Link>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Contact;
