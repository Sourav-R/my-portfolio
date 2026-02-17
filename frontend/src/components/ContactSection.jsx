import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from '../hooks/use-toast';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { profileData } from '../mock';

const ContactSection = ({ recruiterMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProgress(0);

    // Biometric scan simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message Encrypted & Sent",
        description: "Your message has been securely transmitted. I'll respond within 24 hours.",
      });

      // Reset form
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSuccess(false);
        setProgress(0);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="min-h-screen px-4 py-20 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-emerald-500">&gt;</span> Secure Contact
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Get in touch for collaboration opportunities, security consultations, or just to discuss infrastructure and threat hunting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-300 mb-2 block">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#121212] border-emerald-500/30 text-white focus:border-emerald-500"
                  placeholder="Your name"
                  disabled={isSubmitting || isSuccess}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300 mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#121212] border-emerald-500/30 text-white focus:border-emerald-500"
                  placeholder="your.email@example.com"
                  disabled={isSubmitting || isSuccess}
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-300 mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-[#121212] border-emerald-500/30 text-white focus:border-emerald-500 min-h-[150px]"
                  placeholder="Your message..."
                  disabled={isSubmitting || isSuccess}
                />
              </div>

              {/* Biometric Progress Bar */}
              {isSubmitting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-500 font-mono">Encrypting message...</span>
                    <span className="text-emerald-500 font-mono">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#121212] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full font-medium transition-all duration-300 ${
                  isSuccess 
                    ? 'bg-emerald-500 hover:bg-emerald-500' 
                    : 'bg-emerald-500 hover:bg-emerald-600'
                } text-black`}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isSuccess && <CheckCircle2 className="h-4 w-4 mr-2" />}
                {isSuccess ? 'Message Sent!' : isSubmitting ? 'Encrypting...' : 'Send Secure Message'}
                {!isSubmitting && !isSuccess && <Send className="h-4 w-4 ml-2" />}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-8">
              <h3 className="text-xl font-bold text-white mb-6 font-mono">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <a href={`mailto:${profileData.email}`} className="text-white hover:text-emerald-500 transition-colors">
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors">
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <svg className="h-6 w-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">GitHub</p>
                    <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-500 transition-colors">
                      View Projects
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-blue-500/20 p-8">
              <h3 className="text-xl font-bold text-white mb-4 font-mono">Response Time</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I typically respond to messages within <span className="text-blue-500 font-bold">24 hours</span>. For urgent security matters, please reach out via LinkedIn for faster response.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
