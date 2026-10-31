---
name: app-store-description
description: Create compelling App Store listings including title, description, keywords, screenshots, and promotional text. Use when user wants to optimize app store presence, create new listings, or update existing ones.
version: 1.0.0
lastUpdated: 2026-03-30
status: active
requires: [app-store-optimization, brainstorming]
inputs:
  - name: app_type
    type: string
    required: true
    options: [new_app, update, refresh]
    description: Type of listing work
  - name: platform
    type: string
    required: true
    options: [ios, android, both]
    description: Target platform
  - name: app_name
    type: string
    required: true
    description: App name or working title
  - name: app_category
    type: string
    required: true
    options: [productivity, social, entertainment, health, finance, education, utility, games, other]
    description: App category
  - name: core_features
    type: array
    required: true
    description: List of main features (3-5 most important)
  - name: target_audience
    type: string
    required: false
    description: Target users (e.g., professionals, students, gamers)
  - name: unique_value
    type: string
    required: false
    description: What makes this app different
  - name: competitors
    type: array
    required: false
    description: Main competitors to differentiate from
  - name: languages
    type: array
    required: false
    default: [en]
    description: Languages to localize
outputs:
  - name: title
    type: text
    description: App title (max 30 chars iOS, 50 Android)
  - name: subtitle
    type: text
    description: App subtitle (iOS, max 30 chars)
  - - name: description
    type: markdown
    description: Full app description with formatting
  - name: keywords
    type: text
    description: Comma-separated keywords (iOS, 100 chars max)
  - name: promotional_text
    type: text
    description: Promotional text (max 170 chars)
  - name: what's_new
    type: text
    description: What's new section for updates
  - name: screenshot_captions
    type: array
    description: Captions for each screenshot
  - name: app_preview_script
    type: markdown
    description: Script for app preview video
examples:
  - scenario: "Create new app store listing"
    inputs:
      app_type: new_app
      platform: both
      app_name: "TaskFlow"
      app_category: productivity
      core_features: ["Kanban boards", "Time tracking", "Team collaboration", "Offline support"]
      target_audience: "Teams and project managers"
      unique_value: "AI-powered task prioritization"
    expected_output: "Complete listing with title, description, keywords, screenshots guide"

  - scenario: "Update existing app listing"
    inputs:
      app_type: update
      platform: ios
      app_name: "FitTracker"
      app_category: health
      core_features: ["Workout plans", "Nutrition tracking", "Progress photos"]
    expected_output: "Updated description, what's new section, optimized keywords"
---

# App Store Description Skill

## Overview

This skill creates professional, conversion-optimized App Store listings that follow Apple App Store and Google Play Store guidelines. It includes compelling copy, strategic keyword placement, and localization guidance.

## When to Use

- Launching a new app on App Store/Google Play
- Updating existing app listing
- Refreshing app metadata for better conversion
- Localizing app for new markets
- A/B testing store listing variations

## Platform Guidelines

### Apple App Store

| Field | Limit | Best Practice |
|-------|-------|---------------|
| App Name | 30 characters | Include primary keyword |
| Subtitle | 30 characters | Secondary keywords, value prop |
| Description | 4,000 characters | Lead with benefits, use formatting |
| Keywords | 100 characters | Comma-separated, no spaces |
| Promotional Text | 170 characters | Highlight current promos |
| What's New | 4,000 characters | Bug fixes first, then features |
| Screenshots | 10 (iPhone), 10 (iPad) | Show key features in order |
| App Preview | 30 seconds | Show actual app usage |

### Google Play Store

| Field | Limit | Best Practice |
|-------|-------|---------------|
| Title | 50 characters | Include primary keyword |
| Short Description | 80 characters | Hook users immediately |
| Full Description | 4,000 characters | Detailed features, SEO |
| Tags | No limit | Use for discovery |
| Screenshots | 8 (phone), 8 (tablet) | Multiple sizes |
| Feature Graphic | 1024x500 | High-res promotional |

## Title Strategy

### Formula

```
[Brand] + [Primary Keyword] + [Secondary Keyword/Value]
```

### Examples

| App Type | Title |
|----------|-------|
| Productivity | TaskFlow: Project Management |
| Health | FitTrack - Workout & Diet |
| Finance | BudgetWise: Money Manager |
| Social | PhotoShare - Group Albums |

### Best Practices

