import React, { useState } from 'react';
import { Mail, Check, Copy, Send, ShieldCheck, Terminal, AlertCircle, ArrowRight } from 'lucide-react';
import { getUniversalAudioProps, playCyberSound } from '../utils/soundEffects';
import { AnimatedEnvelopeIcon } from './ui/AnimatedEnvelopeIcon';
import { SocialButton } from './ui/SocialButton';
import { HoverMarqueeText } from './ui/HoverMarqueeText';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Custom Web Application');
  const [budget, setBudget] = useState('$3,000 - $6,000');
  const [brief, setBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const emailAddress = "hello@sufiyanahmed.com";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    showToast("Email address copied to clipboard.");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !brief.trim()) {
      setFormError('Please populate Operator Name, Transmission Email, and Mission Brief.');
      playCyberSound('error');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid transmission email address.');
      playCyberSound('error');
      return;
    }

    setFormError('');
    setIsSubmitting(true);
    playCyberSound('terminal');

    // Simulate cyber transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playCyberSound('success');
    }, 900);
  };

  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    `[PROJECT INQUIRY] ${category} - ${name}`
  )}&body=${encodeURIComponent(
    `Client / Operator: ${name}\nEmail: ${email}\nMission Category: ${category}\nBudget Bracket: ${budget}\n\nProject Specifications:\n${brief}\n`
  )}`;

  return (
    <section id="contact" className="py-24 px-4 max-w-7xl mx-auto relative font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#10B981] text-black font-mono text-xs font-bold shadow-lg animate-fadeIn flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3">
          <AnimatedEnvelopeIcon className="w-3.5 h-3.5 text-[#FF8F00]" />
          <span className="text-[#FF8F00] font-bold">COMMUNICATIONS</span>
        </div>

        {/* Main Headline Question */}
        <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] md:text-[42px] text-white tracking-tight max-w-3xl leading-snug">
          INITIATE A <span className="text-[#FF8F00]">PROJECT TRANSMISSION</span>
        </h2>

        {/* Action Invitation Subtitle */}
        <p className="font-mono text-sm sm:text-base text-gray-300 mt-3 max-w-xl font-medium leading-relaxed">
          &gt; Whether you are hiring a lead engineer, planning an MVP, or modernizing an enterprise system — let's build the right architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Mission Contract Console (Form) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 relative">
          {/* Tactical HUD Crosshairs */}
          <span className="absolute top-2 left-2 text-[#FF8F00]/40 font-mono text-[9px] select-none pointer-events-none">+</span>
          <span className="absolute top-2 right-2 text-[#FF8F00]/40 font-mono text-[9px] select-none pointer-events-none">+</span>
          <span className="absolute bottom-2 left-2 text-[#FF8F00]/40 font-mono text-[9px] select-none pointer-events-none">+</span>
          <span className="absolute bottom-2 right-2 text-[#FF8F00]/40 font-mono text-[9px] select-none pointer-events-none">+</span>

          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-[#FF8F00]" />
              <h3 className="font-heading font-bold text-lg text-white tracking-wide">
                CONTRACT BRIEFING CONSOLE
              </h3>
            </div>
            <span className="font-mono text-[10px] text-[#10B981] font-bold px-2 py-0.5 rounded bg-[#10B981]/15 border border-[#10B981]/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              CHANNEL ACTIVE
            </span>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-[#D90000]/20 border border-[#D90000]/50 text-[#FF8F00] font-mono text-xs flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-[#D90000] shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                    OPERATOR / CLIENT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000]/80 border border-white/15 focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00] text-white font-mono text-xs outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                    TRANSMISSION EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000]/80 border border-white/15 focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00] text-white font-mono text-xs outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Category & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                    MISSION CATEGORY
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000]/90 border border-white/15 focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00] text-white font-mono text-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="Custom Web Application">Custom Web Application</option>
                    <option value="AI Agents & Automation">AI Agents &amp; Automation</option>
                    <option value="Dashboard & Analytics Portal">Dashboard &amp; Analytics Portal</option>
                    <option value="Full SaaS MVP Development">Full SaaS MVP Development</option>
                    <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                    <option value="System Optimization / Audit">System Optimization / Audit</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                    BUDGET BRACKET
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000]/90 border border-white/15 focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00] text-white font-mono text-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="<$2,500">&lt; $2,500 (Scoping / Small Tool)</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000 (Targeted Feature / Automation)</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000 (Complete App / MVP)</option>
                    <option value="$10,000+">$10,000+ (Enterprise Platform)</option>
                    <option value="Full-Time Salary">Full-Time Compensation</option>
                    <option value="Other / Flexible">Other / Flexible</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Brief */}
              <div>
                <label className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                  MISSION BRIEF / SPECIFICATIONS *
                </label>
                <textarea
                  required
                  rows={4}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Tell me about your product requirements, current bottleneck, desired timeline, or system goals..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000]/80 border border-white/15 focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00] text-white font-mono text-xs outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-heading text-sm font-bold tracking-wider bg-gradient-to-r from-[#FF8F00] to-[#E65100] text-black hover:opacity-95 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,143,0,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>ENCRYPTING &amp; TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>DISPATCH CONTRACT BRIEF</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center animate-fadeIn space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <h4 className="font-heading font-bold text-xl text-white tracking-wide">
                TRANSMISSION CONFIRMED
              </h4>

              <p className="font-mono text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                Mission parameters received from <span className="text-[#FF8F00] font-bold">{name}</span>. A detailed architectural response will be dispatched to <span className="text-[#10B981] font-bold">{email}</span>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs py-2.5 px-4 font-mono font-bold flex items-center gap-2"
                >
                  <span>LAUNCH IN EMAIL CLIENT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                >
                  Send Another Transmission
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Direct Telemetry & Social Channels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-8">
            <h3 className="font-heading font-bold text-xl text-white mb-2">DIRECT CHANNELS</h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed mb-6">
              Prefer writing directly from your own email client? Use the verified address below or connect via professional networks.
            </p>

            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-[#070B14] border border-white/10 mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden font-mono min-w-0 flex-1">
                  <div className="text-[10px] text-gray-400 uppercase">DIRECT ARCHITECT EMAIL</div>
                  <HoverMarqueeText
                    text={emailAddress}
                    className="text-xs text-white font-bold hover:text-[#FF8F00] transition-colors"
                  />
                </div>
              </div>

              <button
                {...getUniversalAudioProps('click', 'hover', handleCopyEmail)}
                aria-label="Copy email address"
                className="px-3 py-1.5 rounded-lg bg-[#FF8F00]/15 border border-[#FF8F00]/40 text-[#FF8F00] hover:bg-[#FF8F00]/30 text-xs font-mono shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* Primary Coordinates Telemetry */}
            <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">TIMEZONE &amp; REGION</div>
                <div className="text-white font-semibold mt-1">PKT (UTC+5) / Global</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">COMMS PROTOCOL</div>
                <div className="text-[#10B981] font-semibold mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  DIRECT INBOX READY
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <h4 className="font-mono text-xs text-gray-400 uppercase mb-3 font-bold">NETWORK CHANNELS</h4>
            <SocialButton label="CONNECTS" />
          </div>
        </div>
      </div>
    </section>
  );
};
