import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Highlighter, Loader2, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { generateSmartHighlights, HighlightedSegment } from '../lib/openai';
import { toast } from 'sonner@2.0.3';

interface HighlightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HighlightDialog({ open, onOpenChange }: HighlightDialogProps) {
  const [inputText, setInputText] = useState('');
  const [highlights, setHighlights] = useState<HighlightedSegment[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleText = `The mitochondrion is a double-membrane-bound organelle found in most eukaryotic organisms. Mitochondria are often called the "powerhouse of the cell" because they generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy. In addition to supplying cellular energy, mitochondria are involved in other tasks, such as signaling, cellular differentiation, and cell death, as well as maintaining control of the cell cycle and cell growth.`;

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    try {
      const segments = await generateSmartHighlights(inputText);
      setHighlights(segments);
    } catch (error) {
      toast.error('Failed to analyze text. Please try again.');
      setHighlights([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUseSample = () => {
    setInputText(sampleText);
    setHighlights([]);
  };

  const handleReset = () => {
    setInputText('');
    setHighlights([]);
  };

  const getHighlightStyle = (type: string) => {
    switch (type) {
      case 'keyword':
        return 'bg-yellow-200 text-yellow-900 px-1 rounded';
      case 'definition':
        return 'bg-blue-200 text-blue-900 px-1 rounded';
      case 'important':
        return 'bg-pink-200 text-pink-900 px-1 rounded font-medium';
      default:
        return '';
    }
  };

  const keywordCount = highlights.filter(h => h.type === 'keyword').length;
  const definitionCount = highlights.filter(h => h.type === 'definition').length;
  const importantCount = highlights.filter(h => h.type === 'important').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Highlighter className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle>Smart Highlights</DialogTitle>
              <DialogDescription>
                AI-powered keyword and definition detection
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {highlights.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm">Enter text to analyze</label>
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
                  placeholder="Paste your study material, notes, or textbook content..."
                  className="min-h-[250px] resize-none"
                />
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                <h4 className="text-sm mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  What gets highlighted:
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-200"></div>
                    <span className="text-slate-700">Key terms and vocabulary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-200"></div>
                    <span className="text-slate-700">Definitions and explanations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-pink-200"></div>
                    <span className="text-slate-700">Important concepts and facts</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Analyzing Text...
                  </>
                ) : (
                  <>
                    <Highlighter className="mr-2 w-4 h-4" />
                    Analyze & Highlight
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
              <div className="flex items-center justify-between">
                <h4>Highlighted Text</h4>
                <div className="flex gap-2">
                  <Badge className="bg-yellow-200 text-yellow-900 border-0">
                    {keywordCount} Keywords
                  </Badge>
                  <Badge className="bg-blue-200 text-blue-900 border-0">
                    {definitionCount} Definitions
                  </Badge>
                  <Badge className="bg-pink-200 text-pink-900 border-0">
                    {importantCount} Important
                  </Badge>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-slate-200 leading-relaxed">
                <p className="text-slate-900">
                  {highlights.map((segment, index) => (
                    <span
                      key={index}
                      className={getHighlightStyle(segment.type)}
                    >
                      {segment.text}
                    </span>
                  ))}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                <h4 className="text-sm mb-2">Legend</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-yellow-200"></div>
                    <span className="text-slate-700">Keywords</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-200"></div>
                    <span className="text-slate-700">Definitions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-pink-200"></div>
                    <span className="text-slate-700">Important</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  Analyze New Text
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600"
                >
                  Export Highlights
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}