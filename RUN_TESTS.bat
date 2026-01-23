@echo off
REM TodoMVC Automation Framework - Quick Start Guide
REM Professional Cucumber BDD with Page Object Model

echo.
echo ============================================
echo   TodoMVC Automation Framework (Cucumber BDD)
echo   Professional Grade Testing Suite
echo ============================================
echo.
echo AVAILABLE COMMANDS:
echo.
echo 1. npm test
echo    Run ALL 21 test scenarios (full regression)
echo.
echo 2. npm run test:smoke
echo    Run SMOKE tests (4 critical scenarios - fastest)
echo.
echo 3. npm run test:sanity
echo    Run SANITY tests (8 key scenarios)
echo.
echo 4. npm run test:regression
echo    Run FULL REGRESSION (21 scenarios - complete)
echo.
echo 5. npm run test:positive
echo    Run POSITIVE tests only (10 happy path scenarios)
echo.
echo 6. npm run test:negative
echo    Run NEGATIVE tests only (11 edge case scenarios)
echo.
echo 7. npm run report
echo    Generate PDF report with 145+ screenshots
echo.
echo ============================================
echo REPORTS LOCATION:
echo ============================================
echo.
echo HTML Report:  reports/cucumber-report.html
echo JSON Report:  reports/cucumber-report.json
echo PDF Report:   reports/TestReport.pdf
echo Screenshots:  reports/screenshots/
echo.
echo ============================================
echo TEST FRAMEWORK DETAILS:
echo ============================================
echo.
echo Framework:       Cucumber BDD with Gherkin
echo Automation:      Playwright
echo Design Pattern:  Page Object Model
echo Total Tests:     21 scenarios
echo Screenshots:     145+ per full run
echo Tags:            @positive, @negative, @smoke, @sanity, @regression
echo.
echo ============================================
echo QUICK START:
echo ============================================
echo.
echo 1. Run tests:      npm test
echo 2. Generate PDF:   npm run report
echo 3. View HTML:      reports/cucumber-report.html
echo.
echo ============================================
echo PROJECT STRUCTURE:
echo ============================================
echo.
echo features/             - Feature files (Gherkin scenarios)
echo steps/                - Step definitions (implementations)
echo pages/                - Page Object Model (TodoPage.js)
echo scripts/              - Utilities (PDF generation)
echo reports/              - Test reports and screenshots
echo cucumber.js           - Cucumber configuration
echo package.json          - Dependencies
echo.
echo ============================================

pause
