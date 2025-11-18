export function calculateLevel(xp: number): number {
  return Math.floor(0.05 * Math.sqrt(xp));
}

export function calculateXpForLevel(level: number): number {
  return Math.pow(level / 0.05, 2);
}

export function getXpToNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  const nextLevelXp = calculateXpForLevel(currentLevel + 1);
  return Math.ceil(nextLevelXp - currentXp);
}

export function getXpPercentageToNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  const currentLevelMinXp = calculateXpForLevel(currentLevel);
  const nextLevelMinXp = calculateXpForLevel(currentLevel + 1);
  const xpInLevel = currentXp - currentLevelMinXp;
  const xpNeededForLevel = nextLevelMinXp - currentLevelMinXp;
  return (xpInLevel / xpNeededForLevel) * 100;
}
