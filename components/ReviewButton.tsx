const REVIEW_URL = "https://g.page/r/Cf6RMiOUDSIUEAI/review";

export default function ReviewButton() {
  return (
    <a
      href={REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Leave us a review on Google"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-brand bg-surface px-4 py-3 font-body text-sm font-medium text-foreground shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-brand-hover hover:border-brand-hover"
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4 shrink-0 text-brand"
      >
        <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.7l-5.18 2.75.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
      </svg>
      <span className="hidden sm:inline">Leave a Review</span>
    </a>
  );
}
