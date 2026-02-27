# Reusable Components

> These components appear across multiple pages and should be built once in
> `src/lib/components/` then reused everywhere. Building shared components first
> ensures consistency and reduces total work.

## Shared Layout Components

### 1. HeaderNav
- **Used on:** Every page
- **Screenshots:** `assets/shared-header-nav/`
- **Description:** Full header including:
  - Hero banner image (paratroopers) with HCF logo centered
  - Social icons (Facebook, email) in top-right corner
  - "RECONNECTING OUR RANGER BROTHERS" tagline
  - Navigation bar with links and dropdown menus
  - "New Membership" link below main nav
- **Dropdowns:**
  - About Us → Our History, Board of Directors, Advisory Board
  - Programs → (sub-pages)
  - Get Involved → Membership, Individual and Corporate Donations
  - News → (sub-pages/categories)
- **Props:** Current page (for active state highlighting)

### 2. Footer
- **Used on:** Every page
- **Screenshots:** Visible at bottom of most `full-page.png` screenshots
- **Description:**
  - Copyright line: "Hardrock Charlie Foundation, Inc. is a 501(c)(3) nonprofit organization. All donations are tax deductible."
  - "are our scholarships" link
  - Navigation links (same as header but in a single row)
  - DONATE and New Membership links (highlighted)

### 3. HeroBanner
- **Used on:** Every page (same image)
- **Description:** Olive/green background with paratroopers jumping, HCF logo centered
- **Note:** This is the same image/section at the top of every page. Build once as a component.

## Content Components

### 4. PageTitle
- **Used on:** Most pages below the nav
- **Description:** Simple centered page title text below the navigation bar
- **Props:** title text

### 5. PersonCard
- **Used on:** Board of Directors, Advisory Board pages
- **Screenshots:** `assets/about-board-of-directors/`, `assets/about-advisory-board/`
- **Description:** Headshot photo on left, name + bio text on right
- **Props:** name, title, photo, bio text
- **Layout:** Photo left-aligned, text flows beside it

### 6. ProgramCard
- **Used on:** Programs listing page
- **Screenshots:** `assets/programs-listing/`
- **Description:** Program image on left, title + description on right, "See More" button
- **Props:** title, image, description, link
- **Layout:** Image left, text right, button below text

### 7. NewsArticleCard
- **Used on:** News listing page
- **Screenshots:** `assets/news-listing/`
- **Description:** Article entry in the listing — title (bold, uppercase), date/author/category metadata, excerpt text, "Read More" button
- **Props:** title, date, author, category, excerpt, link
- **Layout:** Stacked vertically with horizontal dividers between entries

### 8. NewsArticleLayout
- **Used on:** All individual news article pages (Command Post, Moral Compass, newsletters, Save the Date)
- **Screenshots:** Any `news-cp-*/`, `news-mc-*/`, `news-newsletter-*/` folder
- **Description:** Full article page layout:
  - Breadcrumb/category label
  - Title (bold, uppercase)
  - Date, author, category metadata
  - Author photo (small, left-aligned) with article text flowing around it
  - "Previous Post" / "Next Post" navigation at bottom
- **Props:** title, date, author, authorPhoto, category, content (HTML), prevPost, nextPost

### 9. NewsSidebar
- **Used on:** News listing page
- **Screenshots:** `assets/news-listing/`
- **Description:** Right sidebar with "NEWS ARCHIVE" heading and monthly links
- **Props:** list of months with links

## Form Components

### 10. FormInput
- **Used on:** Contact Us, Donate, New Membership pages
- **Description:** Label above, text input below with placeholder and light border
- **Props:** label, placeholder, required, type (text/email/tel)
- **Variants:** Single-column full width, two-column side-by-side

### 11. FormTextarea
- **Used on:** Contact Us, Donate pages
- **Description:** Label above, multi-line textarea with character count (Contact Us shows "0 / 780")
- **Props:** label, placeholder, required, maxLength

### 12. FormSelect
- **Used on:** Donate (Country dropdown), New Membership (Membership Type, Country)
- **Description:** Label above, dropdown select
- **Props:** label, options, placeholder

### 13. FormRadioGroup
- **Used on:** Donate (Individual/Corporate), New Membership (Regiment, Combat Veteran)
- **Description:** Label/question above, radio buttons listed vertically
- **Props:** label, options, name

### 14. FormCheckboxGroup
- **Used on:** New Membership (Shirt Size)
- **Description:** Label/question above, checkboxes listed vertically
- **Props:** label, options

### 15. SubmitButton
- **Used on:** Contact Us, Donate, New Membership
- **Description:** Styled button (green on Contact Us, PayPal-branded on donation forms)
- **Variants:**
  - Standard green "Send Message" button
  - PayPal Checkout button (yellow)
  - PayPal Credit button (blue)
  - Debit/Credit Card button (dark)
- **Note:** Buttons are visual only — no submission logic

## Special Components

### 16. ImageGallery
- **Used on:** Gallery page
- **Screenshots:** `assets/gallery/`
- **Description:** Full-width image carousel/slider with:
  - Large image display area
  - Left/right navigation buttons (circular, blue)
  - Dot indicators below (optional — check screenshots)
- **Props:** array of image objects
- **Note:** 38 images, scrolls left/right with buttons

### 17. PartnerLogoGrid
- **Used on:** Partners page
- **Screenshots:** `assets/partners/`
- **Description:** Grid of partner logos arranged in rows of ~3
- **Props:** array of logo objects (image, name, optional link)

### 18. HomeInfoCard
- **Used on:** Home page only
- **Screenshots:** `assets/home/`
- **Description:** Three cards in a row — each with an image on top, heading (e.g., "OUR MISSION"), and description text below
- **Props:** image, title, description
- **Note:** Three of these appear side by side on the home page

### 19. StayConnectedForm
- **Used on:** Home page (bottom section)
- **Description:** Email signup section with fields for First Name, Last Name, Email Address, and a submit button ("I'M A RANGER")
- **Note:** Visual only — does not submit

## Build Order

Build components in this order (dependencies first):

1. **HeroBanner** — no dependencies
2. **HeaderNav** — depends on HeroBanner
3. **Footer** — no dependencies
4. **PageTitle** — no dependencies
5. **FormInput, FormTextarea, FormSelect, FormRadioGroup, FormCheckboxGroup, SubmitButton** — no dependencies
6. **PersonCard, ProgramCard, NewsArticleCard, HomeInfoCard** — no dependencies
7. **NewsArticleLayout, NewsSidebar** — no dependencies
8. **ImageGallery** — no dependencies (but more complex)
9. **PartnerLogoGrid** — no dependencies
10. **StayConnectedForm** — depends on FormInput + SubmitButton
