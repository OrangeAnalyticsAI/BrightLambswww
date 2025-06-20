'use client';

import { useState, useEffect } from 'react';
import { Mail, MapPin, Calendar, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Form validation
  useEffect(() => {
    const errors: FormErrors = {};

    // Name validation
    if (touched.name) {
      if (formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      } else if (formData.name.length > 100) {
        errors.name = 'Name must be less than 100 characters';
      }
    }

    // Email validation
    if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (touched.subject) {
      if (formData.subject.trim().length < 3) {
        errors.subject = 'Subject must be at least 3 characters';
      } else if (formData.subject.length > 200) {
        errors.subject = 'Subject must be less than 200 characters';
      }
    }

    // Message validation
    if (touched.message) {
      if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
      } else if (formData.message.length > 2000) {
        errors.message = 'Message must be less than 2000 characters';
      }
    }

    setFormErrors(errors);
  }, [formData, touched]);

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      formData.name.length <= 100 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.subject.trim().length >= 3 &&
      formData.subject.length <= 200 &&
      formData.message.trim().length >= 10 &&
      formData.message.length <= 2000
    );
  };

  // Helper to show remaining characters
  const getRemainingChars = (field: keyof FormData, max: number) => {
    const length = formData[field].length;
    const remaining = max - length;
    const isOver = remaining < 0;
    return (
      <span className={`mt-1 text-xs ${isOver ? 'text-red-500' : 'text-gray-500'}`}>
        {remaining} characters remaining
      </span>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (!isFormValid()) {
      return;
    }

    setStatus('submitting');
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      // Reset form on successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Reset touched state
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });

      // Reset success message after 8 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 8000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');

      // Reset error state after 8 seconds
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 8000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 py-20 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6 text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-800 dark:text-gray-100 md:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-700 dark:text-gray-300">
              Have questions or ready to get started? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-16 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 md:grid-cols-2">
                {/* Contact Information */}
                <div>
                  <h2 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
                    Get in Touch
                  </h2>
                  <p className="mb-8 text-gray-600 dark:text-gray-300">
                    Fill out the form or reach out to us directly. Our team will get back to you as
                    soon as possible.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-3">
                        <span className="text-xl font-bold text-blue-600">@</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Email Us</h3>
                        <a
                          href="mailto:info@brightlambs.co.uk"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          info@brightlambs.co.uk
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-3">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                          Schedule a Consultation
                        </h3>
                        <p className="mb-2 text-gray-600 dark:text-gray-400">
                          Book a call with our team to discuss your needs
                        </p>
                        <a
                          href="https://calendly.com/jen-brightlambs/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Book Now
                          <svg
                            className="ml-1 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-3">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                          Correspondence Address
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          128 City Road
                          <br />
                          London, EC1V 2NX
                          <br />
                          UK
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="rounded-lg bg-gray-50 p-8 shadow-md dark:bg-gray-800">
                  <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
                    Send us a Message
                  </h2>

                  {status === 'success' && (
                    <div className="mb-6 rounded border border-green-400 bg-green-100 p-4 text-green-700">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        <span>Your message has been sent successfully!</span>
                      </div>
                    </div>
                  )}

                  {status === 'error' && error && (
                    <div className="mb-6 rounded border border-red-400 bg-red-100 p-4 text-red-700">
                      <div className="flex items-center">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <label
                          htmlFor="name"
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Name
                        </label>
                        {touched.name && (
                          <span className="text-xs text-gray-500">{formData.name.length}/100</span>
                        )}
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('name')}
                        maxLength={100}
                        className={`w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                          formErrors.name
                            ? 'border-red-500'
                            : 'border-gray-300 dark:border-gray-600'
                        } bg-white text-gray-900 dark:bg-gray-700 dark:text-white`}
                        placeholder="Your name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        className={`w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                          formErrors.email
                            ? 'border-red-500'
                            : 'border-gray-300 dark:border-gray-600'
                        } bg-white text-gray-900 dark:bg-gray-700 dark:text-white`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between">
                        <label
                          htmlFor="subject"
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Subject
                        </label>
                        {touched.subject && (
                          <span className="text-xs text-gray-500">
                            {formData.subject.length}/200
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={() => handleBlur('subject')}
                        maxLength={200}
                        className={`w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                          formErrors.subject
                            ? 'border-red-500'
                            : 'border-gray-300 dark:border-gray-600'
                        } bg-white text-gray-900 dark:bg-gray-700 dark:text-white`}
                        placeholder="What's this about?"
                      />
                      {formErrors.subject && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {formErrors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between">
                        <label
                          htmlFor="message"
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Message
                        </label>
                        {touched.message && (
                          <span className="text-xs text-gray-500">
                            {formData.message.length}/2000
                          </span>
                        )}
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur('message')}
                        maxLength={2000}
                        className={`w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                          formErrors.message
                            ? 'border-red-500'
                            : 'border-gray-300 dark:border-gray-600'
                        } bg-white text-gray-900 dark:bg-gray-700 dark:text-white`}
                        placeholder="Your message here..."
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`flex w-full items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm ${
                          status === 'submitting' || !isFormValid()
                            ? 'cursor-not-allowed bg-blue-400 dark:bg-blue-600'
                            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                        } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" />
                            Sending...
                          </>
                        ) : status === 'success' ? (
                          <>
                            <CheckCircle className="-ml-1 mr-2 h-5 w-5" />
                            Message Sent!
                          </>
                        ) : (
                          <>
                            <Send className="-ml-1 mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
