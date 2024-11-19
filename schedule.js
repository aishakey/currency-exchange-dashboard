import cron from "node-cron";
import { exec } from "child_process";

cron.schedule("0 0 * * 0", () => {
  console.log("Running weekly exchange rate update...");
  exec("node fetchExchangeRates.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing fetchExchangeRates.js: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
