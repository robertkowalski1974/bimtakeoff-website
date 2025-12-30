# Praevius.app Pricing Implementation - Technical Specification

**Version:** 2.0 (Simplified Pricing Model)  
**Date:** December 27, 2024  
**Status:** Implementation Ready

---

## 1. PRICING TIER STRUCTURE

### 1.1 Tier Definitions

```typescript
enum PricingTier {
  FREE = 'free',
  ESSENTIAL = 'essential',
  PROFESSIONAL = 'professional',
  SCALE = 'scale'
}

interface PricingPlan {
  tier: PricingTier;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  projectLimit: number;
  features: FeatureSet;
  integrations: IntegrationSet;
}
```

### 1.2 Complete Pricing Matrix

| Tier | Monthly | Annual (Save 17%) | Project Limit | Target Customer |
|------|---------|-------------------|---------------|-----------------|
| **Free** | £0 | £0 | 3 active | Trial users, very small contractors |
| **Essential** | £79 | £790 | 10 active | Solo QS, small subcontractors |
| **Professional** | £179 | £1,790 | 25 active | Growing firms, multiple projects |
| **Scale** | £349 | £3,490 | Unlimited | Mid-market contractors, multi-office |

**Note:** "Active projects" = projects with activity in last 30 days OR status = "active"

---

## 2. FEATURE ENTITLEMENTS

### 2.1 Core Features Matrix

```typescript
interface CoreFeatures {
  // Budget Management
  budgetTracking: boolean;
  multiCurrencyBudgets: boolean;
  budgetTemplates: number; // Max templates
  budgetForecasting: boolean;
  
  // Cost Control
  commitmentTracking: boolean;
  invoiceManagement: boolean;
  variationOrders: boolean;
  changeOrderApprovals: boolean;
  retentionManagement: boolean;
  
  // Reporting
  standardReports: boolean;
  customReports: boolean;
  scheduledReports: boolean;
  exportFormats: string[]; // ['PDF', 'Excel', 'CSV']
  
  // Collaboration
  teamMembers: number; // Max users
  clientPortalAccess: boolean;
  commentingThreads: boolean;
  
  // Mobile
  mobileAppAccess: boolean;
  offlineMode: boolean;
  
  // Support
  supportLevel: 'community' | 'email' | 'priority' | 'dedicated';
  responseTime: string; // '72h', '24h', '4h', '1h'
}
```

### 2.2 Feature Entitlement Table

| Feature | Free | Essential | Professional | Scale |
|---------|------|-----------|--------------|-------|
| **Projects** | 3 active | 10 active | 25 active | Unlimited |
| **Team Members** | 1 | 3 | 10 | Unlimited |
| **Budget Tracking** | ✓ | ✓ | ✓ | ✓ |
| **Multi-Currency** | ✗ | ✓ | ✓ | ✓ |
| **Budget Templates** | 1 | 5 | Unlimited | Unlimited |
| **Budget Forecasting** | ✗ | ✗ | ✓ | ✓ |
| **Commitments** | ✓ | ✓ | ✓ | ✓ |
| **Invoice Management** | ✓ | ✓ | ✓ | ✓ |
| **Variations** | ✓ | ✓ | ✓ | ✓ |
| **Change Order Approvals** | ✗ | Basic | Advanced | Advanced + Custom |
| **Retention Management** | ✗ | ✓ | ✓ | ✓ |
| **Standard Reports** | 3 types | 10 types | All | All |
| **Custom Reports** | ✗ | ✗ | ✓ | ✓ |
| **Scheduled Reports** | ✗ | ✗ | ✓ | ✓ |
| **Export Formats** | PDF only | PDF, Excel | PDF, Excel, CSV | All + API |
| **Client Portal** | ✗ | View-only | Full access | Full + White-label |
| **Mobile App** | ✓ | ✓ | ✓ | ✓ |
| **Offline Mode** | ✗ | ✗ | ✓ | ✓ |
| **Support** | Community | Email (72h) | Email (24h) | Priority (4h) + Phone |
| **API Access** | ✗ | ✗ | Read-only | Full |

---

## 3. INTEGRATION ENTITLEMENTS

### 3.1 Bundled Integrations by Tier

```typescript
interface IntegrationEntitlements {
  // Accounting Integrations (choose ONE in Essential)
  quickBooksOnline: boolean;
  xeroAccounting: boolean;
  sageIntacct: boolean;
  
  // Document Management
  googleDriveSync: boolean;
  sharePointSync: boolean;
  dropboxSync: boolean;
  
  // AI Features
  claudeAIReports: boolean;
  voiceRecognition: boolean;
  
  // Construction Platforms
  procoreSync: boolean;
  autodesk360Sync: boolean;
  
  // Advanced
  apiAccess: 'none' | 'read' | 'full';
  webhooks: boolean;
  customIntegrations: number; // Max custom integrations
}
```

### 3.2 Integration Matrix

