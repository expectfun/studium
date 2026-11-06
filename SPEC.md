# Studium — Spec (v2, draft)

> Rewrite of the original MVP spec (`/Users/e/life/boot/antislop.md`). Same core idea; all details open to change.
> Status: in progress — sections are filled in as decisions are made.

**This spec is a living document.** Little here is set in stone. Many choices are hypotheses to test with real users and change based on experience. Status markers:

- ✅ **Decided**: settled for now
- 🟡 **Leaning**: current default, revisit if evidence says otherwise
- 🧪 **Experiment**: try it and see; keep, change, or drop based on results

---

## 1. Core Idea

### Name

🟡 **Working title: Studium.** Latin for zeal, devotion, eager study (the root of *study*, *student*, *studio*). It says the course is for people willing to put in the work: quick early wins, but getting good takes practice. Positive rather than antagonistic, one word, works in Russian too (*штудия*, *штудировать*).
- Bonus layer: in Roland Barthes's *Camera Lucida*, *studium* is a photo's general, polite interest, and *punctum* is the detail that pierces you. Our lessons aim for the punctum (the empty birdcage, the second cup), so *punctum* could name a lesson or a recurring section.

Still considered:
- **Etude**: a study piece practiced toward mastery; in Russian *этюд* is also a painter's sketch and a Stanislavski acting exercise.
- **Antislop**: the original name. Clear about the problem, but antagonistic. Not fully off the table.
- Other candidates from the brainstorm: Reps, Course, Aim, Heading, Dailies, Takes, Punctum.

Rules for the name: one word, simple, easy to write short. Domains don't matter yet (it starts as a GitHub repo for friends).

### One-liner

🟡 **Working (preferred for now):** *"Learning to direct AI, not just prompt it."*

🟡 **Voice: a fellow learner, not an expert.** No masterclass claims and no promised results. The author is exploring directing vs. prompting a step or two ahead of the reader, reviews everything by hand, and invites people along.

**Original:** *"Help people create less sloppy content with AI."*

Not final. Keywords to draw from (all optional, no strict requirements):

- quality
- craftsmanship
- vision
- de-sloping
- standing out
- directing
- understanding
- skill (human skill)
- art

### What "slop" means

✅ Technical defects (artifacts, glitches) are **out of scope**. Models will fix those over time.

Slop is output that is **tasteless, generic, and without vision**. It has four separate causes:

| # | Cause | What it looks like | Can we fix it? |
|---|---|---|---|
| 1 | **No taste** | Can't tell good from mediocre, so accepts the first result. | **Yes, partly.** Taste is partly innate, but much of it can be built through deliberate work: studying masterpieces, taking apart why they work, recreating them, iterating. This is how art school does it. |
| 2 | **No vocabulary** | Doesn't know what's possible (dolly zoom, Kubrick symmetry, unusual palettes), so never thinks to use it when a scene calls for it. Wants something unique but can't express it. | **Yes, directly.** Teach the range of options *and* when each one fits. |
| 3 | **No vision** | Has a shallow intent ("a blockbuster", "an ad for my product") with no personal version behind it, so the result defaults to Michael Bay explosions. Compare Villeneuve: a blockbuster *made in a specific way, his way*. People often don't realize they *should* have that deeper intent. | **Yes.** Show that a personal vision is expected, and build the habit of forming one. |
| 4 | **No effort** | Short prompts, takes the first output, optimizes for speed. | **No. This filters the audience.** We serve people willing to invest time. |

Key distinctions:
- **Low effort ≠ low understanding.** Some people don't try to make their output unique. Others try but don't know how. We serve the second group. We give them understanding, and they bring the effort.
- **Knowing ≠ recognizing.** Knowing that a technique exists isn't enough. The user has to recognize *when* it fits.
- 🟡 **Taste ≠ vision.** Taste *judges* ("is this good, and why?"). Vision *generates* ("what do I want, my way?"). A critic can have taste without vision, and the reverse also happens. They need separate exercises.

Implied method: our pedagogy should follow how taste actually develops: **study → deconstruct → recreate → iterate → apply to your own vision.**

✅ Constraint: **Not intimidating.** The user shouldn't need years before seeing results. They get real intermediate results early and improve visibly fast.

### Whose taste

🟡 **The canon is the starting point, and range plus intentionality is the goal.** We study the masters (Kubrick, Hitchcock, Villeneuve, …) to understand the *principles*, not to copy their look. The goal is a user who picks techniques on purpose and can explain why.

Risk to avoid: producing a *new* kind of slop, such as a thousand Wes Anderson clones. Imitation is a step on the way, not where the user should end up.

### Exercise ideas (from the slop analysis)

Each type targets a specific cause:

| Exercise | Targets | Status |
|---|---|---|
| **Recreate**: here's a still or shot from a masterpiece; recreate it with AI, then compare | Taste, vocabulary | 🧪 |
| **Recognize**: here's a scene brief; which technique fits, and why? No generation needed, so it's cheap and fast. | Knowing → recognizing | 🟡 |
| **Critique**: why does this work, or not? | Taste | 🟡 |
| **Intent first**: state what the viewer should feel and what your angle is *before* prompting, then compare the output against the stated intent | Vision | 🟡 |
| **Your version of X**: same brief, made your way | Vision | 🟡 |

Watch for: friction in "intent first". It's core to building vision, but it mustn't feel like homework.

### Primary user

🟡 **The "I didn't know this was a skill" crowd.** Many people *are* willing to put in effort once they see what it can do. They aren't lazy. They just haven't seen that there's craft here.

- We **do** attract them. Marketing message: *there's craft here, and you can learn it.*
- We **don't** try to convert people who want only speed (cause #4). They filter themselves out.

