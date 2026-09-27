# Candidate mindset
March 2026

> The goal is to have a **productive conversation**, not to trick you.
> This guide helps you know what the interviewer is looking for so we can both make the most of our time.

---

## First Principle
> **"Boil things down to the most fundamental truths and reason up from there,
> as opposed to reasoning by analogy. — Elon Musk"**

Reasoning by analogy means doing something because that's how it's been done before.
First principles means asking: *what am I actually solving for?*

### Two examples — same trap

**1.** You need to test system load for a robot controller.
- By analogy: "We've always validated on a board." → get a board, maybe add sensors.
- First principles: "I need system load data." → hang a robot. That *is* the system.

**2.** You're preparing for an interview.
- By analogy: "People grind leetcode and rehearse projects." → do that.
- First principles: "The interviewer needs signals to make a decision." → provide exactly those signals.

The board and the leetcode grind aren't *wrong* — they're just inherited defaults.
First-principle thinking asks whether the default actually serves the goal.

> Question the default. Find the goal. Build up from there.
> Everything in this guide follows from that.

---

## The Core Idea

**Interviewers are looking for signals — not perfection.**

I can't read your mind. If you have a great thought process but don't verbalize it, I can't give you credit.

**Think out loud.** Show me *how* you think, not just *what* you know.

---

## The Mindset

> *"I have a problem, and I'm looking for someone to discuss it with. You're that person."*

- There are no gotcha questions. I genuinely want to collaborate.
- Asking clarifying questions is a **positive** signal, not a sign of weakness.
- Saying *"I don't know, but here's how I'd approach it..."* is far better than guessing silently.
- Being redirected is **not** a failure. Ignoring the redirect is.

---

## Signals

| Signal Area          | What I'm Listening For                                        |
| -------------------- | ------------------------------------------------------------- |
| **Culture Fit**      | Collaboration, curiosity, humility, handling disagreement     |
| **Coding**           | Clean code, edge cases, iterative refinement                  |
| **System Design**    | Trade-off reasoning, scalability, component decomposition     |
| **Language Fluency** | Idioms, memory models, concurrency in Python / Go / C++       |
| **Embedded / OS**    | Real-time constraints, processes, threads, memory, scheduling |

> [!TIP]
> **For undergrad students:** Industry experience isn't required. Structured thinking and willingness to engage with unfamiliar territory is.

> [!TIP]
> Having internship experience will definitely help.

---

## The Process: UDCL

Most candidates jump straight to coding. **Don't.** Coding is the middle step, not the first.

### U — Understand the Problem

You must first understand the requirements before building anything.

- Restate the problem in your own words
- Ask: *What is the input? What is the output? What are the constraints?*
- Identify what makes this problem *hard*

**🚩 Red flag:** Candidate starts coding before confirming they understand the problem.

### D — Devise a Plan

Once you fully understand the problem, list the tasks required for its solution. Each task should be straightforward to complete — these are your units of work.

- Sketch your approach *before* touching code
- Mention alternatives: *"I could do A or B. I'll go with A because..."*
- State complexity upfront
- **Check in with me:** *"Does this sound reasonable before I start?"*

**🚩 Red flag:** Only one approach considered, no trade-offs discussed.

### C — Carry Out the Plan

Pick one task at a time. Code it, test it, integrate it. Repeat.

- Write clean, readable code — variable names matter
- Narrate as you go: *"I'm iterating here because..."*
- It's okay to write rough, then refine

**🚩 Red flag:** Silent coding for 10+ minutes, or trying to write everything at once.

### L — Look Back

Inspect your solution. Identify improvements as both a programmer and a user. Treat each improvement as a new task or sub-problem.

- Walk through with a concrete example
- Trace edge cases
- Discuss what you'd change with more time

**🚩 Red flag:** *"I think it works"* without tracing through an example.

---

## Think It Through
> There's no single right answer here. The signal is in how you reason, not what you pick.

> [!NOTE]
> Try each challenge for 2 minutes *before* expanding the answer.

<details>
<summary><strong>🔁 Retry Design — "Your API call failed. What do you do?"</strong></summary>

### 🧩 Try it first

> Your service calls an external API. It returns a 500 error.
> - **A)** Retry immediately, up to 3 times
> - **B)** Retry with exponential backoff
> - **C)** Don't retry, return error to caller
>
> Now: what if 1,000 clients hit the same failure at the same time?

<details>
<summary>💡 What I look for</summary>

A is the default most people reach for — and it's the most dangerous.

