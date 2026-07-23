import Link from "next/link";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded-md border px-6 py-3 font-body text-sm font-medium tracking-wide transition-all duration-200 hover:scale-[1.03] cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand border-brand text-foreground hover:bg-brand-hover hover:border-brand-hover",
  secondary:
    "bg-transparent border-2 border-muted text-button2-text hover:border-foreground hover:bg-surface",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = BaseProps & {
  href: string;
  onClick?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href) {
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  const buttonProps = props as ButtonProps;

  return (
    <button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      className={classes}
    >
      {buttonProps.children}
    </button>
  );
}
