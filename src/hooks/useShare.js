export const handleShare = async (url) => {
  const shareData = {
    title: "Check this event from eventflow!",
    text: "I'd love to see you there.",
    url: url,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      if (err.name === "AbortError") return;
    }
  }

  // Fallback: Copy to clipboard
  try {
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard instead!");
  } catch (err) {
    alert("Please copy manually: " + url);
    console.error(err);
  }
};
