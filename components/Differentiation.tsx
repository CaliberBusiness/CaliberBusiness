"use client";

import { CheckCircle2, ShieldCheck, Users, Clock } from "lucide-react";

const differentiators = [
    {
        title: "Structured Multi-Stage Vetting",
        description: "We don't just forward resumes. Every candidate undergoes rigorous technical, behavioral, and cultural alignment screening before reaching your desk.",
        icon: ShieldCheck,
    },
    {
        title: "Dedicated Account Managers",
        description: "Your assigned Account Manager ensures smooth onboarding, handles performance reviews, and acts as your single point of contact for all HR needs.",
        icon: Users,
    },
    {
        title: "Ongoing Performance Oversight",
        description: "Our involvement doesn't end at placement. We provide continuous support and infrastructure to ensure long-term retention and productivity.",
        icon: Clock,
    },
    {
        title: "Long-Term Partnership Focus",
        description: "We build dedicated remote teams designed to scale with your business over years, not just fill short-term gaps.",
        icon: CheckCircle2,
    },
];

export default function Differentiation() {
    return (
        <section id="differentiation" className="section-padding bg-background border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="heading-2 mb-4">
                        What Sets <span className="text-primary">Caliber Apart</span>
                    </h2>
                    <p className="body-text max-w-2xl mx-auto text-balance">
                        We operate as your premium managed staffing partner, prioritizing quality, retention, and seamless integration.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {differentiators.map((diff) => (
                        <div
                            key={diff.title}
                            className="card-standard flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <diff.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="heading-3 mb-4">{diff.title}</h3>
                            <p className="body-text">
                                {diff.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
