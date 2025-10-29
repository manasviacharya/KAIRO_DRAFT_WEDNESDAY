import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const timeOptions = ['Other', 'Yesterday', 'Today'];
const moodOptions = [
  { label: 'Great', emoji: '😊', color: 'bg-green-500', value: 'great' },
  { label: 'Good', emoji: '🙂', color: 'bg-green-400', value: 'good' },
  { label: 'Okay', emoji: '😐', color: 'bg-yellow-500', value: 'okay' },
  { label: 'Bad', emoji: '😔', color: 'bg-orange-500', value: 'bad' },
  { label: 'Awful', emoji: '😢', color: 'bg-red-500', value: 'awful' },
];

const socialContextOptions = [
  { label: 'Myself', emoji: '👤' },
  { label: 'People I don\'t know', emoji: '👥' },
  { label: 'Close Family', emoji: '👨‍👩‍👧‍👦' },
  { label: 'Extended Family', emoji: '👪' },
  { label: 'Friends', emoji: '👯' },
  { label: 'Coworkers', emoji: '💼' },
  { label: 'Partner', emoji: '💑' },
  { label: 'Dog', emoji: '🐕' },
  { label: 'Team', emoji: '⚽' },
  { label: 'Club', emoji: '🎭' },
];

const locationOptions = [
  { label: 'Home', emoji: '🏠' },
  { label: 'Work', emoji: '💼' },
  { label: 'Place of study', emoji: '🎓' },
  { label: 'Transport', emoji: '🚗' },
  { label: 'Gym activity', emoji: '🏋️' },
  { label: 'Bar / restaurant', emoji: '🍽️' },
];

interface MoodEntry {
  id: number;
  mood: string;
  note: string;
  date: string;
  time: string;
}

export default function MoodTracker() {
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState('Today');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedContext, setSelectedContext] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const [moodHistory] = useState<MoodEntry[]>([
    { id: 1, mood: 'good', note: 'Had a productive meeting at work', date: '2025-10-27', time: '2:30 PM' },
    { id: 2, mood: 'okay', note: 'Feeling a bit tired but managing', date: '2025-10-27', time: '10:15 AM' },
    { id: 3, mood: 'great', note: 'Morning meditation helped me feel centered', date: '2025-10-26', time: '8:00 AM' },
    { id: 4, mood: 'bad', note: 'Struggling with some anxiety', date: '2025-10-25', time: '6:45 PM' },
  ]);

  const handleSave = () => {
    if (selectedMood) {
      console.log('Mood logged:', { mood: selectedMood, context: selectedContext, location: selectedLocation, note, time: selectedTime });
      setSaved(true);
      setTimeout(() => {
        setSelectedMood('');
        setSelectedContext([]);
        setSelectedLocation([]);
        setNote('');
        setStep(1);
        setSaved(false);
      }, 2000);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSave();
    }
  };

  const toggleContext = (context: string) => {
    setSelectedContext(prev =>
      prev.includes(context)
        ? prev.filter(c => c !== context)
        : [...prev, context]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocation(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const getMoodData = (moodValue: string) => {
    return moodOptions.find(m => m.value === moodValue);
  };

  const currentMoodData = moodOptions.find(m => m.value === selectedMood);

  return (
    <div className="space-y-6">
      <Card className="p-6" data-testid="card-mood-tracker">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-primary" data-testid="icon-heart" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" data-testid="text-mood-title">Track Your Mood</h2>
              <p className="text-muted-foreground" data-testid="text-mood-subtitle">Log how you're feeling throughout the day</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tracking your mood helps you recognize emotional patterns and triggers over time. Log how you're feeling 
            right now, add optional notes about what's influencing your emotions, and build a history of your emotional 
            well-being. Regular mood tracking provides valuable insights into your mental health journey and helps you 
            identify what makes you feel your best.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Step 1: Rate your mood */}
            {step === 1 && (
              <>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-6">Rate your mood</h3>
                  
                  {/* Time selector */}
                  <div className="flex justify-center gap-2 mb-8">
                    {timeOptions.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        onClick={() => setSelectedTime(time)}
                        className="min-w-24"
                        size="sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>

                  {/* Large mood emoji display */}
                  <div className="flex justify-center mb-8">
                    <div className="w-48 h-48 flex items-center justify-center bg-muted rounded-full">
                      <span className="text-8xl">
                        {currentMoodData ? currentMoodData.emoji : '😐'}
                      </span>
                    </div>
                  </div>

                  {/* Mood buttons */}
                  <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 ${
                          selectedMood === mood.value
                            ? `${mood.color} text-white shadow-lg`
                            : 'bg-muted hover:bg-accent'
                        }`}
                        data-testid={`button-mood-${mood.value}`}
                      >
                        <span className="text-2xl">{mood.emoji}</span>
                        <span className="text-sm font-medium">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Who were you with? */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-center">Who were you with?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                  {socialContextOptions.map((context) => (
                    <button
                      key={context.label}
                      onClick={() => toggleContext(context.label)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all border-2 ${
                        selectedContext.includes(context.label)
                          ? 'bg-primary text-primary-foreground border-primary shadow-md'
                          : 'bg-card border-muted hover:border-primary/50 hover:bg-accent'
                      }`}
                    >
                      <span className="text-3xl">{context.emoji}</span>
                      <span className="text-xs font-medium text-center">{context.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Where were you? */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-center">Where were you?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {locationOptions.map((location) => (
                    <button
                      key={location.label}
                      onClick={() => toggleLocation(location.label)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all border-2 ${
                        selectedLocation.includes(location.label)
                          ? 'bg-primary text-primary-foreground border-primary shadow-md'
                          : 'bg-card border-muted hover:border-primary/50 hover:bg-accent'
                      }`}
                    >
                      <span className="text-3xl">{location.emoji}</span>
                      <span className="text-sm font-medium text-center">{location.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 max-w-xl mx-auto">
                  <label className="text-sm font-medium mb-2 block">Additional notes (optional)</label>
                  <Textarea
                    placeholder="What contributed to this mood?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-[100px]"
                    data-testid="input-mood-note"
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 pt-6 max-w-xl mx-auto">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 h-14 text-lg"
                  size="lg"
                >
                  BACK
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={(step === 1 && !selectedMood) || saved}
                className="flex-1 h-14 text-lg font-semibold"
                size="lg"
                data-testid="button-save-mood"
              >
                {saved ? 'SAVED!' : step === 3 ? 'SAVE' : 'NEXT'}
              </Button>
            </div>

            {/* Step indicator */}
            <div className="flex justify-center gap-2 pt-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full transition-all ${
                    s === step ? 'bg-primary w-8' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>

      <Card className="p-6" data-testid="card-mood-history">
        <h3 className="text-xl font-bold mb-4" data-testid="text-history-title">Recent Mood History</h3>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {moodHistory.map((entry) => {
              const moodData = getMoodData(entry.mood);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-muted rounded-lg"
                  data-testid={`mood-entry-${entry.id}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{moodData?.emoji}</span>
                      <span className="font-medium capitalize">{entry.mood}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {entry.date} at {entry.time}
                    </div>
                  </div>
                  {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