| Integration | Free | Essential | Professional | Scale |
|-------------|------|-----------|--------------|-------|
| **Accounting (choose 1)** | | | | |
| QuickBooks Online | ✗ | ✓ (1 of 3) | ✓ All | ✓ All |
| Xero Accounting | ✗ | ✓ (1 of 3) | ✓ All | ✓ All |
| Sage Intacct | ✗ | ✓ (1 of 3) | ✓ All | ✓ All |
| **Document Sync** | | | | |
| Google Drive Sync | ✗ | ✓ | ✓ | ✓ |
| SharePoint Sync | ✗ | ✗ | ✓ | ✓ |
| Dropbox Sync | ✗ | ✗ | ✓ | ✓ |
| **AI Features** | | | | |
| Claude AI Reports | ✗ | ✗ | ✓ | ✓ |
| Voice Recognition | ✗ | ✗ | Beta access | ✓ |
| **Construction Platforms** | | | | |
| Procore Sync | ✗ | ✗ | ✗ | ✓ ($100/mo add-on) |
| Autodesk 360 | ✗ | ✗ | ✗ | ✓ ($75/mo add-on) |
| **Developer Access** | | | | |
| API Access | ✗ | ✗ | Read-only | Full |
| Webhooks | ✗ | ✗ | ✗ | ✓ |
| Custom Integrations | 0 | 0 | 0 | 2 included |

### 3.3 Premium Add-Ons (Any Tier)

```typescript
interface PremiumAddOns {
  procoreSharePointBidirectional: {
    price: 100; // per month
    availableFor: ['scale'];
    description: 'Bidirectional document sync between Procore and SharePoint';
  };
  autodesk360Integration: {
    price: 75; // per month
    availableFor: ['scale'];
    description: 'Model-based cost tracking integration';
  };
  whiteLabel: {
    price: 200; // per month
    availableFor: ['scale'];
    description: 'Custom branding for client portal';
  };
  dedicatedSupport: {
    price: 500; // per month
    availableFor: ['professional', 'scale'];
    description: 'Dedicated customer success manager';
  };
}
```

---

## 4. DATABASE SCHEMA IMPLEMENTATION

### 4.1 Core Tables

```sql
-- Pricing Plans Table
CREATE TABLE pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier VARCHAR(20) NOT NULL UNIQUE, -- 'free', 'essential', 'professional', 'scale'
  name VARCHAR(100) NOT NULL,
  monthly_price_gbp DECIMAL(10,2) NOT NULL,
  annual_price_gbp DECIMAL(10,2) NOT NULL,
  monthly_price_usd DECIMAL(10,2) NOT NULL,
  annual_price_usd DECIMAL(10,2) NOT NULL,
  monthly_price_aud DECIMAL(10,2) NOT NULL,
  annual_price_aud DECIMAL(10,2) NOT NULL,
  monthly_price_pln DECIMAL(10,2) NOT NULL,
  annual_price_pln DECIMAL(10,2) NOT NULL,
  project_limit INTEGER, -- NULL = unlimited
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Organizations (Customers)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  subscription_tier VARCHAR(20) NOT NULL REFERENCES pricing_plans(tier),
  subscription_status VARCHAR(20) DEFAULT 'trial', -- 'trial', 'active', 'past_due', 'cancelled'
  billing_cycle VARCHAR(10) DEFAULT 'monthly', -- 'monthly', 'annual'
  subscription_start_date TIMESTAMP,
  subscription_end_date TIMESTAMP,
  trial_end_date TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Feature Entitlements
CREATE TABLE feature_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pricing_tier VARCHAR(20) NOT NULL REFERENCES pricing_plans(tier),
  feature_key VARCHAR(100) NOT NULL, -- e.g., 'budget_forecasting', 'custom_reports'
  is_enabled BOOLEAN DEFAULT false,
  limit_value INTEGER, -- NULL = unlimited, 0 = disabled, N = specific limit
  metadata JSONB, -- Additional feature-specific config
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(pricing_tier, feature_key)
);

-- Integration Entitlements
CREATE TABLE integration_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pricing_tier VARCHAR(20) NOT NULL REFERENCES pricing_plans(tier),
  integration_key VARCHAR(100) NOT NULL, -- e.g., 'quickbooks_online', 'claude_ai'
  is_included BOOLEAN DEFAULT false,
  requires_selection BOOLEAN DEFAULT false, -- TRUE for "choose 1 of 3" accounting integrations
  selection_group VARCHAR(50), -- e.g., 'accounting' for grouped selections
  add_on_price_monthly DECIMAL(10,2), -- NULL if included, price if available as add-on
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(pricing_tier, integration_key)
);

-- Organization Add-Ons
CREATE TABLE organization_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  addon_key VARCHAR(100) NOT NULL, -- e.g., 'procore_sharepoint_sync'
  is_active BOOLEAN DEFAULT true,
  price_monthly DECIMAL(10,2) NOT NULL,
  stripe_subscription_item_id VARCHAR(255),
  started_at TIMESTAMP DEFAULT NOW(),
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Organization Integration Selections (for "choose 1 of 3" scenarios)
CREATE TABLE organization_integration_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  selection_group VARCHAR(50) NOT NULL, -- e.g., 'accounting'
  selected_integration_key VARCHAR(100) NOT NULL, -- e.g., 'xero_accounting'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, selection_group)
);

-- Projects (for limit enforcement)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'archived'
  last_activity_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Team Members (for limit enforcement)
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'admin', 'member', 'viewer'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, email)
);
```