- **Immediate retry × 1,000 clients = thundering herd.** You just 3x'd the load on an already-failing service.
- **B is better** but still herds — all clients back off on the same schedule. Add **jitter** (randomized delay) to spread the load.
- **C is sometimes correct** — if the operation isn't idempotent, retrying may cause duplicates.

**First-principles thinking:**
> By analogy: "Retries make things more reliable."
> First principles: "Is the failure transient or persistent? Will retrying make it *worse*?"

**What impresses me:**
- You ask whether the operation is idempotent before deciding to retry
- You mention jitter without being prompted
- You consider a circuit breaker — stop retrying entirely when failure rate exceeds a threshold

</details>
</details>

<details>
<summary><strong>🧱 Design Patterns — "Which pattern should you use?"</strong></summary>

### 🧩 Pick one

> You're building a service that creates reports. Right now you need PDF and CSV.
> Your teammate proposes using the Abstract Factory pattern.
>
> - **A)** Good idea — create `ReportFactory` with `PDFFactory` and `CSVFactory`
> - **B)** Use Strategy pattern instead — pass a formatter to the generator
> - **C)** Just write two functions: `generate_pdf(data)` and `generate_csv(data)`
> - **D)** Need more information before deciding

<details>
<summary>💡 What I look for</summary>

**D is the only correct first answer.**

Before picking a pattern, ask:
- How many formats will there be? 2? 20?
- Will formats be added by other teams, or just us?
- Do PDF and CSV share any logic, or are they completely different?

**If it's 2 formats and we own them both:** C wins. Two functions. Readable. No abstraction tax. A Factory for 2 subclasses adds indirection that helps no one.

**If formats will grow to 10+ or external teams add them:** Now an interface makes sense — a `ReportFormatter` with a `format(data)` method. Still not necessarily Factory.

**The trap:** Picking A or B immediately. That's pattern-matching on the problem description, not reasoning about the constraints.

**First-principles thinking:**
> By analogy: "This looks like a Factory problem."
> First principles: "What complexity am I actually managing? Does a pattern reduce it or add to it?"

A design pattern is a tool. Applying it without understanding the problem it solves is cargo-culting — same as mandating 5 patterns in a course project because a syllabus says so.

</details>
</details>

---

## Common Mistakes

| ❌ Don't                                     | ✅ Do                                          |
| ------------------------------------------- | --------------------------------------------- |
| Dive into code immediately                  | Spend 5–10 min on U and D first               |
| Go silent for long stretches                | Narrate your thinking, even if messy          |
| Assume you understood the problem           | Restate it, ask clarifying questions          |
| Treat me as a judge                         | Treat me as a collaborator                    |
| Give up when stuck                          | *"I'm stuck on X. Here's what I've tried..."* |
| Give the textbook answer without trade-offs | *"I chose X because Y, at the cost of Z"*     |


---

## (Optional) Self-Assessment: Am I Ready?

Rate yourself (1 = never seen, 5 = could teach it):

| Topic                                               | 1   | 2   | 3   | 4   | 5   |
| --------------------------------------------------- | --- | --- | --- | --- | --- |
| Concurrency (mutexes, semaphores, deadlocks)        | ⬜   | ⬜   | ⬜   | ⬜   | ⬜   |
| System design (trade-off articulation)              | ⬜   | ⬜   | ⬜   | ⬜   | ⬜   |
| Failure modes (retry, timeout, circuit breaker)     | ⬜   | ⬜   | ⬜   | ⬜   | ⬜   |
| Caching (TTL, invalidation, stale-while-revalidate) | ⬜   | ⬜   | ⬜   | ⬜   | ⬜   |
| OS fundamentals (processes, memory, scheduling)     | ⬜   | ⬜   | ⬜   | ⬜   | ⬜   |
| Coding fluency (clean code under time pressure)     | ⬜   | ⬜   | ⬜   | ⬜   | ⬜   |
| Communication (thinking out loud)                   | ⬜   | ⬜   | ⬜   | ⬜   | ⬜   |

- **Mostly 4–5** → Let's talk.
- **Mostly 3** → Solid foundation. Review patterns above + do 2–3 mock interviews.
- **Mostly 1–2** → Focus on fundamentals first. No rush.

---

## (Optional) Before You Reach Out

- [ ] Am I comfortable at the **intersection of software and infrastructure**?
- [ ] Do I enjoy **debugging hard problems** more than greenfield features?
- [ ] Can I reason about **concurrency, caching, and failure modes**?
- [ ] Can I **communicate my reasoning** clearly under pressure?
- [ ] Can I say *"I chose X because Y, at the cost of Z"*?