1. **Lead with brand name** (if known)
2. **Include primary keyword** within first 30 chars
3. **Avoid generic terms** ("app", "free")
4. **Use separators** (colon, hyphen, pipe)
5. **Test variations** for ASO

## Subtitle Strategy (iOS)

### Formula

```
[Value Proposition] + [Target Audience]
```

### Examples

| App Type | Subtitle |
|----------|----------|
| Productivity | Organize your team's projects |
| Health | Track workouts & nutrition |
| Finance | Save more, stress less |
| Education | Learn coding interactively |

## Description Structure

### iOS Description Template

```
## [Hook - Problem/Solution]
[Start with the main problem your app solves, 1-2 sentences]

## Features
• [Feature 1] - [Benefit]
• [Feature 2] - [Benefit]
• [Feature 3] - [Benefit]
• [Feature 4] - [Benefit]
• [Feature 5] - [Benefit]

## Why [App Name]?
• [Unique benefit 1]
• [Unique benefit 2]
• [Unique benefit 3]

## [Additional sections as needed]
[Privacy policy link if needed]

---

## [Company/App Name]
[Support link]
```

### Google Play Description Template

```
[SHORT DESCRIPTION - 80 chars]
[One sentence hook with keywords]

---

[FULL DESCRIPTION]

[Paragraph 1: Problem & Solution]
[Explain the problem, then present your app as the solution]

[Paragraph 2: Key Features]
[List 5-7 main features with benefits]

[Paragraph 3: Why Choose Us]
[Differentiation from competitors]

[Paragraph 4: Social Proof]
[User testimonials, ratings, downloads if impressive]

[Paragraph 5: Call to Action]
[Download now and experience...]

---

[Privacy Policy]
[Link to privacy policy]

[Contact]
[Support email/website]
```

## Keywords Strategy

### iOS Keywords

```text
# Format: comma-separated, no spaces between commas

# Example for Task Management App
productivity,project,management,tasks,todo,kanban,team,collaboration,time,tracking,organization,planner,schedule,goals,workflow
```

### Keyword Research Process

1. **Brainstorm seed keywords** - List terms users would search
2. **Check competition** - Note what competitors use
3. **Analyze search volume** - Use tools like AppTweak, Sensor Tower
4. **Prioritize** - High volume, low competition
5. **Test and iterate** - Monitor rankings

### Keyword Categories

| Category | Examples |
|----------|----------|
| App Type | task, todo, planner, manager |
| Use Case | productivity, organize, track |
| Features | kanban, calendar, timer |
| Audience | team, business, personal |
| Competitors | [not recommended] |

## Screenshot Strategy

### iPhone Screenshot Order (10 screenshots)

1. **Screenshot 1** - Hero image / Main value prop
2. **Screenshot 2** - Key feature #1
3. **Screenshot 3** - Key feature #2
4. **Screenshot 4** - Key feature #3
5. **Screenshot 5** - User interface / Dashboard
6. **Screenshot 6** - How it works / Onboarding
7. **Screenshot 7** - Premium feature / Upgrade
8. **Screenshot 8** - Testimonial / Social proof
9. **Screenshot 9** - Support / Contact
10. **Screenshot 10** - Final CTA

### Screenshot Design Tips

1. **Use device frames** - Native look
2. **Add text overlays** - Brief, scannable
3. **Show real UI** - Not stock photos
4. **Highlight benefits** - Not just features
5. **Consistent style** - Match app branding
6. **Localize captions** - Different text per market

### Screenshot Caption Templates

```
# iOS - Short version (under 30 chars)

1. "Your tasks, organized"
2. "Collaborate in real-time"
3. "Track time effortlessly"
4. "Offline? No problem"
5. "Join 1M+ teams"

# Google Play - Feature highlights

• Organize tasks your way
• Work together seamlessly  
• Never lose data
• Available on all devices
• #1 rated productivity app
```

## App Preview Video

### Structure (30 seconds)

| Time | Content |
|------|---------|
| 0-3 sec | Hook - Show app in action |
| 3-10 sec | Key feature #1 |
| 10-17 sec | Key feature #2 |
| 17-24 sec | Key feature #3 |
| 24-30 sec | CTA + Logo |

### Video Best Practices

1. **Film actual app** - Not simulated
2. **Use voiceover** - Explain what users see
3. **Fast pace** - Keep attention
4. **Show value** - Don't just list features
5. **End with CTA** - "Download now"
6. **Landscape optional** - Portrait is fine for most