### 4.2 Seed Data for Pricing Plans

```sql
-- Insert Pricing Tiers
INSERT INTO pricing_plans (tier, name, monthly_price_gbp, annual_price_gbp, monthly_price_usd, annual_price_usd, monthly_price_aud, annual_price_aud, monthly_price_pln, annual_price_pln, project_limit) VALUES
('free', 'Free', 0, 0, 0, 0, 0, 0, 0, 0, 3),
('essential', 'Essential', 79, 790, 99, 990, 149, 1490, 399, 3990, 10),
('professional', 'Professional', 179, 1790, 229, 2290, 339, 3390, 899, 8990, 25),
('scale', 'Scale', 349, 3490, 449, 4490, 669, 6690, 1749, 17490, NULL);

-- Feature Entitlements: FREE TIER
INSERT INTO feature_entitlements (pricing_tier, feature_key, is_enabled, limit_value) VALUES
('free', 'budget_tracking', true, NULL),
('free', 'multi_currency', false, 0),
('free', 'budget_templates', true, 1),
('free', 'budget_forecasting', false, 0),
('free', 'commitment_tracking', true, NULL),
('free', 'invoice_management', true, NULL),
('free', 'variation_orders', true, NULL),
('free', 'change_order_approvals', false, 0),
('free', 'retention_management', false, 0),
('free', 'standard_reports', true, 3),
('free', 'custom_reports', false, 0),
('free', 'scheduled_reports', false, 0),
('free', 'export_pdf', true, NULL),
('free', 'export_excel', false, 0),
('free', 'export_csv', false, 0),
('free', 'team_members', true, 1),
('free', 'client_portal', false, 0),
('free', 'mobile_app', true, NULL),
('free', 'offline_mode', false, 0),
('free', 'api_access', false, 0);

-- Feature Entitlements: ESSENTIAL TIER
INSERT INTO feature_entitlements (pricing_tier, feature_key, is_enabled, limit_value) VALUES
('essential', 'budget_tracking', true, NULL),
('essential', 'multi_currency', true, NULL),
('essential', 'budget_templates', true, 5),
('essential', 'budget_forecasting', false, 0),
('essential', 'commitment_tracking', true, NULL),
('essential', 'invoice_management', true, NULL),
('essential', 'variation_orders', true, NULL),
('essential', 'change_order_approvals', true, 1), -- Basic level
('essential', 'retention_management', true, NULL),
('essential', 'standard_reports', true, 10),
('essential', 'custom_reports', false, 0),
('essential', 'scheduled_reports', false, 0),
('essential', 'export_pdf', true, NULL),
('essential', 'export_excel', true, NULL),
('essential', 'export_csv', false, 0),
('essential', 'team_members', true, 3),
('essential', 'client_portal', true, 1), -- View-only
('essential', 'mobile_app', true, NULL),
('essential', 'offline_mode', false, 0),
('essential', 'api_access', false, 0);

-- Feature Entitlements: PROFESSIONAL TIER
INSERT INTO feature_entitlements (pricing_tier, feature_key, is_enabled, limit_value) VALUES
('professional', 'budget_tracking', true, NULL),
('professional', 'multi_currency', true, NULL),
('professional', 'budget_templates', true, NULL), -- Unlimited
('professional', 'budget_forecasting', true, NULL),
('professional', 'commitment_tracking', true, NULL),
('professional', 'invoice_management', true, NULL),
('professional', 'variation_orders', true, NULL),
('professional', 'change_order_approvals', true, 2), -- Advanced level
('professional', 'retention_management', true, NULL),
('professional', 'standard_reports', true, NULL),
('professional', 'custom_reports', true, NULL),
('professional', 'scheduled_reports', true, NULL),
('professional', 'export_pdf', true, NULL),
('professional', 'export_excel', true, NULL),
('professional', 'export_csv', true, NULL),
('professional', 'team_members', true, 10),
('professional', 'client_portal', true, 2), -- Full access
('professional', 'mobile_app', true, NULL),
('professional', 'offline_mode', true, NULL),
('professional', 'api_access', true, 1); -- Read-only

-- Feature Entitlements: SCALE TIER
INSERT INTO feature_entitlements (pricing_tier, feature_key, is_enabled, limit_value) VALUES
('scale', 'budget_tracking', true, NULL),
('scale', 'multi_currency', true, NULL),
('scale', 'budget_templates', true, NULL),
('scale', 'budget_forecasting', true, NULL),
('scale', 'commitment_tracking', true, NULL),
('scale', 'invoice_management', true, NULL),
('scale', 'variation_orders', true, NULL),
('scale', 'change_order_approvals', true, 3), -- Advanced + Custom workflows
('scale', 'retention_management', true, NULL),
('scale', 'standard_reports', true, NULL),
('scale', 'custom_reports', true, NULL),
('scale', 'scheduled_reports', true, NULL),
('scale', 'export_pdf', true, NULL),
('scale', 'export_excel', true, NULL),
('scale', 'export_csv', true, NULL),
('scale', 'team_members', true, NULL), -- Unlimited
('scale', 'client_portal', true, 3), -- Full + White-label
('scale', 'mobile_app', true, NULL),
('scale', 'offline_mode', true, NULL),
('scale', 'api_access', true, 2); -- Full access

-- Integration Entitlements: FREE TIER
INSERT INTO integration_entitlements (pricing_tier, integration_key, is_included, requires_selection) VALUES
('free', 'quickbooks_online', false, false),
('free', 'xero_accounting', false, false),
('free', 'sage_intacct', false, false),
('free', 'google_drive_sync', false, false),
('free', 'sharepoint_sync', false, false),
('free', 'claude_ai_reports', false, false),
('free', 'voice_recognition', false, false),
('free', 'procore_sync', false, false);

-- Integration Entitlements: ESSENTIAL TIER
INSERT INTO integration_entitlements (pricing_tier, integration_key, is_included, requires_selection, selection_group) VALUES
('essential', 'quickbooks_online', true, true, 'accounting'),
('essential', 'xero_accounting', true, true, 'accounting'),
('essential', 'sage_intacct', true, true, 'accounting'),
('essential', 'google_drive_sync', true, false, NULL),
('essential', 'sharepoint_sync', false, false, NULL),
('essential', 'claude_ai_reports', false, false, NULL),
('essential', 'voice_recognition', false, false, NULL),
('essential', 'procore_sync', false, false, NULL);

-- Integration Entitlements: PROFESSIONAL TIER
INSERT INTO integration_entitlements (pricing_tier, integration_key, is_included, requires_selection) VALUES
('professional', 'quickbooks_online', true, false),
('professional', 'xero_accounting', true, false),
('professional', 'sage_intacct', true, false),
('professional', 'google_drive_sync', true, false),
('professional', 'sharepoint_sync', true, false),
('professional', 'claude_ai_reports', true, false),
('professional', 'voice_recognition', true, false), -- Beta access
('professional', 'procore_sync', false, false); -- Available as add-on

-- Integration Entitlements: SCALE TIER
INSERT INTO integration_entitlements (pricing_tier, integration_key, is_included, requires_selection, add_on_price_monthly) VALUES
('scale', 'quickbooks_online', true, false, NULL),
('scale', 'xero_accounting', true, false, NULL),
('scale', 'sage_intacct', true, false, NULL),
('scale', 'google_drive_sync', true, false, NULL),
('scale', 'sharepoint_sync', true, false, NULL),
('scale', 'claude_ai_reports', true, false, NULL),
('scale', 'voice_recognition', true, false, NULL),
('scale', 'procore_sync', false, false, 100.00), -- Available as add-on
('scale', 'autodesk_360', false, false, 75.00);
```

