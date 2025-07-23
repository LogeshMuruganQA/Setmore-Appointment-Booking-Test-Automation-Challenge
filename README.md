# Setmore E2E Test Automation
This project automates end-to-end testing of the [Setmore](https://www.setmore.com/) web
application using **Playwright** with **TypeScript**. It follows the **Page Object Model
(POM)** pattern for scalability and maintainability.
---
## Project Structure
setmore-automation/
├── pages/ # Page Object Models
│ ├── LoginPage.ts
│ └── Calendar.ts
├── tests/ # Test specifications
│ └── login.spec.ts
├── utils/ # Utilities (e.g. random date)
│ └── date.ts
├── .env # Environment secrets (ignored)
├── .env.example # Template for .env file
├── playwright.config.ts # Playwright config
├── tsconfig.json # TypeScript config
├── package.json # NPM dependencies
└── README.md
---
## Tech Stack
- **Playwright** End-to-end test runner
- **TypeScript** Static typing
- **Dotenv** Environment variable management
- **POM (Page Object Model)** Clean page interaction abstraction
---
## Setup
### 1. Clone the repository
```bash
git clone https://github.com/LogeshMuruganQA/Setmore-Appointment-Booking-Test-Automation-Challenge.git
```
### 2. Install dependencies
```bash
npm install
```
---
## Environment Configuration
Create a `.env` file from the example:
```bash
cp .env.example .env
```
Fill in the following in `.env`:
```env
SETMORE_EMAIL=your-email@example.com
SETMORE_PASSWORD=your-password
```
> Never commit `.env` to Git.
---
## Run Tests
### In headed (UI) mode
```bash
npx playwright test --headed
```
---
## HTML Report
```bash
npx playwright show-report
```
---
## Folder Summary
| Path/File | Description |
|---------------------------|------------------------------------------|
| `pages/` | Page Object Models (LoginPage, Calendar) |
| `tests/` | Test files with Playwright test cases |
| `utils/date.ts` | Generates random future dates |
| `.env` | Sensitive login info |
| `.env.example` | Safe reference template |
| `playwright.config.ts` | Global Playwright config |
---
## Example Login Test
```ts
test('should login successfully', async ({ page }) => {
 const loginPage = new LoginPage(page);
 await loginPage.goto();
 await loginPage.login(process.env.SETMORE_EMAIL!, process.env.SETMORE_PASSWORD!);
 await expect(page.locator('.dashboard')).toBeVisible();
});
```
---
## Security Best Practices
- `.env` is in `.gitignore` dont commit secrets
- Always use `.env.example` for shared configs
- Use GitHub Actions secrets for CI/CD
---
## Useful Commands
| Command | Description |
|----------------------------------|-------------------------------------|
| `npx playwright test` | Run all tests |
| `npx playwright test --headed` | Run with browser UI |
| `npx playwright show-report` | View HTML report |
| `npx playwright codegen <url>` | Generate tests with codegen |
---
## Author
**Logesh Murugan**
