import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  Home,
  MessageCircle,
  RefreshCw,
  Shield,
  Sparkles,
  Sprout,
  Sun,
  Trophy,
  Wind,
} from "lucide-react";
import { achievements, affirmations, GoalKind, weeklyThemes } from "./data/goals";
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

              <ol className="steps">
                {todayGoal.steps.map((step) => (
                  <li key={step}>
                    <ChevronRight size={17} />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

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
                  <CheckCircle2 size={22} />
                  <div>
                    <strong>Fatto. Per oggi basta cosi'.</strong>
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

            <div className="progress-line" aria-label={`Settimana ${stats.unlockedWeek} di 4`}>
              {[1, 2, 3, 4].map((week) => (
                <span key={week} className={week <= stats.unlockedWeek ? "active" : ""} />
              ))}
            </div>

            <section className="achievement-list">
              <h2>Piccole medaglie</h2>
              {achievements.map((achievement) => {
                const unlocked = unlockedAchievements.some((item) => item.id === achievement.id);
                return (
                  <article key={achievement.id} className={unlocked ? "achievement unlocked" : "achievement"}>
                    <Trophy size={19} />
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

export default App;