---

## 5. ENTITLEMENT CHECKING LOGIC

### 5.1 Feature Access Check Function

```typescript
interface EntitlementCheckResult {
  hasAccess: boolean;
  limitReached: boolean;
  currentUsage?: number;
  limit?: number;
  upgradeRequired?: PricingTier;
}

async function checkFeatureEntitlement(
  organizationId: string,
  featureKey: string
): Promise<EntitlementCheckResult> {
  
  // Get organization's current tier
  const org = await db.organizations.findUnique({
    where: { id: organizationId },
    include: { subscription_tier: true }
  });
  
  if (!org) {
    throw new Error('Organization not found');
  }
  
  // Get feature entitlement for this tier
  const entitlement = await db.feature_entitlements.findUnique({
    where: {
      pricing_tier_feature_key: {
        pricing_tier: org.subscription_tier,
        feature_key: featureKey
      }
    }
  });
  
  if (!entitlement || !entitlement.is_enabled) {
    return {
      hasAccess: false,
      limitReached: false,
      upgradeRequired: getNextTierWithFeature(featureKey, org.subscription_tier)
    };
  }
  
  // Check if there's a usage limit
  if (entitlement.limit_value !== null) {
    const currentUsage = await getFeatureUsage(organizationId, featureKey);
    
    if (currentUsage >= entitlement.limit_value) {
      return {
        hasAccess: false,
        limitReached: true,
        currentUsage,
        limit: entitlement.limit_value,
        upgradeRequired: getNextTierWithHigherLimit(featureKey, org.subscription_tier)
      };
    }
    
    return {
      hasAccess: true,
      limitReached: false,
      currentUsage,
      limit: entitlement.limit_value
    };
  }
  
  // Feature is enabled with no limits
  return {
    hasAccess: true,
    limitReached: false
  };
}
```

### 5.2 Integration Access Check Function

