export function formatAIResponse(text: string) {
  if (!text) return "";

  let formatted = text;

  // Remove unnecessary intro phrases
  formatted = formatted.replace(
    /^(Of course\.?|Sure\.?|Absolutely\.?|Here’s.*?:)/i,
    ""
  );

  // Normalize spacing
  formatted = formatted.replace(/\n{3,}/g, "\n\n");

  // Fix bullet points (keep markdown-friendly)
  formatted = formatted.replace(/^\d+\.\s/gm, "- ");

  // Ensure proper code block spacing
  formatted = formatted.replace(/```([\s\S]*?)```/g, "\n```$1```\n");

  return formatted.trim();
}