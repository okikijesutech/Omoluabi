# Omoluabi Governance & Trust System

## 1. Contribution Lifecycle

### Submission
1. A contributor submits a change (`CREATE`, `EDIT`, or `DIALECT_VARIATION`).
2. The change is stored in the `Contribution` table as a JSON payload (`PENDING` status).
3. The live database remains untouched.

### Review Tier
- Each contribution requires at least **2 approvals** to pass.
- If 2 rejections occur, the contribution is marked `REJECTED`.
- If there is a tie (1 Approve, 1 Reject), a 3rd reviewer is requested.
- If high conflict persists, the case is `ESCALATED`.

### Execution
- Upon approval, the `KnowledgeService` executes the change.
- **EDITs** and **DELETEs** trigger a `RevisionHistory` snapshot before execution.

---

## 2. Trust Scoring Algorithm
Omoluabi uses a reputation-based trust model to govern authority.

### The Formula
`TrustScore = (approvedCount * 2) + (reviewAccuracy * 5) - (rejectedCount * 1)`

- **`approvedCount`**: Number of the user's contributions that were approved by the community.
- **`reviewAccuracy`**: Percentage of reviews where the user's decision aligned with the final community outcome.
- **`rejectedCount`**: Number of the user's contributions that were rejected.

### Algorithmic Promotions
- **Promotion to REVIEWER**: Automated when `TrustScore >= 50` AND `reviewAccuracy >= 0.7`.
- **Promotion to COUNCIL**: Automated when `TrustScore >= 100` AND `reviewAccuracy >= 0.8`.

### Algorithmic Suspensions
- If a reviewer's accuracy falls below **40%** after 20+ reviews, their reviewer privileges are automatically revoked.

---

## 3. Cultural Escalation Council
The Council is the final guard against cultural erosion or sensitivity violations.

- **Trigger**: Sparked by `ESCALATED` status or attempts to delete dialect variations.
- **Membership**: A rotational board of the top 5–7 most trusted users in the system.
- **Voting**: Requires at least 5 votes.
- **Tie-breaker**: If a decision cannot be reached, the system defaults to **ARCHIVE** state—preserving the data in the backend but hiding it from the public view until a manual audit can be performed.
