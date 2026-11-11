import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import { getHomepageData } from "@/lib/getHomepageData";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/seo";

const PAGE_TITLE = "Terms of Use";
const PAGE_DESCRIPTION = "Terms of Use for Caliber Business Resource. Read our terms and conditions for using our services.";
const PAGE_PATH = "/terms-of-use/";

// Next.js REPLACES (does not merge) openGraph/twitter from the root layout,
// so every field has to be restated here or the homepage values leak through.
export const metadata: Metadata = {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: {
        canonical: PAGE_PATH,
    },
    openGraph: {
        title: `${PAGE_TITLE} | ${SITE_NAME}`,
        description: PAGE_DESCRIPTION,
        url: `${SITE_URL}${PAGE_PATH}`,
        siteName: SITE_NAME,
        type: "website",
        locale: "en_US",
        images: [OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: `${PAGE_TITLE} | ${SITE_NAME}`,
        description: PAGE_DESCRIPTION,
        images: [OG_IMAGE],
    },
};

// This is now a Server Component to read from the filesystem directly
export default async function TermsOfUse() {
    const filePath = path.join(process.cwd(), "data/content/policies/terms-of-use.md");
    const homepageData = getHomepageData();

    let content = "";
    let data = { title: "Terms of Use", lastUpdated: new Date().toISOString() };

    try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const parsed = matter(fileContents);
        content = parsed.content;
        data = { ...data, ...parsed.data };
    } catch (e) {
        console.error("Failed to read terms-of-use.md", e);
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
                        {/* We use ReactMarkdown to render the content with custom components for styling */}
                        <ReactMarkdown
                            components={{
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-4 mt-8" {...props} />,
                                p: ({ node, ...props }) => <p className="text-gray-400 mb-4" {...props} />
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