```typescript
async function checkIntegrationAccess(
  organizationId: string,
  integrationKey: string
): Promise<EntitlementCheckResult> {
  
  const org = await db.organizations.findUnique({
    where: { id: organizationId }
  });
  
  // Check base entitlement for tier
  const baseEntitlement = await db.integration_entitlements.findUnique({
    where: {
      pricing_tier_integration_key: {
        pricing_tier: org.subscription_tier,
        integration_key: integrationKey
      }
    }
  });
  
  if (!baseEntitlement?.is_included) {
    // Check if available as add-on
    if (baseEntitlement?.add_on_price_monthly) {
      // Check if org has purchased this add-on
      const addon = await db.organization_addons.findFirst({
        where: {
          organization_id: organizationId,
          addon_key: integrationKey,
          is_active: true
        }
      });
      
      return {
        hasAccess: !!addon,
        limitReached: false,
        upgradeRequired: addon ? undefined : 'add-on'
      };
    }
    
    return {
      hasAccess: false,
      limitReached: false,
      upgradeRequired: getNextTierWithIntegration(integrationKey, org.subscription_tier)
    };
  }
  
  // If integration requires selection (e.g., "choose 1 of 3 accounting")
  if (baseEntitlement.requires_selection) {
    const selection = await db.organization_integration_selections.findFirst({
      where: {
        organization_id: organizationId,
        selection_group: baseEntitlement.selection_group
      }
    });
    
    // If no selection made yet, or this is the selected integration
    if (!selection || selection.selected_integration_key === integrationKey) {
      return {
        hasAccess: true,
        limitReached: false
      };
    }
    
    return {
      hasAccess: false,
      limitReached: false,
      upgradeRequired: 'professional' // Upgrade to get all integrations
    };
  }
  
  return {
    hasAccess: true,
    limitReached: false
  };
}
```

### 5.3 Project Limit Check

```typescript
async function checkProjectLimit(organizationId: string): Promise<EntitlementCheckResult> {
  const org = await db.organizations.findUnique({
    where: { id: organizationId },
    include: { pricing_plan: true }
  });
  
  const projectLimit = org.pricing_plan.project_limit;
  
  // NULL = unlimited
  if (projectLimit === null) {
    return {
      hasAccess: true,
      limitReached: false
    };
  }
  
  // Count active projects (status = 'active' OR last_activity within 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const activeProjectCount = await db.projects.count({
    where: {
      organization_id: organizationId,
      OR: [
        { status: 'active' },
        { last_activity_at: { gte: thirtyDaysAgo } }
      ]
    }
  });
  
  if (activeProjectCount >= projectLimit) {
    return {
      hasAccess: false,
      limitReached: true,
      currentUsage: activeProjectCount,
      limit: projectLimit,
      upgradeRequired: getNextTierWithHigherProjectLimit(org.subscription_tier)
    };
  }
  
  return {
    hasAccess: true,
    limitReached: false,
    currentUsage: activeProjectCount,
    limit: projectLimit
  };
}
```

---

## 6. FREE TRIAL IMPLEMENTATION

### 6.1 Trial Logic

```typescript
interface TrialConfig {
  durationDays: number;
  tier: PricingTier;
  features: 'all' | 'tier-limited';
}

const TRIAL_CONFIG: TrialConfig = {
  durationDays: 14,
  tier: PricingTier.PROFESSIONAL, // Give trial users Professional features
  features: 'all'
};

async function startFreeTrial(organizationId: string): Promise<void> {
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + TRIAL_CONFIG.durationDays);
  
  await db.organizations.update({
    where: { id: organizationId },
    data: {
      subscription_status: 'trial',
      subscription_tier: TRIAL_CONFIG.tier,
      trial_end_date: trialEndDate,
      subscription_start_date: new Date()
    }
  });
  
  // Send welcome email with trial details
  await sendTrialWelcomeEmail(organizationId);
  
  // Schedule trial expiry reminder emails
  await scheduleTrialReminders(organizationId, trialEndDate);
}

async function isTrialActive(organizationId: string): Promise<boolean> {
  const org = await db.organizations.findUnique({
    where: { id: organizationId }
  });
  
  if (org.subscription_status !== 'trial') {
    return false;
  }
  
  return new Date() < org.trial_end_date;
}

async function handleTrialExpiry(organizationId: string): Promise<void> {
  const org = await db.organizations.findUnique({
    where: { id: organizationId }
  });
  
  // Downgrade to free tier
  await db.organizations.update({
    where: { id: organizationId },
    data: {
      subscription_status: 'cancelled',
      subscription_tier: 'free',
      subscription_end_date: new Date()
    }
  });
  
  // Send trial ended email with upgrade CTA
  await sendTrialEndedEmail(organizationId);
  
  // Archive projects beyond free tier limit (keep 3 most recent)
  await archiveExcessProjects(organizationId, 3);
}
```

### 6.2 Trial Reminder Schedule

```typescript
const TRIAL_REMINDERS = [
  { daysBefore: 7, template: 'trial_7_days_remaining' },
  { daysBefore: 3, template: 'trial_3_days_remaining' },
  { daysBefore: 1, template: 'trial_1_day_remaining' },
  { daysBefore: 0, template: 'trial_expired' }
];
```

---

## 7. BILLING & SUBSCRIPTION MANAGEMENT

### 7.1 Stripe Integration Schema

