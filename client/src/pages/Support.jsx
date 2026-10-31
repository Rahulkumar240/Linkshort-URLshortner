import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, Send, CheckCircle } from "lucide-react";
import Brand from "../components/Brand";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const Support = () => {
  const [form, setForm] = useState({
    subject: "",
    category: "General question",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.subject.trim() || !form.message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // TODO: Connect this form to the backend support API.
    // For now, this only demonstrates the frontend flow.
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSubmitted(true);
    setLoading(false);
    setForm({
      subject: "",
      category: "General question",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Brand />
          <Link
            to="/app"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <HelpCircle size={25} />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              How can we help?
            </h1>
            <p className="mt-2 text-slate-500">
              Send us a message and our support team will be able to help you.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <CheckCircle className="mx-auto mb-3 text-green-600" size={36} />
              <h2 className="text-lg font-semibold text-green-800">
                Request submitted
              </h2>
              <p className="mt-2 text-sm text-green-700">
                This is a frontend demonstration. Your request has not yet
                been sent to a support server.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Subject *
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What do you need help with?"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>General question</option>
                  <option>Account problem</option>
                  <option>URL creation problem</option>
                  <option>Analytics problem</option>
                  <option>Report a bug</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your problem in detail..."
                  rows={6}
                  required
                  className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={17} />
                {loading ? "Submitting..." : "Submit request"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Need to return to your links?{" "}
          <Link to="/links" className="font-medium text-blue-600 hover:underline">
            View your links
          </Link>
        </p>
      </div>
      <div className="mt-8 border-t border-slate-200 pt-6">
  <h2 className="text-center text-lg font-semibold text-slate-900">
    Let's connect!
  </h2>

  <p className="mt-2 text-center text-sm text-slate-500">
    I'm a developer building projects and learning new technologies.
    Feel free to connect with me or explore my work.
  </p>

  <div className="mt-5 flex justify-center gap-4">
    <a
      href="https://github.com/YOUR_GITHUB_USERNAME"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
    >
      <Github size={19} />
      GitHub
      <ExternalLink size={14} />
    </a>

    <a
      href="https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      <Linkedin size={19} />
      LinkedIn
      <ExternalLink size={14} />
    </a>
  </div>
</div>
    </div>
  );
};

export default Support;