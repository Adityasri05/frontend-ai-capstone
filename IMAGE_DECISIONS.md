# Real vs. AI-Generated Visual Decisions

This document registers the design rationale behind choosing either actual screenshots (real captures), photographs, or AI-generated visual assets for different sections of the portfolio.

---

## 1. Project Screenshots (HIREVIUM, INDRA AI, StackScout)
- **Decision**: **REAL CAPTURE**
- **Reasoning**:
  Hiring managers at AI/ML startups evaluate portfolio candidates on engineering credibility. Using AI-generated mockup screenshots or fictional dashboard frames communicates that the products do not actually exist or that the engineer has not built them. Real captures prove the code builds, the layout renders, and actual features are operational.
- **What is lost by generating**:
  Generating a fake dashboard would strip away all credibility, turning a technical portfolio into an abstract design concept site.

---

## 2. Hero Background Pattern
- **Decision**: **AI-GENERATED (SVG Technical Texture)**
- **Reasoning**:
  The hero background does not represent a specific project artifact or personal proof statement. Its sole purpose is to provide structural layout framing, align text boxes, and add a quiet technical texture. Generating a subtle vector-based geometric grid enhances the modern engineering aesthetic without pretending to represent fake data.
- **What is lost by using no image**:
  A blank, flat background on a light-mode site can sometimes feel unpolished or like an unconfigured template. The subtle grid provides a "blueprint" framing that supports the "engineering" positioning.

---

## 3. Profile Photograph
- **Decision**: **REAL PHOTO (or marked as NEEDS REAL PHOTO)**
- **Reasoning**:
  The profile photo represents Aditya Srivastav personally. Using an AI-generated headshot of a non-existent person or a synthetic face is highly misleading and instantly triggers trust issues with hiring managers. Authentic professional engineering portfolios require authentic human representation.
- **What is lost by generating**:
  Hiring managers will feel manipulated if they discover a candidate uses a synthetic profile picture, entirely breaking the trust required for recruitment.
