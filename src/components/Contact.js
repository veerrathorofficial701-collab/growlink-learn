import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Banner from "../pages/Banner";
import { useContact } from "../context/ContactContext";

/* ─────────────────────────────────────────────────────────────────
   EMAILJS SETUP — replace the three values below with your own:
   1. https://www.emailjs.com → sign up (free, 200 emails/month)
   2. Email Services  → Add Service → copy Service ID
   3. Email Templates → Create Template → add these variables:
        {{from_name}}  {{from_email}}  {{phone}}
        {{subject}}    {{message}}
      → copy Template ID
   4. Account → API Keys → copy Public Key
───────────────────────────────────────────────────────────────── */
const SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc1234"
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_xyz5678"
const PUBLIC_KEY  = "YOUR_PUBLIC_KEY";  // e.g. "abc123XYZxxxxxxxx"
/* ───────────────────────────────────────────────────────────────── */

const EMPTY = { name: "", phone: "", email: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim())                          errors.name    = "Name is required.";
  if (!form.phone.trim())                         errors.phone   = "Phone is required.";
  else if (!/^[+\d\s\-()]{7,20}$/.test(form.phone)) errors.phone = "Enter a valid phone number.";
  if (!form.email.trim())                         errors.email   = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.subject.trim())                       errors.subject = "Subject is required.";
  if (!form.message.trim())                       errors.message = "Message is required.";
  return errors;
}

export default function Contact() {
  const formRef              = useRef(null);
  const { addSubmission }    = useContact();
  const [form, setForm]      = useState(EMPTY);
  const [errors, setErrors]  = useState({});
  const [touched, setTouched]= useState({});
  const [status, setStatus]  = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");
  const [successName, setSuccessName] = useState("");

  // Initialise EmailJS once on mount
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  // Re-validate touched fields live as user types
  useEffect(() => {
    if (Object.keys(touched).length === 0) return;
    const errs = validate(form);
    const visibleErrs = {};
    Object.keys(touched).forEach(k => { if (errs[k]) visibleErrs[k] = errs[k]; });
    setErrors(visibleErrs);
  }, [form, touched]);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleBlur(e) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Mark all fields touched so all errors show
    setTouched({ name: true, phone: true, email: true, subject: true, message: true });
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("sending");
    setServerError("");

    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      phone:      form.phone,
      subject:    form.subject,
      message:    form.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      addSubmission(form);
      setSuccessName(form.name);
      setStatus("success");
      setForm(EMPTY);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      // Still save to dashboard even if email delivery fails
      addSubmission(form);
      setStatus("error");
      setServerError(
        "Your message was saved to our dashboard, but the email notification failed. " +
        "We will still get back to you. (EmailJS credentials may need updating.)"
      );
    }
  }

  function handleReset() {
    setStatus("idle");
    setForm(EMPTY);
    setErrors({});
    setTouched({});
    setServerError("");
  }

  const isConfigured = SERVICE_ID !== "YOUR_SERVICE_ID";

  return (
    <>
      <Banner
        title="Contact Us"
        description="We help agencies scale with high-quality backlinks."
        buttonText="Start Growing"
        buttonLink="https://app.grolinq.com"
      />

      <section className="contact-sec">
        <div className="container">
          <div className="row">

            {/* Left column */}
            <div className="col-md-6">
              <div className="content">
                <h1>Contact <span className="yellow">Us</span></h1>
                <p>
                  We'd love to hear from you. Whether you're exploring partnership
                  opportunities, need help with link-building campaigns, or simply
                  have a question about GroLinq, our team is here to support you.
                </p>
                <ul>
                  <li>
                    <span>1</span>
                    <strong>Complete the Contact Form:</strong> Provide your full
                    name, email, phone number, subject and a brief description of
                    your inquiry.
                  </li>
                  <li>
                    <span>2</span>
                    <strong>Submit Your Request:</strong> Once you submit the form,
                    you will receive an acknowledgment email.
                  </li>
                  <li>
                    <span>3</span>
                    <strong>Our Response:</strong> A member of our team will review
                    your request and respond within 24 hours.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column — form */}
            <div className="col-md-6">
              <div className="form_block">
                <h2>Get in Touch</h2>
                <p>Simply fill out the form below, and we'll get back to you as soon as possible.</p>

                {/* ── Success state ── */}
                {status === "success" && (
                  <div className="contact-success">
                    <div className="contact-success-icon">✅</div>
                    <h3>Message Sent!</h3>
                    <p>
                      Thank you, <strong>{successName}</strong>. We've received
                      your message and will get back to you within 24 hours.
                    </p>
                    <button className="db-btn-primary" style={{ marginTop: 16 }} onClick={handleReset}>
                      Send Another Message
                    </button>
                  </div>
                )}

                {/* ── Form ── */}
                {status !== "success" && (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>

                    {/* EmailJS not configured warning */}
                    {!isConfigured && (
                      <div className="contact-warning-msg">
                        ⚠️ EmailJS is not configured yet. Submissions will be saved to the
                        dashboard but no email will be sent. See the comments in Contact.js.
                      </div>
                    )}

                    {/* Server / send error */}
                    {status === "error" && serverError && (
                      <div className="contact-error-msg">{serverError}</div>
                    )}

                    <div className="row">

                      <div className="col-sm-6">
                        <div className={`form-group ${errors.name ? "has-error" : touched.name && !errors.name ? "has-success" : ""}`}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name *"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.name && <span className="field-error">{errors.name}</span>}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className={`form-group ${errors.phone ? "has-error" : touched.phone && !errors.phone ? "has-success" : ""}`}>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Phone Number *"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.phone && <span className="field-error">{errors.phone}</span>}
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className={`form-group ${errors.email ? "has-error" : touched.email && !errors.email ? "has-success" : ""}`}>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Your Email *"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className={`form-group ${errors.subject ? "has-error" : touched.subject && !errors.subject ? "has-success" : ""}`}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Subject *"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.subject && <span className="field-error">{errors.subject}</span>}
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className={`form-group ${errors.message ? "has-error" : touched.message && !errors.message ? "has-success" : ""}`}>
                          <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Message *"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.message && <span className="field-error">{errors.message}</span>}
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="form-group default_btn blue_btn">
                          <button
                            className="btn contact-submit-btn"
                            type="submit"
                            disabled={status === "sending"}
                          >
                            {status === "sending" ? (
                              <span className="contact-spinner-wrap">
                                <span className="contact-spinner" />
                                Sending…
                              </span>
                            ) : "Submit Your Inquiry"}
                          </button>
                        </div>
                      </div>

                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
