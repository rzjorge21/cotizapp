import { DEBUG } from "@/config";

export class Logger {
  static log(content: unknown): void {
    if (!DEBUG) return;
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Cambia a true si prefieres un formato de 12 horas
    };
    const timestamp = new Date()
      .toLocaleString("en-GB", options)
      .replace(/-/g, "/");

    let message: string;
    if (typeof content === "string") {
      message = content;
    } else if (typeof content === "object" && content !== null) {
      message = JSON.stringify(content, null, 2); // Convierte objetos a JSON legible
    } else {
      message = String(content); // Convierte otros tipos (number, boolean, etc.) a string
    }

    console.log(`- ${timestamp} - ${message}`);
  }
}
