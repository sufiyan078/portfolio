import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { getUniversalAudioProps } from '../utils/soundEffects';
import { AnimatedEnvelopeIcon } from './ui/AnimatedEnvelopeIcon';
import { SocialButton } from './ui/SocialButton';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const emailAddress = "work.sufiyan.ahmed078@gmail.com";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    showToast("Email address copied.");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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
          <AnimatedEnvelopeIcon className="w-3.5 h-3.5" />
          <span className="text-[#FF8F00] font-bold">CONTACT</span>
        </div>
        <h2 className="font-heading font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight">
          GET IN <span className="text-[#FF8F00]">TOUCH</span>
        </h2>
        <p className="font-mono text-sm text-gray-400 mt-3 max-w-2xl">
          &gt; <span className="text-[#FF8F00] font-semibold">Available for freelance projects & contract work</span>. Have an idea, dataset, or application to build? Email directly or connect via social networks below to get started.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Direct Contact Info */}
        <div className="glass-panel p-6 sm:p-8">
          <h3 className="font-heading font-bold text-xl text-white mb-2">DIRECT CHANNELS</h3>
          <p className="text-xs text-gray-300 font-sans leading-relaxed mb-6">
            Connect directly via email or social networks for project inquiries, freelance builds, or tech consultations.
          </p>

          {/* Email Copy Card */}
          <div className="p-4 rounded-2xl bg-[#070B14] border border-white/10 mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/15 border border-[#FF8F00]/40 flex items-center justify-center text-[#FF8F00] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden font-mono">
                <div className="text-[10px] text-gray-400 uppercase">DIRECT EMAIL</div>
                <div className="text-xs text-white truncate">{emailAddress}</div>
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

          {/* Social Channels */}
          <h4 className="font-mono text-xs text-gray-400 uppercase mb-3 font-bold">NETWORK CHANNELS</h4>
          <SocialButton label="CONNECTS" />
        </div>
      </div>
    </section>
  );
};

