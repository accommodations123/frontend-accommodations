import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, linkText, linkTo }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-8 bg-gradient-to-b from-[#01172d] to-[#02305d] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#01172d]">{title}</h2>
            </div>
            <p className="text-gray-600 max-w-2xl">{subtitle}</p>
        </div>
        {linkText && linkTo && (
            <Link
                to={linkTo}
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-lg transition-all"
                aria-label={`View ${linkText}`}
            >
                {linkText}
                <ArrowRight className="h-4 w-4" />
            </Link>
        )}
    </div>
);
