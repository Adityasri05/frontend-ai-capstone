import { z } from 'zod';
import { tool } from 'ai';

/**
 * Zod input schema for the scoreCandidate AI tool.
 * Enforces strict validation on numerical score ranges, string lengths, and array bounds.
 */
export const scoreCandidateInputSchema = z.object({
  candidateName: z
    .string()
    .min(1)
    .max(100)
    .default('Candidate')
    .describe('Full name of the candidate being assessed'),
  targetRole: z
    .string()
    .min(1)
    .max(100)
    .default('Senior Frontend / AI Engineer')
    .describe('The target job role for qualification assessment'),
  technicalScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Technical competency score evaluating React 19, Next.js 15, and AI architecture (0-100)'),
  communicationScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Communication clarity and technical articulation score (0-100)'),
  problemSolvingScore: z
    .number()
    .min(0)
    .max(100)
    .describe('System design, trade-off reasoning, and edge-case handling score (0-100)'),
  strengths: z
    .array(z.string().min(1).max(200))
    .min(1)
    .max(6)
    .describe('Key observed engineering strengths with technical evidence'),
  skillGaps: z
    .array(z.string().min(1).max(200))
    .min(1)
    .max(6)
    .describe('Observed areas for growth or technical skill gaps'),
  recommendation: z
    .enum(['strong', 'consider', 'needs-review'])
    .describe('Structured qualification recommendation: strong, consider, or needs-review'),
  summary: z
    .string()
    .min(10)
    .max(500)
    .describe('Executive summary of the candidate technical qualification assessment'),
  forceFailure: z
    .boolean()
    .optional()
    .describe('Development test flag: when true, deliberately triggers a server-side execution failure to test error UI resilience'),
});

export type ScoreCandidateInput = z.infer<typeof scoreCandidateInputSchema>;

/**
 * Structured return shape for the Candidate Score Card
 */
export interface CandidateScoreResult {
  candidateName: string;
  targetRole: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  strengths: string[];
  skillGaps: string[];
  recommendation: 'strong' | 'consider' | 'needs-review';
  summary: string;
  assessedAt: string;
}

/**
 * Calculates weighted composite score:
 * Technical: 50%, Problem Solving: 30%, Communication: 20%
 */
export function calculateOverallScore(technical: number, problemSolving: number, communication: number): number {
  const weighted = technical * 0.5 + problemSolving * 0.3 + communication * 0.2;
  return Math.round(Math.min(100, Math.max(0, weighted)));
}

/**
 * Core business logic for executing candidate qualification scoring.
 */
export async function executeScoreCandidate(input: ScoreCandidateInput): Promise<CandidateScoreResult> {
  // 1. Controlled failure test mechanism for verifying error-state UI
  if (input.forceFailure === true || input.candidateName.toLowerCase().includes('simulate_error')) {
    throw new Error(
      'Controlled execution failure: Candidate assessment calculation pipeline encountered an intentional test error.'
    );
  }

  // 2. Compute overall composite score
  const overallScore = calculateOverallScore(
    input.technicalScore,
    input.problemSolvingScore,
    input.communicationScore
  );

  // 3. Return structured qualification assessment
  return {
    candidateName: input.candidateName,
    targetRole: input.targetRole,
    overallScore,
    technicalScore: Math.round(input.technicalScore),
    communicationScore: Math.round(input.communicationScore),
    problemSolvingScore: Math.round(input.problemSolvingScore),
    strengths: input.strengths,
    skillGaps: input.skillGaps,
    recommendation: input.recommendation,
    summary: input.summary,
    assessedAt: new Date().toISOString(),
  };
}

/**
 * The server-side scoreCandidate tool instance.
 */
export const scoreCandidate = tool({
  description:
    'Evaluates and scores a candidate based on accumulated interview responses, producing a structured Qualification Score Card for HIREVIUM. Invoke this tool when the candidate asks for an assessment or when sufficient technical evidence has been gathered.',
  inputSchema: scoreCandidateInputSchema,
  execute: async (input: ScoreCandidateInput): Promise<CandidateScoreResult> => {
    return executeScoreCandidate(input);
  },
});
