# ROI Calculator - Currency System Quick Reference

## Overview
The ROI Calculator now supports 5 currencies with market-adjusted calculations. All currency references are dynamic - no hardcoded values in the UI.

## Supported Currencies

| Currency | Symbol | Code | Daily PM Cost | Locale | Default |
|----------|--------|------|---------------|---------|---------|
| Polish Złoty | zł | PLN | 3,500 | pl-PL | ✅ Yes |
| British Pound | £ | GBP | 800 | en-GB | No |
| Euro | € | EUR | 900 | de-DE | No |
| US Dollar | $ | USD | 950 | en-US | No |
| Australian Dollar | A$ | AUD | 1,450 | en-AU | No |

## How to Add a New Currency

### 1. Update JavaScript (/js/roi-calculator.js)
Add entry to `CURRENCIES` object (around line 10):

```javascript
const CURRENCIES = {
  // ... existing currencies ...
  CAD: {
    symbol: 'C$',
    code: 'CAD',
    name: 'Canadian Dollar',
    locale: 'en-CA',
    dailyPMCost: 1250,  // Research market rate
    suffix: false
  }
};
```

### 2. Update HTML (/roi-calculator.qmd)
Add option to currency selector (around line 45):

```html
<select id="currency-selector" class="form-control" ...>
  <!-- ... existing options ... -->
  <option value="CAD">🇨🇦 Canadian Dollar (CAD)</option>
</select>
```

### 3. Key Considerations
- **Daily PM Cost:** Research typical project manager daily rates for the market
- **Locale:** Used for number formatting (e.g., 1,000 vs 1.000)
- **Symbol Position:** `suffix: false` = before number (£100), `suffix: true` = after (100 zł)
- **Flag Emoji:** Use country flag for visual recognition

## Daily PM Cost Guidelines

These represent typical daily costs for construction project management in each market:

- **PLN 3,500** ≈ €800 - Polish market rate
- **GBP £800** - UK market rate
- **EUR €900** - EU market average
- **USD $950** - US market rate
- **AUD A$1,450** ≈ $950 USD - Australian market rate

**Source:** Market research and industry standards for construction PM rates

## How Currency Affects Calculations

### Time Savings Calculation
```
Time Savings = Days Saved × Daily PM Cost
```

**Example:**
- Project saves 28 days
- PLN market: 28 × 3,500 = 98,000 PLN
- GBP market: 28 × 800 = £22,400
- Same time saving, different monetary value based on market rates

### Other Calculations
These are currency-independent (percentages):
- ✅ Accuracy improvement (variance reduction)
- ✅ Rework avoidance (% of project value)
- ✅ Change order reduction (% of project value)

## User Interface Behavior

### Currency Selection
1. User selects currency from dropdown (first field)
2. All displays update immediately
3. If calculation already done, it recalculates
4. Currency persists during session

### Display Format
- **Before calculation:** Shows formatted numbers (e.g., "5,000,000")
- **After calculation:** Shows formatted number + currency code (e.g., "98,000 PLN")
- **Slider min/max:** Same for all currencies (500K - 50M)

### Mobile Responsive
- Currency selector stacks vertically
- Flag emojis help visual identification
- All functionality identical to desktop

## Testing Checklist

When adding/modifying currencies:

- [ ] Select currency and verify display updates
- [ ] Run calculation and check result format
- [ ] Verify currency code appears in results
- [ ] Check PDF report shows correct currency
- [ ] Test number formatting for locale (commas/periods)
- [ ] Verify Google Analytics tracking
- [ ] Test on mobile devices
- [ ] Check lead form captures currency

## API Access

The calculator exposes a public API for programmatic control:

```javascript
// Change currency programmatically
window.ROICalculator.setCurrency('GBP');

// Get current currency
window.ROICalculator.getCurrentCurrency(); // Returns 'PLN'

// Get all supported currencies
window.ROICalculator.getSupportedCurrencies(); // Returns ['PLN', 'GBP', ...]

// Recalculate with current currency
window.ROICalculator.recalculate();
```

## Potential Future Enhancements

### Short-term
- [ ] Remember user's currency preference (localStorage)
- [ ] Auto-detect currency based on user location
- [ ] Add more currencies (CAD, NZD, SGD, etc.)

### Medium-term
- [ ] Real-time currency conversion
- [ ] Compare results across currencies
- [ ] Industry benchmarks per currency/market

### Long-term
- [ ] Dynamic PM cost rates from API
- [ ] Regional cost adjustments within countries
- [ ] Historical currency tracking in reports

## Troubleshooting

### Currency not displaying
- Check `id="currency-selector"` exists in HTML
- Verify JavaScript initialized correctly (console log)
- Check for JavaScript errors in browser console

### Wrong currency format
- Verify `locale` setting in CURRENCIES object
- Check `suffix` boolean is correct
- Test with `formatCurrency()` function

### Calculations seem wrong
- Verify `dailyPMCost` is in correct units
- Check that percentages are decimals (0.03 not 3%)
- Ensure currency multipliers are applied correctly

## Support

For questions or issues:
- Check browser console for errors
- Review `/js/roi-calculator.js` comments
- Test with different browsers
- Verify Quarto rebuild completed successfully

---
**Created:** 2024-11-19  
**Version:** 2.0 (Multi-currency)  
**Maintainer:** Robert Kowalski / BIM Takeoff