```typescript
interface StripeSubscriptionMapping {
  // Praevius Tier -> Stripe Price IDs
  tierPriceIds: {
    essential: {
      monthly: 'price_essential_monthly_gbp',
      annual: 'price_essential_annual_gbp'
    },
    professional: {
      monthly: 'price_professional_monthly_gbp',
      annual: 'price_professional_annual_gbp'
    },
    scale: {
      monthly: 'price_scale_monthly_gbp',
      annual: 'price_scale_annual_gbp'
    }
  };
  
  // Add-on Price IDs
  addonPriceIds: {
    procore_sharepoint_sync: 'price_addon_procore_sharepoint_monthly',
    autodesk_360: 'price_addon_autodesk360_monthly',
    white_label: 'price_addon_whitelabel_monthly',
    dedicated_support: 'price_addon_dedicated_support_monthly'
  };
}
```

### 7.2 Subscription Change Logic

```typescript
async function upgradeSubscription(
  organizationId: string,
  newTier: PricingTier,
  billingCycle: 'monthly' | 'annual'
): Promise<void> {
  
  const org = await db.organizations.findUnique({
    where: { id: organizationId }
  });
  
  const currentTier = org.subscription_tier;
  
  // Calculate proration
  const proration = await calculateProration(
    org.stripe_subscription_id,
    currentTier,
    newTier,
    billingCycle
  );
  
  // Update Stripe subscription
  const stripeSubscription = await stripe.subscriptions.update(
    org.stripe_subscription_id,
    {
      items: [{
        id: org.stripe_subscription_item_id,
        price: getPriceId(newTier, billingCycle)
      }],
      proration_behavior: 'create_prorations',
      billing_cycle_anchor: 'unchanged'
    }
  );
  
  // Update database
  await db.organizations.update({
    where: { id: organizationId },
    data: {
      subscription_tier: newTier,
      billing_cycle: billingCycle,
      updated_at: new Date()
    }
  });
  
  // Send confirmation email
  await sendSubscriptionChangeEmail(organizationId, currentTier, newTier);
  
  // Log event
  await logSubscriptionEvent(organizationId, 'upgrade', { from: currentTier, to: newTier });
}
```

---

## 8. MIGRATION PLAN FROM OLD PRICING

### 8.1 Grandfathering Strategy

```typescript
interface GrandfatherConfig {
  // Organizations created before this date keep old pricing
  cutoffDate: Date;
  // How long to maintain old pricing (months)
  gracePeriodMonths: number;
  // Communication timeline
  announcementDate: Date;
  migrationDeadline: Date;
}

const MIGRATION_CONFIG: GrandfatherConfig = {
  cutoffDate: new Date('2025-01-15'), // Example
  gracePeriodMonths: 3,
  announcementDate: new Date('2025-01-01'),
  migrationDeadline: new Date('2025-04-01')
};
```

### 8.2 Migration Mapping

```sql
-- Add migration tracking
ALTER TABLE organizations ADD COLUMN legacy_pricing BOOLEAN DEFAULT false;
ALTER TABLE organizations ADD COLUMN legacy_tier_mapping JSONB;

-- Mark existing organizations as legacy
UPDATE organizations 
SET legacy_pricing = true,
    legacy_tier_mapping = jsonb_build_object(
      'old_tier', subscription_tier,
      'new_tier_equivalent', 
      CASE subscription_tier
        WHEN 'base' THEN 'essential'
        WHEN 'growth' THEN 'professional'
        WHEN 'scale' THEN 'scale'
        ELSE 'free'
      END
    )
WHERE created_at < '2025-01-15';
```

### 8.3 Automated Migration Process

```typescript
async function migrateOrganizationToNewPricing(organizationId: string): Promise<void> {
  const org = await db.organizations.findUnique({
    where: { id: organizationId },
    include: { legacy_tier_mapping: true }
  });
  
  if (!org.legacy_pricing) {
    throw new Error('Organization is not on legacy pricing');
  }
  
  const newTier = org.legacy_tier_mapping.new_tier_equivalent;
  
  // Calculate feature comparison
  const featureComparison = await compareFeatures(org.subscription_tier, newTier);
  
  // Send migration email with comparison
  await sendMigrationEmail(organizationId, featureComparison);
  
  // Update to new pricing structure
  await db.organizations.update({
    where: { id: organizationId },
    data: {
      subscription_tier: newTier,
      legacy_pricing: false,
      updated_at: new Date()
    }
  });
  
  // Update Stripe subscription
  await updateStripeSubscriptionTier(org.stripe_subscription_id, newTier);
  
  // Log migration
  await logMigrationEvent(organizationId, org.subscription_tier, newTier);
}
```

---

## 9. UI/UX IMPLEMENTATION CHECKLIST

### 9.1 Pricing Page Components

