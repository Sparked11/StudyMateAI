import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Construction } from 'lucide-react';

interface PagePlaceholderProps {
  title: string;
  description: string;
  onBack: () => void;
}

export function PagePlaceholder({ title, description, onBack }: PagePlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <Construction className="w-24 h-24 mx-auto text-purple-600 mb-6" />
          <h1 className="text-4xl lg:text-5xl text-slate-900 mb-4">
            {title}
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            {description}
          </p>
        </div>
        
        <Button 
          size="lg"
          onClick={onBack}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 h-14 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
