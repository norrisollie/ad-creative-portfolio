# Display & Rich Media Work

A selection of HTML5 display and rich media creatives, focused on scalable systems, feed-driven builds, and working within platform constraints (e.g. Google Studio, vendor environments).

---

## Actimel — Technical Task (WPP / Wavemaker)

### What it was

A technical build exercise to demonstrate approach to HTML5 ad development, structure, and decision-making.

### What I did

- Built a modular creative with clear separation between layout, animation, and data handling
- Documented decisions (file structure, performance considerations, animation approach)
- Focused on maintainability and clarity over quick hacks

### Why

- Showed how I approach builds in a production setting, not just “make it work”
- Prioritised readability and reuse, which matters when creatives scale across campaigns

---

## Sainsbury’s — Dynamic Rich Media (Nectar Prices)

### What it was

Feed-driven display ads for Nectar pricing, with multiple layout variations depending on product type.

### What I did

- Built 3 layout types: _chopped, sliced, tumbled_
- Used feed data to inject product, standard price, and Nectar price
- Implemented font-resize logic to prevent price overflow
- Added URL parameter control (`?variant=`) for testing and debugging

### Why

- Needed one creative system to handle multiple product formats without rebuilding
- Font resizing solved a real issue: unpredictable price lengths breaking layouts
- URL params allowed fast QA without rebuilding — reduced turnaround time

---

## Mercedes — OSP Skins (Just Premium & Sublime)

### What it was

High-impact page skins promoting an online car sales platform across two similar formats.

### What I did

- Built a single master creative for Just Premium
- Adapted it for Sublime (more flexible format)
- Created animated background grid of cars with diagonal wave motion
- Added interaction animations (scrolling phone UI, favouriting behaviour)

### Why

- One master reduced duplication and kept logic consistent
- Adaptation approach was faster and safer than building two separate creatives
- Animations were used to demonstrate product behaviour, not just decorate

---

## UEFA — Expandable / Interstitial Rich Media (Template)

### What it was

A template used to build complex creatives combining expandable and interstitial formats for major sporting events.
_Live campaign creatives cannot be shared, so this example is the template used to produce them._

### What I did

- Worked from a third-party template supplied by the original creative agency
- Debugged and stabilised platform integrations
- Fixed tracking (expand, close, click states)
- Configured creative settings correctly within Google Studio (format setup, expansion behaviour, tracking)
- Used the template to produce multiple campaign versions, including different languages

### Why

- The template was prone to issues, so stability and reliability were key
- Required understanding both the code and platform configuration to get working correctly
- Reduced recurring issues across repeated campaign rollouts

---

## McDonald’s — Responsive Footer

### What it was

Responsive footer creative for campaign deployment.

### What I did

- Used `vw` units instead of fixed breakpoints
- Built fluid layout that adapted across screen sizes

### Why

- Avoided managing multiple breakpoint-specific builds
- Faster to implement and maintain
- Better fit for fluid ad environments

---

## Summary

These examples focus on building and maintaining scalable HTML5 creatives under real production constraints.

Across these projects, I’ve worked with feed-driven content, reusable templates, and vendor-specific formats, balancing creative intent with technical limitations such as file size, platform requirements, and tracking behaviour.

A key part of my approach is reducing manual effort through reuse, improving reliability in fragile builds, and making creatives easier to test, adapt, and deploy across multiple formats and campaigns.
