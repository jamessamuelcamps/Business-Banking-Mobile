#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Banking App project structure...${NC}\n"

# Navigate to src directory
cd src

# Create folder structure
echo -e "${GREEN}Creating folders...${NC}"
mkdir -p components/HomePage
mkdir -p components/Tabs
mkdir -p components/ManagePage
mkdir -p components/shared
mkdir -p styles

# Create all files
echo -e "${GREEN}Creating files...${NC}"

# Styles
touch styles/colors.js

# Shared components
touch components/shared/StatusBar.jsx
touch components/shared/NavBar.jsx
touch components/shared/AccountCard.jsx

# HomePage components
touch components/HomePage/HomeHeader.jsx
touch components/HomePage/BalanceSection.jsx
touch components/HomePage/PromoCard.jsx
touch components/HomePage/BottomSheet.jsx

# Tab components
touch components/Tabs/AccountsTab.jsx
touch components/Tabs/CashflowTab.jsx
touch components/Tabs/ApprovalsTab.jsx
touch components/Tabs/InvoicesTab.jsx

# ManagePage components
touch components/ManagePage/ManageHeader.jsx
touch components/ManagePage/ManageSubTabs.jsx
touch components/ManagePage/AccountsContent.jsx
touch components/ManagePage/CardsContent.jsx
touch components/ManagePage/TeamContent.jsx
touch components/ManagePage/IntegrationsContent.jsx

# Main components
touch components/HomePage.jsx
touch components/ManagePage.jsx

# Clean up default Vite files
echo -e "${GREEN}Cleaning up default files...${NC}"
rm -f App.css
rm -f assets/react.svg
rm -f ../public/vite.svg

echo -e "\n${BLUE}✓ Project structure created successfully!${NC}"
echo -e "${BLUE}✓ Files created: 26${NC}"
echo -e "\n${GREEN}Next steps:${NC}"
echo "1. Copy the code content into each file"
echo "2. Run: npm run dev"
echo "3. Open the URL shown in your terminal"
