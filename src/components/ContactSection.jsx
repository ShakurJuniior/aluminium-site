import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback({ type: '', message: '' });

    try {
      // Replace these with your actual EmailJS credentials
      const serviceId = 'YOUR_SERVICE_ID';      // e.g., 'service_abc123'
      const templateId = 'YOUR_TEMPLATE_ID';    // e.g., 'template_xyz789'
      const publicKey = 'YOUR_PUBLIC_KEY';      // e.g., 'user_abc123'

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'New Inquiry',
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setFeedback({ type: 'success', message: 'Thank you! Your message has been sent.' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // reset form
    } catch (error) {
      console.error('EmailJS error:', error);
      setFeedback({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-200 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Text Info */}
          <div data-aos="fade-right" className="space-y-8">
            <div>
              <span className="inline-block text-xs font-heading font-semibold tracking-widest uppercase text-blue-600 border border-blue-200 rounded-full px-4 py-1.5 bg-blue-50/80 backdrop-blur-sm shadow-sm">
                Collaborate
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-gray-800 mt-6">
                Let's build the future together.
              </h2>
            </div>
            <p className="font-sans text-gray-600 text-lg leading-relaxed max-w-md">
              Our technical team is ready to assist with your specifications, CAD drawings, and custom project requirements.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 pt-4">
              {/* Email */}
              <a 
                href="mailto:projects@agnesaluminium.com"
                className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <Mail size={20} className="text-blue-500 group-hover:text-blue-600" />
                <span className="font-sans">projects@agnesaluminium.com</span>
              </a>

              {/* Phone - Call */}
              <a 
                href="tel:+2348136807728"
                className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <Phone size={20} className="text-blue-500 group-hover:text-blue-600" />
                <span className="font-sans">08136807728</span>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/2348101891860"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <MessageCircle size={20} className="text-blue-500 group-hover:text-blue-600" />
                <span className="font-sans">08101891860</span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 text-gray-700">
                <MapPin size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                <span className="font-sans">Km 7 Aba-Enugu Express Road, Osisioma, Aba, Abia State, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Form with Floating Labels */}
          <div 
            data-aos="fade-left"
            className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl border border-gray-200 shadow-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 bg-white px-4 py-3 text-gray-800 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition pt-6"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className={`font-sans absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none
                      ${formData.name ? 'text-xs -translate-y-2 text-blue-600' : 'text-base'}
                      peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:text-blue-600
                    `}
                  >
                    Full Name
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 bg-white px-4 py-3 text-gray-800 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition pt-6"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className={`font-sans absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none
                      ${formData.email ? 'text-xs -translate-y-2 text-blue-600' : 'text-base'}
                      peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:text-blue-600
                    `}
                  >
                    Email Address
                  </label>
                </div>
              </div>

              {/* Subject Field */}
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="peer w-full border border-gray-300 bg-white px-4 py-3 text-gray-800 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition pt-6"
                  placeholder=" "
                />
                <label
                  htmlFor="subject"
                  className={`font-sans absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none
                    ${formData.subject ? 'text-xs -translate-y-2 text-blue-600' : 'text-base'}
                    peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:text-blue-600
                  `}
                >
                  Project Type
                </label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="peer w-full border border-gray-300 bg-white px-4 py-3 text-gray-800 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition pt-6"
                  placeholder=" "
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className={`font-sans absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none
                    ${formData.message ? 'text-xs -translate-y-2 text-blue-600' : 'text-base'}
                    peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:text-blue-600
                  `}
                >
                  Tell us about your project
                </label>
              </div>

              {/* Feedback message */}
              {feedback.message && (
                <div className={`text-sm p-3 rounded-lg ${
                  feedback.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {feedback.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full px-6 py-4 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-200/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? 'SENDING...' : 'SEND INQUIRY'}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;