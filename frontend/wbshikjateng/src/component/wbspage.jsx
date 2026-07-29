import React, { useRef, useState } from "react";
import lawImage from "../assets/law.jpg"; // Adjust path if needed

const scrollToSection = (ref) => {
  ref.current.scrollIntoView({ behavior: "smooth" });
};

export default function WbsPage() {
  const sectionRefs = Array.from({ length: 7 }, () => useRef(null));
  const [form, setForm] = useState({
    name: "",
    branch: "",
    department: "",
    date: "",
    amount: "",
    incident: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Complaint sent to admin email!");
      } else {
        alert("Failed to send complaint.");
      }
    } catch (err) {
      alert("Error sending complaint.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="flex justify-between items-center px-8 py-4">
          <span className="text-2xl font-bold text-blue-700">WBS Jateng</span>
          <ul className="flex gap-8 text-lg font-medium">
            <li>
              <button
                className="hover:text-blue-700 transition"
                onClick={() => scrollToSection(sectionRefs[0])}
              >
                Complaints
              </button>
            </li>
            <li>
              <button
                className="hover:text-blue-700 transition"
                onClick={() => scrollToSection(sectionRefs[5])}
              >
                Violations
              </button>
            </li>
            <li>
              <button
                className="hover:text-blue-700 transition"
                onClick={() => scrollToSection(sectionRefs[6])}
              >
                About
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Section 1: Description & Complaint Form */}
      <section
        ref={sectionRefs[0]}
        className="relative py-16 px-6"
        style={{
          background: `linear-gradient(to right, #eff6ff 60%, rgba(255,255,255,0.8)), url(${lawImage}) center/cover no-repeat`,
        }}
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="bg-white/80 rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              Welcome to WBS Jateng
            </h2>
            <p className="mb-6 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
              urna eu tincidunt consectetur, nisi nisl aliquam urna, eget aliquam
              massa nisl quis neque.
            </p>
          </div>
          <form
            className="bg-white rounded-lg shadow-lg p-8 space-y-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              Submit a Complaint
            </h3>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              name="branch"
              value={form.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Branch Office</option>
              <option value="Semarang">Semarang</option>
              <option value="Solo">Solo</option>
              <option value="Pekalongan">Pekalongan</option>
              <option value="Purwokerto">Purwokerto</option>
            </select>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Reported Department/Unit"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="Date (ddMMYYYY)"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              pattern="\d{2}\d{2}\d{4}"
              required
            />
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="0"
              required
            />
            <textarea
              name="incident"
              value={form.incident}
              onChange={handleChange}
              placeholder="Incident Description"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              required
            />
            <input
              type="file"
              name="attachment"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full"
              required
            />
            <small className="block text-gray-500 mb-2">
              Attachment file max 10MB
            </small>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
            >
              Send to Admin Email
            </button>
          </form>
        </div>
        <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
      </section>

      {/* Section 2: Website Explanation with Icons */}
      <section ref={sectionRefs[1]} className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-blue-700">How WBS Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-blue-700 text-5xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6"
                  />
                </svg>
              </span>
              <h3 className="font-semibold text-lg mb-2">Easy Reporting</h3>
              <p className="text-center text-gray-600">
                Report complaints easily through our online form.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-700 text-5xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <h3 className="font-semibold text-lg mb-2">Fast Response</h3>
              <p className="text-center text-gray-600">
                Receive timely feedback and follow-up on your reports.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-700 text-5xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <h3 className="font-semibold text-lg mb-2">Secure & Confidential</h3>
              <p className="text-center text-gray-600">
                Your information is protected and handled with care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Website Being Built */}
      <section ref={sectionRefs[2]} className="py-16 px-6 bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Website Development</h2>
          <p className="text-lg text-gray-700">
            This website is currently being built to provide a better experience for users in reporting and tracking complaints and violations.
          </p>
        </div>
      </section>

      {/* Section 4: Applicable Regulations */}
      <section ref={sectionRefs[3]} className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-blue-700">Applicable Regulations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2 text-blue-700">Regulation 1</h3>
              <p className="text-gray-600">Description of Regulation 1.</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2 text-blue-700">Regulation 2</h3>
              <p className="text-gray-600">Description of Regulation 2.</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2 text-blue-700">Regulation 3</h3>
              <p className="text-gray-600">Description of Regulation 3.</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2 text-blue-700">Regulation 4</h3>
              <p className="text-gray-600">Description of Regulation 4.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Violations List */}
      <section ref={sectionRefs[4]} className="py-16 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Types of Violations</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Corruption</li>
            <li>Fraud</li>
            <li>Abuse of Power</li>
            <li>Bribery</li>
            <li>Other Violations</li>
          </ul>
        </div>
      </section>

      {/* Section 6: Information About Violations */}
      <section ref={sectionRefs[5]} className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Information About Violations</h2>
          <p className="text-lg text-gray-700">
            Violations are actions that go against regulations and ethical standards. Reporting violations helps maintain integrity and accountability.
          </p>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer ref={sectionRefs[6]} className="bg-blue-700 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-2">&copy; 2025 WBS Jateng. All rights reserved.</p>
          <p>
            Built with{" "}
            <span className="font-bold">React</span> &{" "}
            <span className="font-bold">Tailwind CSS</span>
          </p>
        </div>
      </footer>
    </div>
  );
}