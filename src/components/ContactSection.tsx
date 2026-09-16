import React, { useState } from 'react';
import { Mail, Check, Copy, Send, ShieldCheck, Terminal, AlertCircle, ArrowRight } from './ui/RealmIcons';
import { getUniversalAudioProps, playCyberSound } from '../utils/soundEffects';
import { SocialButton } from './ui/SocialButton';
import { Field, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Custom Web Application');
  const [budget, setBudget] = useState('<$2,500');
  const [brief, setBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const emailAddress = "hello@sufiyanahmed.com";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCopyEmail = async () => {
    try { await navigator.clipboard.writeText(emailAddress); }
    catch { showToast('Copy unavailable. Please select the email address to copy it.'); return; }
    setCopiedEmail(true);
    showToast("Email address copied to clipboard.");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !brief.trim()) {
      setFormError('Please populate Operator Name, Transmission Email, and Mission Brief.');
      playCyberSound('CARD_CLICK');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid transmission email address.');
      playCyberSound('CARD_CLICK');
      return;
    }

    setFormError('');
    setSubmitted(true);
    playCyberSound('CARD_CLICK');
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
        <div role="status" className="fixed bottom-6 right-4 left-4 sm:left-auto sm:max-w-md z-50 px-4 py-2.5 rounded-xl bg-[#10B981] text-black font-sans text-sm font-bold shadow-lg animate-fadeIn flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="badge-tag border border-[#FF8F00]/40 bg-[#FF8F00]/10 text-[#FF8F00] mb-3 group">
          <Mail className="w-3.5 h-3.5 text-[#FF8F00] transition-transform duration-300 group-hover:scale-110" />
          <span className="text-[#FF8F00] font-bold">COMMUNICATIONS</span>
        </div>

        {/* Main Headline Question */}
        <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] md:text-[42px] text-white tracking-tight max-w-3xl leading-snug">
          INITIATE A <span className="text-[#FF8F00]">PROJECT TRANSMISSION</span>
        </h2>

        {/* Action Invitation Subtitle */}
        <p className="font-mono text-sm sm:text-base text-gray-300 mt-3 max-w-xl font-medium leading-relaxed">
          Have a quest in mind? Let's build it.
        </p>
      </div>

      {/* @efferd/contact-4 Modern Unified Block Container */}
      <div className="relative mx-auto grid h-full w-full max-w-6xl rounded-2xl border border-[#FF8F00]/30 bg-[#1F150C]/85 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] lg:grid-cols-12 overflow-hidden">
        {/* Tactical HUD Corner Crosshairs */}
        <span className="absolute top-2.5 left-2.5 text-[#FF8F00]/50 font-mono text-[10px] select-none pointer-events-none z-20">+</span>
        <span className="absolute top-2.5 right-2.5 text-[#FF8F00]/50 font-mono text-[10px] select-none pointer-events-none z-20">+</span>
        <span className="absolute bottom-2.5 left-2.5 text-[#FF8F00]/50 font-mono text-[10px] select-none pointer-events-none z-20">+</span>
        <span className="absolute bottom-2.5 right-2.5 text-[#FF8F00]/50 font-mono text-[10px] select-none pointer-events-none z-20">+</span>

        {/* SIDE 1: @efferd/contact-4 Info Panel (Direct Channels) - 5 cols */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-[#070B14]/70">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide">
                DIRECT CHANNELS
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-8">
              Email me directly, or prepare a project brief below.
            </p>

            {/* Contact Info Items in @efferd Contact 4 signature style */}
            <div className="space-y-4">
              {/* Email Contact Card */}
              <div className="p-4 rounded-xl border border-white/10 bg-[#0D111C]/90 shadow-sm flex items-center justify-between gap-3 group transition-all hover:border-[#FF8F00]/40">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg border border-[#FF8F00]/40 bg-[#FF8F00]/15 flex items-center justify-center text-[#FF8F00] shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden font-mono min-w-0 flex-1">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">EMAIL</p>
                    <a href={`mailto:${emailAddress}`} className="contact-email text-xs text-white font-bold hover:text-[#FF8F00]">{emailAddress}</a>
                  </div>
                </div>

                <button
                  {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', handleCopyEmail)}
                  aria-label="Copy email address"
                  className="px-3 py-1.5 rounded-lg bg-[#FF8F00]/15 border border-[#FF8F00]/40 text-[#FF8F00] hover:bg-[#FF8F00]/30 text-xs font-mono shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Channels CTA */}
          <div className="pt-6 border-t border-white/10 mt-8">
            <h4 className="font-mono text-xs text-gray-400 uppercase mb-3 font-bold">NETWORK CHANNELS</h4>
            <SocialButton label="CONNECTS" />
          </div>
        </div>

        {/* SIDE 2: @efferd/contact-4 Form Panel (Contract Briefing Console) - 7 cols with border-l divider */}
        <div className="lg:col-span-7 flex flex-col p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-[#FF8F00]/25 bg-[#000000]/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-[#FF8F00]" />
              <h3 className="font-heading font-bold text-lg text-white tracking-wide">
                YOUR NEXT QUEST
              </h3>
            </div>
            <span className="font-mono text-[10px] text-[#10B981] font-bold px-2.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              EMAIL DRAFT
            </span>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Project inquiry">
              <ol className="realm-rule-path" aria-label="Contact steps"><li>BRIEF</li><li>REVIEW</li><li>EMAIL</li></ol>
              <p className="text-xs text-gray-400">Prepares a draft in your email app. You review and send it.</p>
              {formError && (
                <div role="alert" className="p-3 rounded-xl bg-[#D90000]/20 border border-[#D90000]/50 text-[#FF8F00] font-mono text-xs flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-[#D90000] shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <FieldGroup className="gap-4">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="operator-name" className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                      OPERATOR / CLIENT NAME *
                    </FieldLabel>
                    <Input
                      id="operator-name"
                      autoComplete="name"
                      maxLength={100}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full h-auto px-3.5 py-2.5 rounded-xl bg-[#000000]/80 border border-white/15 focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00] text-white font-mono text-xs outline-none transition-all placeholder:text-gray-500"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="transmission-email" className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                      TRANSMISSION EMAIL *
                    </FieldLabel>
                    <Input
                      id="transmission-email"
                      autoComplete="email"
                      maxLength={254}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full h-auto px-3.5 py-2.5 rounded-xl bg-[#000000]/80 border border-white/15 focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00] text-white font-mono text-xs outline-none transition-all placeholder:text-gray-500"
                    />
                  </Field>
                </div>

                {/* Row 2: Category & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="mission-category" className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                      MISSION CATEGORY
                    </FieldLabel>
                    <select
                      id="mission-category"
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
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="budget-bracket" className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                      BUDGET BRACKET
                    </FieldLabel>
                    <select
                      id="budget-bracket"
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
                  </Field>
                </div>

                {/* Row 3: Brief */}
                <Field>
                  <FieldLabel htmlFor="mission-brief" className="block font-mono text-[11px] text-gray-300 uppercase tracking-wider mb-1.5 font-bold">
                    MISSION BRIEF / SPECIFICATIONS *
                  </FieldLabel>
                  <Textarea
                    id="mission-brief"
                    maxLength={2000}
                    required
                    rows={4}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Tell me about your product requirements, current bottleneck, desired timeline, or system goals..."
                    className="w-full min-h-[100px] px-3.5 py-2.5 rounded-xl bg-[#000000]/80 border border-white/15 focus:border-[#FF8F00] focus:ring-1 focus:ring-[#FF8F00] text-white font-mono text-xs outline-none transition-all resize-none leading-relaxed placeholder:text-gray-500"
                  />
                </Field>
              </FieldGroup>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-auto py-3.5 rounded-xl font-heading text-sm font-bold tracking-wider bg-gradient-to-r from-[#FF8F00] to-[#E65100] text-black hover:opacity-95 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,143,0,0.3)] disabled:opacity-50"
                >
                      <Send className="w-4 h-4 text-black" />
                      <span>PREPARE EMAIL BRIEF</span>
                </Button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center animate-fadeIn space-y-4" role="status">
              <div className="w-14 h-14 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <h4 className="font-heading font-bold text-xl text-white tracking-wide">
                EMAIL BRIEF READY
              </h4>

              <p className="font-mono text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                Ready, {name}. Review and send from your email app. Nothing has been sent yet.
              </p>

              <div className="contact-brief-preview text-left" aria-label="Prepared email preview">
                <span className="text-[#FF8F00]">{category} · {budget}</span>
                <p>{brief}</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={mailtoUrl}
                  className="btn-primary text-xs py-2.5 px-4 font-mono font-bold flex items-center gap-2"
                >
                  <span>OPEN EMAIL APP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button type="button" {...getUniversalAudioProps('CARD_CLICK', 'CARD_HOVER', async () => {
                  try {
                    await navigator.clipboard.writeText(`To: ${emailAddress}\nSubject: [PROJECT INQUIRY] ${category} - ${name}\n\nClient: ${name}\nEmail: ${email}\nBudget: ${budget}\n\n${brief}`);
                    showToast('Brief copied. Paste it into your email app.');
                  } catch { showToast('Copy unavailable. Select the brief above to copy it.'); }
                })} className="btn-secondary text-xs py-2.5 px-4">COPY BRIEF</button>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                >
                  Edit Your Brief
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
