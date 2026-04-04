export enum BadgeType {
  CONTRIBUTOR_LEGACY = 'CONTRIBUTOR_LEGACY',
  DIALECT_GUARDIAN = 'DIALECT_GUARDIAN',
  TONAL_MASTER = 'TONAL_MASTER',
  VIGILANT_REVIEWER = 'VIGILANT_REVIEWER',
  OMOLUABI_ELITE = 'OMOLUABI_ELITE'
}

export interface Badge {
  type: BadgeType;
  awardedAt: Date;
  metadata?: any;
}

export interface UserGamificationState {
  xp: number;
  level: number;
  badges: Badge[];
}

export class GamificationEngine {
  /**
   * Calculates XP for a new contribution.
   */
  static calculateContributionXP(type: string, isFirst: boolean): number {
    let baseXP = 10;
    if (isFirst) baseXP += 50;
    if (type === 'ORIKI' || type === 'PROVERB') baseXP += 20; // Complex types
    return baseXP;
  }

  /**
   * Calculates XP for a review.
   */
  static calculateReviewXP(isCorrect: boolean, trustScore: number): number {
    if (!isCorrect) return 5; // Small consolidation XP
    
    let xp = 15;
    if (trustScore > 50) xp += 10;
    return xp;
  }

  /**
   * Evaluates if a user earns a new badge based on their stats.
   */
  static evaluateBadges(userStats: { 
    approvedCount: number; 
    totalReviews: number; 
    reviewAccuracy: number;
    currentBadges: BadgeType[];
  }): BadgeType[] {
    const newBadges: BadgeType[] = [];

    // 1. Dialect Guardian (10+ approved contributions)
    if (userStats.approvedCount >= 10 && !userStats.currentBadges.includes(BadgeType.DIALECT_GUARDIAN)) {
      newBadges.push(BadgeType.DIALECT_GUARDIAN);
    }

    // 2. Vigilant Reviewer (20+ reviews with 90% accuracy)
    if (userStats.totalReviews >= 20 && userStats.reviewAccuracy >= 0.9 && !userStats.currentBadges.includes(BadgeType.VIGILANT_REVIEWER)) {
      newBadges.push(BadgeType.VIGILANT_REVIEWER);
    }

    // 3. Omoluabi Elite (Top tier trust and engagement)
    if (userStats.approvedCount >= 50 && userStats.reviewAccuracy >= 0.95 && !userStats.currentBadges.includes(BadgeType.OMOLUABI_ELITE)) {
      newBadges.push(BadgeType.OMOLUABI_ELITE);
    }

    return newBadges;
  }

  /**
   * Level calculation based on XP.
   * Simple logarithmic level: L = floor(sqrt(XP / 10))
   */
  static calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 10)) + 1;
  }
}