🟡 Priority within that crowd:
1. **Hobbyists and aspiring artists** (first). They make things for the joy of it and want to feel like a filmmaker. The craft itself motivates them, which fits the art-school framing, and their success stories make great marketing.
2. **Creators** (close second). Social video, YouTube, short-form. They want to stand out in a feed.
3. **Small-business and marketing people** (later). They want results more than skill.

### Outcome (north star)

🟡 *After two weeks, the user makes something they're proud of. They can explain why each choice is in it, and someone else can tell it's theirs.*

This maps to the three causes of slop we address: taste (proud of it), vocabulary (can explain the choices), vision (recognizably theirs).

---

## 2. Medium

🟡 **Video is the destination. Images are the practice medium.**

- **Hook:** the landing page shows impressive *video*, the kind of result users can work toward.
- **Practice:** images are the default. They're cheaper and faster, so users can generate many of them, and lots of reps is what practice needs.
- **Toggle:** an image ↔ video switch is always available. Image is the default. Users can switch to video any time if they're willing to spend more credits.

Ideas this suggests (🟡):
- **Image → video as a pipeline, not just a toggle.** The user iterates cheaply on a still until the frame is right, then clicks "animate this" (image-to-video). It mirrors a real workflow (keyframe, then motion) and spends the expensive generation only on work that's already good.
- **Curriculum order follows the medium.** Still-image concepts come first: composition, light, color, lens, framing, subject. Motion-only concepts come later and need video: camera movement, dolly zoom, pacing, transitions. Most film-language fundamentals can be taught on stills.

Open: cost model for the toggle (credits/tokens). See the providers and cost section, which isn't written yet.

---

## 3. Core Loop

The old loop was *Learn → Apply → Generate → See the difference*. Step 4 showed *that* a result was different but never *why*, and the *why* is what builds taste.

🟡 New loop:

1. **See**: one concept, shown through masterwork examples (show, don't tell)
2. **Intend**: state what you're going for (the viewer's feeling, your angle) in a sentence or two
3. **Prompt & generate**: cheap images and many reps
4. **Compare**: your result next to the **lazy-prompt default** (✅). The point is to *see how far you got from the default*. Masterwork references and your previous attempts can sit alongside.
5. **Iterate**: change something, regenerate, compare again
6. **Keep**: save your best result to a portfolio, which becomes evidence of progress

Without AI critique (see below), the *why* has to come from the lesson itself: clear concept explanations, annotated examples, and the contrast with the default. A possible cheap substitute is a short **self-check** after generating, a few lesson-specific questions such as "Is the subject off-center? Does the negative space create tension?" This trains the user to critique their own work, which is the habit we want anyway. 🧪

### AI critique

🧪 **Not in v1.** Build the product without it first, then try it as an add-on.

- Upside: something close to a teacher at your side. It could be the strongest differentiator.
- Risk: vision models are mediocre art critics, and generic feedback is its own kind of slop.
- 🟡 Tone, if added: **honest but encouraging**, with **Socratic questions** at moments that build vision ("What made you choose this angle?").
- Critique would measure results against the user's stated intent (step 2) and the lesson's concept.

### Length and structure

🟡 **One lesson ≈ 5 minutes.** It's snackable and works as a daily habit.

- **Lessons are grouped into topics.** A topic (e.g. "Composition") can take a long time overall, but it's split into many short lessons.
- To validate: can everything we want to teach be cut into 5-minute pieces? Some concepts may need longer lessons. Adjust as we go.

---

## 4. Curriculum

### Topic 1: The Hook

✅ **The entire first topic is the hook, not just the first lesson.** It's made of several short lessons, each a different technique chosen for the **most striking, immediate, reliable effect** across most subjects and models. The goal is a big, visible improvement in a short time. The user should feel: *"without this, I'd be the lazy prompter."* Once they've had that early win, they're willing to spend time on the deeper topics.

Every hook lesson contrasts the lazy prompt with the user's own prompt.

### Hook curriculum (8 lessons)

🟡 Each lesson covers a **different axis**, so together they span what a learner controls. Lessons 1, 2 and 4 are drafted with media (`content/en/hook/`). The rest are planned but not written. References marked *to check* must be verified against the film (see notes below).

| # | Lesson | Axis | Reference | Ladder idea | "Same X, different story" | Status |
|---|---|---|---|---|---|---|
| 1 | **Make one thing pop** | Color: what stands out | *The Matrix* (woman in red), *Schindler's List* (girl in red coat) | lazy → color contrast → selective color | — | drafted |
| 2 | **Light from above** | Light: what's hidden | *The Godfather* (Bonasera whispering to the Don) | lazy → top light → low-key | staring at us = menace, bent over papers = loneliness | drafted |
| 3 | **Perfect order** | Composition: symmetry, one-point perspective | *The Shining* hallway / twins; Wes Anderson *(to check)* | lazy → centered subject → full symmetry + one-point perspective | cozy (Wes Anderson) vs. creepy (Kubrick) | planned |
| 4 | **Small in a big world** | Camera: how far it is | *Lawrence of Arabia* (rider on salt flat), *Dune* (figures beneath the ship) | lazy → extreme wide + negative space → scale reference | emptiness = lonely, colossal object = overwhelming (built into the ladder) | drafted |
| 5 | **Bend the world** | Lens: what the glass does | *The Favourite* (fisheye) *(to check)* | lazy → wide angle up close → fisheye | playful (skate / music video) vs. paranoid (*The Favourite*) | planned |
| 6 | **Not a render** | Medium: what the image is made of | Aardman (*Wallace & Gromit*), Laika (*Coraline*), Lotte Reiniger (*Prince Achmed*) *(to check)* | lazy (glossy) → 35mm film → clay → paper cutout | cozy clay (Aardman) vs. creepy clay (Laika) | planned |
| 7 | **Someone, not anyone** | Specific subject | *Léon* (glasses, beanie, the plant) or *Mad Max: Fury Road* (Furiosa) *(to check)* | "a woman" → a few concrete details → a person with a history | — | planned |
| 8 | **One wrong thing** | The impossible: one deliberate impossibility | Magritte (*Golconda*: men in bowler hats raining over a street; *The Castle of the Pyrenees*), *Inception* (Paris folding) *(to check)* | lazy ("a surreal dreamlike city": everything weird) → a real scene + one impossible thing → the impossible thing carries the intent | the same floating rock = wonder or dread | planned |

