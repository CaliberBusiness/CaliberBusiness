import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import { getHomepageData } from "@/lib/getHomepageData";

export default async function PrivacyPolicy() {
    const filePath = path.join(process.cwd(), "data/content/policies/privacy-policy.md");
    const homepageData = getHomepageData();

    let content = "";
    let data = { title: "Privacy Policy", lastUpdated: new Date().toISOString() };

    try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const parsed = matter(fileContents);
        content = parsed.content;
        data = { ...data, ...parsed.data };
    } catch (e) {
        console.error("Failed to read privacy-policy.md", e);
    }

    const lastUpdatedDate = data.lastUpdated ? new Date(data.lastUpdated) : new Date();

    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{data.title}</h1>
                    <p className="text-gray-400 mb-8 border-b border-white/10 pb-8">
                        Last Updated: {lastUpdatedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>

                    <div className="space-y-8 text-gray-300 markdown-content">
                        <ReactMarkdown
                            components={{
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-4 mt-8" {...props} />,
                                p: ({ node, ...props }) => <p className="text-gray-400 mb-4" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4" {...props} />,
                                li: ({ node, ...props }) => <li {...props} />,
                                a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

            <Footer data={homepageData.footer} />
            <ScrollToTop />
            <FloatingContact />
        </main>
    );
}
