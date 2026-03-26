/**
 * Acorn 2026 — Design Tokens (web port)
 * Ported from acorn-2026/src/tokens/tokens.ts
 * Source of truth: ../acorn-2026/src/tokens/tokens.ts
 *
 * Notes for web use:
 *  - spacing / fontSize / borderRadius / size values are plain numbers (dp → px 1:1)
 *  - append 'px' when used in inline CSS strings
 *  - fontFamily: 'Manrope' loaded via Google Fonts in index.html
 */

export const tokens = {
  color: {
    brand: {
      base:      '#5bff9a', // Primary brand green — buttons, avatar fills, progress ring
      baseMuted: '#c4ffd5', // Muted brand green — disabled/loading states
      cta:       '#00703e', // Dark CTA green — link text, active underlines
      positive:  '#00a363', // Positive/success green — positive amounts, Paid badge
      teal:      '#36a6ac', // Teal — notification label
      mint:      '#2adaa5', // Mint — progress bar fill
    },
    text: {
      primary:   '#1a1a33', // Default body text, titles, values
      secondary: '#6b7280', // Subtitles, descriptions, body copy
      muted:     '#999999', // Section labels, helper text, inactive nav tabs
      disabled:  '#aeaeae', // Placeholder text in disabled inputs
      white:     '#ffffff', // Text on dark/filled backgrounds
    },
    border: {
      default:  '#dedfdf', // Card outlines, input borders, dividers
      selected: '#8a8a8a', // Active/selected input border
    },
    background: {
      white:        '#ffffff',
      surface:      '#f3f4f6', // Disabled, secondary button, tag
      accountGreen: '#e3f8eb', // Light green — success alert, Paid badge
      infoBg:       '#e8f1fe', // Light blue — Approved badge, announcement alert
    },
    semantic: {
      info:      '#3280f6', // Info/approved blue
      error:     '#dc2626', // Error/destructive red
      errorBg:   '#fbe7e7', // Error background
      warningBg: '#fef2e6', // Warning background
    },
  },

  typography: {
    fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: {
      xs:      12, // Caption — section headings, metadata
      sm:      14, // Body small — subtitles, badge labels
      default: 16, // Body default — primary content, card titles
    },
    fontWeight: {
      regular:  400, // Body copy, subtitles, dates
      semibold: 600, // Titles, labels, badge text, nav items, buttons
      bold:     700, // Monetary amounts, prominent headings
    },
    lineHeight: {
      xs:      16,
      sm:      20,
      default: 24,
    },
    letterSpacing: {
      sectionLabel: '1.2px', // Uppercase section/category labels only
    },
  },

  spacing: {
    xxxs: 2,  // Micro gaps — tight icon-text pairs
    xs:   8,  // Badge padding, small internal gaps
    sm:   12, // Card inner padding, list row padding
    md:   16, // Standard card padding, horizontal button padding
    lg:   24, // Section gaps, outer margins
  },

  borderRadius: {
    sm:     8,    // Cards, inputs, status badges
    pill:   40,   // Buttons, notification labels, tags
    circle: 9999, // Avatars, status dots
  },

  size: {
    icon: {
      xs:      12, // Micro icon
      sm:      16, // Small icon — input trailing, checkbox
      default: 24, // Standard icon
      md:      20, // Navigation icon
    },
    avatar: {
      sm:      28, // Label avatar
      default: 40, // Standard avatar — list item, card
    },
    statusDot: 8,
    toggle:    29,
  },
};

// ─── Prototype extensions ────────────────────────────────────────────────────
// Values used in the Early-Life prototype that extend (not conflict with) the
// Acorn token set. These cover dark-surface UI patterns not yet in the system.
export const proto = {
  color: {
    darkSurface:     '#0C3637', // Dark teal card/chip background
    darkSurfaceDeep: '#0a2e2f', // Deeper dark teal for gradient end
    chipComplete:    '#c4f7d7', // Completed chip background (muted brand green)
    appBackground:   '#efefed', // Page/shell background
    navActive:       '#6967ce', // Active bottom nav tab (Slate Blue)
    textSecondary:   '#5b5976', // Secondary text — used in Figma for balance label etc.
  },
};

// Convenience re-exports matching Acorn's own pattern
export const { color, typography, spacing, borderRadius, size } = tokens;
