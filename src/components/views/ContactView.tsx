import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { settings } from '../../store';
import { Icons } from '../Icons';
import { LiquidButton } from '../common/LiquidButton';
import { UI_TEXT } from '../../constants/ui-text';

/**
 * ContactView Component
 * 
 * Contact form with validation and social media links.
 * Integrates with Formspree for form submission.
 */

// Hook for mouse position tracking
const useMousePosition = () => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    return handleMouseMove;
};

export const ContactView = () => {
    const { lang } = useStore(settings);
    const handleMouseMove = useMousePosition();
    const t = UI_TEXT[lang].contact;
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => { setErrorMessage(''); }, [lang]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
        if (errorMessage) setErrorMessage('');
    };

    const validate = () => {
        if (!formData.name.trim()) return t.errors.name;
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return t.errors.email;
        if (!formData.message.trim()) return t.errors.message;
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            setErrorMessage(error);
            return;
        }
        setStatus('submitting');
        setErrorMessage('');
        try {
            const response = await fetch("https://formspree.io/f/xzzwknze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) setStatus('success');
            else {
                setStatus('error');
                setErrorMessage(t.errors.generic);
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage(t.errors.network);
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
    };

    const socialLinks = [
        { icon: Icons.LinkedIn, url: "https://www.linkedin.com/in/bryanvrgsc", label: "LinkedIn", color: "hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30" },
        { icon: Icons.GitHub, url: "https://github.com/bryanvrgsc", label: "GitHub", color: "hover:text-[#333] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20" },
        { icon: Icons.WhatsApp, url: "https://api.whatsapp.com/send?phone=12533687369", label: "WhatsApp", color: "hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/30" },
        { icon: Icons.Instagram, url: "https://www.instagram.com/bryanvrgsc/", label: "Instagram", color: "hover:text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30" },
        { icon: Icons.Mail, url: "mailto:bryanvrgsc@gmail.com", label: "Email", color: "hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30" }
    ];

    if (status === 'success') {
        return (
            <div className="max-w-3xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
                <div onMouseMove={handleMouseMove} className="bento-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(52,211,153,0.5)] animate-pulse"><Icons.CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" /></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">{t.successTitle}</h2><p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-md">{t.successMessage.replace('{name}', formData.name)}</p>
                    <LiquidButton onClick={handleReset} className="px-8 py-4 md:px-8 md:py-4 text-base md:text-lg rounded-full" style={{ '--card-bg': 'rgba(16, 185, 129, 0.15)', '--card-border': 'rgba(16, 185, 129, 0.5)', '--glass-glow': 'rgba(16, 185, 129, 0.6)' } as React.CSSProperties}>{t.sendAnother}</LiquidButton>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
            <div className="flex flex-col-reverse md:flex-row gap-6 items-stretch">
                <div className="flex md:flex-col gap-3 justify-center md:justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {socialLinks.map((social, idx) => (<a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className={`p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] text-[var(--text-secondary)] transition-all duration-300 transform hover:scale-110 shadow-sm ${social.color} flex items-center justify-center`} aria-label={social.label}><social.icon className="w-5 h-5 md:w-6 md:h-6" /></a>))}
                </div>
                <div onMouseMove={handleMouseMove} className="bento-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-center relative overflow-hidden flex-grow">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-[2rem] mx-auto mb-6 md:mb-10 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center relative z-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"><Icons.Talk className="w-8 h-8 md:w-10 md:h-10 text-white" /></div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 md:mb-6 relative z-10 tracking-tight">{t.title}</h2><p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 md:mb-12 leading-relaxed relative z-10 max-w-xl mx-auto font-light">{t.subtitle}</p>
                    <form className="space-y-4 md:space-y-5 text-left mb-8 md:mb-12 relative z-10 max-w-lg mx-auto" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            <div className="relative group"><input id="name" type="text" placeholder={t.placeholders.name} value={formData.name} onChange={handleChange} disabled={status === 'submitting'} className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50" /></div>
                            <div className="relative group"><input id="email" type="email" placeholder={t.placeholders.email} value={formData.email} onChange={handleChange} disabled={status === 'submitting'} className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50" /></div>
                        </div>
                        <div className="relative group"><textarea id="message" placeholder={t.placeholders.message} rows={4} value={formData.message} onChange={handleChange} disabled={status === 'submitting'} className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all resize-none text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50"></textarea></div>
                        {errorMessage && (<div className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded-xl border border-red-500/20 animate-pulse">{errorMessage}</div>)}
                        <LiquidButton type="submit" className="w-full py-5 md:py-6 text-lg md:text-xl font-bold tracking-wide rounded-full" style={{ '--card-bg': 'rgba(16, 185, 129, 0.15)', '--card-hover-bg': 'rgba(16, 185, 129, 0.25)', '--card-border': 'rgba(16, 185, 129, 0.5)', '--glass-glow': 'rgba(16, 185, 129, 0.6)', '--highlight-color': 'rgba(16, 185, 129, 0.2)' } as React.CSSProperties}>{status === 'submitting' ? t.button.sending : t.button.default}</LiquidButton>
                    </form>
                    <p className="mt-6 md:mt-8 text-xs text-[var(--text-tertiary)] relative z-10 font-medium uppercase tracking-widest">{t.responseTime}</p>
                </div>
            </div>
        </div>
    );
};
