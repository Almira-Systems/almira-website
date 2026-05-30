export function SearchIcon({
  size = 24,
  color = "#fff", // Defaults to matching your surrounding text color
  strokeWidth = 2,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://w3.org"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
