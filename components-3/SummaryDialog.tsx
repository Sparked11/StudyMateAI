import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Loader2, Zap, ArrowRight, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { generateSmartSummary } from '../lib/openai';
import { toast } from 'sonner@2.0.3';

interface SummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SummaryDialog({ open, onOpenChange }: SummaryDialogProps) {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const sampleText = `Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments. During photosynthesis, plants take in carbon dioxide (CO2) from the air and water (H2O) from the soil. Using the energy from sunlight, these substances are converted into glucose (C6H12O6) and oxygen (O2).

The process can be divided into two main stages: the light-dependent reactions and the light-independent reactions (Calvin cycle). The light-dependent reactions occur in the thylakoid membranes of the chloroplasts, where sunlight is absorbed by chlorophyll and other pigments. This energy is used to split water molecules, releasing oxygen as a byproduct and producing ATP and NADPH.

The light-independent reactions take place in the stroma of the chloroplasts. Here, ATP and NADPH from the light-dependent reactions are used to convert CO2 into glucose through a series of chemical reactions known as the Calvin cycle. This glucose serves as the primary energy source for the plant and can be converted into other organic compounds such as starch for storage.

Photosynthesis is crucial for life on Earth as it is the primary source of oxygen in the atmosphere and forms the base of most food chains. Without photosynthesis, most life forms would not be able to survive, as they depend either directly or indirectly on the oxygen and organic compounds produced by photosynthetic organisms.`;

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    
    try {
      const response = await generateSmartSummary(inputText);
      setSummary(response);
    } catch (error) {
      toast.error('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseSample = () => {
    setInputText(sampleText);
    setSummary('');
  };

  const handleReset = () => {
    setInputText('');
    setSummary('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle>AI Smart Summaries</DialogTitle>
              <DialogDescription>
                Transform lengthy notes into concise summaries
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {!summary ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm">Enter your text to summarize</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleUseSample}
                  >
                    Use sample text
                  </Button>
                </div>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your notes, lecture transcript, or any text you want to summarize..."
                  className="min-h-[300px] resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-500">
                    {inputText.split(/\s+/).filter(w => w.length > 0).length} words
                  </p>
                  {inputText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!inputText.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 w-4 h-4" />
                    Generate Smart Summary
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-purple-600 text-white">AI Summary</Badge>
                  <Badge variant="outline" className="border-green-600 text-green-700">
                    {Math.round((1 - summary.length / inputText.length) * 100)}% shorter
                  </Badge>
                </div>
                <div className="prose prose-slate max-w-none">
                  {summary.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-600">Original Text</span>
                  <Badge variant="outline">
                    {inputText.split(/\s+/).filter(w => w.length > 0).length} words
                  </Badge>
                </div>
                <p className="text-sm text-slate-700 line-clamp-4">{inputText}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  Try Another
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  Export Summary
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}