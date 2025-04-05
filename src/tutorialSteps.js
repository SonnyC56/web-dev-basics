// Defines the structure and content for each step in the tutorial.

// Video URLs provided by the user
const VIDEO_URLS = {
  NODE_NPM_INSTALL: 'https://www.youtube.com/watch?v=m4D7G3k_TKA',
  TERMINAL_BASICS: 'https://www.youtube.com/watch?v=uwAqEzhyjtw',
  VITE_DEV_SERVER: 'https://www.youtube.com/watch?v=mL2aad5JRQo',
  GIT_BASICS: 'https://www.youtube.com/watch?v=CvUiKWv2-C0',
  GITHUB_CREATE_REPO: 'https://www.youtube.com/watch?v=u-_uGO95xco',
  GITHUB_CONNECT_PUSH: 'https://www.youtube.com/watch?v=t9d6P-NmceQ',
  NETLIFY_DEPLOY: 'https://www.youtube.com/watch?v=4h8B080Mv4U',
};

export const tutorialSteps = [
  // --- Section 1: Introduction & Setup ---
  {
    id: 'welcome',
    section: 'Setup',
    title: 'Welcome to the Interactive Web Dev Tutorial!',
    content: [
      { type: 'text', value: "👋 Hello there! Ready to dive into the world of modern web development? This interactive tutorial will guide you step-by-step, even if you've never written a line of code before." },
      { type: 'text', value: "We'll cover setting up a project using Vite and React, managing packages with npm, using Git for version control, pushing your code to GitHub, and deploying your very first web application using Netlify." },
      { type: 'text', value: "Don't worry, we'll explain everything along the way. Click 'Next' to begin!" },
    ],
  },
  {
    id: 'vite-intro',
    section: 'Setup',
    title: 'What is Vite?',
    content: [
      { type: 'text', value: "First things first, let's talk about Vite (pronounced 'veet'). Vite is a modern build tool for web projects. Think of it as a super-fast assistant that helps you set up your project, run a development server (so you can see your changes live!), and bundle your code efficiently for deployment." },
      { type: 'text', value: "Traditionally, setting up a project involved complex configurations. Vite simplifies this dramatically, especially for frameworks like React, by providing sensible defaults and leveraging modern browser features." },
    ],
  },
  {
    id: 'node-npm-intro',
    section: 'Setup',
    title: 'Node.js and npm: The Foundation',
    content: [
      { type: 'text', value: "Before we use Vite, we need Node.js. Node.js is a runtime environment that lets you run JavaScript code *outside* of a web browser. Tools like Vite, React's build processes, and many other development utilities are built using Node.js." },
      { type: 'text', value: "When you install Node.js, you also get npm (Node Package Manager). npm is like an app store for developers. It allows you to easily install and manage 'packages' – reusable pieces of code written by other developers (like React, Material UI, or Vite itself)." },
      { type: 'text', value: "You'll interact with npm frequently using commands in your terminal (which we'll simulate here!). If you haven't installed Node.js and npm yet, this video shows you how:" },
      { type: 'video', url: VIDEO_URLS.NODE_NPM_INSTALL, title: "How to Install NodeJS and NPM" },
      { type: 'text', value: "(Optional) If you're completely new to the command line/terminal, this crash course might be helpful:" },
      { type: 'video', url: VIDEO_URLS.TERMINAL_BASICS, title: "Command Line Crash Course For Beginners" },
    ],
  },
  {
    id: 'vite-setup-command',
    section: 'Setup',
    title: 'Creating Your First Project (Simulation)',
    content: [
      { type: 'text', value: "Alright, let's simulate creating a new Vite project with React. Assuming you have Node.js/npm installed, you would open your terminal (like Command Prompt on Windows or Terminal on macOS/Linux) and run the following command:" },
      { type: 'simulated-terminal', command: 'npm create vite@latest my-react-app -- --template react', output: [
          'Need to install the following packages:',
          'create-vite@latest',
          'Ok to proceed? (y) y',
          'Scaffolding project in /path/to/your/projects/my-react-app...',
          'Done. Now run:',
          '  cd my-react-app',
          '  npm install',
          '  npm run dev'
        ]
      },
      { type: 'text', value: "Let's break this down:" },
      { type: 'list', items: [
          "`npm create vite@latest`: Tells npm to use the 'create-vite' package (the `@latest` ensures you get the newest version) to start a new project.",
          "`my-react-app`: This is the name you choose for your project's folder. You can name it anything you like!",
          "`--`: This double dash separates arguments for `npm create` from arguments for the underlying `create-vite` script.",
          "`--template react`: This tells Vite specifically to set up the project using the React template. Vite also supports other templates like Vue, Svelte, etc."
        ]
      },
      { type: 'text', value: "Running this command creates a new folder named `my-react-app` with all the basic files needed for a React project." },
    ],
    achievement: 'VITE_INITIATOR'
  },
  {
    id: 'project-structure',
    section: 'Setup',
    title: 'Exploring the Project Structure',
    content: [
        { type: 'text', value: "After running the command, Vite creates a folder (`my-react-app` in our example) with several files and subfolders. Let's look at the key ones:" },
        { type: 'file-structure', structure: [
            'my-react-app/',
            '├── node_modules/     # Installed packages (managed by npm, usually ignored by Git)',
            '├── public/           # Static assets (images, fonts) directly served',
            '│   └── vite.svg      # Example: Vite logo',
            '├── src/              # <<< Your application source code lives here! >>>',
            '│   ├── assets/       # Project-specific assets (e.g., component images)',
            '│   │   └── react.svg # Example: React logo',
            '│   ├── App.css       # Styles specific to the App component',
            '│   ├── App.jsx       # The main React application component',
            '│   ├── index.css     # Global styles for your application',
            '│   └── main.jsx      # The entry point: renders App into the HTML',
            '├── .eslintrc.cjs     # Configuration for ESLint (code quality tool)',
            '├── .gitignore        # Tells Git which files/folders to ignore (like node_modules)',
            '├── index.html        # The main HTML file your app loads into',
            '├── package.json      # <<< Important: Project metadata & dependencies >>>',
            '├── package-lock.json # Records exact versions of installed packages',
            '└── vite.config.js    # Configuration file for Vite'
          ]
        },
        { type: 'text', value: "Don't worry about understanding everything right now! The most important folder for you as you start is `src/`, where you'll write your React components and styles. We'll also look closer at `package.json` and `index.html`." }
    ]
  },
  {
    id: 'index-html-explained',
    section: 'Setup',
    title: 'Understanding `index.html`',
    content: [
        { type: 'text', value: "This is the actual HTML page served to the browser. Unlike traditional setups, your React code isn't directly written here. Instead, Vite injects your JavaScript bundle into this file." },
        { type: 'text', value: "The key part is usually a `<div>` element with an ID, often `root`:" },
        { type: 'code', language: 'html', code:
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div> <!-- <<< React App gets rendered here! -->
    <script type="module" src="/src/main.jsx"></script> <!-- Vite injects JS -->
  </body>
</html>`
        },
        { type: 'text', value: "The `<script type=\"module\" src=\"/src/main.jsx\"></script>` tag tells the browser where to find the entry point of your JavaScript application (`main.jsx`). React will then take control of the `<div id=\"root\"></div>` element and render your components inside it." }
    ]
  },
  {
    id: 'package-json-explained',
    section: 'Setup',
    title: 'Understanding `package.json`',
    content: [
        { type: 'text', value: "`package.json` is a crucial file. It acts like an ID card for your project, containing metadata and listing the external packages (dependencies) your project needs." },
        { type: 'text', value: "Here's a simplified example of what it might look like initially:" },
        { type: 'code', language: 'json', code:
`{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",             // Command to start the development server
    "build": "vite build",       // Command to create a production build
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"  // Command to preview the production build locally
  },
  "dependencies": {
    "react": "^18.2.0",        // React library
    "react-dom": "^18.2.0"     // React DOM library (for web)
  },
  "devDependencies": {
    "@types/react": "^18.2.15", // Type definitions for React (for better editor support)
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3", // Vite plugin for React
    "eslint": "^8.45.0",       // Code linter
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "vite": "^4.4.5"           // Vite build tool itself
  }
}`
        },
        { type: 'text', value: "Key sections:" },
        { type: 'list', items: [
            "`name`, `version`: Basic info about your project.",
            "`scripts`: Defines command shortcuts you can run with `npm run <script_name>` (e.g., `npm run dev`).",
            "`dependencies`: Packages needed for your application to run (like React).",
            "`devDependencies`: Packages only needed for development (like Vite, ESLint)."
          ]
        },
        { type: 'text', value: "When you run `npm install`, npm reads the `dependencies` and `devDependencies` and downloads them into `node_modules/`." }
    ]
  },
  {
    id: 'npm-install',
    section: 'Setup',
    title: 'Installing Dependencies: `npm install`',
    content: [
        { type: 'text', value: "As mentioned, `package.json` lists the dependencies, but doesn't contain the actual code. The `node_modules/` folder is where these packages get downloaded." },
        { type: 'text', value: "After creating the project with `npm create vite@latest ...`, the next command you'd run in the terminal (make sure you `cd my-react-app` first!) is:" },
        { type: 'simulated-terminal', command: 'npm install', output: [
            'added 150 packages and audited 151 packages in 8s',
            '30 packages are looking for funding',
            '  run `npm fund` for details',
            'found 0 vulnerabilities',
            '(Output may vary slightly)'
          ]
        },
        { type: 'text', value: "This command reads `package.json` and `package-lock.json` (which specifies exact versions) and downloads all the listed dependencies into the `node_modules/` folder, making them available for your project to use." },
        { type: 'text', value: "You generally only need to run `npm install` once initially after cloning or creating a project, or whenever you add/update dependencies in `package.json`." }
    ],
    achievement: 'NPM_INSTALLER'
  },
  {
    id: 'npm-run-dev',
    section: 'Setup',
    title: 'Running the Development Server: `npm run dev`',
    content: [
        { type: 'text', value: "Now for the exciting part! To see your React application live in your browser while you develop, you run the `dev` script defined in your `package.json`:" },
        { type: 'simulated-terminal', command: 'npm run dev', output: [
            '',
            '> my-react-app@0.0.0 dev',
            '> vite',
            '',
            '  VITE v4.4.5  ready in 350 ms',
            '',
            '  ➜  Local:   http://localhost:5173/',
            '  ➜  Network: use --host to expose',
            '  ➜  press h to show help'
          ]
        },
        { type: 'text', value: "This command tells Vite to start its development server. It usually opens on `http://localhost:5173` (the port might vary). Open this URL in your web browser!" },
        { type: 'text', value: "You should see the default Vite + React starter page. The best part? This server uses **Hot Module Replacement (HMR)**. Try editing `src/App.jsx` (e.g., change the text inside the `<h1>` tag) and save the file. Your browser should update *instantly* without a full page reload! This makes development much faster." },
        { type: 'video', url: VIDEO_URLS.VITE_DEV_SERVER, title: "How To Start The Development Server In Vite" },
        { type: 'text', value: "Keep this terminal window open while you're developing. To stop the server, go back to the terminal and press `Ctrl + C`." }
    ],
    achievement: 'DEV_SERVER_MASTER'
  },

  // --- Section 2: Git & GitHub ---
  {
    id: 'git-intro',
    section: 'Git & GitHub',
    title: 'Version Control with Git: What and Why?',
    content: [
        { type: 'text', value: "Imagine you're writing a long essay. You save versions like `essay_v1.doc`, `essay_v2_final.doc`, `essay_final_really_final.doc`. It gets messy, right?" },
        { type: 'text', value: "Git is a **Version Control System (VCS)** designed to solve this problem for code. It helps you:" },
        { type: 'list', items: [
            "**Track Changes:** Record snapshots (called 'commits') of your project over time.",
            "**Revert Mistakes:** Easily go back to previous working versions if you break something.",
            "**Collaborate:** Allow multiple developers to work on the same project without overwriting each other's work (though we'll focus on solo use first).",
            "**Experiment Safely:** Create branches to try out new features without affecting the main codebase."
          ]
        },
        { type: 'text', value: "Git works locally on your computer. You don't need an internet connection to track changes." }
    ]
  },
  {
    id: 'git-init',
    section: 'Git & GitHub',
    title: 'Initializing a Git Repository: `git init`',
    content: [
        { type: 'text', value: "To start tracking your project with Git, you need to initialize a Git repository *inside* your project folder. Open your terminal, navigate to your project directory (`cd my-react-app`), and run:" },
        { type: 'simulated-terminal', command: 'git init', output: [
            'Initialized empty Git repository in /path/to/your/projects/my-react-app/.git/'
          ]
        },
        { type: 'text', value: "This command creates a hidden subfolder named `.git`. This folder contains all the information Git needs to track your project's history. You usually don't need to touch the files inside `.git` directly." },
        { type: 'text', value: "You only need to run `git init` once per project." }
    ]
  },
  {
    id: 'git-workflow-add-commit',
    section: 'Git & GitHub',
    title: 'Basic Git Workflow: Add & Commit',
    content: [
        { type: 'text', value: "The core Git workflow involves two main steps: staging changes and committing them." },
        { type: 'text', value: "1. **Staging Changes (`git add`):** Before you save a snapshot (commit), you need to tell Git *which* changes you want to include. This is called 'staging'. You use the `git add` command." },
        { type: 'text', value: "To stage *all* modified and new files in your project directory, the common command is:" },
        { type: 'simulated-terminal', command: 'git add .', output: ['(No output usually means success)'] },
        { type: 'text', value: "The `.` represents the current directory. This adds all changes to the 'staging area'." },
        { type: 'text', value: "2. **Committing Changes (`git commit`):** Once your desired changes are staged, you save them as a permanent snapshot in your project's history using `git commit`. Each commit requires a descriptive message explaining *what* you changed." },
        { type: 'simulated-terminal', command: 'git commit -m "Initial project setup with Vite and React"', output: [
            '[master (root-commit) abc1234] Initial project setup with Vite and React',
            ' 15 files changed, 500 insertions(+)',
            ' create mode 100644 .eslintrc.cjs',
            ' create mode 100644 .gitignore',
            ' create mode 100644 index.html',
            // ... other files
          ]
        },
        { type: 'text', value: "The `-m` flag allows you to provide the commit message directly. Good commit messages are crucial for understanding the project history later!" },
        { type: 'text', value: "This video gives a good overview of these basic commands:" },
        { type: 'video', url: VIDEO_URLS.GIT_BASICS, title: "Git Tutorial for Absolute Beginners" }
    ],
    achievement: 'GIT_COMMITTER'
  },
   {
    id: 'gitignore-explained',
    section: 'Git & GitHub',
    title: 'Ignoring Files: `.gitignore`',
    content: [
        { type: 'text', value: "You often have files or folders in your project that you *don't* want Git to track. Examples include:" },
        { type: 'list', items: [
            "`node_modules/`: Contains thousands of files downloaded by npm; can be easily regenerated with `npm install`.",
            "Build output folders (like `dist/` created by `npm run build`).",
            "Operating system files (`.DS_Store`, `Thumbs.db`).",
            "Sensitive files (API keys, passwords - though these shouldn't be in your repo anyway!).",
            "Log files."
          ]
        },
        { type: 'text', value: "The `.gitignore` file (which Vite creates for you) lists patterns for files and folders that Git should ignore. Here's a typical example for a Vite project:" },
        { type: 'code', language: 'text', code:
`# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`
        },
        { type: 'text', value: "Make sure `.gitignore` is committed to your repository so that Git always knows what to ignore." }
    ]
  },
  {
    id: 'github-intro',
    section: 'Git & GitHub',
    title: 'What is GitHub?',
    content: [
        { type: 'text', value: "So far, Git has been tracking your project history *locally* on your computer. But what if your computer crashes? Or what if you want to collaborate with others or showcase your project?" },
        { type: 'text', value: "That's where platforms like **GitHub** come in. GitHub is a web-based hosting service for Git repositories. It provides:" },
        { type: 'list', items: [
            "**Remote Backups:** A safe place to store your Git repository online.",
            "**Collaboration Tools:** Features for multiple people to work on code together (pull requests, issues, etc.).",
            "**Project Showcase:** A way to share your code with the world (or keep it private).",
            "**Integration:** Connects with deployment services like Netlify."
          ]
        },
        { type: 'text', value: "Think of Git as the tracking tool on your computer, and GitHub as the online hub where you can store and share your Git-tracked projects." }
    ]
  },
  {
    id: 'github-create-repo',
    section: 'Git & GitHub',
    title: 'Creating a GitHub Repository',
    content: [
        { type: 'text', value: "To store your project on GitHub, you first need a GitHub account (it's free!). Then, you create a new 'repository' (often called a 'repo') on the GitHub website." },
        { type: 'text', value: "This video shows the exact steps on GitHub.com:" },
        { type: 'video', url: VIDEO_URLS.GITHUB_CREATE_REPO, title: "How to create a GitHub repository" },
        { type: 'text', value: "Key points when creating a repo:" },
        { type: 'list', items: [
            "**Repository Name:** Usually matches your local project folder name (e.g., `my-react-app`).",
            "**Description:** A brief explanation of your project.",
            "**Public vs. Private:** Public repos are visible to anyone; private repos are only visible to you and collaborators you invite.",
            "**Initialize this repository with:** **IMPORTANT:** Since you already initialized Git locally (`git init`) and made commits, **DO NOT** check the boxes to add a README, .gitignore, or license on GitHub initially. You'll push your existing local files."
          ]
        }
    ]
  },
  {
    id: 'github-connect-push',
    section: 'Git & GitHub',
    title: 'Connecting Local Repo to GitHub & Pushing',
    content: [
        { type: 'text', value: "Once your empty repository is created on GitHub, it will give you instructions. The key steps are to tell your local Git repository where the remote GitHub repository lives and then 'push' your local commits to GitHub." },
        { type: 'text', value: "1. **Add the Remote:** In your terminal (inside your project folder), run the command provided by GitHub. It will look something like this (use the URL from *your* GitHub repo!):" },
        { type: 'simulated-terminal', command: 'git remote add origin https://github.com/your-username/my-react-app.git', output: ['(No output usually means success)'] },
        { type: 'text', value: "`origin` is the standard nickname for your main remote repository." },
        { type: 'text', value: "2. **Push Your Commits:** Now, send your local commit history (specifically from your current branch, usually `master` or `main`) up to GitHub:" },
        { type: 'simulated-terminal', command: 'git push -u origin main', output: [
            'Enumerating objects: 20, done.',
            'Counting objects: 100% (20/20), done.',
            'Delta compression using up to 8 threads',
            'Compressing objects: 100% (15/15), done.',
            'Writing objects: 100% (20/20), 5.00 KiB | 1.00 MiB/s, done.',
            'Total 20 (delta 2), reused 0 (delta 0), pack-reused 0',
            'remote: Resolving deltas: 100% (2/2), done.',
            'To https://github.com/your-username/my-react-app.git',
            ' * [new branch]      main -> main',
            'Branch \'main\' set up to track remote branch \'main\' from \'origin\'.'
          ]
        },
        { type: 'text', value: "The `-u` flag sets the upstream link, so next time you can just run `git push`. `main` is the name of the local branch you're pushing (it might be `master` on older setups)." },
        { type: 'text', value: "Refresh your GitHub repository page in the browser – you should see your project files appear!" },
        { type: 'video', url: VIDEO_URLS.GITHUB_CONNECT_PUSH, title: "Connecting a Local Git Repo to GitHub" }
    ],
    achievement: 'GITHUB_PUSHER'
  },

  // --- Section 3: Deployment with Netlify ---
  {
    id: 'netlify-intro',
    section: 'Deployment',
    title: 'Deployment: What is Netlify?',
    content: [
        { type: 'text', value: "Okay, your code is on GitHub, but how do you make your website live on the internet for anyone to visit?" },
        { type: 'text', value: "**Deployment** is the process of taking your project code and putting it onto a web server. **Netlify** is a popular platform that makes deploying modern web applications (like Vite/React apps) incredibly easy." },
        { type: 'text', value: "Netlify offers:" },
        { type: 'list', items: [
            "**Easy Git Integration:** Connects directly to your GitHub (or GitLab/Bitbucket) repository.",
            "**Automatic Builds:** Automatically runs your build command (`npm run build`) whenever you push changes to GitHub.",
            "**Global CDN:** Distributes your site files across the world for fast loading.",
            "**Free Tier:** Generous free plan for personal projects and small sites.",
            "**HTTPS:** Automatic SSL certificates for secure connections."
          ]
        }
    ]
  },
  {
    id: 'netlify-deploy',
    section: 'Deployment',
    title: 'Deploying to Netlify from GitHub',
    content: [
        { type: 'text', value: "Deploying with Netlify is mostly done through their website." },
        { type: 'text', value: "1. **Sign Up/Log In:** Create a free Netlify account, often easiest by signing up with your GitHub account." },
        { type: 'text', value: "2. **Add New Site:** Find the button to add a new site and choose 'Import an existing project'." },
        { type: 'text', value: "3. **Connect to Git Provider:** Select GitHub and authorize Netlify to access your repositories." },
        { type: 'text', value: "4. **Pick Your Repository:** Choose the GitHub repository you created for your project (e.g., `my-react-app`)." },
        { type: 'text', value: "5. **Configure Build Settings:** Netlify is usually smart enough to detect Vite projects. It should automatically suggest:" },
        { type: 'list', items: [
            "**Build command:** `npm run build` (or sometimes `vite build`)",
            "**Publish directory:** `dist` (This is where Vite puts the final website files after building)"
          ]
        },
        { type: 'text', value: "Verify these settings are correct. You usually don't need to change anything else for a basic Vite/React app." },
        { type: 'text', value: "6. **Deploy Site:** Click the 'Deploy site' button!" },
        { type: 'text', value: "Netlify will pull your code from GitHub, run the build command, and deploy the contents of the `dist` folder. After a minute or two, it will provide you with a live URL (like `random-name-12345.netlify.app`). Congratulations, your site is live!" },
        { type: 'text', value: "This video walks through the Netlify UI:" },
        { type: 'video', url: VIDEO_URLS.NETLIFY_DEPLOY, title: "Netlify Tutorial – Deploying from Git" }
    ],
    achievement: 'NETLIFY_DEPLOYER'
  },
  {
    id: 'netlify-auto-deploy',
    section: 'Deployment',
    title: 'Automatic Deployments',
    content: [
        { type: 'text', value: "The best part about the Netlify/GitHub setup is **automatic deployments**." },
        { type: 'text', value: "Now, whenever you make changes to your code locally, commit them with Git (`git add .`, `git commit -m \"New feature\"`), and push them to your main branch on GitHub (`git push`), Netlify will *automatically* detect the push, rebuild your site with the latest changes, and update the live URL. Magic!" }
    ]
  },

  // --- Final Step ---
   {
    id: 'whats-next',
    section: 'Conclusion',
    title: "Congratulations & What's Next?",
    content: [
        { type: 'text', value: "🎉 You've reached the end of this interactive tutorial! You've learned about:" },
        { type: 'list', items: [
            "Setting up a modern web project with **Vite** and **React**.",
            "Using **npm** to manage packages.",
            "Tracking changes with **Git**.",
            "Hosting your code on **GitHub**.",
            "Deploying your site live with **Netlify**.",
            "How CLIs can help automate tasks."
          ]
        },
        { type: 'text', value: "This is a huge accomplishment and a fantastic foundation for your web development journey!" },
        { type: 'text', value: "**Where to go from here?**" },
         { type: 'list', items: [
            "**Deepen your React knowledge:** Learn about state management, hooks (useEffect, useContext), component lifecycle, and routing (React Router).",
            "**Learn CSS:** Dive deeper into styling with CSS frameworks (like Tailwind CSS) or CSS-in-JS libraries.",
            "**Explore JavaScript:** Strengthen your core JavaScript fundamentals.",
            "**Build More Projects:** The best way to learn is by doing! Try building a simple To-Do list, a weather app, or a blog.",
            "**Contribute to Open Source:** Find beginner-friendly projects on GitHub."
          ]
        },
         { type: 'text', value: "Keep coding, keep learning, and have fun!" }
    ]
  },
];

// Define achievements (ensure IDs match those used in steps)
export const achievementsList = {
  'VITE_INITIATOR': { name: 'Vite Initiator', description: 'Simulated your first Vite project creation!', icon: '🚀' },
  'NPM_INSTALLER': { name: 'Package Pro', description: 'Understood how npm installs dependencies!', icon: '📦' },
  'DEV_SERVER_MASTER': { name: 'Dev Server Master', description: 'Launched the Vite dev server!', icon: '💡' },
  'GIT_COMMITTER': { name: 'Git Committer', description: 'Made your first simulated commit!', icon: '💾' },
  'GITHUB_PUSHER': { name: 'GitHub Hero', description: 'Pushed your project to GitHub (simulation)!', icon: '☁️' },
  'NETLIFY_DEPLOYER': { name: 'Netlify Ninja', description: 'Deployed your app to the web (simulation)!', icon: '🌐' },
};
