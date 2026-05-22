import { DailyGoal, GoalKind, goals } from "../data/goals";

const STORAGE_KEY = "deborah_goals_progress_v1";

export type GoalEntry = {
  goalId: string;
  completedAt?: string;
  usedSofterOption?: boolean;
  postponedAt?: string;
};

export type ProgressState = {
  firstVisitDate: string;
  lastSeenDate: string;
  entries: Record<string, GoalEntry>;
};

export type ProgressStats = {
  totalCompleted: number;
  currentStreak: number;
  bestStreak: number;
  completionDates: string[];
  completedKinds: GoalKind[];
  postponedDates: string[];
  unlockedWeek: number;
};

export function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function loadProgress(): ProgressState {
  const today = getTodayKey();
  const fallback: ProgressState = {
    firstVisitDate: today,
    lastSeenDate: today,
    entries: {},
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      firstVisitDate: parsed.firstVisitDate || today,
      lastSeenDate: today,
      entries: parsed.entries || {},
    };
  } catch {
    return fallback;
  }
}

export function saveProgress(progress: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getGoalById(id: string) {
  return goals.find((goal) => goal.id === id) || goals[0];
}

export function getStats(progress: ProgressState): ProgressStats {
  const completedEntries = Object.entries(progress.entries)
    .filter(([, entry]) => Boolean(entry.completedAt))
    .sort(([a], [b]) => a.localeCompare(b));
  const completionDates = completedEntries.map(([date]) => date);
  const completedKinds = completedEntries.map(([, entry]) => getGoalById(entry.goalId).kind);
  const postponedDates = Object.entries(progress.entries)
    .filter(([, entry]) => Boolean(entry.postponedAt))
    .map(([date]) => date);
  const streaks = getStreaks(completionDates);
  const totalCompleted = completedEntries.length;

  return {
    totalCompleted,
    currentStreak: streaks.currentStreak,
    bestStreak: streaks.bestStreak,
    completionDates,
    completedKinds,
    postponedDates,
    unlockedWeek: Math.min(4, Math.floor(totalCompleted / 5) + 1),
  };
}

export function ensureTodayGoal(progress: ProgressState): ProgressState {
  const today = getTodayKey();
  if (progress.entries[today]) {
    return { ...progress, lastSeenDate: today };
  }

  const stats = getStats(progress);
  const goal = pickGoalForToday(today, stats.unlockedWeek, progress);

  return {
    ...progress,
    lastSeenDate: today,
    entries: {
      ...progress.entries,
      [today]: { goalId: goal.id },
    },
  };
}

export function completeToday(progress: ProgressState, usedSofterOption: boolean): ProgressState {
  const today = getTodayKey();
  const ready = ensureTodayGoal(progress);
  const entry = ready.entries[today];

  return {
    ...ready,
    entries: {
      ...ready.entries,
      [today]: {
        ...entry,
        completedAt: entry.completedAt || new Date().toISOString(),
        usedSofterOption,
      },
    },
  };
}

export function postponeToday(progress: ProgressState): ProgressState {
  const today = getTodayKey();
  const ready = ensureTodayGoal(progress);
  const entry = ready.entries[today];

  return {
    ...ready,
    entries: {
      ...ready.entries,
      [today]: {
        ...entry,
        postponedAt: entry.postponedAt || new Date().toISOString(),
      },
    },
  };
}

export function chooseAnotherGoal(progress: ProgressState): ProgressState {
  const today = getTodayKey();
  const stats = getStats(progress);
  const currentGoalId = progress.entries[today]?.goalId;
  const candidates = goals.filter(
    (goal) => goal.week <= stats.unlockedWeek && goal.id !== currentGoalId,
  );
  const goal = candidates[Math.floor(Math.random() * candidates.length)] || goals[0];

  return {
    ...progress,
    entries: {
      ...progress.entries,
      [today]: { goalId: goal.id, postponedAt: progress.entries[today]?.postponedAt },
    },
  };
}

function pickGoalForToday(today: string, unlockedWeek: number, progress: ProgressState): DailyGoal {
  const available = goals.filter((goal) => goal.week <= unlockedWeek);
  const recentlyUsed = new Set(
    Object.entries(progress.entries)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 3)
      .map(([, entry]) => entry.goalId),
  );
  const fresh = available.filter((goal) => !recentlyUsed.has(goal.id));
  const pool = fresh.length > 0 ? fresh : available;
  const seed = numberFromDate(today) + getStats(progress).totalCompleted;

  return pool[seed % pool.length];
}

function numberFromDate(date: string) {
  return date.split("-").reduce((total, part) => total + Number(part), 0);
}

function getStreaks(dates: string[]) {
  if (dates.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  const uniqueTimes = Array.from(new Set(dates))
    .map((date) => new Date(`${date}T00:00:00`).getTime())
    .sort((a, b) => a - b);
  let bestStreak = 1;
  let running = 1;

  for (let index = 1; index < uniqueTimes.length; index += 1) {
    const difference = uniqueTimes[index] - uniqueTimes[index - 1];
    if (difference === 24 * 60 * 60 * 1000) {
      running += 1;
      bestStreak = Math.max(bestStreak, running);
    } else {
      running = 1;
    }
  }

  const today = new Date(`${getTodayKey()}T00:00:00`).getTime();
  const last = uniqueTimes[uniqueTimes.length - 1];
  const yesterday = today - 24 * 60 * 60 * 1000;
  const currentStreak = last === today || last === yesterday ? running : 0;

  return { currentStreak, bestStreak };
}
