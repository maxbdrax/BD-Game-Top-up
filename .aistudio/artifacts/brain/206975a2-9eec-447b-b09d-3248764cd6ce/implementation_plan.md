# BD Gaming TopUp - Implementation Plan

A mobile-first, production-oriented Free Fire diamond top-up and gaming ID marketplace web application inspired by top Bangladeshi gaming platforms (pipratopup style), featuring a modern green and white color scheme, BDT currency, Bengali & English language toggle, and fully interactive modules.

## User Review Required

> [!IMPORTANT]
> Please review the core planned features below and click **Proceed** to start building the application.

- **Theme & Design**: PipraTopUp inspired clean white & emerald green design (`bg-emerald-600`, crisp cards, rounded step checkout, mobile bottom bar, floating support & AI chatbot).
- **Core Modules**:
  1. **Home & Banners**: Promotional slider, notice banner, quick category navigation.
  2. **Free Fire Diamond & Membership Top-Up**: Step 1 (Select package: 25 Diamond ৳20 to 1015 Diamond ৳659, Weekly/Monthly), Step 2 (Enter Player UID with live name check & avatar verification), Step 3 (Payment method: Wallet, bKash, Nagad, Rocket with manual reference submission), Step 4 (Review & instant/manual order confirmation).
  3. **Add Money & Wallet**: User wallet balance, manual deposit instructions (bKash/Nagad personal merchant numbers), transaction reference submission, and admin approval simulation.
  4. **Free Fire ID Marketplace**: Browse, filter (price, level, rank), search, view account details (skins, level 77, badges, bundles), buy listing, and seller account submission form.
  5. **Order Tracking & History**: Track order status (Pending, Processing, Completed, Cancelled) with unique order numbers (e.g. #BDTP-89214).
  6. **Authentication & User Dashboard**: Login / Register / Forgot Password, User profile, wallet ledger, support tickets, and referral program.
  7. **Admin Panel**: Manage diamond packages, approve/reject manual deposits & top-up orders, marketplace moderation, user management, and revenue analytics.
  8. **AI Assistant & Image Analyzer**: Floating Gemini AI chatbot and screenshot analysis tool for game support and ID appraisal.

## Proposed Changes

### 1. Project Setup & Metadata
- Update `metadata.json` with app title and description ("BD Gaming TopUp - Free Fire Diamonds & ID Marketplace").
- Update `index.html` title and meta tags.
- Configure Tailwind CSS (`src/index.css`) with emerald green brand colors (`#10b981`, `#059669`).

### 2. Mock Backend & State Management (`src/data/mockData.ts` & Context)
- In-memory localStorage-backed database for users, wallet balances, diamond packages, top-up orders, deposit requests, marketplace listings, support tickets, and site settings.
- Initial seed data mirroring Bangladeshi gaming top-up platforms (bKash personal/merchant numbers, realistic package prices in BDT).

### 3. Component Architecture (`src/components/`)
- `Navbar.tsx`: Brand logo, language toggle (BN/EN), search, Wallet balance chip, Login/User button.
- `MobileBottomNav.tsx`: Home, Add Money, My Orders, Marketplace, My Account.
- `Home.tsx`: Notice marquee, promotional banner slider, service category grids (UID Top-Up, Weekly Pass, Monthly Pass, Level Up Pass, ID Marketplace).
- `DiamondTopUp.tsx`: Step-by-step interactive checkout flow (Select Package -> Enter UID & Name Verification -> Payment Method with bKash/Nagad/Rocket/Wallet -> Confirmation & Order Placement).
- `Marketplace.tsx`: Browse verified Free Fire accounts with filters, detail modals, buy modal, and "Sell Your ID" form.
- `AddMoney.tsx`: Deposit funds via bKash/Nagad/Rocket instructions with transaction ID input and status tracking.
- `MyOrders.tsx`: Order history and tracking with status badges.
- `CustomerDashboard.tsx`: Profile, wallet ledger, support tickets, notifications.
- `AdminPanel.tsx`: Full management dashboard for orders, deposits, packages, listings, and analytics.
- `AuthModal.tsx`: Login and Register tabs with secure validation.
- `AiChatModal.tsx`: Gemini AI chatbot and image analyzer for game support and ID appraisal.
- `SupportModal.tsx` & `Footer.tsx`: FAQs, terms, privacy policy, contact info.

## Verification Plan

### Automated Tests
- Build verification via `compile_applet` to ensure zero TypeScript errors.

### Manual Verification
1. Open the preview app in browser.
2. Test Diamond Top-Up flow: select 100 Diamonds (৳72), enter UID (e.g., `1970045758`), click "Check Name" (simulates game server lookup), select bKash, and place order.
3. Test Add Money: submit a bKash deposit request (৳500, TrxID `BKP982341`), verify it appears as pending and can be approved in the Admin Panel.
4. Test Admin Panel: toggle to Admin role, approve deposits and top-ups, add a new diamond package.
5. Test Marketplace: browse ID listings, view details, and submit a new account listing.
6. Test Gemini AI chat and image analysis widget.
