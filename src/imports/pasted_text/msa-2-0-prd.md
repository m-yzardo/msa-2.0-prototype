# PRD: MSA 2.0 Figma Prototype

**Project:** Marcone Servicers Academy (MSA) 2.0  
**Author:** Yago Zardo  
**Status:** Draft  
**Last updated:** 2026-05-12  
**Hard deadline:** October 2026 — MSA Annual Conference, Las Vegas  
**Design tool:** Figma (high-fidelity)  
**Build tool:** Claude Code + Figma MCP connector

---

## Introduction

MSA World (msaworld.com / members.msaworld.com) is the membership platform for the Marcone Servicers Association — a trade organization for ~3,400 independent appliance service companies across North America. The platform offers a library of 9,500+ technical documents, webinars, training registration, and member support features.

The current platform is a neglected WordPress site with chronological-only search, weak mobile support, and no visual coherence. This PRD defines the screens and interactions needed to build a high-fidelity Figma prototype of MSA 2.0 — covering the public/guest experience (conversion funnel) and the four core features behind the paywall (members area).

**This prototype is not production code.** It is a clickable Figma prototype designed for usability testing with 5–10 real servicers before any development begins. The visual language will be aligned with and reuse components from the MyMarcone 2.0 Figma designs.

**Primary device context:** Techs use this on tablets (iPads, ~75–80% of usage) while in a customer's home. Every screen must work comfortably on a tablet viewport.

---

## Goals

- Deliver a clickable Figma prototype covering all key screens and user flows for usability testing
- Demonstrate the value of the redesign clearly enough for stakeholder sign-off (Srini, Trevor)
- Validate the highest-friction pain points: document discovery, search, and mobile usability
- Establish a consistent visual language between MSA 2.0 and MyMarcone 2.0 so techs who use both platforms navigate them the same way
- Create a design artifact that can be handed off to a developer as the implementation reference

---

## Scope

### In scope

- Public/guest experience: landing page, paywall preview states
- Convention agenda page: both a public-facing version (guest accessible) and an entry point within the members area
- Members area: Technical Document Library, Webinars & Training, Ask a Trainer, MSA Hotline
- Login and authenticated state transitions
- Empty states, error states, loading states for each core feature
- Tablet-first layout (also works on desktop and mobile)

### Out of scope (Phase 2 / separate track)

