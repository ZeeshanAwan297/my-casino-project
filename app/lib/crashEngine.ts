import { getIO } from "./socket";
import { resetBets } from "./betPool";

let multiplier = 1;
let crashPoint = 0;
let running = false;

function generateCrash() {
  return +(1 + Math.random() * 10).toFixed(2);
}

export function startGameLoop() {
  const io = getIO();
  if (!io || running) return;

  multiplier = 1;
  crashPoint = generateCrash();
  running = true;

  resetBets();

  io.emit("round:start", {
    crashPoint: null, // hidden (casino style)
  });

  const interval = setInterval(() => {
    multiplier = +(multiplier + 0.05).toFixed(2);

    io.emit("round:update", { multiplier });

    if (multiplier >= crashPoint) {
      running = false;

      io.emit("round:crash", {
        crashPoint,
      });

      clearInterval(interval);

      setTimeout(startGameLoop, 5000);
    }
  }, 100);
}