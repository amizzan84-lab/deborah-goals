import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  Home,
  Leaf,
  MessageCircle,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  Sprout,
  Sun,
  Trophy,
  Wind,
} from "lucide-react";
import {
  achievements,
  affirmations,
  completionMessages,
  GoalKind,
  goals,
  weeklyThemes,
} from "./data/goals";
import {
  chooseAnotherGoal,
  completeToday,
  ensureTodayGoal,
  getGoalById,
  getStats,
  getTodayKey,
  loadProgress,
  postponeToday,
  ProgressState,
  saveProgress,
} from "./lib/progress";

type View = "today" | "progress" | "support";

const kindMeta: Record<GoalKind, { label: string; Icon: typeof Heart }> = {
  breath: { label: "respiro", Icon: Wind },
  body: { label: "corpo", Icon: Sprout },
  light: { label: "luce", Icon: Sun },
  care: { label: "cura", Icon: Heart },
  contact: { label: "contatto", Icon: MessageCircle },
  space: { label: "spazio", Icon: Home },
  creative: { label: "creativita'", Icon: Sparkles },
};

const ease = [0.16, 1, 0.3, 1] as const;

function App() {
  const [progress, setProgress] = useState<ProgressState>(() => ensureTodayGoal(loadProgress()));
  const [view, setView] = useState<View>("today");
  const today = getTodayKey();
  const todayEntry = progress.entries[today];
  const todayGoal = getGoalById(todayEntry.goalId);
  const stats = useMemo(() => getStats(progress), [progress]);
  const theme = weeklyThemes[stats.unlockedWeek - 1] || weeklyThemes[0];
  const todayCompleted = Boolean(todayEntry.completedAt);
  const todayPostponed = Boolean(todayEntry.postponedAt);
  const affirmation = affirmations[(stats.totalCompleted + today.length) % affirmations.length];
  const progressRatio = Math.min(1, stats.totalCompleted / goals.length);
  const progressPercent = Math.round(progressRatio * 100);
  const completionMessage =
    completionMessages[(stats.totalCompleted + today.length) % completionMessages.length];
  const recentDays = useMemo(() => getRecentDays(progress), [progress]);
  const unlockedAchievements = achievements.filter((achievement) =>
    achievement.isUnlocked(stats),
  );
  const MetaIcon = kindMeta[todayGoal.kind].Icon;

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  function updateProgress(next: ProgressState) {
    setProgress(next);
  }

  return (
    <main className="app-shell">
      <div className="ambient-motes" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <section className="hero-band">
        <div className="hero-copy">
          <p className="eyebrow">Deborah Goals</p>
          <h1>Un passo piccolo per questa mattina.</h1>
          <p>{affirmation}</p>
        </div>

        <motion.img
          src="/assets/hedgehog-companion.png"
          alt="Un piccolo porcospino tranquillo accanto a una tazza"
          className="hedgehog"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      <nav className="tabs" aria-label="Sezioni">
        <button className={view === "today" ? "active" : ""} onClick={() => setView("today")}>
          <Sun size={18} />
          Oggi
        </button>
        <button
          className={view === "progress" ? "active" : ""}
          onClick={() => setView("progress")}
        >
          <Trophy size={18} />
          Progressi
        </button>
        <button
          className={view === "support" ? "active" : ""}
          onClick={() => setView("support")}
        >
          <Shield size={18} />
          Appoggio
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {view === "today" && (
          <motion.section
            key="today"
            className="panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="week-strip">
              <div>
                <span>Settimana {stats.unlockedWeek}</span>
                <strong>{theme.title}</strong>
              </div>
              <p>{theme.note}</p>
            </div>

            <WeekPath unlockedWeek={stats.unlockedWeek} />

            <article className={`goal-card ${todayCompleted ? "is-complete" : ""}`}>
              <div className="goal-topline">
                <span>
                  <MetaIcon size={16} />
                  {kindMeta[todayGoal.kind].label}
                </span>
                <span>{todayGoal.minutes} min</span>
              </div>

              <h2>{todayGoal.title}</h2>
              <p className="goal-why">{todayGoal.why}</p>

              <motion.ol className="steps" initial="hidden" animate="show">
                {todayGoal.steps.map((step, index) => (
                  <motion.li
                    key={step}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ delay: index * 0.08, duration: 0.35, ease }}
                  >
                    <ChevronRight size={17} />
                    <span>{step}</span>
                  </motion.li>
                ))}
              </motion.ol>

              <div className="soft-option">
                <Sparkles size={17} />
                <span>{todayGoal.softerOption}</span>
              </div>

              {todayPostponed && !todayCompleted && (
                <div className="postpone-state">
                  <Clock3 size={19} />
                  <span>Va bene riprenderlo piu' tardi. Non e' perso.</span>
                </div>
              )}

              {todayCompleted ? (
                <div className="done-state">
                  <div className="completion-sparkles" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <CheckCircle2 size={22} />
                  <div>
                    <strong>{completionMessage}</strong>
                    <span>Hai dato alla mattina un punto d'appoggio.</span>
                  </div>
                </div>
              ) : (
                <div className="actions">
                  <button className="primary-action" onClick={() => updateProgress(completeToday(progress, false))}>
                    <CheckCircle2 size={19} />
                    Fatto con calma
                  </button>
                  <button className="secondary-action" onClick={() => updateProgress(completeToday(progress, true))}>
                    Ho fatto la versione morbida
                  </button>
                  <button className="secondary-action" onClick={() => updateProgress(postponeToday(progress))}>
                    <Clock3 size={18} />
                    Lo rimando a dopo
                  </button>
                </div>
              )}
            </article>

            {!todayCompleted && (
              <button className="quiet-button" onClick={() => updateProgress(chooseAnotherGoal(progress))}>
                <RefreshCw size={16} />
                Questo oggi e' troppo
              </button>
            )}
          </motion.section>
        )}

        {view === "progress" && (
          <motion.section
            key="progress"
            className="panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            <section className="progress-hero">
              <div className="progress-ring" style={{ "--progress": progressRatio } as CSSProperties}>
                <svg viewBox="0 0 120 120" role="img" aria-label={`Progresso ${progressPercent} percento`}>
                  <circle className="ring-track" cx="60" cy="60" r="48" />
                  <circle className="ring-fill" cx="60" cy="60" r="48" />
                </svg>
                <div>
                  <strong>{progressPercent}%</strong>
                  <span>sentiero</span>
                </div>
              </div>
              <div className="recent-days" aria-label="Ultimi sette giorni">
                {recentDays.map((day) => (
                  <span key={day.key} className={day.state}>
                    <small>{day.label}</small>
                  </span>
                ))}
              </div>
            </section>

            <div className="stats-grid">
              <div>
                <span>Completati</span>
                <strong>{stats.totalCompleted}</strong>
              </div>
              <div>
                <span>Giorni vicini</span>
                <strong>{stats.currentStreak}</strong>
              </div>
              <div>
                <span>Mattine vicine</span>
                <strong>{stats.bestStreak}</strong>
              </div>
            </div>

            <WeekPath unlockedWeek={stats.unlockedWeek} compact />

            <section className="achievement-list">
              <h2>Piccole medaglie</h2>
              {achievements.map((achievement) => {
                const unlocked = unlockedAchievements.some((item) => item.id === achievement.id);
                return (
                  <article key={achievement.id} className={unlocked ? "achievement unlocked" : "achievement"}>
                    <span className="medal">
                      {unlocked ? <Award size={20} /> : <Trophy size={19} />}
                    </span>
                    <div>
                      <strong>{achievement.title}</strong>
                      <span>{achievement.description}</span>
                    </div>
                  </article>
                );
              })}
            </section>
          </motion.section>
        )}

        {view === "support" && (
          <motion.section
            key="support"
            className="panel support-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            <h2>Se stamattina e' troppo</h2>
            <p>
              Puoi lasciare l'obiettivo per dopo, scegliere la versione piu' piccola,
              o restare qui un momento. Anche aprire questa schermata puo' bastare.
            </p>
            <div className="support-note">
              <Shield size={19} />
              <span>
                Se c'e' un rischio immediato o la giornata diventa pericolosa, non restare sola:
                chiama una persona vicina, il medico, il 112 o il pronto soccorso.
              </span>
            </div>
            <div className="grounding">
              <strong>Una cosa piccola adesso</strong>
              <span>Guarda intorno e scegli solo una cosa vicina: un colore, un suono o un punto fermo.</span>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function WeekPath({ unlockedWeek, compact = false }: { unlockedWeek: number; compact?: boolean }) {
  return (
    <div className={compact ? "week-path compact" : "week-path"} aria-label={`Settimana ${unlockedWeek} di 4`}>
      {weeklyThemes.map((theme, index) => {
        const week = index + 1;
        const active = week === unlockedWeek;
        const reached = week <= unlockedWeek;
        const Icon = week === 1 ? Leaf : week === 2 ? Heart : week === 3 ? Sun : Star;

        return (
          <div key={theme.week} className={reached ? "path-step reached" : "path-step"}>
            <motion.span
              animate={active ? { y: [0, -3, 0], scale: [1, 1.05, 1] } : undefined}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon size={17} />
            </motion.span>
            <small>{compact ? week : theme.title}</small>
          </div>
        );
      })}
    </div>
  );
}

function getRecentDays(progress: ProgressState) {
  const labels = ["D", "L", "M", "M", "G", "V", "S"];
  const today = new Date(`${getTodayKey()}T00:00:00`);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const key = getTodayKey(date);
    const entry = progress.entries[key];

    return {
      key,
      label: labels[date.getDay()],
      state: entry?.completedAt ? "complete" : entry?.postponedAt ? "soft" : "empty",
    };
  });
}

export default App;