- AI-powered triaging feature (Srini-led, separate timeline)
- Backend, database, or API design
- Authentication implementation
- Convention agenda page (to be scoped separately once Trevor sends content)
- Technician certification feature (George's request — future phase)
- Parts access across OEM products (George's request — needs clarification, future phase)

---

## User Stories

---

### GUEST EXPERIENCE

---

### US-001: Public Landing Page — Hero and Value Proposition

**Description:** As a prospective member (servicer or service business owner), I want to land on a clear, compelling homepage so that I immediately understand what MSA is and why I should join.

**Acceptance Criteria:**
- [ ] Hero section with headline, subheadline, and a primary CTA ("Join MSA" or equivalent)
- [ ] Visual language matches MyMarcone 2.0 — same type scale, color palette, component style
- [ ] Brief benefit summary visible above the fold (e.g., 3–4 benefit icons/cards: Documents, Training, Health Benefits, Business Benefits)
- [ ] Social proof element visible (e.g., "3,400+ member companies", "9,500+ technical documents")
- [ ] Navigation includes: logo, Login, Join CTA
- [ ] Page is readable and functional on tablet viewport (768px+)

---

### US-002: Pricing and Membership Tiers

**Description:** As a prospective member, I want to see what I get for my money and how to sign up so that I can make a purchase decision.

**Acceptance Criteria:**
- [ ] Pricing section shows a single MSA Pro tier — leave the price as a placeholder (e.g., "Starting at [price]/year") until public announcement is made
- [ ] Benefits listed clearly under the tier (training access, health benefits, business benefits)
- [ ] CTA to start membership ("Join Now" or equivalent)
- [ ] US and Canada pricing structure noted, with placeholder values for both
- [ ] Section is scannable on tablet — no horizontal scroll

---

### US-003: Paywall Preview — Teasing the Members Area

**Description:** As a guest browsing the public site, I want to see enough of what's inside the members area so that I'm motivated to join.

**Acceptance Criteria:**
- [ ] At least one "preview" section on the landing page shows blurred/locked content from the document library or webinar list
- [ ] Lock icon or "Members Only" label clearly marks gated content
- [ ] "Join to unlock" CTA is adjacent to locked content
- [ ] Document library preview shows 3–5 example document cards (brand, appliance type, doc type) in a blurred/grayed state
- [ ] Webinar preview shows 1–2 upcoming or recent webinar titles in a locked state

---

### US-004: Login Flow

**Description:** As a returning member, I want to log in quickly from any page so that I can access my member content.

**Acceptance Criteria:**
- [ ] Login entry point in top navigation (persistent across all public pages)
- [ ] Login screen: email + password fields, "Remember me" checkbox, "Forgot password" link, submit button
- [ ] "Remember me" checked by default — members should not have to log in on every visit
- [ ] On successful login (simulated in prototype): redirect to Members Dashboard
- [ ] Login screen works on tablet viewport
- [ ] Password reset screen: email entry + confirmation message state (no real email needed in prototype)

---

### MEMBERS AREA (AUTHENTICATED)

---

### US-005: Members Dashboard / Home

**Description:** As a logged-in member, I want a clear home screen after login so that I can quickly navigate to the feature I need.

**Acceptance Criteria:**
- [ ] Dashboard shows personalized greeting ("Welcome back, [Name]")
- [ ] Quick access tiles/cards for the 4 core features: Document Library, Webinars & Training, Ask a Trainer, MSA Hotline
- [ ] Search bar with camera scan icon visible on the dashboard — same bar as everywhere else in the members area
- [ ] Brief status indicators if relevant (e.g., "2 new webinars this month", "Your Ask a Trainer question was answered")
- [ ] Navigation bar (persistent): Home, Documents, Training, Ask a Trainer, Hotline, Account
- [ ] MSA Annual Conference banner/promo card (Las Vegas, October 2026)
- [ ] Tablet-friendly layout: cards in 2-column grid minimum

---

### FEATURE 1: TECHNICAL DOCUMENT LIBRARY

---

### US-006: Document Library — Browse and Filter

**Description:** As a technician, I want to browse the document library with useful filters so that I can find the right service document for the appliance I'm working on.

**Acceptance Criteria:**
- [ ] Library page shows a grid or list of document cards
- [ ] Each card shows: appliance brand (as a pill/tag), appliance type (as a pill/tag), document type (as a pill/tag), model number (if available), thumbnail or doc-type icon
- [ ] Filter panel visible (can be a sidebar on tablet or a sticky filter bar): Brand, Appliance Type, Document Type
- [ ] Brand filter lists individual brands as options (e.g., Amana, Bosch, Jenn-Air, KitchenAid, LG, Maytag, Roper, Whirlpool — each as a separate selectable option)
- [ ] Document type filter options include: Service Manual, Wiring Diagram, Fault Codes, Tech Sheet, Parts Breakdown, Service Bulletin, Recall Notice
- [ ] Filters are multi-select (e.g., filter by Brand: Bosch + LG simultaneously)
- [ ] Active filters shown as dismissible chips/tags
- [ ] Result count shown ("Showing 142 results")
- [ ] Empty state: friendly message + suggestion to clear filters or try a different combination
- [ ] Tablet layout: filter bar collapses to a "Filter" button that opens a drawer/panel

---

### US-007: Global Search — Unified Results Across All Content

**Description:** As a technician, I want to search by keyword, brand, or model number from anywhere in the platform and get relevant results across all content types — not just documents.

**Acceptance Criteria:**
- [ ] Search bar accessible from the persistent navigation on every members-area screen
- [ ] Search input placeholder: "Search documents, Q&As, webinars, training..."
- [ ] Results page is unified across 4 content types, organized into sections:
  - **Documents** — service manuals, wiring diagrams, fault codes, etc.
  - **Q&As** — matched Ask a Trainer archive entries
  - **Webinar Recordings** — matched on-demand webinar titles/topics
  - **Upcoming Training** — matched scheduled sessions (hidden if none)
- [ ] Each section shows top 3 results with "See all [N]" expansion link
- [ ] Results ranked by relevance within each section — not chronological
- [ ] Each result card shows content-type label (e.g., "Service Manual", "Q&A", "Webinar") so the user knows what they're tapping into
- [ ] Relevance snippet shown on each result (matching text highlighted)
- [ ] "No results" state with suggestion to broaden the search or submit an Ask a Trainer question
- [ ] When on the Document Library page specifically: a scoped "Documents only" toggle available to narrow results
- [ ] Show both auto-suggest state (as user types) and full results page state in the prototype

---

### US-008: Search — Camera / Model Number Scan

**Description:** As a technician in a customer's home, I want to scan a model number with my tablet camera so that I don't have to type it manually — the scan populates the search and returns the same unified results as any other search.

**Acceptance Criteria:**
- [ ] Camera icon sits inside the search bar (same pattern as a mic icon for voice search) — available wherever the search bar appears
- [ ] Tap triggers a camera viewfinder state (simulated in prototype — show the UI, not a real camera)
- [ ] After simulated scan: the scanned model number populates the search bar and triggers the standard unified results page — no separate "scan results" page
- [ ] The results page is identical to what the user would see if they had typed that model number manually
- [ ] "Not the right result? Edit your search" — the search bar remains editable above the results
- [ ] This is an input method, not a separate feature — it does not have its own navigation entry point

---

### US-009: Document Viewer

**Description:** As a technician, I want to open and read a service document in-browser so that I don't have to download a PDF to a device I may not own.

**Acceptance Criteria:**
- [ ] Tapping a document card opens a document detail page (not a new browser tab)
- [ ] Detail page shows: document title, brand (pill/tag), appliance type (pill/tag), document type (pill/tag), model number, date added
- [ ] Recalls and service bulletins are treated as first-class document types — they appear in search results and on the detail page alongside manuals when relevant to the same model
- [ ] PDF viewer embedded inline on the page (simulate with a placeholder PDF or static image of a page)
- [ ] Viewer controls: page navigation, zoom in/out, download button
- [ ] "Back to results" breadcrumb/button
- [ ] Viewer is usable on tablet without pinch-zoom frustration — minimum readable font size

---

### FEATURE 2: WEBINARS & TRAINING

---

### US-010: Webinars — Browse and Register

**Description:** As a member, I want to see upcoming webinars and register for them so that I can plan my training schedule.

**Acceptance Criteria:**
- [ ] Webinars page shows a list/grid of upcoming webinars
- [ ] Each card shows: title, presenter name, date, time (east and west coast), topic/appliance category
- [ ] "Register" CTA on each card (simulated in prototype — show confirmation state)
- [ ] Registration confirmation state: "You're registered. Add to calendar." with simulated calendar link
- [ ] Filter by: topic/appliance category, date range
- [ ] Webinars are gated — a guest who navigates here sees a paywall prompt instead of the list
- [ ] Tablet layout: cards in 2-column grid

---

### US-011: Webinar Library — On-Demand Recordings

**Description:** As a member, I want to watch past webinar recordings so that I can learn at my own pace.

**Acceptance Criteria:**
- [ ] Library tab/section separate from "Upcoming" — clearly labeled "Watch On Demand" or equivalent
- [ ] Each recording card shows: title, presenter, date, duration, topic/appliance category
- [ ] Tapping a card opens a video player page (simulate with a placeholder video player UI)
- [ ] Video player page shows: video embed area, title, description, related documents (links to document library), related webinars
- [ ] Filter/search by appliance type or topic
- [ ] Empty state if no recordings match filters

---

### US-012: Hands-On and Virtual Training Registration

**Description:** As a member, I want to find and register for in-person or virtual training sessions so that I can build hands-on skills.

**Acceptance Criteria:**
- [ ] Training schedule page shows upcoming sessions in a calendar or list view
- [ ] Each session card shows: title, trainer name (Rick Kuemin, George Schick, or Mitch Williams), format (virtual/hands-on), location (if in-person), date, available spots
- [ ] "Register" CTA on each card with confirmation state
- [ ] Filter by: format (virtual vs. hands-on), trainer, date range
- [ ] Trainer profile snippets visible (short bio line + photo) to reinforce credibility
- [ ] "No upcoming sessions" empty state with "Check back soon" message

---

### FEATURE 3: ASK A TRAINER

---

### US-013: Ask a Trainer — Browse the Q&A Archive

**Description:** As a member, I want to browse and search a shared archive of trainer Q&As so that I can find answers to common repair problems without waiting for a personal response.

**Acceptance Criteria:**
- [ ] Main "Ask a Trainer" page is a forum-style archive of all answered Q&As, visible to any logged-in member
- [ ] Each Q&A entry shows: question title/summary, appliance brand, appliance type, date asked, trainer who answered, short answer preview
- [ ] Tap/click to expand full Q&A thread (question + full trainer response)
- [ ] Search bar at top: search by keyword, appliance brand, or model number
- [ ] Filter by: appliance type, brand, topic/category
- [ ] Questions sorted by most recent by default; option to sort by most viewed or most relevant
- [ ] "Ask a Question" CTA is prominent — accessible from this page
- [ ] Empty state (no results for a filter/search): "No Q&As found. Try a different search or ask a trainer directly."

---

### US-014: Ask a Trainer — Submit a Question

**Description:** As a member, I want to submit a technical question to an MSA trainer so that I can get expert help on a repair I'm stuck on.

**Acceptance Criteria:**
- [ ] Question submission form accessible from the Q&A archive page via "Ask a Question" CTA
- [ ] Form fields: Question title (required), Question detail/body (required), Appliance brand (optional), Appliance type (optional), Model number (optional), Attach image (optional — show file picker state)
- [ ] Guidance text on question body field: "Be specific — include symptoms, error codes, and what you've already tried"
- [ ] Submit button → confirmation state: "Your question was submitted. You'll hear back within 1 business day. Once answered, it'll appear in the shared archive."
- [ ] After submission, user can see their pending question in the archive with a "Pending" status badge

---

### US-015: Ask a Trainer — My Questions

**Description:** As a member, I want a filtered view of only my own submitted questions so that I can track the status of questions I'm waiting on.

**Acceptance Criteria:**
- [ ] "My Questions" tab or filter on the archive page showing only the current member's submissions
- [ ] Each question shows status: Pending / Answered
- [ ] Answered question: trainer name, response text, date answered
- [ ] Pending question: submission date, "Response expected within 1 business day" note
- [ ] "Ask another question" CTA visible
- [ ] Questions sorted by most recent first

---

### FEATURE 4: MSA HOTLINE

---

### US-016: MSA Hotline — Book a Call

**Description:** As a member dealing with a complex repair, I want to book a 1-on-1 call with a master technician so that I can get expert diagnosis on a case I can't solve myself.

**Acceptance Criteria:**
- [ ] Hotline page explains the service clearly: "Live 1-on-1 call with a master technician. $33 per call. Booked by appointment."
- [ ] Booking CTA: "Book a Call" button
- [ ] Booking flow: date/time picker (show available slots), topic/appliance field, confirm booking
- [ ] Booking confirmation state: date, time, brief prep instructions ("Have your model number and symptoms ready")
- [ ] Design TWO payment states as separate prototype flows to test with users:
  - **Flow A (in-platform payment):** Show a checkout step with $33 charge before confirmation
  - **Flow B (no in-platform payment):** Booking confirmation with "You'll be invoiced $33 for this call" message
- [ ] Flag both flows in Figma as a decision point for stakeholder/user testing
- [ ] "What to expect" section on the page: short description of the call format
- [ ] Upcoming booked call visible on the page (post-booking state)

---

## Functional Requirements

**Document Library**

- FR-1: Document cards must display brand, appliance type, and document type as visual pills/tags — not plain text — so they're scannable at a glance
- FR-2: Brand filter lists individual brands as separate selectable options. Filters (Brand, Appliance Type, Document Type) are multi-select and combinable with keyword search
- FR-2a: Recalls and service bulletins are first-class document types — included in document type filters, surfaced in search results, and displayed on model-specific result pages alongside manuals
- FR-3: Global search must return unified results across all 4 content types (documents, Q&As, webinar recordings, upcoming training), ranked by relevance — not date added
- FR-4: Camera scan is an input method for search — it populates the search bar with the scanned model number and triggers the standard unified results page. It does not have a separate results view.
- FR-4a: Sections with zero results must be hidden entirely in search results
- FR-4b: Q&As in search results must link directly to the full thread in the Ask a Trainer archive
- FR-5: Document viewer must render PDFs inline (no forced download to view)

**Webinars & Training**

- FR-6: Upcoming webinars must show east and west coast times on each card
- FR-7: Webinars are fully gated behind membership — no $24.99 non-member purchase option in 2.0. Guest users see a paywall prompt with a join CTA.
- FR-8: On-demand recordings must link to related documents in the document library
- FR-9: Training session cards must display the trainer's name and format (virtual vs. hands-on)

**Ask a Trainer**

- FR-10: Question submission form must allow optional attachment of an image
- FR-11: Submitted questions must display a status (Pending / Answered) in the question history
- FR-12: Answered questions must show trainer name, response, and response date

**MSA Hotline**

- FR-13: Hotline booking flow must include a payment step (simulated — $33)
- FR-14: Post-booking confirmation must show date, time, and brief prep instructions
- FR-15: Booked upcoming calls must be visible on the Hotline page

**Cross-cutting**

- FR-16: Persistent navigation bar (accessible from every members-area screen): Home, Documents, Training, Ask a Trainer, Hotline, Account
- FR-17: All screens must be designed for tablet viewport first (768px+), then verified at desktop (1280px) and mobile (375px)
- FR-18: All gated features must show a consistent paywall/login prompt state when accessed by a guest
- FR-19: MyMarcone 2.0 component patterns (cards, buttons, nav, type scale, color palette) must be reused wherever equivalent components exist — flag reuse points in Figma notes once the MyMarcone file is available
- FR-20: Login must include a "Remember me" option, checked by default — members should not be required to log in on every visit

---

## Research Inputs

**Member Survey — March 2026 (83 responses)**

Key findings that shaped this PRD:
- 66% of respondents use the platform primarily for technical resources — confirms document library as the #1 priority
- Top improvement requests: more OEM technical resources (53%), easier access to training videos (48%), more vendor discounts (37%), mobile experience (30%), better navigation (28%)
- Search friction is the most-cited pain point in open-ended responses (~10 independent mentions)
- Mobile/tablet access is a recurring complaint — reinforces tablet-first design priority
- Recalls and service bulletins not surfacing by model number is a known gap — called out explicitly
- Login persistence is a frustration — "having to log in with every use" explicitly cited
- 37 respondents (45%) opted in for beta testing — strong pipeline for usability research sessions

---

## Design Considerations

**Visual Language**
Reuse the MyMarcone 2.0 design language directly — Yago has access to the MyMarcone 2.0 Figma file. Pull components, color styles, type styles, and patterns from that file. Annotate reused components in Figma with the source component name (e.g., "↩ MyMarcone 2.0 / Card / Document"). The goal is that a technician who uses both platforms navigates them the same way.

**Tablet-First**
Design every screen at 768px width first. The majority of techs are on iPads in the field. Sidebar filters should collapse to drawer patterns. Cards should be in 2-column grids minimum. Text must be readable without zooming.

**Navigation Pattern**
Members area should have a persistent bottom navigation bar on tablet/mobile (matching native app conventions) and a left sidebar or top nav on desktop. This mirrors how MyMarcone 2.0 handles navigation — confirm exact pattern when Figma file is available.

**Camera / Scan UX**
The model number scan feature is a differentiator. Make it prominent — not buried. It should be accessible from the Document Library page AND from the persistent nav or dashboard. The post-scan results view (documents + webinars + Ask a Trainer Q&As in one place) is a new pattern and needs careful layout design.

**Paywall / Guest States**
Every gated screen should have a locked/preview state that's visually compelling, not just a blank wall. Show the shape of what's inside (blurred cards, locked icons) with a clear "Join to unlock" CTA. This is a conversion design problem, not just an auth gate.

---

## Technical Considerations

*(For prototype purposes — relevant to handoff context)*

- **Design tool:** Figma — high-fidelity screens with real typography, real colors, real content (not lorem ipsum)
- **Build tool:** Claude Code + Figma MCP connector. Claude Code reads the Figma file directly and generates the prototype code. Figma file quality determines build quality — sloppy layers produce sloppy output.
- **Figma file requirements for Claude Code:**
  - Components named clearly and consistently (e.g. `Card/Document`, `Nav/Bottom`, `State/Empty`)
  - Text styles and color styles defined and applied — no hardcoded values
  - Each screen represents a distinct state (search results, empty state, confirmation, etc.)
  - Layers named meaningfully — avoid Figma defaults like `Frame 47` or `Rectangle 12`
- **Real content:** Pull actual MSA document titles, webinar names, and Q&A examples from members.msaworld.com. Real content tests significantly better than placeholders.
- **Tech stack for eventual production build (future context):** React web app + React Native mobile. Component structure in Figma should be React-friendly (one component = one responsibility) to ease the eventual production handoff.
- **No live data in prototype:** All content is static/simulated. Camera scan result is a pre-defined output.
- **PDF viewer simulation:** Use a static image of a real service manual page inside the viewer frame — gives testers a realistic experience.

---

## Success Metrics

These apply to the usability testing sessions with 5–10 servicers:

- Testers can find a specific document for a given appliance within 3 interactions from the home screen
- Testers understand what "Ask a Trainer" does without reading any explanation text
- Testers can locate and initiate a webinar registration without confusion
- Testers describe the visual design as "modern," "clean," or "professional" (qualitative feedback)
- Zero testers are confused about what's free vs. paywalled
- Internal review with Trevor and George results in sign-off before external testing begins

---

## Open Questions

1. ~~**MyMarcone 2.0 Figma file**~~ — ✅ Resolved: Yago has access to the file. Pull components directly.
2. ~~**Tier consolidation messaging**~~ — ✅ Resolved: Use pricing placeholder in prototype. Do not show $349 until publicly announced.
3. ~~**Canada pricing**~~ — ✅ Resolved: Not relevant to this prototype — pricing section uses placeholders throughout.
4. ~~**Convention agenda page**~~ — ✅ Resolved: Scope is both public and members area. Design two entry points: a public-facing page (accessible to guests) and a members area section. Content pending from Trevor.
5. ~~**Dev partner identity**~~ — ✅ Resolved: No dev handoff for now. Yago will build a functional prototype using an AI builder tool for usability testing. Figma designs are the source of truth; annotation depth can be lighter than a full dev handoff.
6. ~~**Ask a Trainer — public Q&A archive**~~ — ✅ Resolved: Q&As are a shared member archive (forum-style). All answered questions visible to any logged-in member. Members can also filter to their own questions via "My Questions" tab.
7. ~~**MSA Hotline payment flow**~~ — ✅ Resolved: Design both flows (in-platform payment vs. external invoice) as separate prototype paths. Flag as a decision point for usability testing.
8. ~~**Webinar non-member purchase**~~ — ✅ Resolved: Webinars are fully gated behind membership in 2.0. No separate $24.99 non-member purchase flow. Guests see a paywall prompt.
