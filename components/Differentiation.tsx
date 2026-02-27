"use client";

import { CheckCircle2, ShieldCheck, Users, Clock } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    CheckCircle2, ShieldCheck, Users, Clock
};

interface DifferentiationProps {
    data: {
        title: string;
        titleHighlight: string;
        subtitle: string;
        items: { icon: string; title: string; description: string }[];
    };
}

export default function Differentiation({ data }: DifferentiationProps) {
    return (
        <section id="differentiation" className="section-padding bg-background border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="heading-2 mb-4">
                        {data.title} <span className="text-primary">{data.titleHighlight}</span>
                    </h2>
                    <p className="body-text max-w-2xl mx-auto text-balance">
                        {data.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.items.map((diff) => {
                        const IconComponent = iconMap[diff.icon];
                        return (
                            <div
                                key={diff.title}
                                className="card-standard flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                    {IconComponent && <IconComponent className="w-8 h-8 text-primary" />}
                                </div>
                                <h3 className="heading-3 mb-4">{diff.title}</h3>
                                <p className="body-text">{diff.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
