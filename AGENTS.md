# Kotoba Forge Project Rules

## Project Overview
This project is a personal Japanese training web app called **Kotoba Forge**.
It is not a generic LMS or online course platform.
Its purpose is to support daily Japanese practice, output training, and AI-assisted weakness analysis.

## Target Device
- Primary device: iPad mini
- Primary browser: Chrome
- Primary orientation: landscape
- Touch-first UI
- Single-screen layout preferred
- Avoid vertical scrolling whenever possible

## Product Principles
- Keep the existing approved product concept
- Do not redesign the app into a different category
- Do not turn it into a generic course website
- Preserve the current dark, minimal, dashboard-style design
- Prefer compact, stable layouts over content-heavy layouts

## Visual Rules
- Dark background
- White text
- Minimal Bootstrap-like visual language
- No decorative illustrations
- Use Bootstrap Icons where appropriate
- Use ECharts for radar charts when needed
- Avoid heavy animation or flashy visual effects

## Information Architecture
Main pages:
- Home dashboard
- Vocabulary
- Sentence
- Dictation
- Shadowing
- Dialogue
- Diary

## Home Dashboard Rules
The dashboard must use a left-right structure.

### Left side
- Overall analysis
- Module shortcuts

### Right side
- Todo
- AI advice
- Weakness analysis

## Overall Analysis Rules
- Overall analysis is for status and metrics only
- Do not place coaching advice or recommendations inside the analysis area
- Advice must appear only in the dedicated AI advice panel on the right side
- Avoid duplicated recommendation text in multiple places

## Rank Display Rules
- Rank must use a circular visual treatment
- Keep the rank block visually clean and well-balanced
- Do not let the rank block break the surrounding layout

## Module Shortcut Rules
- Module cards should be compact
- Module cards should contain icon + title only
- Do not add extra descriptive paragraphs inside module cards
- Prevent module cards from being squeezed, distorted, or uneven
- Prefer stable grid layouts over long horizontal rows

## Analysis Rules
- Separate analysis from advice
- Separate metrics from recommendations
- Avoid repeating the same information in multiple panels
- Keep each piece of information in the correct module only

## Input Rules
### Handwriting pages
- No hardware keyboard input required for main training flow
- Stylus / Apple Pencil friendly
- Touch input must feel stable and direct

### Voice pages
- Keep controls simple and compact
- Voiceprint / waveform style visualization is preferred
- Avoid cluttered audio control layouts

## Engineering Rules
- Refactor toward reusable shared components
- Prefer maintainable structure over standalone duplicated HTML
- Preserve existing approved layout concepts where possible
- Minimize risky redesign
- Keep changes easy to review
- Prefer incremental migration instead of rewriting everything at once

## Refactor Direction
Target architecture should separate:
- shared layout shell
- shared CSS
- shared components
- per-page modules
- reusable chart helpers
- reusable handwriting and voice utilities

## Migration Safety
- Use existing standalone HTML files as source of truth during migration
- Do not delete original prototype files unless explicitly asked
- New app structure can be created alongside prototype files first
- Prefer step-by-step migration page by page

## Output Expectations
When making changes:
- explain what changed
- list changed files
- mention assumptions
- mention remaining risks if any