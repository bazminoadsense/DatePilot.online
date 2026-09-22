export type ToolContent = {
  answer: string
  howTo: string[]
  formula: string
  example: string
  considerations: string
  mistakes: string
  guideSlugs: string[]
  faqs: [string, string][]
}

export type GuideContent = {
  answer: string
  sections: [string, string][]
  toolSlugs: string[]
}

export const toolContent: Record<string, ToolContent> = {
  'date-calculator': {
    answer: 'A date calculator adds or subtracts a specific number of calendar days from any starting date. It is one of the most common date tools because it handles month lengths, leap years, and year boundaries automatically, so you do not need to count days by hand.',
    howTo: [
      'Select or type the starting date in the first field.',
      'Enter the number of days you want to add or use a negative number to subtract.',
      'Click "Calculate result" to see the resulting calendar date.',
      'Read the explanation below the result to understand the calendar convention used.'
    ],
    formula: 'The calculator uses JavaScript Date arithmetic: result = starting date + (number of days × 86,400,000 milliseconds). The setDate() method handles month and year overflow automatically. For example, 31 January + 1 day becomes 1 February, not 32 January, because the calendar knows January has 31 days.',
    example: 'Starting date: 15 March 2026. Days to add: 45. Calculation: March has 31 days, so 15 March + 16 days = 31 March. Remaining 29 days go into April: 29 April 2026. The calculator gives the same result instantly.',
    considerations: 'Calendar months have different lengths (28-31 days), so adding "one month" is not the same as adding 30 or 31 days. A calendar day is not always exactly 24 elapsed hours during daylight-saving transitions. The result is a calendar date, not a fixed-duration time calculation. For time-sensitive deadlines, also consider timezone and DST rules.',
    mistakes: 'Assuming every month has 30 days. Counting the starting date as day one when the task asks for a date after elapsed days. Forgetting that February has 28 or 29 days. Not checking whether the result crosses a year boundary.',
    guideSlugs: ['date-calculations', 'add-subtract-days'],
    faqs: [
      ['What happens if I add days that cross February?', 'The calculator handles this automatically. For example, 31 January 2026 plus 1 day is 1 February 2026. If the year is a leap year, February has 29 days; otherwise it has 28.'],
      ['Can I subtract days instead of adding?', 'Yes. Enter a negative number to subtract days. For example, entering -30 moves the date 30 days backward.'],
      ['Is the result the same as adding hours?', 'No. A calendar day is not always 24 hours. During daylight-saving transitions, a day can be 23 or 25 hours. This calculator works with calendar dates, not elapsed hours.'],
    ]
  },
  'age-calculator': {
    answer: 'An age calculator finds the exact calendar age between two dates, reported in years, months, and days. This is different from dividing total days by 365, because calendar age counts completed anniversaries and respects different month lengths.',
    howTo: [
      'Enter the birth date (or any starting date) in the first field.',
      'Enter the target date on which the age should be measured.',
      'Click "Calculate result" to see the age in years, months, and days.',
      'The result shows completed years, then remaining months, then remaining days.'
    ],
    formula: 'Step 1: Compare the target year with the birth year. Step 2: If the target month/day is before the birth month/day, subtract one year and adjust months. Step 3: If the target day is before the birth day, subtract one month and add the number of days in the previous month. This method counts completed anniversaries, not approximate years.',
    example: 'Born: 15 March 1990. Target: 10 January 2026. Step 1: 2026 - 1990 = 36 years. Step 2: January is before March, so subtract 1 year → 35 years. Step 3: From 15 March 2025 to 10 January 2026 = 9 months and 26 days. Final result: 35 years, 9 months, 26 days.',
    considerations: 'A person born on 29 February in a leap year has their birthday on 28 February or 1 March in non-leap years, depending on convention. Dates near month ends require careful handling: 31 January to 28 February (non-leap) is exactly 1 month, but 31 January to 1 March (leap) is 1 month and 1 day. The calculator uses your browser\'s Date object, which follows the Gregorian calendar.',
    mistakes: 'Using today\'s date without verifying it is the intended target. Assuming age = (target year - birth year) without checking month and day. Forgetting that someone born on 29 February only has a "real" birthday every 4 years. Not verifying the result with a known reference date.',
    guideSlugs: ['how-to-calculate-age', 'days-between-dates'],
    faqs: [
      ['Why is my age different from what I expected?', 'Calendar age counts completed anniversaries. If your birthday has not yet occurred in the target year, you are one year younger than the simple year-difference suggests.'],
      ['How is this different from just counting days?', 'Total days divided by 365 gives an approximation. Calendar age respects actual month lengths and leap years. For example, 10 years can be 3,652 or 3,653 days depending on how many leap years are included.'],
      ['Does it handle February 29 birthdays?', 'Yes. The calculator uses standard calendar rules. If you were born on 29 February and the target year is not a leap year, it uses 28 February or 1 March as the birthday reference.'],
    ]
  },
  'days-between-dates': {
    answer: 'A days-between-dates calculator measures the exact number of calendar days that separate two dates. It reports an exclusive elapsed gap, meaning the named endpoints are not counted as extra days.',
    howTo: [
      'Enter the earlier date as the start date.',
      'Enter the later date as the end date.',
      'Click "Calculate result" to see the number of elapsed days.',
      'The result is the exclusive gap: it does not include either named date in the count.'
    ],
    formula: 'Elapsed days = (UTC midnight of end date - UTC midnight of start date) ÷ 86,400,000. The calculation uses UTC to avoid timezone issues. Math.abs() ensures the result is positive regardless of input order.',
    example: 'From 1 January 2026 to 31 January 2026: 31 - 1 = 30 elapsed days. From 1 January 2026 to 1 February 2026: 31 elapsed days (January has 31 days). From 28 February 2026 to 1 March 2026: 1 elapsed day.',
    considerations: 'An inclusive count (including both start and end dates) is always 1 greater than the exclusive gap when the dates differ. For example, a hotel stay from 1 January to 3 January is 2 nights (exclusive) but 3 calendar days (inclusive). Always state which convention you are using when communicating results. For bookings, leave requests, and legal deadlines, the convention matters.',
    mistakes: 'Confusing inclusive and exclusive counting. Reversing the dates (the calculator handles this with Math.abs). Forgetting that February has 28 or 29 days. Assuming every month has 30 days when doing manual verification.',
    guideSlugs: ['days-between-dates', 'date-calculations'],
    faqs: [
      ['Does the result include both dates?', 'No. The result is an exclusive elapsed gap. If you need to include both dates (inclusive count), add 1 to the result.'],
      ['What if I enter the later date first?', 'The calculator uses the absolute value, so the result is always positive regardless of input order.'],
      ['How does this handle leap years?', 'The calculation uses your browser\'s Date object, which follows the Gregorian calendar. February 29 is correctly accounted for in leap years.'],
    ]
  },
  'add-days': {
    answer: 'An add-days calculator finds a future date by moving forward a specified number of calendar days from any starting date. It handles month lengths, leap years, and year boundaries automatically.',
    howTo: [
      'Select or type the starting date.',
      'Enter the number of days to add (a whole number).',
      'Click "Calculate result" to see the future date.',
      'Verify the result if the calculation crosses February or a year boundary.'
    ],
    formula: 'Result date = starting date + number of calendar days. JavaScript\'s setDate() method handles month overflow: if the day exceeds the month\'s length, it rolls into the next month.',
    example: '15 January 2026 + 30 days: January has 31 days, so 15 + 30 = 45. 45 - 31 (January) = 14. Result: 14 February 2026. Another example: 31 January 2026 + 1 day = 1 February 2026.',
    considerations: 'A calendar month is not the same as 30 or 31 days. February has 28 or 29 days depending on the year. When the result crosses a year boundary (e.g., 20 December + 20 days = 9 January), the year changes. A calendar day is not always 24 elapsed hours during DST transitions.',
    mistakes: 'Assuming every month has 30 days. Counting the starting date as day one. Forgetting that February has fewer than 30 days. Not checking whether the result falls in the expected month.',
    guideSlugs: ['add-subtract-days', 'date-calculations'],
    faqs: [
      ['What if the starting date is 31 January and I add 1 day?', 'The result is 1 February, because January has only 31 days and the calendar rolls into the next month.'],
      ['Can I add a large number of days?', 'Yes. The calculator handles any positive integer. Very large numbers (e.g., 36500 for ~100 years) will also work correctly.'],
      ['Is this the same as adding weeks?', 'No. Adding 7 days is the same as adding 1 week, but adding 1 month is not the same as adding 30 days. This calculator works with days, not months.'],
    ]
  },
  'subtract-days': {
    answer: 'A subtract-days calculator finds a past date by moving backward a specified number of calendar days from any starting date. It handles month lengths, leap years, and year boundaries automatically.',
    howTo: [
      'Select or type the reference date (the date you are counting backward from).',
      'Enter the number of days to subtract.',
      'Click "Calculate result" to see the earlier date.',
      'Verify the result if the calculation crosses February or a year boundary.'
    ],
    formula: 'Result date = reference date - number of calendar days. JavaScript\'s setDate() handles month underflow: if subtracting days goes below day 1, it rolls into the previous month.',
    example: '31 January 2026 - 1 day = 30 January 2026. 31 January 2026 - 31 days = 31 December 2025 (crossing the year boundary). 1 March 2026 - 1 day = 28 February 2026 (non-leap) or 29 February 2026 (leap).',
    considerations: 'Calendar subtraction is not a timezone conversion. The result is a calendar date, not a fixed-duration time calculation. Different months have different lengths, so subtracting "one month" is ambiguous — this tool subtracts days, not months. For financial or legal deadlines, check the specific jurisdiction\'s counting convention.',
    mistakes: 'Switching the start and end date. Assuming every month has the same number of days. Forgetting that subtracting days that cross a year boundary changes the year. Not verifying the result for February dates.',
    guideSlugs: ['add-subtract-days', 'date-calculations'],
    faqs: [
      ['What if I subtract more days than the starting date has?', 'The calculator handles this correctly. For example, 5 January 2026 - 10 days = 26 December 2025, crossing the year boundary.'],
      ['Can I use this to find a deadline?', 'Yes. If a deadline is 30 days before a court date or contract end, enter the deadline date and subtract 30 to find the latest filing date.'],
      ['Is subtracting days the same as adding negative days?', 'Yes. Entering -30 is the same as subtracting 30. The calculator handles both positive and negative values.'],
    ]
  },
  'working-days': {
    answer: 'A working-days calculator counts the number of weekdays (Monday through Friday) between two dates. It does not automatically include public holidays, because holiday calendars vary by country and region.',
    howTo: [
      'Enter the start date.',
      'Enter the end date.',
      'Click "Calculate result" to see the number of working days.',
      'Check whether your use case requires holiday exclusions and account for them separately.'
    ],
    formula: 'The calculator iterates through each day in the range and counts those where getDay() returns 1 (Monday) through 5 (Friday). Both the start and end dates are included if they are weekdays. The count is: working days = total days in range - Saturdays - Sundays.',
    example: 'Monday 5 January 2026 to Friday 9 January 2026: 5 working days (Mon, Tue, Wed, Thu, Fri). Monday 5 January to Monday 12 January: 6 working days (Mon-Fri = 5, plus Monday = 6). Saturday 3 January to Monday 5 January: 1 working day (Monday only).',
    considerations: 'A "business day" is not always the same as a "working day." In some countries, the working week is Sunday through Thursday. Some industries work Saturdays. Public holidays fall on weekdays but are not working days in most business contexts. DatePilot does not include holiday data by default. For accurate business-day calculations, you need to subtract holidays separately based on your region.',
    mistakes: 'Assuming "working days" and "business days" are always the same. Not checking whether the start or end date falls on a weekend. Forgetting that some countries have different weekend days. Not accounting for public holidays when the calculation is for business purposes.',
    guideSlugs: ['working-days', 'days-between-dates'],
    faqs: [
      ['Does this include Saturday and Sunday?', 'No. Saturday and Sunday are not counted as working days under the default Monday-to-Friday rule.'],
      ['Does this include public holidays?', 'No. Public holidays are not automatically excluded. You need to subtract them separately based on your region\'s holiday calendar.'],
      ['What if the start date is a Saturday?', 'Saturday is not a working day, so it is not counted. If the start is Saturday and the end is the following Monday, the result is 1 working day (Monday).'],
    ]
  },
  'day-of-week': {
    answer: 'A day-of-week calculator tells you which weekday (Monday through Sunday) a specific calendar date falls on. It uses the proleptic Gregorian calendar, which is the standard civil calendar used worldwide.',
    howTo: [
      'Enter any date using the date picker.',
      'Click "Calculate result" to see the weekday name.',
      'Use the result for scheduling, planning, or verifying historical dates.'
    ],
    formula: 'JavaScript\'s getDay() method returns a number from 0 (Sunday) through 6 (Saturday). The calculator converts this number to the corresponding weekday name. The proleptic Gregorian calendar extends the current calendar backward, which may not match historical records for dates before the Gregorian reform.',
    example: '1 January 2026 is a Thursday. 4 July 1776 (US Independence Day) was a Thursday. 1 January 2000 was a Saturday. You can verify these by checking any calendar for those years.',
    considerations: 'The same month and day can fall on different weekdays in different years. For example, 1 January 2025 was a Wednesday, but 1 January 2026 is a Thursday. For historical dates before the Gregorian calendar was adopted in a particular region, the proleptic Gregorian result may differ from the original calendar\'s weekday. The year always matters for weekday lookup.',
    mistakes: 'Confusing a week number with a weekday. Omitting the year when looking up a date. Assuming the same date always falls on the same weekday. Not accounting for the calendar system when working with very old dates.',
    guideSlugs: ['day-of-week', 'calendar-systems'],
    faqs: [
      ['Does the year matter for finding a weekday?', 'Yes. The same month and day can fall on different weekdays in different years. For example, 15 March 2026 is a Sunday, but 15 March 2025 was a Saturday.'],
      ['What calendar system does this use?', 'The proleptic Gregorian calendar, which is the standard civil calendar used worldwide. It extends the current calendar backward to cover historical dates.'],
      ['Can I use this to plan recurring events?', 'Yes. If you know a meeting is "every third Wednesday," you can use the weekday calculator to find the exact dates for any month.'],
    ]
  },
  'week-number': {
    answer: 'A week-number calculator returns the ISO 8601 week number and week-year for any date. ISO week numbering is the most widely used system for business scheduling, manufacturing, and software development.',
    howTo: [
      'Enter any date using the date picker.',
      'Click "Calculate result" to see the ISO week number and week-year.',
      'Note that the week-year can differ from the calendar year around New Year.',
      'Use the same ISO convention when comparing with other schedules or systems.'
    ],
    formula: 'ISO 8601 defines week 1 as the week containing the first Thursday of the year. Weeks begin on Monday. The week-year is the year that contains the Thursday of the ISO week. Algorithm: find the Thursday of the current week, then find the first Thursday of the year, and count the weeks between them.',
    example: '31 December 2025: The Thursday of this week is 1 January 2026, which is in week 1 of 2026. So 31 December 2025 is in ISO week 1 of week-year 2026. 1 January 2026 (Thursday): This is in ISO week 1 of 2026. 4 January 2026 (Sunday): The Thursday of this week is 1 January, so this is still in week 1 of 2026.',
    considerations: 'The ISO week-year can differ from the calendar year by one in either direction around New Year. Every ISO year has either 52 or 53 weeks. A year has 53 weeks when January 1 falls on a Thursday, or when it is a leap year starting on a Wednesday. Different software may use different week-numbering systems (e.g., US weeks start on Sunday).',
    mistakes: 'Assuming January 1 always begins week 1. Treating Sunday as the first ISO weekday (ISO weeks start on Monday). Confusing the week-year with the calendar year. Using ISO week numbers with systems that use a different convention.',
    guideSlugs: ['week-numbers', 'iso-week-date'],
    faqs: [
      ['Why does the week-year differ from the calendar year?', 'Because ISO weeks are defined by the Thursday rule, not by January 1. A date in late December can belong to week 1 of the next year if its Thursday falls in January.'],
      ['How many weeks are in a year?', 'Either 52 or 53. A year has 53 weeks when January 1 is a Thursday, or when it is a leap year starting on a Wednesday.'],
      ['Do all countries use ISO week numbering?', 'ISO 8601 is the international standard and is widely used in business and technology. Some countries or systems use different conventions (e.g., weeks starting on Sunday).'],
    ]
  },
  'leap-year': {
    answer: 'A leap-year calculator tells you whether a given year has 366 days (leap year) or 365 days (common year). The Gregorian calendar rule ensures the calendar stays aligned with the solar year by adding an extra day to February every few years.',
    howTo: [
      'Enter a calendar year (e.g., 2026).',
      'Click "Calculate result" to see whether it is a leap year.',
      'The result also tells you how many days the year has.',
      'Use this to check February dates or year-based calculations.'
    ],
    formula: 'The Gregorian leap-year rule: A year is a leap year if it is divisible by 4, EXCEPT for end-of-century years, which must be divisible by 400. In code: (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0). This means: 2024 = leap (divisible by 4, not century). 1900 = not leap (divisible by 100, not by 400). 2000 = leap (divisible by 400).',
    example: '2024: 2024 ÷ 4 = 506, no remainder → leap year (366 days). 1900: 1900 ÷ 4 = 475, but 1900 ÷ 100 = 19 and 1900 ÷ 400 = 4.75 → not a leap year (365 days). 2000: 2000 ÷ 400 = 5 → leap year (366 days). 2100: 2100 ÷ 4 = 525, but 2100 ÷ 400 = 5.25 → not a leap year (365 days).',
    considerations: 'The Gregorian calendar was adopted at different times in different countries. Before adoption, the Julian calendar was used, which had a simpler leap-year rule (every 4 years). Russia did not switch until 1918. This calculator uses the current Gregorian rule for all years. Leap days affect age calculations, date differences, and any calculation that crosses February.',
    mistakes: 'Assuming every year divisible by 4 is a leap year. Forgetting the century exception. Not checking whether 1900 or 2100 are leap years when doing historical calculations. Assuming February always has 28 days.',
    guideSlugs: ['leap-years', 'calendar-systems'],
    faqs: [
      ['Is 2026 a leap year?', 'No. 2026 ÷ 4 = 506.5, so it is not divisible by 4. It has 365 days.'],
      ['Why is 1900 not a leap year?', '1900 is divisible by 4, but it is also divisible by 100 and not by 400. The century exception applies.'],
      ['How often do leap years occur?', 'Every 4 years, except for century years not divisible by 400. On average, there are 97 leap years every 400 years.'],
    ]
  },
  'countdown': {
    answer: 'A countdown calculator measures the remaining time between now and a future date. It shows the result in days and hours, updating based on your device\'s current clock.',
    howTo: [
      'Enter the target date and time.',
      'Click "Calculate result" to see the remaining time.',
      'Recalculate when you need an updated countdown.',
      'The result is based on your device\'s clock, not a server.'
    ],
    formula: 'Remaining duration = target timestamp - current timestamp. The result is converted to days and hours: days = Math.floor(remaining / 86400000), hours = Math.floor((remaining % 86400000) / 3600000).',
    example: 'If the target is 1 January 2027 at 00:00 and the current time is 15 September 2026 at 14:00, the countdown shows approximately 108 days and 10 hours. The exact result depends on the moment you click "Calculate result."',
    considerations: 'The countdown is based on your device\'s clock, which may not be perfectly synchronized with official time sources. Daylight-saving transitions can affect the displayed time. The result changes every moment because it is relative to the current time. For critical deadlines, also verify the timezone of the target.',
    mistakes: 'Forgetting that the countdown changes over time. Not accounting for timezone differences between your device and the target event. Treating the countdown as a fixed value. Not recalculating when you need an updated result.',
    guideSlugs: ['time-zones', 'daylight-saving-time'],
    faqs: [
      ['Does the countdown update automatically?', 'No. You need to click "Calculate result" again to get an updated countdown.'],
      ['How does daylight saving affect the countdown?', 'DST changes can shift the local time by 1 hour. The countdown uses timestamps, so it accounts for DST automatically, but the displayed time may differ from what you expect.'],
      ['Can I count down to a past date?', 'Yes, but the result will be negative or show "That date has passed."'],
    ]
  },
  'time-difference': {
    answer: 'A time difference calculator compares two date-and-time values and reports the elapsed duration between them in hours and minutes. It is useful when the question is "how long between these two moments" rather than "what time is it there."',
    howTo: [
      'Enter the first date and time.',
      'Enter the second date and time.',
      'Click "Calculate result" to see the elapsed duration.',
      'The result shows hours and minutes, and indicates which input is later.'
    ],
    formula: 'Elapsed duration = absolute value of (second timestamp - first timestamp). Converted to hours: Math.floor(totalMinutes / 60). Remaining minutes: totalMinutes % 60. The calculation uses millisecond-precision timestamps.',
    example: 'First: 9:00 AM Monday. Second: 2:30 PM Tuesday. Difference: 29 hours and 30 minutes. First: 11:00 PM. Second: 1:00 AM next day. Difference: 2 hours. The calculator correctly handles cross-midnight comparisons.',
    considerations: 'Clock readings can be affected by daylight-saving transitions. If a DST change occurs between the two dates, the elapsed hours may not match simple clock subtraction. The calculator reports the absolute elapsed time, regardless of which input is earlier. For scheduling across time zones, use the Time Zone Converter instead.',
    mistakes: 'Subtracting clock labels without considering the date. Forgetting that midnight resets the clock. Not accounting for DST when comparing dates that span a clock change. Using this tool for timezone conversion instead of the Time Zone Converter.',
    guideSlugs: ['time-zones', 'daylight-saving-time'],
    faqs: [
      ['Does this account for daylight saving?', 'The calculation uses timestamps, so it correctly measures elapsed time across DST transitions. However, the "clock time" difference may differ from the elapsed time during transitions.'],
      ['What if the two times are on different days?', 'The calculator handles this correctly. It uses full timestamps, so cross-day comparisons work as expected.'],
      ['Can I use this to compare times in different time zones?', 'This calculator compares the raw timestamps. For timezone-aware comparisons, use the Time Zone Converter first to convert both times to the same zone.'],
    ]
  },
  'time-zone-converter': {
    answer: 'A time zone converter translates a date and time from one named IANA time zone to another. It accounts for daylight-saving rules, historical timezone changes, and date shifts that occur when crossing timezone boundaries.',
    howTo: [
      'Enter the local date and time in the first field.',
      'Select the source time zone (where the event originates).',
      'Select the destination time zone (where you need the converted time).',
      'Click "Calculate result" to see the converted date and time.',
      'Check the date as well as the time — it may change for zones far apart.'
    ],
    formula: 'The conversion uses the browser\'s Intl.DateTimeFormat API with IANA timezone identifiers. It looks up the timezone rules for the specific date, including historical changes and daylight-saving transitions. The result is the same instant represented in the destination zone\'s local time.',
    example: '09:00 Eastern Time (America/New_York) on a Tuesday in March converts to 14:00 in London (Europe/London) during GMT, or 13:00 during BST. A late evening like 23:00 in New York can become 04:00 the next day in Dubai (Asia/Dubai).',
    considerations: 'Named IANA zones include full historical and daylight-saving rules, which is more accurate than using raw UTC offsets. The calendar date can change when converting between zones that are far apart. DST rules vary by region and can change over time — use the specific date of the event, not today\'s offset. The available timezone list covers major zones; for other zones, the conversion still uses your browser\'s full IANA database.',
    mistakes: 'Using a city\'s current UTC offset for a date in another season. Forgetting that the calendar date can change. Not checking whether DST is active on the specific date. Using "GMT" as a timezone identifier in software (use "Etc/UTC" or a named zone instead).',
    guideSlugs: ['time-zones', 'utc-vs-gmt', 'daylight-saving-time'],
    faqs: [
      ['Why can the date change after conversion?', 'When converting between zones that are far apart (e.g., New York to Tokyo), a late evening in one zone can become the next morning in another. The calculator correctly shows the new date.'],
      ['Does this handle historical timezone changes?', 'Yes. The IANA database includes historical timezone rules, so conversions for past dates use the correct historical offset.'],
      ['What if my timezone is not in the list?', 'The calculator uses your browser\'s full IANA timezone database for the source zone. The dropdown shows common zones for quick selection, but the conversion is accurate for any IANA zone.'],
    ]
  },
}

