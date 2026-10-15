<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the community site as a single index page with real section IDs for anchor navigation, as requested for the long-scrolling experience.
- Keep reusable scroll reveals and project concept illustrations in community components; use native IntersectionObserver to avoid additional animation dependencies.
- Unavailable official destinations must open an explanatory dialog, never point to invented external accounts.
- Define visual styling and semantic color tokens in the global stylesheet and use design-system buttons for controls.
