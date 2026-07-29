import React, { useState } from 'react';
import { Send, Mail, Check, Copy, Sparkles, MessageSquare } from 'lucide-react';
import { playCyberSound } from '../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = "work.sufiyan.ahmed078@gmail.com";

  const handleCopyEmail = () => {
    playCyberSound('click');
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playCyberSound('click');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Section Header per Section 15 */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3">
          <Mail className="w-3.5 h-3.5 text-[#FF8F00]" />
          <span className="text-[#FF8F00] font-bold">CONTACT</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          GET IN <span className="text-[#FF8F00]">TOUCH</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; <span className="text-[#FF8F00] font-semibold">Available for projects</span>, full-stack engineering roles, system architecture design, and technical consulting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-8">
            <h3 className="font-heading font-bold text-xl text-white mb-6">DIRECT CHANNELS</h3>

            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-[#070B14] border border-white/10 mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#443199]/20 border border-[#443199]/50 flex items-center justify-center text-[#443199] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden font-mono">
                  <div className="text-[10px] text-gray-400 uppercase">DIRECT EMAIL</div>
                  <div className="text-xs text-white truncate">{emailAddress}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-[#443199]/15 border border-[#443199]/40 text-[#443199] hover:bg-[#443199]/30 text-xs font-mono shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* Social Channels */}
            <h4 className="font-mono text-xs text-gray-400 uppercase mb-3 font-bold">NETWORK CHANNELS</h4>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/in/sufiyan-ahmed-66baa91b3"
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3 rounded-xl bg-[#070B14] border border-white/10 text-gray-300 hover:text-[#443199] hover:border-[#443199]/50 transition-all flex items-center justify-center gap-2 font-mono text-xs"
              >
                <svg className="w-4 h-4 fill-current text-[#443199]" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/sufiyan078"
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3 rounded-xl bg-[#070B14] border border-white/10 text-gray-300 hover:text-[#10B981] hover:border-[#10B981]/40 transition-all flex items-center justify-center gap-2 font-mono text-xs"
              >
                <svg className="w-4 h-4 fill-current text-[#10B981]" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white">SEND MESSAGE</h3>
                <span className="font-mono text-xs text-gray-400">Direct message transmission</span>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 text-center rounded-2xl bg-[#10B981]/10 border border-[#10B981] space-y-3">
                <Sparkles className="w-10 h-10 text-[#10B981] mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-lg text-white">MESSAGE SENT SUCCESSFULLY</h4>
                <p className="font-mono text-xs text-gray-300">
                  Message received. I will respond to your transmission within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-gray-300 mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-white/10 focus:border-[#443199] text-white font-sans text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-300 mb-1">YOUR EMAIL</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-white/10 focus:border-[#443199] text-white font-sans text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-300 mb-1">SUBJECT</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Senior Software Engineering Role / Project Inquiry"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-white/10 focus:border-[#443199] text-white font-sans text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-300 mb-1">MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your project, team, or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-white/10 focus:border-[#443199] text-white font-sans text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND TRANSMISSION</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