Notes:
- 🟡 **One Hook lesson per block.** Each Hook lesson is lesson 1 of exactly one later block, so no axis appears twice in the Hook. That's why silhouette (a second Light lesson) became a Lens lesson, angle (a second Camera lesson) became The impossible, and "Not a render" is only about the medium (photographic *and* handmade: film stock, clay, paper cutout, stop-motion).
- 🟡 **Order: four questions a director asks, from concrete to abstract.**
  1. *What we see* (1–3: color, light, composition): the surface of the image, readable without any film vocabulary. Composition (3) hands off to distance (4) through negative space.
  2. *How we see it* (4–6: distance, lens, medium): the apparatus, one step further from a real camera each time: where it stands, what glass is on it, what the image is made of. It ends on "maybe there's no camera at all" (clay, paper), which already loosens reality.
  3. *Who it's about* (7: specific subject): from tools to people; where intent starts.
  4. *What it means* (8: the impossible): the most abstract and most intent-driven lesson. Once you control the image, you can break reality, on purpose. It leads into the Hook finale and the Vision block.
- Specific subject (7) is where **age and non-generic characters** belong (the fisherwoman "with salt-cracked hands", the shaved head, etc.).
- 🟡 **The impossible is about possibility *and* responsibility.** AI makes any impossible image cheap, which is exactly why random surrealism is slop. The lesson's point: **one** impossibility, in an otherwise real scene, that **means something**. The lazy step ("surreal, dreamlike") shows the slop version on purpose. Self-check: *"Can you say in one sentence what the impossible thing means?"*
- Parked for the main curriculum: angle (→ Camera), silhouette and atmosphere (→ Light), frame within a frame (→ Composition), depth of field and telephoto compression (→ Lens), extreme close-up (stays as "try next" in lesson 4).
- **Open: the Hook finale.** A "put it together" moment: the user combines 2–3 techniques on their own subject and compares the result with their own lazy version. It breaks the formula (no reference, the user's own work), so it isn't one of the 8. Decide later: a 9th lesson, a short closing page, or a closing step inside lesson 8 (the impossible, which already ends on intent).

🟡 Candidate techniques (original list, to test which hit hardest):

| Technique | Why it's striking |
|---|---|
| **Light**: single hard light / chiaroscuro, rim light, golden-hour backlight | Probably the biggest single jump from "flat AI" to "cinematic" |
| **Medium / film stock**: "35mm, Kodak Portra, film grain" | Instantly kills the plastic AI look, maybe the most anti-slop single move |
| **Shot & lens**: extreme close-up with shallow depth of field, or an extreme wide with a tiny subject | Changes the feeling completely with only a couple of words |
| **Angle**: low/worm's-eye, overhead top-down | The default is eye level, so any deliberate angle stands out |
| **Atmosphere**: fog, haze, rain, volumetric light | Adds depth and mood almost for free |
| **Restricted palette**: monochrome + one accent, complementary pair | Immediately looks *designed* |
| **Specific subject**: "a woman" → "a 70-year-old fisherwoman with salt-cracked hands" | Teaches that specificity beats adjectives |

🟡 **Iconic shot as the entry point.** Each hook lesson opens with a famous film still the user probably already knows. It shows one technique clearly. Flow: *you know this shot → here's the one technique behind it → apply it to your own subject → compare with the lazy default.* This also introduces the "recreate" exercise (🧪) gently.

Candidate shots (still-friendly, one clear technique each):

| Shot | Technique |
|---|---|
| *The Matrix*: the woman in the red dress | Color contrast: one thing pops against a uniform crowd |
| *Schindler's List*: the girl in the red coat | Monochrome + one accent color |
| *The Shining*: the hallway / the Grady twins | Symmetry, one-point perspective |
| *Lawrence of Arabia*: tiny figure in vast desert | Scale: extreme wide, tiny subject |
| *The Godfather*: opening, Don Corleone's office | Top light / low-key, eyes in shadow |
| *The Good, the Bad and the Ugly*: eyes in the final duel | Extreme close-up |
| *Pulp Fiction*: the trunk shot | Extreme low angle |
| *Blade Runner 2049*: orange-haze Las Vegas | Atmosphere + monochrome color |
| *Amélie*: red/green palette | Complementary palette |
| *Apocalypse Now*: Kurtz emerging from darkness | Chiaroscuro |
| *Skyfall*: silhouetted fight against neon screens (Shanghai) | Silhouette / backlight |
| *The Searchers*: final doorway shot | Frame within a frame |
| *Mad Max: Fury Road*: teal & orange desert | Complementary color grade |

Motion-only examples, saved for the video topics: *Vertigo* / *Jaws* dolly zoom.

Notes:
- ✅ **Every reference is checked against the actual film by the author** before it goes into a lesson. AI suggestions come from memory and reputation and can blend scenes together (e.g. "the *Godfather* opening = eyes hidden by top light" turned out to be inaccurate on rewatch). Describe only what's actually in the frame we show.
- Recognizability varies by age and region. Test with friends and keep the shots people actually know.
- ⚠️ **Rights**: showing film stills is likely defensible as educational commentary, but not guaranteed, especially once the product is commercial. Fine for the friends-only phase. Before going public, decide whether to use stills (small, with commentary and attribution), links, or AI recreations of the shot's *technique* as the visual.

### Prior prototype

[expectfun.github.io/antislop](https://expectfun.github.io/antislop/lessons.html), lesson 1.1 "Colors" (*The Matrix* woman in red + *Schindler's List* → lazy vs directed prompt → what changed → try it on arena.ai). It already matches this spec closely. **Adapt it, don't rewrite it.** Keep:
- iconic shot → principle in one line ("Color steers attention")
- the *why* explained in plain words ("she's not like the others; the others become a hive")
- **the "AI didn't obey" moment** (the traffic lights stayed colored): the AI can be an accidental co-creator, *but the human makes the decisions*. This connects the hook to the vision theme early. Make it a recurring element.
- external fallback for practice (arena.ai): useful for the free static course, where there's no generator

Changes needed: switch to images by default; one named technique per lesson; show results side by side instead of one after another; add the intent step and the self-check; drop the "quality is subpar" caveat, because the hook needs the best results.

Its module structure (Quick Results → Idea → Script → Storyboard → Lighting → Cinematography) follows a **production pipeline**, while §4's topic map follows **film language**. Open: do we need both axes, e.g. craft topics plus a "make a project" track?

### Hook lesson template

🟡 Based on the prototype:

1. **Iconic shot(s)** + the principle in one line
2. **Why it works**, in plain words
3. **Lazy prompt → result** (precomputed)
4. **Directed prompt → result**, side by side with the lazy one
5. **What changed** + what the AI did unexpectedly (co-creator note)
6. **Your turn**: intent in one line → prompt → generate (fallback: an external tool)
7. **Variations** to explore next (e.g. sepia for vintage, a single accent color)

🟡 **Standard beat: "Same X, different story"**, placed after the ladder. Keep the technique fixed and change the subject, pose, or context, so the mood flips (same low-key light: a man staring at us reads as menace, a man bent over papers reads as loneliness; same tiny figure: emptiness reads as lonely, a colossal object reads as overwhelming). It teaches that **a technique sets a range of moods, and intent picks one.** It can be folded into the ladder when the last step does this job (lesson 1.4, "Small in a big world").

🟡 **"When the AI surprises you" uses a real surprise** from the lesson's own generations (red lips, the smile that disappeared, haze filling the sky), never an invented one.

🟡 Rules for example prompts:
- **Change only the technique.** Lazy and directed prompts share the same subject and scene, so the difference can only come from the technique.
- **A ladder, not a jump.** For example: lazy → + one sentence → + one more, so each step buys one visible change.
- **Name the technique.** Use the real term ("selective color", "chiaroscuro"). The name is vocabulary the user keeps, and models often recognize it too.
- **State it positively, globally first.** "Black-and-white photo, only the dress is red" works better than "everything else is monochrome". Exclusions are easy for models to miss.
- **No hedges.** "Everyone wears dark suits", not "mostly".
- **Lazy means realistic.** It should look like what people actually type.
- **Describe the effect, not the fixture.** "Lit by a hard light from above" gets drawn as a lamp hanging in the frame. Say where the light falls and what it does, and put the source out of frame. (Found in the lesson 1.2 test.)
- **Ladders vary in length (2–3 steps).** Each technique splits differently. The biggest jump is usually the first step.
- **A technique sets a range of moods; the subject's pose and gaze pick one.** Low-key light alone gave *loneliness* (a man bent over papers), not *menace*. Menace needs him to face us. Lessons should say this explicitly: it's the link from technique to intent.

🟡 **Optional "director's cut" step after the clean ladder.** The clean steps teach the technique. A final step shows how far it can go once the technique is combined with extra details:
- It's clearly labeled *beyond this lesson*, and each added detail is annotated and links to the lesson that covers it. This makes the step a doorway to later lessons.
- **Every added detail must serve the same intent as the technique.** E.g. for "she's not like the others": she walks against the flow, she's calm while the crowd hurries, she's the only one looking into the lens. Random extras ("freckles, silver earrings") would only confuse. The point of this step is that **details work when they serve the intent.** That's an early taste of the vision theme.
- Distinctive appearance should come from **shape** (haircut, silhouette, posture), not age. Age is a sensitive axis: some viewers read "old" as negative, and we don't want to fight that in the very first lesson. Older and more specific subjects (e.g. "a 70-year-old fisherwoman with salt-cracked hands") belong to the later **Specific subject** lesson, where they can be framed properly.
  - Lesson 1.1 candidate: 🟡 *"a tall woman with a shaved head and a long neck"*, which reads instantly in monochrome. Alternative still to test: a sharp jet-black bob with a blunt fringe.
- It may also include **one "finish" detail**, e.g. medium or film stock ("35mm film, visible grain, candid street photography") to remove the glossy AI look. It's annotated as a preview of its own Hook lesson.
- Lesson 1.1 director's cut 🟡 **empty birdcage, door open** (`refs/Red Dress Amid the City Crowd.png`): it rhymes with the briefcases at hand height (freedom vs routine) and raises a question ("where's the bird?"). The flowers version (`refs/Red Dress Through the City Crowd.png`) is the safe fallback.
- Earlier choice, *flowers vs briefcases + hair and dress moving in the wind*: Every detail is the opposite of the crowd (alive vs rigid, individual vs identical). Safe for any audience and reads well in monochrome. Rejected for this lesson: age (moved to *Specific subject*), shaved head and robot (polarizing or genre-changing; moved to a later non-generic characters lesson), asymmetrical haircut (too subtle at crowd scale).
- 🟡 **End the lesson with a video teaser.** The same scene in motion (`refs/…minimax-h3.mp4`, MiniMax H3), framed as *"this is where you're heading"*. A doorway to the video topics, and it reuses the landing-page hook (video as the destination, §2). Ideally it's made by **image-to-video from the director's-cut still**, so the user sees *their kind of* image come alive. That demonstrates the image → video pipeline.
- 🧪 Order: show it **after** the user's own attempt, as a "here's what we did", or as inspiration if they're stuck. That way it doesn't just get copied.

🟡 Hook structure ideas:
- **Topic finale**: combine 2–3 hook techniques in one image, shown next to the lazy default. This is the moment the user thinks *"okay, now I get it."*
- **Each hook lesson is a doorway.** It previews a full topic later ("Liked this? The Light topic goes deep."). This keeps the hook from feeling like a bag of prompt tricks and connects it to the real curriculum.

### Block map (draft, will evolve)

🟡 Principle: **concrete before abstract.** Start with what's obvious at first glance (light, color), then go deeper.

🟡 **Blocks follow the Hook.** Each of the first eight blocks opens with its Hook lesson (listed in both places), then goes wider. Someone who finishes the Hook has already started eight blocks. Draft lessons, ~5 min each:

| # | Block | Opens with | Draft lessons | Medium |
|---|---|---|---|---|
| 0 | **The Hook**: one striking technique per block + "seeing the default" | — | the 8 lessons above | image |
| 1 | **Color** | Hook 1 | one accent · restricted palette · complementary pairs (*Amélie*, teal & orange) · warm vs. cold · muted vs. vivid · color that means something | image |
| 2 | **Light** | Hook 2 | top light · hard vs. soft · side light & chiaroscuro · backlight, rim, silhouette · time of day · light inside the scene (window, candle, neon) · atmosphere (haze, fog, beams) | image |
| 3 | **Composition** | Hook 3 | symmetry · off-center + negative space · leading lines · frame within a frame · foreground layers · pattern and the one thing that breaks it | image |
| 4 | **Camera: distance & angle** | Hook 4 | extreme wide · the shot-size ladder · extreme close-up · low & high angle · bird's-eye & top-down · Dutch angle · POV & over-the-shoulder | image |
| 5 | **Lens** | Hook 5 | fisheye · wide vs. telephoto (distortion, compression) · shallow vs. deep focus · macro · flare & anamorphic | image |
| 6 | **Medium & material** | Hook 6 | *photographic:* film stocks, formats & eras, old processes · *handmade:* clay, paper cutout, stop-motion puppets, hand-drawn / cel, paint-on-glass, mixed media. Each medium is taught by what it *feels like*, as an intent choice, not a style switch. | image |
| 7 | **Subject & character** | Hook 7 | specific beats adjectives · a character's shape · pose & gaze pick the mood · props that tell a story · two people: the relationship in the frame | image |
| 8 | **The impossible** | Hook 8 | one wrong thing · scale swaps · wrong material (Dalí's melting clocks) · impossible physics · juxtaposition · the everyday made strange | image |
| 9 | Place & world *(open: own block or part of 8)* | — | a specific place, not "a city" · era · weather & season · texture of a place | image |
| 10 | Style & references (learning from masters without copying) | — | taking a style apart into its light, color and camera choices | image |
| 11 | **Vision** (stills capstone: combine everything, your way) | — | same brief, your version · intent first | image |
| 12 | Camera movement | — | incl. motion that belongs to the material (stop-motion on twos, clay "boil") | video |
| 13 | Time & pacing | — | | video |
| 14 | Sequences & storytelling | — | | video |

🟡 The planned lesson titles for every block live in `content/en/curriculum.json` and show on the lessons page as "Coming soon". Each block's first lesson points at its Hook lesson (`from`), so it isn't written twice.

Open: block order after the Hook (follow the Hook order, as above, or Light first for the biggest quality jump?); block length (5–7 lessons, 25–35 min).

🟡 **Subject & intent moves later.** It's the most abstract topic and the hardest to show at a glance. Intent also works better once the user has vocabulary, because without words to describe a vision it collapses into "make it epic." A light version still appears from day 1 as step 2 of every loop. The dedicated topic is the capstone. *Open: confirm placement after testing.*

Open: topics beyond film language (genre, worldbuilding, …)?

### Content workflow

✅ **Lessons are Markdown files** (with frontmatter), in `content/en/...`.

✅ **The author writes every lesson, with AI help.** The author is also learning, so they are **the first user**. Going through each lesson themselves brings value to them and shows what's broken. The split between AI drafting and the author's own writing will shift as we go.

🟡 **The generator is the author's tool first.** No batch generation of all lesson images up front. Instead:
1. Draft a lesson
2. Try its prompts in the working generator, as a user would
3. Pick the best results and **promote them into the lesson** (lazy default, directed example, grid variants)
4. Every saved asset keeps its **generation record** (prompt, model, seed, parameters) next to it, so it can be reproduced or regenerated when models change

So **the generator gets built first** (Phase 1), before most of the content. A "save to lesson" action can be a dev-only feature at first.

### Progression

✅ **Recommended order, nothing locked.** Our users are motivated adults, and locking lessons feels patronizing.

### Gamification

🟡 Gamification is useful. Exact implementation is TBD; try and iterate.
- **Streaks**: yes. Duolingo shows they work.
- **Portfolio as visible progress**: you scroll back and see how far you've come. 🧪 Exact form TBD.
- Rule: **never reward volume over quality**, because that would reward making slop.

### Lazy defaults

✅ **Precompute** the lazy-prompt result for built-in lesson briefs: it's free and instant. **Generate live** only when the user brings their own subject or idea.

---

## 5. Platform

🟡 **One curriculum source, several surfaces.**

```
curriculum (Markdown + example media, in repo)  ← single source of truth
        │
        ├──► Free course: static site on GitHub Pages
        │      lessons, examples, precomputed comparisons. No generator, no account.
        │
        └──► Full app (separate site + backend)
               ├── Web app: generator, credits, portfolio, streaks
               └── Telegram Mini App: same backend, same lessons
```

- **Free course (GitHub Pages)**: theory and examples. Zero hosting cost. Shareable and indexable, so it also works as marketing and a funnel into the full app.
- **Full app**: everything that needs a server: generation, accounts, credits, history.
- **Web + Telegram** both run from the same backend and the same curriculum build.
  - Web is better for side-by-side comparison (larger screen).
  - Telegram gives mobile reach, built-in identity, easy payments (Stars), and a channel for streak reminders.
  - Telegram's comparison UI must be designed for small screens: swipe or toggle between images instead of side by side.

### Hosting in early phases

Goal: **don't commit to paid hosting early.** Run a free prototype for the author and friends.

🟡 **GitHub Pages + one small Cloudflare Worker.**

- **Frontend**: the PWA on GitHub Pages, at zero cost.
- **Worker** (free tier, ~100k requests/day), a thin proxy that:
  - holds the fal.ai key server-side, so it never ships to clients
  - checks a per-friend **invite code**
  - enforces a **spending cap per code**
  - can be revoked per code at any time
- Nothing to install, nothing to sign.
- It becomes the seed of the real backend later (accounts, credits, Telegram).

🟡 **Built (Nov 2026), in `worker/`:** Hono on Workers with D1 (`worker/schema.sql`). An invite code is ten characters; `bun codes.ts add|list|cap|revoke` manages them. Each image is charged at submit (atomically, so parallel requests can't overspend) and refunded if fal reports a failure; at most 2 pending per code. GPT Image 2, medium quality, 16:9, WebP. The charge is a flat **$0.10 per image** (fal bills this model by tokens and reports $0.10 as its average per call), so the default $3 cap is ~30 images; lower `PRICE_MILLS` once fal's dashboard shows the real cost. Results are fal.media URLs, kept per code and lesson, so they show on any device.
- **In the lessons:** `::generator` in "Your turn" renders the box (`src/scripts/generator.ts`). Without a code it points to arena.ai and asks for an invite code; with one, it shows a prompt field, images left, and the reader's own results for that lesson on a stage (newest first, prompt as caption). The site only shows the code field when built with `GENERATOR_URL` (a repository variable in the Pages workflow).

**Fallback (if the Worker route fails for some reason): Tauri desktop app** wrapping the PWA and distributed privately to friends. Considered and parked, because:
- the API key would ship inside the binary (fixable only with a revocable key per friend)
- unsigned apps trigger Gatekeeper/SmartScreen warnings, signing costs money, and builds are needed for each OS
- it's a surface we'd discard, since the end state is web + Telegram

A related no-backend option: each friend pastes their own personal fal.ai key into the PWA (stored locally). Needs verification that fal.ai supports multiple revocable keys, ideally with spending limits, and that it allows browser calls (CORS). Tauri is only worth it if this option is chosen and browser calls are blocked.

🧪 **Interactive without a generator.** The static site could still feel hands-on. For a given brief, precompute a grid of variants (e.g. 4 lights × 3 lenses). The user "builds a prompt" by picking options and instantly sees the matching precomputed image. That gives the satisfaction of seeing the difference at zero API cost, and it's possibly the best version of the Hook for anonymous visitors.

---

## 6. Generation & Providers

✅ **Centralized credits.** We pay for the API, and users spend credits. There are no user API keys at the start.

✅ **Provider: fal.ai** (an account with a small budget already exists). It aggregates many image and video models behind one API, so we can switch models without rewriting code.

🟡 **Choosing the default model.** Criteria, in order:
1. **Responds to craft vocabulary**: lighting, lens, film stock, and palette terms visibly change the output
2. **Doesn't beautify everything**: if the lazy prompt already looks great, the lesson's contrast disappears
3. **Prompt adherence**: the technique asked for actually shows up
4. **Cheap enough for many reps**
5. **The same model for lesson examples and the user's default**, so users can reproduce what lessons show

Pick by a **bake-off**: run lesson ladders across 3–5 candidate models with 2–3 seeds each. Re-run it when new models come out, and save the results as test fixtures. Candidates (Nov 2026): GPT Image 2, Nano Banana Pro / 2, Seedream 5.0, FLUX.2 [max] / FLUX 3. The `fal-ai/flux/dev` test of lesson 1.1 worked but still has the plastic look.

First bake-off (lesson 1.1 ladder, Nov 2026, 23 of 32 images; the run was stopped partway):
- **GPT Image 2**: 🟡 front-runner. The lazy prompt gives a natural, candid, non-glossy street. Selective color is clean, and the director's cut got every detail (age, silver bob, against the flow, eye contact).
- **Seedream 5.0 Pro**: close second. Very consistent across seeds and followed all the details, though slightly more polished.
- **Nano Banana Pro**: strong contrast, but it adds its own interpretation (put the crowd in 1940s hats). Good co-creator material, less predictable as a default.
- **FLUX.2 [max]**: even the lazy prompt comes out glossy and golden-hour. This is the "beautifies everything" problem. One request failed.
- Finding: modern models' lazy output is **less sloppy than expected** (realistic, candid). The gap the technique creates is still large, but the "before" image is closer to bland than ugly. Lessons should frame it as *generic*, not *bad*.
- Each image takes ~20–55 s, so generation UX needs progress feedback.
- Video (MiniMax H3 image-to-video on fal, `minimax/h3/image-to-video`, 768P, 5 s): ~90–110 s per clip. Video models "solve" a reveal by **changing the lighting** unless told otherwise. Saying explicitly "the lighting never changes … no fill" made the subject move into the light instead.
- Seamless loops: give the same image as both the first and the last frame. Kling v3 Pro (`fal-ai/kling-video/v3/pro/image-to-video`, `start_image_url` + `end_image_url`) kept the motion continuous through the seam. MiniMax H3 (`end_image_url`) froze for ~8 frames before the end frame, which shows as a stall on every loop.
- Loops with real forward motion (someone walks *toward* us, then leaves): the same first and last frame makes the model **freeze everything else** (the crowd stood still for 10 s). What worked: start from an empty plate with no end frame, so the walk is natural, then generate a short **bridge clip** from the walk's last frame back to its first. Kling `elements` keeps the character consistent when she isn't in the start frame. Recipe in `refs/landing/README.md`.
- Tooling note: use fal's **queue API** (submit → poll) and download results with `curl`. Bun's `fetch` sometimes stalls downloading from `fal.media`, which caused the earlier "hanging" runs.

🟡 **Lessons are model-agnostic.** The techniques should work anywhere. The generator has a **default model**, and lessons mention it: *"We tested this with model X. Results may differ with other models."*

🟡 Image is the default, video costs more credits (see §2).

Open: how to handle long video generation times (queue and notify, especially through Telegram).

---

## 7. Accounts & Payments

### Access tiers (first version)

🟡

| Tier | Who | Can do |
|---|---|---|
| **Anonymous** | Anyone | Read all free lessons (at least the Hook) with examples. Interactive precomputed variants (🧪). No generation. |
| **Account** | Signed up | Saved progress and streaks. Generation needs credits (see below). |
| **Paid** | Bought credits | Full generation (image + video). |

- **Telegram**: identity is automatic (Telegram user via Mini App `initData`), so the account is effectively free and seamless.
- **Web**: needs a sign-in. Method TBD (magic link, Google, …).

### Payments

- **Telegram**: ✅ **Telegram Stars**, which are simple and built in.
- **Web**: 🟡 **no payment system in the MVP.** The web app is a **closed prototype**: free for an **allowlist** of invited users (invite codes checked by the Worker, see §5), funded from the existing fal.ai budget. Add real payments later.
  - Needs a **spending cap per invite code** so the budget can't be drained.

### Open: the moment someone first wants to generate

The unsolved question is what happens when a user wants to generate and hasn't paid yet. Options to think about:
- A small number of **free trial generations** after signup (image costs are low; Telegram identity limits abuse).
- **Precomputed-only** until they pay (the interactive grid).
- A **pay-first** model with the hook as a free preview.

Not decided yet. The first version uses the allowlist on web and Stars on Telegram.

---

## 8. Phasing

🟡

**Phase 1: Hook + generator (friends-only prototype).** This combines what were Phases 0 and 1 in the draft.
- Static course on GitHub Pages: the Hook topic with precomputed lazy-vs-directed comparisons
- Interactive precomputed grid (🧪)
- Generator (images) through the Worker, with invite codes and spending caps
- Audience: the author and friends. Validate the "I didn't know this was a skill" reaction.

**Phase 2: Grow.**
- More topics (Light, Color, …)
- Video and image → video
- Accounts, streaks, portfolio
- Telegram Mini App with Stars
- AI critique experiment (🧪)

**Later:** web payments, Russian, other media.

---

## 9. Stack

🟡 New tools for the author, which is fine: a chance to learn them.

| Layer | Choice |
|---|---|
| Runtime / package manager | **Bun** ✅ |
| Course + PWA | **Astro**: Markdown content collections, static output, built-in i18n routing |
| Hosting (frontend) | **GitHub Pages** |
| Backend / proxy | **Hono** on **Cloudflare Workers** (free tier) |
| Storage (when needed) | **Cloudflare D1 / KV**: invite codes, usage, later users and credits |
| Generation | **fal.ai** |
| Styling | ✅ One hand-written stylesheet (`src/styles/site.css`) with theme variables. Tailwind dropped: the design is a small set of deliberate rules, and utility classes would add little. |
| Version control | ✅ **Git, with site media.** Lesson and landing media are committed and kept small: images as WebP (generated) or JPG (film stills), at most 1920 px wide; videos as H.264 without audio (~1 MB per teaser). Only raw video sources in `refs/` are gitignored; new workspaces copy them from the project root (`happy.toml` setup command). Generation records (`*.json`, prompt `*.txt`) are tracked. |
| Lesson markup | Markdown + `remark-directive` + a custom remark plugin (`src/lib/remark-lesson.mjs`): ` ```prompt ` blocks, `::::ladder` / `:::step{label}`, captioned figures from each file's generation record |

The old MVP's code (Next.js) isn't carried over. Lesson content and ideas may be reused.

---

## 10. Localization

✅ **English first. Russian will come, but not at launch.**

🟡 **Ready for i18n from day 1, translated later:**
- Content goes in locale folders from the start (`content/en/...`) and routes go through Astro i18n (`/en/...`, later `/ru/...`)
- No hard-coded UI strings: everything goes in a dictionary file from the start
- Media is mostly language-free. Captions and annotations go in text, not baked into images.
- **Don't translate until the content is stable.** Early lessons will change a lot, and translating them would double every rewrite.

Retrofitting i18n structure later is painful, but adding it on day 1 costs very little. Translating early is the expensive part, so we wait on that.

Open: in the Russian version, do users prompt in Russian or English? Models generally respond best to English. Options include teaching English prompt terms, or translating behind the scenes and showing the user the English prompt.

---

## 11. Design

Problem: many AI-generated sites look generic and alike, which is exactly what we teach people to escape. The site must not lean toward any one visual style, because lessons show many styles. Mockup: lesson 1.1 (`.context/mock/`).

🟡 **"The screening room."** The site is the neutral room around the work, like a gallery wall, an editing suite, or a contact sheet. Simple, but every choice has a reason.

- **The UI has no color.** Every hue on the page comes from the images (lesson 1's selective color, applied to the site itself).
- **Images sit on neutral grey or dark.** Colorists judge images on neutral surroundings. Images are large, at their true aspect ratio, and wider than the text column.
- **Typography carries the identity:** a book serif for lesson text (Newsreader in the mockup), and a screenplay typeface for prompts (Courier Prime), because a prompt is direction. Labels and captions are small uppercase mono, like slate or contact-sheet captions.
- **The ladder is one frame switched in place.** Only what's inside the stage changes: the image, its caption, and its prompt.
  - ✅ **The prompt is the frame's caption**, directly under the image. Words carried over from the previous step are dimmed and **added words are bright**, so "only the prompt changes" is visible (brightness only, no color).
  - ✅ **The explanation is static prose** after the ladder, one paragraph per step, never changing. Each starts with a `:goto[00 Default]{step=0}` link that switches the frame. Text that changes in the middle of an article breaks reading, so we don't do it.
  - ✅ A **contact strip** of all steps sits below the frame, so readers see at once that there are several versions and roughly how they differ. Click a thumbnail to jump to it.
  - ✅ **Click anywhere on the frame** (or ›, swipe, →) for the next step, wrapping around; ‹ / ← go back; a "1 / 3" counter.
  - 🧪 **Autoplay: one full circle** (00 → 01 → 02 → 00, ~2.5 s each) the first time the ladder comes into view, ending on 00 so the image matches the text below. Any interaction stops it; a Play button repeats it. Off when the system asks for reduced motion. Watch how friends react.
- **Side notes** in the margin, like a director's notes, on wide screens. Inline on narrow ones.
- **Motion only where it means something:** teaser videos. No scroll animations or fade-ins.
- **Avoid:** gradients, rounded cards with shadows, emoji icons (the old prototype's 🌙), sparkles, glassmorphism, a centered hero with two buttons, stock illustrations, testimonial grids, Inter.

🟡 **Light and dark themes, chosen by the user.**
- Default: follow the system setting (`prefers-color-scheme`). An explicit choice is remembered (localStorage).
- The switch is a plain text control in the top bar ("Light / Dark"), not a sun/moon icon.
- **Dark ("screening room")**: warm-neutral dark everywhere, images on the page itself.
- **Light ("paper")**: warm paper for reading, and **images always sit on a dark-grey band**, so judging images stays neutral in both themes.
- ✅ **Switching changes only colors, never layout.** Spacing is the same in both themes (the band's padding stays in dark, where the band is invisible), so the text doesn't move.
- Cost: every page is checked in both themes.

## Open Questions

- Final name: Studium (working title), Etude, or Antislop? (§1)
- Final one-liner wording (see keywords above)
- Does "recreate" work as an exercise? (🧪, validate with real use)
- Can "intent first" stay low-friction?
- Is AI critique good enough to add after v1? (🧪)
- Do all concepts fit into ~5-minute lessons?
- What happens when a user first wants to generate but hasn't paid? (§7)
- Web sign-in method
- Handling long video generation times
- Prompt language for Russian users (§10)
- Rights for film stills before going public (§4)
- Hook finale: a 9th lesson, a closing page, or part of lesson 8? (§4)
- Film-language topics vs production-pipeline track (Idea → Script → Storyboard)? (§4)
- fal.ai: multiple revocable keys / spend limits / browser CORS? (only matters for the parked no-backend option, §5)
- Teaser film grain? The grain added in post made each teaser ~10x larger (10–20 MB), so the teasers ship without it for now. Options: a light re-encode with grain (~5–9 MB each), or a grain overlay on the site. (§9)

### To deal with later (site and content polish)

1. **Human review of everything done so far.** All lesson drafts (Hook 1–8), images, film stills, references and the "AI surprises you" notes were drafted with AI and need the author's review: check every reference against the film, rewrite in the author's voice, replace weak images. Open placeholders (`<!-- TODO -->` in the lessons) include missing stills (Wallace & Gromit, Prince Achmed, Magritte) and video teasers for lessons 3, 5, 6, 7 and 8.
2. **Navigation.** How users move through the course: between lessons and blocks, back to the lesson list, from a Hook lesson to its block ("doorways"), progress and "where was I".
3. **Dark / light mode.** Tune both themes: colors, contrast, how images sit on the page in each mode, and which one is the default.
4. **Image preview.** Improve how images are shown: the ladder viewer, enlarging an image, comparing steps side by side, mobile.
5. **Iterating on details.** Ongoing small fixes across copy, layout and media that come up while using the site.
6. **Static version on GitHub Pages.** Build and deploy the lessons as a static site (no generator; practice through an external tool). The build already supports a sub-path via `BASE`. Before publishing: media sizes (e.g. the landing loop), and the film-stills rights question (§4).
7. **MVP with the generator, for friends.** 🟡 Built and tested locally (§5): the Worker, invite codes with caps, and the generator in every lesson. Left: deploy the Worker, set `GENERATOR_URL`, hand out codes. Later: keep images beyond fal.media's retention (e.g. R2), "save to lesson" for the author.
