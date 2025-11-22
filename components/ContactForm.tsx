'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useTheme } from '@/context/ThemeContext';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xeonrbev");
  const { t, isCodeMode, theme } = useTheme();
  const isOrganic = theme === 'organic';

  // Styles based on theme
  const inputClass = isOrganic
    ? "w-full px-4 py-3 font-sans text-sm border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-[#002FA7] focus:ring-1 focus:ring-[#002FA7] rounded-lg transition-colors text-center"
    : "w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb dark:focus:border-green-400 transition-colors";

  const buttonClass = isOrganic
    ? "w-full bg-[#1A1A1A] text-white font-sans font-bold text-lg px-10 py-4 hover:bg-[#002FA7] transition duration-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
    : "w-full bg-ikb dark:bg-green-600 text-white font-mono font-bold text-lg px-10 py-4 hover:bg-white dark:hover:bg-green-400 hover:text-ikb dark:hover:text-black transition duration-300 border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3";

  // Erfolgsmeldung
  if (state.succeeded) {
    return (
      <div className={`p-6 border-2 ${isOrganic ? 'border-[#002FA7] bg-blue-50 rounded-2xl' : 'border-ikb dark:border-green-500 bg-white dark:bg-slate-900'} text-center animate-in fade-in duration-500`}>
        <i className={`fas fa-check-circle text-4xl ${isOrganic ? 'text-[#002FA7]' : 'text-ikb dark:text-green-500'} mb-4`}></i>
        <h3 className={`font-serif text-2xl italic mb-2 ${isOrganic ? 'text-black' : ''}`}>{t.footer.successTitle}</h3>
        <p className={`font-mono text-sm ${isOrganic ? 'text-gray-600 font-sans' : 'text-gray-600 dark:text-gray-400'}`}>
          {t.footer.successText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">

      {/* NAME FIELD (NEU HINZUGEFÜGT) */}
      <div>
        <input
          id="name"
          type="text"
          name="name"
          placeholder={t.footer.placeholderName}
          required
          className={inputClass}
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      {/* EMAIL FIELD */}
      <div>
        <input
          id="email"
          type="email"
          name="email"
          placeholder={t.footer.placeholderMail}
          required
          className={inputClass}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      {/* MESSAGE FIELD */}
      <div>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t.footer.placeholderMsg}
          required
          className={inputClass}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className={buttonClass}
      >
        {state.submitting ? (
          t.footer.sending
        ) : (
          <>
            <i className={`fas ${isOrganic ? 'fa-paper-plane' : 'fa-search'}`}></i>
            {t.footer.button}
          </>
        )}
      </button>
    </form>
  );
}