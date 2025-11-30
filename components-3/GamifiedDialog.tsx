import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Gamepad2, Trophy, Star, Zap, Target, Award, Crown, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface GamifiedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: typeof Trophy;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export function GamifiedDialog({ open, onOpenChange }: GamifiedDialogProps) {
  const [xp, setXp] = useState(3450);
  const [level, setLevel] = useState(12);
  const [streak, setStreak] = useState(7);
  const [currentView, setCurrentView] = useState<'overview' | 'achievements'>('overview');

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first study session',
      icon: Star,
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Maintain a 7-day study streak',
      icon: Flame,
      unlocked: true,
      progress: 7,
      maxProgress: 7
    },
    {
      id: 3,
      title: 'Quiz Master',
      description: 'Score 100% on 10 quizzes',
      icon: Trophy,
      unlocked: false,
      progress: 6,
      maxProgress: 10
    },
    {
      id: 4,
      title: 'Flashcard Expert',
      description: 'Review 500 flashcards',
      icon: Zap,
      unlocked: false,
      progress: 342,
      maxProgress: 500
    },
    {
      id: 5,
      title: 'Study Champion',
      description: 'Reach level 25',
      icon: Crown,
      unlocked: false,
      progress: 12,
      maxProgress: 25
    },
    {
      id: 6,
      title: 'Knowledge Seeker',
      description: 'Complete 100 study sessions',
      icon: Target,
      unlocked: false,
      progress: 67,
      maxProgress: 100
    }
  ];

  const xpForNextLevel = 500;
  const currentLevelXp = 450;
  const levelProgress = (currentLevelXp / xpForNextLevel) * 100;

  const recentActivities = [
    { type: 'quiz', title: 'Biology Quiz', xp: 50, time: '2 hours ago' },
    { type: 'flashcards', title: 'Chemistry Flashcards', xp: 30, time: '5 hours ago' },
    { type: 'recording', title: 'Physics Lecture', xp: 40, time: 'Yesterday' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle>Gamified Learning</DialogTitle>
              <DialogDescription>
                Track your progress and earn achievements
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 border-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Level</p>
                  <p className="text-2xl text-slate-900">{level}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Streak</p>
                  <p className="text-2xl text-slate-900">{streak} days</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total XP</p>
                  <p className="text-2xl text-slate-900">{xp.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Level Progress */}
          <Card className="p-6 border-2 bg-gradient-to-br from-purple-50 to-violet-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-purple-600 text-white">Level {level}</Badge>
                <span className="text-sm text-slate-600">
                  {currentLevelXp} / {xpForNextLevel} XP
                </span>
              </div>
              <span className="text-sm text-slate-600">
                {xpForNextLevel - currentLevelXp} XP to next level
              </span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </Card>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-200">
            <button
              onClick={() => setCurrentView('overview')}
              className={`px-4 py-2 text-sm transition-colors ${
                currentView === 'overview'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Recent Activity
            </button>
            <button
              onClick={() => setCurrentView('achievements')}
              className={`px-4 py-2 text-sm transition-colors ${
                currentView === 'achievements'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Achievements
            </button>
          </div>

          {/* Content */}
          {currentView === 'overview' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {recentActivities.map((activity, index) => (
                <Card key={index} className="p-4 border hover:border-purple-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-900">{activity.title}</p>
                        <p className="text-sm text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      +{activity.xp} XP
                    </Badge>
                  </div>
                </Card>
              ))}

              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600" size="lg">
                  Start New Study Session
                  <Zap className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {achievements.map((achievement) => {
                const AchievementIcon = achievement.icon;
                const progress = (achievement.progress / achievement.maxProgress) * 100;

                return (
                  <Card
                    key={achievement.id}
                    className={`p-4 border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-green-200 bg-green-50/50'
                        : 'border-slate-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                            : 'bg-gradient-to-br from-slate-300 to-slate-400'
                        }`}
                      >
                        <AchievementIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="text-slate-900">{achievement.title}</h4>
                            <p className="text-sm text-slate-600">{achievement.description}</p>
                          </div>
                          {achievement.unlocked && (
                            <Badge className="bg-green-600 text-white">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        {!achievement.unlocked && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1 text-xs text-slate-600">
                              <span>Progress</span>
                              <span>
                                {achievement.progress} / {achievement.maxProgress}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}