## Localization

### Languages by Market

| Market | Languages |
|--------|-----------|
| English | en-US (default) |
| Chinese | zh-Hans, zh-Hant |
| Japanese | ja |
| Korean | ko |
| Spanish | es-ES, es-MX |
| Portuguese | pt-BR, pt-PT |
| French | fr-FR |
| German | de |
| Arabic | ar (RTL support) |

### Localization Tips

1. **Don't just translate** - Adapt to culture
2. **Localize screenshots** - Show localized UI
3. **Keyword research** - Different keywords per market
4. **Native speakers** - Or use professional services
5. **Test locally** - Check for truncation

## What's New Section

### Template

```
Version [X.X.X]

## New Features
• [Feature 1] - [Brief description]
• [Feature 2] - [Brief description]

## Improvements
• [Improvement 1]
• [Improvement 2]

## Bug Fixes
• Fixed [issue 1]
• Resolved [issue 2]
• Improved [aspect]
```

### Best Practices

1. **Lead with features** - New features first
2. **Be specific** - Not "various improvements"
3. **Include keywords** - Good for search
4. **Keep it fresh** - Update regularly
5. **Bug fixes matter** - Users appreciate fixes

## Privacy & Requirements

### App Store Privacy

1. **Data collection disclosure** - Required for all apps
2. **Tracking transparency** - iOS 14.5+
3. **Privacy labels** - In App Store Connect

### Required Links

- Privacy Policy (required if collecting data)
- Support URL
- Terms of Service (recommended)

## ASO Checklist

### Pre-Launch

- [ ] Research keywords
- [ ] Create compelling title
- [ ] Write subtitle with keywords
- [ ] Design description structure
- [ ] Plan screenshots (10)
- [ ] Record app preview video
- [ ] Prepare localized versions

### Launch

- [ ] Upload to App Store Connect / Play Console
- [ ] Fill all metadata fields
- [ ] Upload screenshots and video
- [ ] Set pricing and availability
- [ ] Submit for review

### Post-Launch

- [ ] Monitor rankings
- [ ] Track conversions
- [ ] A/B test elements
- [ ] Update regularly
- [ ] Respond to reviews

## Tools

| Tool | Purpose |
|------|---------|
| AppTweak | Keyword research, ASO |
| Sensor Tower | Competitive analysis |
| App Annie | Market insights |
| SplitMetrics | A/B testing |
| AppFollow | Review monitoring |

## Complete Example: TaskFlow App

### Title
```
TaskFlow: Project Management
```

### Subtitle (iOS)
```
Organize tasks & collaborate with your team
```

### Short Description (Android)
```
Manage projects, track tasks, and collaborate with your team in one powerful app.
```

### Description (iOS)

```
## Organize Tasks Your Way

TaskFlow helps teams stay organized and get things done. Whether you're managing a project, planning a launch, or tracking daily tasks, TaskFlow adapts to your workflow.

## Features

• **Kanban Boards** - Visualize work in progress with drag-and-drop simplicity
• **Time Tracking** - Track time spent on tasks and projects automatically
• **Real-time Collaboration** - Work together with your team, see changes instantly
• **Offline Support** - Keep working even without internet, sync when back online
• **Smart Prioritization** - AI-powered suggestions help you focus on what matters

## Why TaskFlow?

• **Intuitive Design** - Get started in minutes, no learning curve
• **Flexible Workflows** - Customize boards, lists, and views to fit your needs
• **Powerful Integrations** - Connect with Slack, Google Drive, and more
• **Secure & Private** - Enterprise-grade security with end-to-end encryption

## Join 1 Million+ Teams

TaskFlow is trusted by teams at companies of all sizes. Download now and transform how your team works.

---

**Support:** support@taskflow.app  
**Privacy:** taskflow.app/privacy
```

### Keywords
```
productivity,project,tasks,todo,kanban,team,collaboration,time,tracking,organization,planner,schedule,goals,workflow,management
```

### Screenshot Captions

1. "Organize with Kanban boards"
2. "Track time automatically"
3. "Collaborate in real-time"
4. "Works offline too"
5. "AI-powered prioritization"
6. "Customize your workflow"
7. "Join 1M+ teams"
8. "Download TaskFlow today"
