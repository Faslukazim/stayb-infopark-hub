# StayB
Static site for StayB Men's Hostel, Kakkanad, Kochi.

Rebuild pages: `node tools/build.mjs` (writes into `site/`). Deploy the `site/` folder on Vercel.
Set the live domain in `BASE` at the top of `tools/build.mjs`.

## Client preview
`./preview.sh <github-username>` builds a noindex copy into `docs/` and publishes it with GitHub Pages at `https://<user>.github.io/stayb/`.