```typescript
interface PricingPageProps {
  currentTier?: PricingTier;
  isAnnual: boolean;
  currency: 'GBP' | 'USD' | 'AUD' | 'PLN';
}

// Component: PricingTierCard
const PricingTierCard: React.FC<{
  tier: PricingTier;
  isPopular?: boolean;
  isCurrentPlan?: boolean;
}> = ({ tier, isPopular, isCurrentPlan }) => {
  return (
    <div className="pricing-card">
      {isPopular && <Badge>Most Popular</Badge>}
      <h3>{tier.name}</h3>
      <Price amount={tier.monthlyPrice} currency="GBP" />
      <FeatureList features={tier.features} />
      <IntegrationsList integrations={tier.integrations} />
      <CTAButton 
        disabled={isCurrentPlan}
        text={isCurrentPlan ? 'Current Plan' : 'Start Free Trial'}
      />
    </div>
  );
};
```

### 9.2 Feature Gates in Application

```typescript
// Higher-order component for feature gating
function withFeatureGate(
  Component: React.ComponentType,
  featureKey: string
) {
  return function FeatureGatedComponent(props: any) {
    const { organizationId } = useAuth();
    const { hasAccess, limitReached } = useFeatureEntitlement(organizationId, featureKey);
    
    if (!hasAccess) {
      return <UpgradePrompt featureKey={featureKey} limitReached={limitReached} />;
    }
    
    return <Component {...props} />;
  };
}

// Usage
const CustomReportsPage = withFeatureGate(CustomReportsComponent, 'custom_reports');
```

### 9.3 In-App Upgrade Prompts

```typescript
interface UpgradePromptProps {
  featureKey: string;
  limitReached: boolean;
  currentTier: PricingTier;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ 
  featureKey, 
  limitReached, 
  currentTier 
}) => {
  const recommendedTier = getRecommendedUpgrade(currentTier, featureKey);
  
  return (
    <Modal>
      <Icon name="lock" />
      <h2>
        {limitReached 
          ? `You've reached your ${FEATURE_NAMES[featureKey]} limit`
          : `Unlock ${FEATURE_NAMES[featureKey]}`
        }
      </h2>
      <p>Upgrade to {recommendedTier.name} to access this feature.</p>
      <FeatureComparison current={currentTier} recommended={recommendedTier} />
      <Button onClick={() => navigateToUpgrade(recommendedTier)}>
        Upgrade to {recommendedTier.name}
      </Button>
    </Modal>
  );
};
```

---

## 10. TESTING CHECKLIST

### 10.1 Unit Tests

- [ ] Feature entitlement checks for all tiers
- [ ] Integration access checks with selection groups
- [ ] Project limit enforcement
- [ ] Team member limit enforcement
- [ ] Trial activation and expiry
- [ ] Subscription upgrades with proration
- [ ] Add-on activation and deactivation
- [ ] Migration from legacy pricing

### 10.2 Integration Tests

- [ ] Stripe webhook handling (subscription.created, subscription.updated, subscription.deleted)
- [ ] Free trial to paid conversion flow
- [ ] Upgrade/downgrade flows
- [ ] Add-on purchase flows
- [ ] Annual to monthly (and reverse) billing cycle changes
- [ ] Accounting integration selection enforcement
- [ ] Project archival on downgrade

### 10.3 E2E Tests

- [ ] Complete signup to trial activation
- [ ] Trial expiry and downgrade to free
- [ ] Free to Essential upgrade
- [ ] Essential to Professional upgrade
- [ ] Add Procore sync add-on on Scale tier
- [ ] Change accounting integration selection
- [ ] Hit project limit and see upgrade prompt
- [ ] Hit team member limit and see upgrade prompt

---

## 11. DEPLOYMENT SEQUENCE

### 11.1 Phase 1: Database Migration (Day 1)

```bash
# 1. Create new pricing tables
psql -U admin -d praevius_prod -f create_pricing_tables.sql

# 2. Seed pricing data
psql -U admin -d praevius_prod -f seed_pricing_data.sql

# 3. Mark existing orgs as legacy
psql -U admin -d praevius_prod -f mark_legacy_orgs.sql

# 4. Verify migration
psql -U admin -d praevius_prod -c "SELECT tier, COUNT(*) FROM organizations GROUP BY tier;"
```

### 11.2 Phase 2: Stripe Price Configuration (Day 1-2)

```bash
# Create Stripe products and prices for each tier and currency
stripe products create --name "Praevius Essential"
stripe prices create --product prod_xxx --unit-amount 7900 --currency gbp --recurring interval=month
stripe prices create --product prod_xxx --unit-amount 79000 --currency gbp --recurring interval=year

# Repeat for Professional and Scale tiers
# Create add-on prices
```

### 11.3 Phase 3: Backend Deployment (Day 2-3)

```bash
# Deploy entitlement checking logic
git checkout -b feature/simplified-pricing
# ... implement functions
git push origin feature/simplified-pricing

# Deploy to staging
./deploy_staging.sh

# Run integration tests
npm run test:integration

# Deploy to production
./deploy_production.sh
```

### 11.4 Phase 4: Frontend Deployment (Day 3-4)

```bash
# Update pricing page
# Update signup flow
# Add feature gates
# Deploy upgrade prompts