export const guideContent: Record<string, GuideContent> = {
  'date-calculations': {
    answer: 'Date calculations become reliable only when you define the calendar system, endpoint convention, units, and assumptions before doing the arithmetic. Without those definitions, two people can get different answers from the same question.',
    sections: [
      ['Elapsed days versus calendar arithmetic', 'An elapsed-day calculation measures the physical distance between calendar midnights. Adding a calendar month is different: it must account for the varying lengths of months. For example, 31 January + 30 elapsed days = 2 March, but 31 January + "one calendar month" = 28 or 29 February (depending on leap year) or 28 February (non-leap). The distinction matters when someone asks "what date is 30 days from now" versus "what date is one month from now."'],
      ['Inclusive and exclusive counting', 'The most common source of confusion in date calculations is whether the start date, end date, or both are included in the count. An exclusive count measures the gap between dates (like the number of nights in a hotel stay). An inclusive count includes both named dates (like the number of calendar days you are away). For example, Monday to Friday is 4 exclusive days but 5 inclusive days. Always state which convention you are using.'],
      ['Month and year boundaries', 'Crossing February, December, or a year boundary is where manual counting most often fails. February has 28 or 29 days. December has 31. Year boundaries change the year in the result. When doing manual verification, break the interval at each month boundary and sum the days in each segment. For example, from 15 January to 15 March: January has 16 remaining days (15-31), February has 28 days, March has 15 days. Total: 59 days (non-leap) or 60 days (leap).'],
      ['Leap days and the February effect', 'February 29 exists only in leap years. Any date calculation that crosses February 29 must account for this. A date difference from 1 February to 1 March is 28 days in a non-leap year but 29 days in a leap year. This is why automated calculators are more reliable than mental math for date arithmetic across February.'],
      ['Time zones and DST', 'A calendar day is not always exactly 24 elapsed hours. During daylight-saving transitions, a day can be 23 or 25 hours. For most date-only calculations, this does not matter because the calculation works with calendar midnights. But for time-sensitive deadlines or duration calculations, always state the timezone and check whether DST is active.'],
      ['Practical workflow', 'Define the question clearly: what are the start and end dates, what unit do you need (days, months, years), and what counting convention applies? Calculate, then verify the result by testing it around a known boundary such as February, December 31, or a weekday. Use a calculator for accuracy, but understand the convention it uses.'],
    ],
    toolSlugs: ['date-calculator', 'days-between-dates', 'add-days', 'subtract-days']
  },
  'how-to-calculate-age': {
    answer: 'Calendar age is calculated by counting completed anniversaries, then the remaining months and days. It is not simply dividing total days by 365, because months have different lengths and leap years add extra days.',
    sections: [
      ['Step-by-step method', 'Step 1: Compare the target year with the birth year. Step 2: If the target month/day comes before the birth month/day, subtract one year and adjust months. Step 3: If the target day comes before the birth day, subtract one month and add the days in the previous month. This three-step method counts completed anniversaries first, giving you the precise calendar age.'],
      ['Worked example: age on a specific date', 'Born: 15 March 1990. Target: 10 January 2026. Step 1: 2026 - 1990 = 36. Step 2: January (1) is before March (3), so subtract 1 year: 35 years. Step 3: From 15 March 2025 to 10 January 2026: March has 16 remaining days (15-31), April through December = 9 months, January = 10 days. Result: 35 years, 9 months, 26 days.'],
      ['Leap-day birthdays', 'If you were born on 29 February, your birthday falls on 28 February in non-leap years under the most common convention. Some jurisdictions use 1 March instead. The calculator uses 28 February as the reference in non-leap years. This means your "legal birthday" may differ from your biological birthday in non-leap years.'],
      ['Month-end edge cases', 'If you were born on 31 January, what happens in February? February has only 28 or 29 days. The standard convention is to use the last day of the month (28 or 29 February). If born on 28 February in a leap year, the birthday is 28 February in non-leap years and 29 February in leap years.'],
      ['Age versus total days', 'A person who is "35 years old" has lived through 35 calendar years, which includes 8 or 9 leap years (roughly 12,775 to 12,776 days). Dividing total days by 365 gives approximately 34.99, which rounds to 35, but this approximation hides the calendar complexity. Calendar age respects the actual structure of the calendar.'],
      ['Common mistakes', 'Using today\'s date without checking it is the intended target. Assuming age = year difference without checking month and day. Not verifying the result with a known birthday. Forgetting that someone born on 29 February only has a "real" birthday every 4 years.'],
    ],
    toolSlugs: ['age-calculator', 'days-between-dates']
  },
  'days-between-dates': {
    answer: 'To calculate the days between two dates, first decide whether you need an elapsed gap (exclusive) or a schedule count (inclusive). The convention you choose changes the answer by one or more days.',
    sections: [
      ['Exclusive versus inclusive counting', 'An exclusive elapsed gap measures the distance between two dates without counting either named date. An inclusive count includes both the start and end dates. For example, a hotel stay from Monday to Wednesday: exclusive = 2 nights (Tuesday, Wednesday), inclusive = 3 days (Monday, Tuesday, Wednesday). The difference matters for bookings, leave requests, and project timelines.'],
      ['Manual calculation method', 'To calculate manually: (1) Count the remaining days in the start month. (2) Add full months between the start and end. (3) Add the days in the end month up to the target date. (4) Sum all parts. For example, from 15 January to 15 March: January has 16 remaining days (15-31), February has 28 days, March has 15 days. Total: 59 days (non-leap).'],
      ['Handling February and leap years', 'February has 28 days in common years and 29 days in leap years. When your interval crosses February, the day count depends on whether the year is a leap year. A date difference from 1 February to 1 March is 28 days (non-leap) or 29 days (leap). Always account for this when verifying manually.'],
      ['When the convention matters', 'For leave requests, use inclusive counting (both the first and last day of leave count). For project timelines, use exclusive counting (the number of days between milestones). For legal deadlines, check the specific jurisdiction\'s convention. For hotel bookings, the standard is to count nights (exclusive).'],
      ['Common mistakes', 'The most common errors are: reversing the dates (the calculator handles this), counting the first day twice (double-counting), and ignoring leap years when verifying manually. Always test your result against a known reference point.'],
    ],
    toolSlugs: ['days-between-dates', 'date-calculator', 'working-days']
  },
  'add-subtract-days': {
    answer: 'Adding or subtracting days means moving through calendar dates while respecting month lengths and year boundaries. The key distinction is that calendar arithmetic follows the rules of the Gregorian calendar, not simple arithmetic.',
    sections: [
      ['Future dates with addition', 'When you add days, the result moves forward through the calendar. The starting date is not counted as day one: 1 January plus 1 day is 2 January, not 1 January. The calculator handles month overflow automatically: 31 January plus 1 day is 1 February, not 32 January.'],
      ['Past dates with subtraction', 'When you subtract days, the result moves backward. 1 February minus 1 day is 31 January. 1 January minus 1 day is 31 December of the previous year. The calculator handles month and year underflow automatically.'],
      ['Month-boundary behavior', 'Different months have different numbers of days. Adding 31 days to 1 January gives 1 February, not 31 January + 1 = 32 January. The key insight is that "31 days from 1 January" is not the same as "one month from 1 January." Calendar addition works with days, not months.'],
      ['Year boundaries', 'When subtracting days crosses a year boundary, the year changes. For example, 1 January 2026 minus 1 day is 31 December 2025. The calculator handles this correctly because JavaScript\'s Date object manages year overflow and underflow.'],
      ['Calendar days versus hours', 'A calendar day is not always exactly 24 elapsed hours. During daylight-saving transitions, a day can be 23 or 25 hours. This calculator works with calendar dates (midnight to midnight), not elapsed hours. For hour-precise calculations, use the Time Difference Calculator.'],
    ],
    toolSlugs: ['add-days', 'subtract-days', 'date-calculator']
  },
  'working-days': {
    answer: 'Working-day calculations require three explicit decisions: the weekend rule, the endpoint convention, and the holiday policy. Without these definitions, "business days" and "working days" can mean different things to different people.',
    sections: [
      ['The weekday rule', 'DatePilot\'s default rule counts Monday through Friday as working days. This is the standard in most Western countries, but it is not universal. In many Middle Eastern countries, the working week is Sunday through Thursday. In some industries, Saturday is a half-day. Always state your weekend rule.'],
      ['Endpoint inclusion', 'Whether the start date and end date are counted depends on the convention. DatePilot counts both the start and end dates if they are weekdays. For example, Monday to Friday = 5 working days (both Monday and Friday are counted). This is the most common convention for project timelines and leave calculations.'],
      ['Holidays are separate', 'Public holidays fall on weekdays but are not working days in most business contexts. DatePilot does not include holiday data by default because holiday calendars vary by country, state, and industry. For accurate business-day calculations, you need to subtract holidays separately. For example, if Christmas Day falls on a Wednesday, a Monday-to-Friday week has only 4 working days that week.'],
      ['Regional variations', 'The standard working week varies by region: Monday-Friday (most of Europe, Americas), Sunday-Thursday (Middle East), Monday-Saturday (some Asian countries). Some countries have half-day Saturdays. Religious and cultural holidays also affect the working calendar.'],
      ['Practical workflow', 'Define your weekend rule, check for holidays in your region, then use the calculator. For example: "How many working days from 1 January to 31 January 2026, excluding New Year\'s Day (1 January) and assuming Monday-Friday weekends?" First calculate total weekdays, then subtract the holidays that fall on weekdays.'],
      ['Common mistakes', 'Calling weekdays "business days" without checking holidays. Not verifying whether the start and end dates are weekdays. Forgetting that different countries have different weekend days. Not accounting for regional holidays when the calculation is for business purposes.'],
    ],
    toolSlugs: ['working-days', 'days-between-dates', 'add-days']
  },
  'leap-years': {
    answer: 'The Gregorian leap-year rule adds February 29 to keep the calendar aligned with the solar year. Without leap days, the calendar would drift about one day every four years, eventually placing summer in December.',
    sections: [
      ['The complete rule', 'A year is a leap year if: (1) it is divisible by 4, AND (2) it is NOT a century year (divisible by 100) UNLESS it is also divisible by 400. This gives three cases: 2024 = leap (divisible by 4, not a century year). 1900 = not leap (divisible by 100, not by 400). 2000 = leap (divisible by 400).'],
      ['Why the century exception exists', 'The tropical year (one complete orbit of the Earth around the Sun) is approximately 365.2422 days. A simple leap year every 4 years gives 365.25 days. The century exception (no leap year in 1900, 2100, etc.) brings the average to 365.2425 days, which is much closer to the tropical year.'],
      ['Examples across centuries', '2024: leap year. 2025: not. 2026: not. 2027: not. 2028: leap. 2100: not leap (century exception). 2200: not leap. 2300: not leap. 2400: leap (divisible by 400). These examples demonstrate both the 4-year rule and the century exception.'],
      ['Impact on date calculations', 'Leap days affect age calculations (someone born on 29 February has a birthday every 4 years), date differences (a span crossing 29 February is one day longer), and annual planning (February has 29 days instead of 28). Any calculation crossing February should account for whether the year is a leap year.'],
      ['Historical context', 'The Julian calendar (used before the Gregorian reform) had a simpler rule: every 4 years is a leap year. This created an error of about 11 minutes per year, which accumulated to 10 days by the 1500s. The Gregorian reform corrected this with the century exception. Different countries adopted the Gregorian calendar at different times.'],
    ],
    toolSlugs: ['leap-year', 'days-between-dates', 'calendar-systems']
  },
  'week-numbers': {
    answer: 'Week numbers organize dates into seven-day periods, but the result depends entirely on which convention you use. DatePilot uses ISO 8601, the international standard for week numbering.',
    sections: [
      ['The ISO 8601 convention', 'ISO weeks start on Monday. Week 1 of any year is the week containing the first Thursday. This means: (1) Every ISO year has either 52 or 53 weeks. (2) The week-year can differ from the calendar year. (3) Dates in late December can belong to week 1 of the next year.'],
      ['The first-Thursday rule', 'The first Thursday of the year determines week 1. For example, if January 1 is a Thursday, it is in week 1. If January 1 is a Friday, it is in the last week (52 or 53) of the previous year. This rule ensures every year starts on a Monday (or close to one) and avoids short partial weeks.'],
      ['52-week and 53-week years', 'Most years have 52 weeks. A year has 53 weeks when: (1) January 1 falls on a Thursday, or (2) it is a leap year starting on a Wednesday. This happens approximately every 5-6 years. The extra week affects scheduling, payroll, and financial reporting.'],
      ['December/January boundary', 'The most confusing part of ISO week numbering is the year boundary. Example: 29 December 2025 (Monday) through 4 January 2026 (Sunday) is all in ISO week 1 of 2026. The Thursday of this week is 1 January 2026. So 29 December 2025 is in week 1 of 2026, not week 52 of 2025.'],
      ['When to use ISO weeks', 'ISO weeks are used in business, manufacturing, software development, and financial reporting. They provide a consistent way to reference weeks across years. If your team or industry uses a different convention (e.g., weeks starting on Sunday), make sure everyone uses the same system.'],
    ],
    toolSlugs: ['week-number', 'day-of-week', 'iso-week-date']
  },
  'iso-week-date': {
    answer: 'ISO week dates provide a complete date representation using a week-year, week number, and weekday. The system is designed for consistent week-based scheduling and reporting.',
    sections: [
      ['The three components', 'An ISO week date has three parts: the week-year (the year that contains the Thursday), the week number (1-52 or 53), and the weekday (1=Monday through 7=Sunday). For example, 2026-W01-1 means Monday of week 1 in week-year 2026.'],
      ['Week-year versus calendar year', 'The ISO week-year is the year that contains the Thursday of the current week. This means the week-year can differ from the calendar year. Example: 31 December 2025 is a Wednesday. Its Thursday is 1 January 2026. So the week-year is 2026, not 2025. The date belongs to week 1 of 2026.'],
      ['First Thursday rule in detail', 'Week 1 is the week containing January 4 (or equivalently, the week containing the first Thursday of the year). If January 1 is a Monday, Tuesday, Wednesday, or Thursday, it is in week 1. If January 1 is a Friday, Saturday, or Sunday, it is in the last week of the previous year.'],
      ['Practical uses', 'ISO week dates are used in: business scheduling (weekly reports, payroll periods), manufacturing (production schedules), software development (sprint planning, release cycles), financial reporting (fiscal weeks), and logistics (delivery schedules). The key advantage is consistency across years.'],
      ['Converting to calendar date', 'To find the calendar date from an ISO week date: (1) Find the Thursday of the ISO week. (2) That Thursday is always in the correct week-year. (3) Count backward to Monday (day 1) or forward to Sunday (day 7). This conversion is what the Week Number Calculator automates.'],
    ],
    toolSlugs: ['week-number', 'calendar-systems']
  },
  'day-of-week': {
    answer: 'Finding a weekday is a straightforward calendar lookup, but the year always matters because the same month and day falls on different weekdays in different years.',
    sections: [
      ['Why the year matters', 'The Gregorian calendar repeats in 400-year cycles (146,097 days = exactly 20,871 weeks). Within that cycle, the same calendar repeats. But year-to-year, the weekday shifts: common years shift by 1 day, leap years shift by 2 days. So 1 January 2025 was a Wednesday, 1 January 2026 is a Thursday, and 1 January 2027 will be a Friday.'],
      ['Verification with known dates', 'Check your result against known reference dates: 4 July 1776 was a Thursday. 1 January 2000 was a Saturday. 29 February 2024 was a Thursday. These can be verified with any historical calendar.'],
      ['Historical dates and calendar systems', 'For dates before the Gregorian calendar was adopted (1582 in Catholic countries, 1752 in Britain, 1918 in Russia), the proleptic Gregorian result may differ from the historical weekday. If you need the historical weekday, use the calendar system that was in effect at that time and place.'],
      ['Using weekday results for planning', 'Weekday information helps with: scheduling recurring meetings (e.g., "every third Wednesday"), calculating working days (weekdays only), understanding historical events (e.g., "what day of the week was the battle?"), and planning events on specific days.'],
      ['Related calculations', 'The weekday is the foundation for several other calculations: working days (counting weekdays), week numbers (ISO weeks start on Monday), and date arithmetic (knowing when a weekday falls helps plan around weekends).'],
    ],
    toolSlugs: ['day-of-week', 'working-days', 'calendar-systems']
  },
  'time-zones': {
    answer: 'A time zone is not just a UTC offset — it is a set of rules that govern how a region represents instants of time locally, including historical changes and daylight-saving transitions.',
    sections: [
      ['Named zones versus raw offsets', 'UTC-5 describes an offset at one moment. "America/New_York" describes a complete set of rules including: current offset, historical changes, DST transitions, and future changes. Named zones are always more informative than raw offsets for scheduling and conversion.'],
      ['The IANA timezone database', 'The IANA timezone database (also called the tz database or zoneinfo) is maintained by the internet community and updated regularly. It contains timezone rules for every region, including historical changes. DatePilot uses your browser\'s built-in copy of this database.'],
      ['Date changes across time zones', 'Converting a late local time can move the result into the next (or previous) calendar day. For example, 23:00 in New York (UTC-5) is 04:00 the next day in London (UTC+0 during winter). This matters for deadlines, meetings, and travel schedules.'],
      ['Daylight-saving transitions', 'DST rules change local clock readings twice a year. In spring, clocks move forward (e.g., 2:00 AM becomes 3:00 AM), losing one hour. In autumn, clocks move back (e.g., 2:00 AM becomes 1:00 AM), gaining one hour. These transitions affect scheduling and elapsed-time calculations.'],
      ['Common pitfalls', 'Using a city\'s current offset for a date in another season. Forgetting that the calendar date can change. Not checking whether DST is active on the specific date. Assuming "GMT" and "UTC" are interchangeable in all contexts. Using fixed offsets instead of named zones for scheduling.'],
    ],
    toolSlugs: ['time-zone-converter', 'time-difference', 'utc-vs-gmt']
  },
  'utc-vs-gmt': {
    answer: 'UTC (Coordinated Universal Time) is the modern time standard. GMT (Greenwich Mean Time) is a historical term often used informally to mean the same zero offset. For technical purposes, use UTC.',
    sections: [
      ['Definitions', 'UTC is the international standard for time, maintained by atomic clocks and coordinated internationally. GMT is the mean solar time at the Royal Observatory in Greenwich, London. In practice, UTC and GMT give the same time for civil purposes, but they are technically different concepts.'],
      ['When to use UTC', 'Use UTC for: software timestamps, data exchange between systems, scientific measurements, international scheduling where precision matters, and any context where ambiguity could cause problems. UTC is the correct identifier for the modern standard.'],
      ['When to use GMT', 'GMT is commonly used in: broadcast media, civil time references in the UK and some other countries, and informal conversations. Do not use "GMT" as a timezone identifier in software — use "Etc/UTC" or a named IANA zone instead.'],
      ['Offsets are not time zones', 'A fixed offset (like UTC+5) does not include daylight-saving rules or historical changes. A named timezone (like "Asia/Karachi") includes the full rule set. For scheduling, always use named zones, not fixed offsets.'],
      ['Practical example', 'When arranging an international meeting: (1) Record the named local timezone for each participant. (2) Convert to UTC for the reference instant. (3) Convert back to each participant\'s local time for the specific date. This avoids ambiguity during DST transitions.'],
    ],
    toolSlugs: ['time-zone-converter', 'time-difference', 'daylight-saving-time']
  },
  'daylight-saving-time': {
    answer: 'Daylight-saving rules change local clock readings in many regions, typically twice a year. They can make a local hour repeat or disappear, even though time itself continues to move forward.',
    sections: [
      ['How DST transitions work', 'In spring ("spring forward"), clocks move forward by 1 hour, typically at 2:00 AM. The hour from 2:00-3:00 AM does not exist. In autumn ("fall back"), clocks move back by 1 hour, typically at 2:00 AM. The hour from 1:00-2:00 AM repeats. These transitions affect scheduling and elapsed time.'],
      ['Why DST exists', 'DST was originally introduced to make better use of daylight during summer months. By shifting clock readings, people can have more daylight in the evening during summer. Not all regions observe DST: most of the tropics do not, and some regions have abolished it.'],
      ['Impact on meetings', 'When scheduling recurring meetings across DST transitions, always use named timezones, not fixed offsets. A meeting at "10:00 New York time" will occur at different UTC times before and after the spring transition. The IANA timezone database handles this correctly.'],
      ['The "missing hour" problem', 'During the spring transition, the hour from 2:00-3:00 AM is skipped. A meeting scheduled for 2:30 AM during this transition either does not occur or moves to 3:30 AM, depending on the local rules. This is why scheduling around DST transitions requires care.'],
      ['The "repeated hour" problem', 'During the autumn transition, the hour from 1:00-2:00 AM occurs twice. A meeting at 1:30 AM during this period happens twice. Software that uses named timezones handles this correctly, but manual scheduling can cause confusion.'],
      ['Practical advice', 'Always use named timezones (e.g., "America/New_York") rather than fixed offsets (e.g., "UTC-5") for scheduling. Check the specific date of the event, not today\'s offset. Use the Time Zone Converter to verify conversions across DST boundaries.'],
    ],
    toolSlugs: ['time-zone-converter', 'time-difference', 'countdown']
  },
  'date-time-formats': {
    answer: 'Unambiguous date and time formats prevent miscommunication. The key principle is: always include enough information that the reader cannot misinterpret the date or time.',
    sections: [
      ['Why format ambiguity is dangerous', '03/04/2026 can mean 3 April (European format) or March 4 (US format). 04/03/2026 can mean 4 March (European) or April 3 (US). This ambiguity can cause missed deadlines, incorrect bookings, and scheduling errors. The solution is to use an unambiguous format.'],
      ['ISO 8601: the safest format', 'ISO 8601 (YYYY-MM-DD) is unambiguous and sorts correctly. 2026-04-03 always means 3 April 2026, regardless of the reader\'s locale. Use ISO 8601 for: data exchange, filenames, databases, and any context where ambiguity could cause problems.'],
      ['Written months for human readability', 'For human-facing text, use written months: "3 April 2026" or "April 3, 2026." This removes ambiguity without requiring the reader to know ISO 8601. Avoid pure numeric formats (03/04/2026) in international contexts.'],
      ['Time format considerations', 'Use the 24-hour clock for precision: 14:30 is unambiguous, while 2:30 PM requires the reader to check AM/PM. Include the timezone for remote audiences: "14:30 UTC" or "14:30 Eastern Time." For international scheduling, always include the timezone abbreviation or offset.'],
      ['Choosing a format for your project', 'Pick one format and document it in your team\'s style guide. Use the same format consistently across all documents, calendars, and communications. For data, use ISO 8601. For human text, use written months with the 24-hour clock.'],
    ],
    toolSlugs: ['date-calculator', 'time-zone-converter', 'utc-vs-gmt']
  },
  'calendar-systems': {
    answer: 'A calendar system defines how dates are named and arranged. DatePilot uses the proleptic Gregorian calendar, which is the standard civil calendar used by most of the world today.',
    sections: [
      ['The Gregorian calendar', 'The Gregorian calendar uses variable month lengths (28-31 days) and a leap-year rule that adds February 29. It was introduced in 1582 by Pope Gregory XIII to correct the drift of the Julian calendar. Most countries adopted it within a few centuries.'],
      ['The leap-year rule', 'Years divisible by 4 are leap years, except for century years (divisible by 100), unless the century is also divisible by 400. This gives an average year length of 365.2425 days, which is very close to the tropical year (365.2422 days).'],
      ['Historical calendar adoption', 'Different countries adopted the Gregorian calendar at different times: Catholic countries in 1582, Britain in 1752, Russia in 1918, Greece in 1923. Before adoption, they used the Julian calendar, which had a simpler leap-year rule (every 4 years). This means historical dates may differ between calendar systems.'],
      ['The proleptic Gregorian calendar', 'DatePilot uses the proleptic Gregorian calendar, which extends the current calendar backward to cover historical dates. This means: 4 July 1776 is calculated using Gregorian rules, even though it was originally recorded under the Julian calendar in Britain. The result may differ from the historical record.'],
      ['Other calendar systems', 'Many cultures use other calendar systems: Islamic (Hijri), Hebrew, Chinese, Indian national, Persian, and others. These systems have different rules for month lengths, leap years, and epoch dates. DatePilot focuses on the Gregorian calendar, which is the most widely used civil calendar worldwide.'],
    ],
    toolSlugs: ['leap-year', 'day-of-week', 'date-calculator']
  },
}
