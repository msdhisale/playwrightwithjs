@echo off
REM Run tests and generate Extent report in one command
REM Usage: RUN_TESTS_WITH_EXTENT_REPORT.bat [profile]

setlocal enabledelayedexpansion
set profile=%1
if "%profile%"=="" set profile=default

echo.
echo ======================================
echo Running Cucumber Tests...
echo ======================================

REM Run the appropriate test profile
if "%profile%"=="smoke" (
  npm run test:smoke
) else if "%profile%"=="sanity" (
  npm run test:sanity
) else if "%profile%"=="positive" (
  npm run test:positive
) else if "%profile%"=="negative" (
  npm run test:negative
) else if "%profile%"=="regression" (
  npm run test:regression
) else (
  npm test
)

REM Check if tests passed
if errorlevel 1 (
  echo.
  echo ❌ Tests failed!
  exit /b 1
)

echo.
echo ======================================
echo Generating Extent Report...
echo ======================================
echo.

REM Generate Extent report
if "%profile%"=="default" (
  npm run report:extent
) else (
  npm run report:extent:%profile%
)

echo.
echo ✅ Done! Check reports/extent-report-%profile%.html
echo.