git push origin feature/pricing-ui
./deploy_frontend_staging.sh
# Test all flows
./deploy_frontend_production.sh
```

### 11.5 Phase 5: Communication (Day 5-7)

- [ ] Email existing customers about new pricing
- [ ] Update website pricing page
- [ ] Update documentation
- [ ] Publish blog post explaining changes
- [ ] Update sales materials
- [ ] Train support team

---

## 12. MONITORING & METRICS

### 12.1 Key Metrics to Track

```sql
-- Daily signup funnel
SELECT 
  DATE(created_at) as signup_date,
  subscription_tier,
  COUNT(*) as signups
FROM organizations
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at), subscription_tier
ORDER BY signup_date DESC;

-- Trial to paid conversion rate
SELECT 
  COUNT(CASE WHEN subscription_status = 'trial' THEN 1 END) as active_trials,
  COUNT(CASE WHEN subscription_status = 'active' AND trial_end_date IS NOT NULL THEN 1 END) as converted_trials,
  ROUND(
    COUNT(CASE WHEN subscription_status = 'active' AND trial_end_date IS NOT NULL THEN 1 END)::DECIMAL / 
    NULLIF(COUNT(CASE WHEN trial_end_date IS NOT NULL THEN 1 END), 0) * 100, 
    2
  ) as conversion_rate_pct
FROM organizations;

-- Tier distribution
SELECT 
  subscription_tier,
  COUNT(*) as customers,
  ROUND(COUNT(*)::DECIMAL / SUM(COUNT(*)) OVER () * 100, 2) as percentage
FROM organizations
WHERE subscription_status = 'active'
GROUP BY subscription_tier;

-- Add-on attach rate
SELECT 
  addon_key,
  COUNT(DISTINCT organization_id) as customers,
  ROUND(
    COUNT(DISTINCT organization_id)::DECIMAL / 
    (SELECT COUNT(*) FROM organizations WHERE subscription_status = 'active') * 100,
    2
  ) as attach_rate_pct
FROM organization_addons
WHERE is_active = true
GROUP BY addon_key;

-- Monthly recurring revenue by tier
SELECT 
  o.subscription_tier,
  COUNT(*) as customers,
  SUM(
    CASE o.billing_cycle
      WHEN 'monthly' THEN pp.monthly_price_gbp
      WHEN 'annual' THEN pp.annual_price_gbp / 12
    END
  ) as mrr
FROM organizations o
JOIN pricing_plans pp ON o.subscription_tier = pp.tier
WHERE o.subscription_status = 'active'
GROUP BY o.subscription_tier;
```

### 12.2 Alert Thresholds

```yaml
alerts:
  trial_conversion_rate:
    threshold: 15%
    action: "If below 15%, investigate trial experience"
  
  churn_rate:
    threshold: 5%
    period: monthly
    action: "If above 5%/month, conduct user interviews"
  
  project_limit_hits:
    threshold: 20
    period: weekly
    action: "If >20/week hitting limits, consider adjusting tiers"
  
  integration_selection_changes:
    threshold: 5%
    action: "If >5% change accounting selection, consider including all"
```

---

## APPENDIX: FEATURE KEY REFERENCE

```typescript
enum FeatureKeys {
  // Budget Management
  BUDGET_TRACKING = 'budget_tracking',
  MULTI_CURRENCY = 'multi_currency',
  BUDGET_TEMPLATES = 'budget_templates',
  BUDGET_FORECASTING = 'budget_forecasting',
  
  // Cost Control
  COMMITMENT_TRACKING = 'commitment_tracking',
  INVOICE_MANAGEMENT = 'invoice_management',
  VARIATION_ORDERS = 'variation_orders',
  CHANGE_ORDER_APPROVALS = 'change_order_approvals',
  RETENTION_MANAGEMENT = 'retention_management',
  
  // Reporting
  STANDARD_REPORTS = 'standard_reports',
  CUSTOM_REPORTS = 'custom_reports',
  SCHEDULED_REPORTS = 'scheduled_reports',
  EXPORT_PDF = 'export_pdf',
  EXPORT_EXCEL = 'export_excel',
  EXPORT_CSV = 'export_csv',
  
  // Collaboration
  TEAM_MEMBERS = 'team_members',
  CLIENT_PORTAL = 'client_portal',
  COMMENTING = 'commenting_threads',
  
  // Mobile & Access
  MOBILE_APP = 'mobile_app',
  OFFLINE_MODE = 'offline_mode',
  API_ACCESS = 'api_access'
}

enum IntegrationKeys {
  // Accounting
  QUICKBOOKS = 'quickbooks_online',
  XERO = 'xero_accounting',
  SAGE = 'sage_intacct',
  
  // Document Management
  GOOGLE_DRIVE = 'google_drive_sync',
  SHAREPOINT = 'sharepoint_sync',
  DROPBOX = 'dropbox_sync',
  
  // AI Features
  CLAUDE_AI = 'claude_ai_reports',
  VOICE_RECOGNITION = 'voice_recognition',
  
  // Construction Platforms
  PROCORE = 'procore_sync',
  AUTODESK = 'autodesk_360'
}
```

---

**END OF IMPLEMENTATION SPECIFICATION**

*Last Updated: December 27, 2024*  
*Version: 2.0 (Simplified Pricing)*  
*Author: Claude for BIM TakeOff / Praevius.app*
