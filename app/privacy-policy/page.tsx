"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
                    <p className="text-gray-400 mb-8 border-b border-white/10 pb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                    <div className="space-y-8 text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                            <p className="mb-4">Caliber Business Resource collects information to provide better services to all our users. We may collect the following types of information:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li><strong>Contact Form Information:</strong> When you submit an inquiry, we collect your name, email address, company name, and the contents of your message.</li>
                                <li><strong>Job Application Information:</strong> When you apply for a position through our talent network, we collect your resume, contact details, and employment history.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Information</h2>
                            <p className="mb-4">The information we collect is used primarily to support our business operations and facilitate connections between clients and remote professionals. Specifically, we use your data for:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>Responding to your business inquiries and providing customer support.</li>
                                <li>Evaluating candidates for potential job placement within our talent pool.</li>
                                <li>General client and candidate communication purposes.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Data Handling & Protection</h2>
                            <p className="text-gray-400">We are committed to securing your data. We implement reasonable administrative, technical, and physical safeguards designed to protect personal information against accidental, unlawful, or unauthorized destruction, loss, alteration, access, disclosure, or use. All applicant and client documentation is handled with strict confidentiality.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Form Providers</h2>
                            <p className="text-gray-400">Our website utilizes embedded forms (such as Google Forms) to process job applications and inquiries. Please be aware that when you submit these forms, your data is processed by these third-party service providers in accordance with their respective privacy policies.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
                            <p className="text-gray-400">We retain personal information only for as long as is necessary for the legitimate business purposes set out in this Privacy Policy, or as required by applicable law.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Data Subject Rights</h2>
                            <p className="mb-4">Under applicable data privacy laws, you have certain rights regarding your personal information, including:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>The right to access your personal data.</li>
                                <li>The right to request the correction of inaccurate or incomplete data.</li>
                                <li>The right to request the deletion or removal of your personal data.</li>
                            </ul>
                            <p className="mt-4 text-gray-400">To exercise any of these rights, please contact us at <a href="mailto:info@caliberbusinessresource.com" className="text-primary hover:underline">info@caliberbusinessresource.com</a>.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Compliance Statement</h2>
                            <p className="text-gray-400">Caliber Business Resource endeavors to adhere to the principles and requirements of the Philippine Data Privacy Act of 2012 (Republic Act No. 10173). We respect your privacy and process your personal information securely and responsibly.</p>
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
