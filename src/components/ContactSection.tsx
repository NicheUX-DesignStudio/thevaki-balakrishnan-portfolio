import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Send } from 'lucide-react';

interface ContactSectionProps {
  onClose: () => void;
}

const ContactSection = ({ onClose }: ContactSectionProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      className="min-h-screen bg-background-interior"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background-interior/95 backdrop-blur-sm border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Return to building"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs hidden md:inline">Exit</span>
          </button>
          <p className="font-serif text-sm md:text-base text-foreground/80">Contact</p>
          <div className="w-12" />
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-32 px-6 max-w-3xl mx-auto flex flex-col justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="section-label mb-4">Get in Touch</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Every good investigation starts with a conversation.
          </h1>
          <p className="text-muted-foreground text-sm mb-12 readable-width">
            Whether you have a project in mind, a role to fill, or just want to chat about design — I'd love to hear from you.
          </p>
        </motion.div>

        {/* Direct Contact */}
        <motion.div
          className="flex flex-wrap gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a
            href="mailto:thevakimail@gmail.com"
            className="inline-flex items-center gap-3 px-5 py-3 bg-surface border border-border/20 rounded-sm text-foreground/80 hover:text-primary hover:border-primary/25 transition-all duration-300 group"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm">thevakimail@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/thevaki-balakrishnan-664996201/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 bg-surface border border-border/20 rounded-sm text-foreground/80 hover:text-primary hover:border-primary/25 transition-all duration-300 group"
          >
            <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm">LinkedIn Profile</span>
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="section-label block mb-2">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-surface border border-border/20 rounded-sm px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="Detective Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="section-label block mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-surface border border-border/20 rounded-sm px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="section-label block mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-surface border border-border/20 rounded-sm px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors resize-none"
                  placeholder="Tell me about your case..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 text-primary border border-primary/25 rounded-sm hover:bg-primary/30 transition-all duration-300 text-sm font-medium"
              >
                <Send className="w-3.5 h-3.5" />
                Send Message
              </button>
            </form>
          ) : (
            <motion.div
              className="text-center py-16 archive-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-serif text-2xl text-foreground mb-3">Message Received</p>
              <p className="text-muted-foreground text-sm">I'll get back to you soon. Case noted.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Return */}
        <div className="text-center mt-16">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-serif text-lg">Return to the building</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSection;
