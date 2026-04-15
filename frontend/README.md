# 🚀 Abhay's Interactive Portfolio

Welcome to the frontend code of my personal portfolio! This README is designed as a complete, easy-to-understand walkthrough for anyone—whether you are a beginner looking to learn, or a recruiter wanting to understand how the technology works.

---

## 📖 1. What Is This Project?
This is a Single Page Application (SPA). That means instead of loading a new web page every time you click a link, the entire website loads once upfront. As you scroll or click links, the site dynamically swaps out what you see instantly, making it feel perfectly smooth like a mobile app.

**Core Technologies Used:**
- **React (JavaScript Library)**: Used to build the website piece by piece (components).
- **Vite (Build Tool)**: Instead of standard tools that can be slow, Vite bundles the code instantly so development is lightning-fast.
- **Tailwind CSS**: A system that lets us style components beautifully right inside the code using strict utility classes.

---

## ✨ 2. How The "Magic" Works (Features)

### 🪐 The 3D Space Background
When you look at the background, you aren't looking at an image or a video. You are looking at a real-time, mathematical 3D rendering!
- **How it's built**: We use `Three.js` and `React Three Fiber`. These libraries create a `<Canvas>` (a blank 3D box) behind the website.
- **How it moves**: Inside the code (in `SpaceBackground.jsx`), there is a script called the "Flight Controller". Whenever you scroll your mouse down the page, React measures exactly how far you scrolled and moves the 3D Camera down the Y-axis. This causes the massive 3D planets to fly past the screen in real-time, reacting exactly to your scrolling speed!

### 🌗 Day/Night Theme System
Instead of hardcoding colors to be just "black" or just "white", the entire site is built on smart "CSS Variables".
- **The Brain**: In `ThemeContext.jsx`, a master switch remembers what mode you prefer (saving it to your browser's Local Storage).
- **The Switch**: When you click the Sun/Moon icon, the brain flips a switch called `[data-theme="light"]` on the root of the site.
- **The Result**: Every single color on the site instantly swaps from purely dark shades to bright off-white shades. Even the 3D space background detects this change and switches from a dark abyss to a hazy bright sky!

### 🧊 Glassmorphism Cards (Premium UI)
If you hover over the Project or Skill cards, you'll feel a premium "glass-like" interaction.
- This is achieved using CSS `backdrop-filter: blur()`. It forces the browser to mathematically blur whatever visually sits *behind* the card.
- When you hover over the cards, custom animations pull the card slightly toward you (using `scale`) and tilt slightly to simulate a 3D physical object floating on your screen.

---

## 🗂️ 3. Folder Navigation (Where things are)

If you are exploring the code, here is your map:

- **`src/App.jsx`**: The master file. Everything starts here. It glues the Background, the Navbar, and all the Content sections together.
- **`src/components/`**: The LEGO bricks of the website. Every visual piece (Hero text, About me, Contact form, Theme buttons) lives in its own file here so the code stays perfectly organized.
- **`src/data/content.js`**: The Content Engine. If you want to change what the website says, you don't even need to touch the complex React code. You just change the text in this single file, and the entire website updates itself automatically!
- **`src/index.css`**: The design master sheet. All the custom colors, scrollbars, and animations are defined here.

---

## 📬 4. The Contact System Flow
When you type your name and message at the bottom of the page and hit "Send":
1. The frontend packages your text into a clean digital envelope (JSON).
2. It fires that envelope off into the internet to talk to the **Backend Server** (which lives in the `/backend` folder).
3. The Backend server carefully inspects the message to make sure it's not spam.
4. If it's safe, the backend uses a Node.js library to log securely into my Gmail account and officially emails the message straight to my personal inbox. 

---

## 🚦 5. How To Run It Yourself

Want to launch the site on your own machine? It takes two steps:

**Step 1: Install the code packages**
Open your terminal inside this `frontend` folder and run:
`npm install`

**Step 2: Start the Engine!**
Run:
`npm run dev`

Your terminal will give you a local link (usually `http://localhost:5173`). Ctrl+Click that link, and the full interactive 3D portfolio will launch right in your browser!
