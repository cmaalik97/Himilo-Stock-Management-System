# Himilo Stock Management System

## Overview
This project is a web-based inventory management system for Himilo Hiigsi Trading Co.  
It helps branches manage inventory efficiently by tracking stock across multiple branches, monitoring low stock, and keeping a detailed history of stock movement.  

The system is dynamic, responsive, and interactive, providing real-time updates on the dashboard without changing the original inventory.

---

## Problem Statement
Managing stock in multiple branches can be confusing:

1. Branch managers cannot easily see stock in vs stock out.  
2. Total stock and branch-wise distribution are hard to track.  
3. There is no history of stock movement, which makes auditing difficult.  

This project solves these problems by providing a central dashboard, stock out tracking, and inventory history with images and low-stock alerts.

---

## Solution
The system allows:

- Adding inventory with branch distribution and optional item image  
- Performing stock out per branch without modifying the initial total inventory  
- Displaying a dashboard per item, showing total stock, branch stock, and low-stock warnings  
- Keeping a detailed history of inventory additions and stock outs  
- Using local storage for persistence across pages and refreshes  
- Providing responsive design and smooth navigation  

---

## Technologies Used

- HTML – Structure of the application  
- CSS – Styling and responsive layout  
- JavaScript – Interactive features and dynamic updates  
- Local Storage API – Stores inventory and history data  
- FileReader API – Converts uploaded item images to Base64  

---

## Key Features

- Dynamic Dashboard – Shows each item with name, image, and stock details  
- Low Stock Warning – Alerts when stock is below threshold  
- Stock Out System – Manage branch stock without affecting original inventory  
- Inventory History – Tracks all stock activities with timestamps  
- Navigation – Easy access between Dashboard, Inventory, Stock Out, and History  
- Responsive Design – Works on desktop and mobile devices  

---

## Instructions (How to Run)

1. Clone or download the project files  
2. Open `index.html` in any modern web browser  
3. Add inventory items via the Inventory form  
4. Use the Stock Out form to reduce stock  
5. Check Dashboard and History for updates  

---

## Dependencies

- No external libraries required  
- Pure HTML, CSS, and JavaScript  

---

## Author

**Abdimalik Mohamud** © 2026  

- WhatsApp: +252 61 7971076  
- Facebook: Hiigsi Trading Co