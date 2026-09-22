import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const templatePath = path.join(dist, 'index.html')
const siteUrl = 'https://datepilot.online'
const routes = {
  '/': ['DatePilot — Date, Calendar, and Time Tools', 'Free date calculators, calendar tools, and time utilities. Calculate dates, age, working days, week numbers, and time zones with clear explanations.'],
  '/calculators': ['Date and Time Calculators', 'Use DatePilot calculators to add or subtract days, count working days, find age, and calculate date differences with clear methodology.'],
  '/calendar': ['Calendar Tools — Weekdays, Week Numbers, Leap Years', 'Check weekdays, ISO week numbers, and leap years using DatePilot calendar tools with clearly stated conventions.'],
  '/time': ['Time Tools — Countdown, Time Difference, Time Zone Converter', 'Count down to a date, compare elapsed time, and convert between time zones using DatePilot time tools.'],
  '/guides': ['Date and Time Guides — Calculations, Calendars, Time Zones', 'Practical explanations for date calculations, calendar rules, time zones, and date formats.'],
  '/faq': ['Frequently Asked Questions — DatePilot', 'Answers about DatePilot calculations, endpoint conventions, privacy, and how date tools work.'],
  '/calculators/date-calculator': ['Date Calculator | Add or Subtract Days from a Date', 'Add or subtract calendar days from any starting date. Understand month lengths, leap years, and year boundaries.'],
  '/calculators/age-calculator': ['Age Calculator — Exact Age in Years, Months, and Days', 'Calculate calendar age from birth date to any target date. Learn why age differs from total days divided by 365.'],
  '/calculators/days-between-dates': ['Days Between Dates Calculator', 'Calculate elapsed days between two dates. Understand exclusive vs. inclusive counting and endpoint conventions.'],
  '/calculators/add-days': ['Add Days to Date Calculator', 'Find a future date by adding calendar days. See how month lengths and year boundaries affect the result.'],
  '/calculators/subtract-days': ['Subtract Days from Date Calculator', 'Find an earlier date by subtracting calendar days. Cross month and year boundaries accurately.'],
  '/calculators/working-days': ['Working Days Calculator — Count Weekdays Between Dates', 'Count weekdays between two dates. Understand the Monday–Friday rule and why holidays are separate.'],
  '/calendar/day-of-week': ['Day of the Week Calculator', 'Find the weekday for any Gregorian calendar date. Understand why the year matters for weekday lookup.'],
  '/calendar/week-number': ['ISO Week Number Calculator', 'Find an ISO 8601 week number and week-year. Learn how week-years differ from calendar years around New Year.'],
  '/calendar/leap-year': ['Leap Year Calculator — Gregorian Rule', 'Check whether a year has 365 or 366 days. Understand the century exception and why 1900 is not a leap year.'],
  '/time/countdown': ['Countdown Calculator — Time Remaining Until a Date', 'Calculate the remaining days and hours until a target date and time.'],
  '/time/time-difference': ['Time Difference Calculator — Elapsed Hours and Minutes', 'Compare two date and time values. Calculate elapsed duration in hours and minutes.'],
  '/time/time-zone-converter': ['Time Zone Converter — Convert Between Named Time Zones', 'Convert a local date and time between named IANA time zones. Understand DST and date changes.'],
  '/about': ['About DatePilot — Our Approach to Date Calculations', 'Learn how DatePilot builds date and time tools, explains its methods, and checks calculation accuracy.'],
  '/contact': ['Contact DatePilot — Report Issues and Corrections', 'Report incorrect calculations, broken links, accessibility issues, or other problems with DatePilot.'],
  '/privacy-policy': ['Privacy Policy — How DatePilot Handles Your Data', 'DatePilot calculators run in your browser. Read how we handle calculator inputs, cookies, and any analytics.'],
  '/cookie-policy': ['Cookie Policy — Which Cookies DatePilot Uses', 'Learn about essential, analytics, and advertising cookies used by DatePilot when enabled.'],
  '/terms': ['Terms of Use — DatePilot', 'Read the terms governing use of DatePilot date and time calculation tools.'],
  '/disclaimer': ['Disclaimer — DatePilot', 'DatePilot provides general calculations, not official or legal advice. Read important disclaimers.'],
  '/report-an-error': ['Report an Error — DatePilot', 'Found an incorrect calculation, broken link, or accessibility problem? Report it to DatePilot.'],
}

const guideTitles = {
  'date-calculations': 'How Date Calculations Work',
  'how-to-calculate-age': 'How to Calculate Age',
  'days-between-dates': 'How to Calculate Days Between Dates',
  'add-subtract-days': 'How to Add or Subtract Days From a Date',
  'working-days': 'Working Days Explained',
  'leap-years': 'Leap Years Explained',
  'week-numbers': 'How Week Numbers Work',
  'iso-week-date': 'ISO Week Date System Explained',
  'day-of-week': 'How to Find the Day of the Week',
  'time-zones': 'Time Zones Explained',
  'utc-vs-gmt': 'UTC and GMT Explained',
  'daylight-saving-time': 'Daylight Saving Time Explained',
  'date-time-formats': 'Date and Time Formats',
  'calendar-systems': 'Calendar Systems Explained',
}
for (const [slug, title] of Object.entries(guideTitles)) {
  routes[`/guides/${slug}`] = [
    `${title} — DatePilot Guide`,
    `${title}. Practical explanation with examples, assumptions, and related DatePilot tools.`
  ]
}

const template = fs.readFileSync(templatePath, 'utf8')
for (const [route, [title, description]] of Object.entries(routes)) {
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
  const target = route === '/' ? dist : path.join(dist, route.slice(1))
  fs.mkdirSync(target, { recursive: true })
  fs.writeFileSync(path.join(target, 'index.html'), html)
}
console.log(`Generated ${Object.keys(routes).length} route HTML shells in dist/`)
