"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";

export default function TermsOfUse() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Terms of Use</h1>
                    <p className="text-gray-400 mb-8 border-b border-white/10 pb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <div className="space-y-8 text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-400">By accessing and using the website of Caliber Business Resource ("we," "our," or "the Company"), you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Use of Website Content</h2>
                            <p className="text-gray-400">The content provided on this website is for general informational purposes only. You may view, download, and print materials from this website strictly for personal and non-commercial use, provided that you do not modify the content or remove any proprietary notices.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property Ownership</h2>
                            <p className="text-gray-400">All content, graphics, logos, designs, text, and other materials on this website are the intellectual property of Caliber Business Resource or its content suppliers and are protected by applicable intellectual property laws. Unauthorized use of any materials on this website is strictly prohibited.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. No Employment Guarantee Clause</h2>
                            <p className="text-gray-400">Submitting an application or joining our talent network via this website does not create an employer-employee relationship with Caliber Business Resource, nor does it guarantee employment, interviews, or placement with our clients. All hiring decisions are made at the sole discretion of the Company and its clients.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. No Client Selection Guarantee</h2>
                            <p className="text-gray-400">While we strive to match businesses with the best available talent, submitting a business inquiry or requesting a consultation does not guarantee that we will accept or fulfill your staffing request. We reserve the right to decline service to any prospective client at our discretion.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                            <p className="text-gray-400">To the maximum extent permitted by law, Caliber Business Resource shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, this website. The website and its contents are provided on an "as-is" basis without any warranties of any kind.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. External Links Disclaimer</h2>
                            <p className="text-gray-400">This website may contain links to external third-party websites or services (such as our application forms). These links are provided for your convenience only. Caliber Business Resource does not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                            <p className="text-gray-400">These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these terms shall be brought exclusively in the appropriate courts of the Philippines.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Right to Modify Terms</h2>
                            <p className="text-gray-400">We reserve the right to update, change, or replace any part of these Terms of Use at our sole discretion without prior notice. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
            <ScrollToTop />
            <FloatingContact />
        </main>
    );
}
