// Shared Tailwind class strings for patterns used on several pages.
// (Full class names only, so Tailwind can find them.)
export const panel = "absolute inset-0 flex flex-col overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-width:thin]";
export const section = "flex min-h-0 flex-1 flex-col";
export const inner = "mx-auto my-auto w-full max-w-page px-gutter py-[clamp(.5rem,2.2vh,1.6rem)]";

export const eyebrow = "text-[.72rem] font-medium uppercase tracking-[.22em]";
export const secHead = "mb-[clamp(.8rem,2.6vh,1.8rem)] flex flex-wrap items-baseline gap-x-4 gap-y-[.1rem] md:gap-[1.1rem] shorter:mb-[.4rem]";
export const secEyebrow = `${eyebrow} basis-full md:basis-auto`;
export const secTitle = "font-display font-normal uppercase leading-none pt-[.06em] pb-[.02em] text-[length:clamp(2.2rem,min(6vw,8.5vh),4.6rem)]";
export const secTitleBig = "font-display font-normal uppercase leading-none pt-[.06em] pb-[.02em] text-[length:clamp(2.6rem,min(8vw,12vh),6.4rem)]";
export const secRule = "h-0.5 min-w-10 flex-1 origin-left self-center opacity-90 animate-[drawX_1.1s_var(--ease-soft)_.35s_both]";
export const colTitle = "mb-[.9rem] text-[.74rem] font-medium uppercase tracking-[.22em]";

const btn = "inline-flex min-h-[46px] items-center gap-[.55rem] rounded-full border-[1.5px] border-ink px-[1.4rem] py-[.7rem] text-[.93rem] font-medium no-underline transition-[background-color,color,border-color,transform] duration-300 ease-soft";
export const btnSolid = `${btn} bg-ink text-white hover:border-accent hover:bg-accent`;
export const btnGhost = `${btn} bg-bg text-ink hover:bg-ink hover:text-white`;

// a 1px line that draws itself in along the top edge of the element
export const hairline = "relative border-t border-transparent after:pointer-events-none after:absolute after:inset-x-0 after:-top-px after:h-px after:origin-left after:bg-ink after:content-[''] after:animate-[drawX_1.1s_var(--ease-soft)_.6s_both]";
