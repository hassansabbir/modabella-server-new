import express, { Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { Morgan } from "./shared/morgan";
import router from "../src/app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import session from "express-session";
import passport from "./config/passport";
const app = express();

// morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//file retrieve
app.use(express.static("uploads"));

// Session middleware (must be before passport initialization)
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Secure should be true in production with HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//router
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>🚀 Backend API Server</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap');
  
        :root {
          --bg1: #0f2027; --bg2: #203a43; --bg3: #2c5364; --bg4: #1b2735;
          --glass: rgba(255,255,255,0.08);
          --glow: 0 0 18px rgba(0,255,128,0.75);
        }
  
        * { box-sizing: border-box }
        body {
          margin: 0; height: 100vh; overflow: hidden;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-family: 'Roboto', sans-serif; color: #fff; text-align: center;
          background: linear-gradient(-45deg, var(--bg1), var(--bg2), var(--bg3), var(--bg4));
          background-size: 400% 400%;
          animation: gradientMove 16s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
  
        h1 {
          font-size: 3rem;
          margin: 0;
          text-shadow: 0 0 1px rgba(0,255,128,1), 0 0 2px rgba(0,255,128,1), 0 0 4px rgba(0,255,128,1);
        }

        .tagline { font-size: 1.3rem; opacity: 1; max-width: 680px; z-index: 2; margin: 10px 16px 18px }
        .status {
          z-index: 2; margin-top: 10px; padding: 10px 20px; border-radius: 48px;
          background: var(--glass); backdrop-filter: blur(6px);
          box-shadow: var(--glow); animation: pulse 1.6s infinite;
          font-weight: 700;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 12px rgba(0,255,128,.55) }
          50% { box-shadow: 0 0 26px rgba(0,255,128,1) }
        }
  
        /* Floating, meaningful dev icons */
        .token {
          position: absolute; opacity: .65; pointer-events: none;
          filter: drop-shadow(0 0 10px rgba(255,255,255,.12));
          animation: float 12s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .token svg { display: block }
        .fast  { animation-duration: 9s }
        .slow  { animation-duration: 18s }
        .spin  { animation: float 14s ease-in-out infinite, spin 12s linear infinite }
        .tilt  { transform-origin: 50% 50% }
        @keyframes float {
          0%   { transform: translateY(0) translateX(0) }
          50%  { transform: translateY(-28px) translateX(12px) }
          100% { transform: translateY(0) translateX(0) }
        }
        @keyframes spin { to { rotate: 360deg } }
  
        /* Subtle “circuit lines” backdrop */
        .circuit {
          position: absolute; inset: 0; z-index: 0; opacity: .18;
        }
        .circuit line, .circuit rect {
          stroke: rgba(255,255,255,.15); fill: none; stroke-width: 1;
        }
  
        footer {
          position: absolute; bottom: 16px; font-size: .9rem; opacity: .6; z-index: 2;
        }
  
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important }
        }
      </style>
    </head>
    <body>
      <!-- subtle circuit grid -->
      <svg class="circuit" viewBox="0 0 100 100" preserveAspectRatio="none">
        <!-- vertical trunks -->
        <line x1="10" y1="0" x2="10" y2="100"/><line x1="30" y1="0" x2="30" y2="100"/>
        <line x1="50" y1="0" x2="50" y2="100"/><line x1="70" y1="0" x2="70" y2="100"/>
        <line x1="90" y1="0" x2="90" y2="100"/>
        <!-- connectors -->
        <rect x="10" y="20" width="20" height="0.6"/>
        <rect x="30" y="50" width="20" height="0.6"/>
        <rect x="50" y="35" width="20" height="0.6"/>
        <rect x="70" y="75" width="20" height="0.6"/>
      </svg>
  
      <!-- Main content -->
      <h1>🚀 Modabella API is Live 🚀</h1>
      <p class="tagline">The server’s mood is excellent, logs are polite, and every endpoint got a pep talk this morning.</p>
      <div class="status">🟢 Server Running</div>
  
      <!-- PROGRAMMING-THEMED FLOATERS -->
      <!-- Terminal window >_ -->
      <div class="token slow" style="top:10%; left:8%; width:120px;">
        <svg viewBox="0 0 200 140">
          <rect x="5" y="5" width="190" height="130" rx="10" ry="10" fill="none" stroke="#9be7ff" stroke-width="3"/>
          <rect x="5" y="5" width="190" height="24" rx="10" ry="10" fill="none" stroke="#9be7ff" stroke-width="3"/>
          <circle cx="20" cy="17" r="3" fill="#9be7ff"/><circle cx="32" cy="17" r="3" fill="#9be7ff"/><circle cx="44" cy="17" r="3" fill="#9be7ff"/>
          <text x="20" y="60" font-size="22" fill="#baffc9" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">&gt;_</text>
        </svg>
      </div>
  
      <!-- Database (cylinder) -->
      <div class="token fast tilt" style="top:18%; left:78%; width:90px;">
        <svg viewBox="0 0 100 120">
          <ellipse cx="50" cy="20" rx="38" ry="12" fill="none" stroke="#ffd36e" stroke-width="3"/>
          <rect x="12" y="20" width="76" height="70" fill="none" stroke="#ffd36e" stroke-width="3"/>
          <ellipse cx="50" cy="90" rx="38" ry="12" fill="none" stroke="#ffd36e" stroke-width="3"/>
        </svg>
      </div>
  
      <!-- Server rack -->
      <div class="token slow" style="top:70%; left:12%; width:100px;">
        <svg viewBox="0 0 120 160">
          <rect x="20" y="20" width="80" height="30" rx="6" fill="none" stroke="#b39ddb" stroke-width="3"/>
          <rect x="20" y="60" width="80" height="30" rx="6" fill="none" stroke="#b39ddb" stroke-width="3"/>
          <rect x="20" y="100" width="80" height="30" rx="6" fill="none" stroke="#b39ddb" stroke-width="3"/>
          <circle cx="30" cy="35" r="4" fill="#b39ddb"/><circle cx="30" cy="75" r="4" fill="#b39ddb"/><circle cx="30" cy="115" r="4" fill="#b39ddb"/>
        </svg>
      </div>
  
      <!-- </API> tag -->
      <div class="token spin" style="top:22%; left:38%; width:110px;">
        <svg viewBox="0 0 300 100">
          <text x="10" y="65" font-size="52" fill="#7ee787" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">&lt;/API&gt;</text>
        </svg>
      </div>
  
      <!-- JSON braces -->
      <div class="token fast" style="top:62%; left:78%; width:90px;">
        <svg viewBox="0 0 100 100">
          <text x="10" y="70" font-size="80" fill="#80cbc4" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">{ }</text>
        </svg>
      </div>
  
      <!-- Angle brackets </> -->
      <div class="token" style="top:35%; left:5%; width:80px;">
        <svg viewBox="0 0 100 100">
          <text x="8" y="70" font-size="64" fill="#90caf9" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">&lt;/&gt;</text>
        </svg>
      </div>
  
      <!-- Lambda -->
      <div class="token slow" style="top:78%; left:58%; width:70px;">
        <svg viewBox="0 0 100 100">
          <text x="20" y="70" font-size="64" fill="#ffab91" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">λ</text>
        </svg>
      </div>
  
      <!-- Git branch -->
      <div class="token" style="top:14%; left:58%; width:120px;">
        <svg viewBox="0 0 200 120">
          <circle cx="40" cy="30" r="10" fill="#f48fb1"/>
          <circle cx="160" cy="90" r="10" fill="#f48fb1"/>
          <circle cx="100" cy="60" r="10" fill="#f48fb1"/>
          <path d="M40 30 C80 30, 60 60, 100 60 S140 90, 160 90" fill="none" stroke="#f48fb1" stroke-width="6"/>
        </svg>
      </div>
  
      <!-- HTTP GET badge -->
      <div class="token fast" style="top:52%; left:6%; width:150px;">
        <svg viewBox="0 0 260 80">
          <rect x="5" y="10" width="250" height="60" rx="12" fill="none" stroke="#a5d6a7" stroke-width="3"/>
          <text x="22" y="52" font-size="28" fill="#a5d6a7" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">GET /health — 200</text>
        </svg>
      </div>
  
      <!-- Array [] -->
      <div class="token slow" style="top:28%; left:87%; width:80px;">
        <svg viewBox="0 0 100 100">
          <text x="10" y="70" font-size="64" fill="#ffd180" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">[ ]</text>
        </svg>
      </div>
  
      <!-- Binary 0101 -->
      <div class="token" style="top:82%; left:82%; width:120px;">
        <svg viewBox="0 0 180 80">
          <text x="10" y="55" font-size="36" fill="#b0bec5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">0101·1010</text>
        </svg>
      </div>
  
      <!-- Curl snippet -->
      <div class="token fast" style="top:8%; left:88%; width:180px;">
        <svg viewBox="0 0 320 90">
          <rect x="5" y="10" width="310" height="70" rx="10" fill="none" stroke="#81d4fa" stroke-width="2.5"/>
          <text x="18" y="58" font-size="24" fill="#81d4fa" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">curl -X GET /api/v1</text>
        </svg>
      </div>
  
      <!-- Function fn() -->
      <div class="token slow" style="top:44%; left:42%; width:90px;">
        <svg viewBox="0 0 120 100">
          <text x="10" y="70" font-size="48" fill="#e6ee9c" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">fn()</text>
        </svg>
      </div>
  
      <!-- Brackets () -->
      <div class="token" style="top:66%; left:34%; width:80px;">
        <svg viewBox="0 0 100 100">
          <text x="12" y="70" font-size="64" fill="#ce93d8" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">( )</text>
        </svg>
      </div>
  
      <footer>Powered by Express + TypeScript · ${new Date().getFullYear()}</footer>
    </body>
    </html>
    `);
});

//global error handle
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;
