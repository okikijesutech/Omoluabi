import { Test, TestingModule } from '@nestjs/testing';
import { TrustService } from './trust.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role, ContributionStatus, EntityType, ChangeType } from '@prisma/client';

describe('TrustService', () => {
  let service: TrustService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    contribution: {
      findUnique: jest.fn(),
    },
    revisionHistory: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrustService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TrustService>(TrustService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('syncTrustScore', () => {
    it('should calculate trust score correctly based on the formula', async () => {
      const mockUser = {
        id: 'user-1',
        approvedCount: 10,
        rejectedCount: 2,
        reviewAccuracy: 0.8,
        totalReviews: 5,
        xp: 0,
        badges: []
      };
      
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.update.mockResolvedValue({ ...mockUser, trustScore: 126, level: 1 });

      await service.syncTrustScore('user-1');

      // Formula: (10 * 5) + (0.8 * 100) - (2 * 2) = 50 + 80 - 4 = 126
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { 
          trustScore: 126,
          level: 1,
          badges: []
        },
      });
    });
  });

  describe('evaluatePromotion', () => {
    it('should promote LEARNER to REVIEWER when thresholds met', async () => {
      const user = {
        id: 'user-1',
        role: Role.LEARNER,
        trustScore: 50,
        reviewAccuracy: 0.7,
      };

      mockPrisma.revisionHistory.findFirst.mockResolvedValue(null);
      
      // Accessing private method for testing purpose
      await (service as any).evaluatePromotion(user);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { role: Role.REVIEWER },
      });
    });

    it('should promote REVIEWER to ADMIN (Council) when thresholds met', async () => {
      const user = {
        id: 'user-1',
        role: Role.REVIEWER,
        trustScore: 100,
        reviewAccuracy: 0.8,
      };

      mockPrisma.revisionHistory.findFirst.mockResolvedValue(null);
      
      await (service as any).evaluatePromotion(user);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { role: Role.ADMIN },
      });
    });
  });

  describe('evaluateSuspension', () => {
    it('should demote REVIEWER to LEARNER if accuracy drops below threshold', async () => {
      const user = {
        id: 'user-1',
        role: Role.REVIEWER,
        totalReviews: 20,
        reviewAccuracy: 0.35,
      };

      mockPrisma.revisionHistory.findFirst.mockResolvedValue(null);

      await (service as any).evaluateSuspension(user);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { role: Role.LEARNER },
      });
    });
  });
});
