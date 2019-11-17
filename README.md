# Motivation

All started with the idea of playing around with REST APIs and GraphQL + [code
generation] tools for Typescript, after starting a repo from scratch I realised
that I'm a bit *rusty* with NodeJS best practices on *how to run apps in
production*. After surfing the web for recommendations I noticed that there
are not too many **up to date** examples/repos demostrating things like *app
structure, logging, error handling, managing db connections, work without ORMs,
handling migrations, unit/integration/e2e testing*, among others.

Since I had the great opportunity to work with **awesome people** during my
career, I asked myself *"why don't we build something?"* share what we've
learned and solve these questions together, and at the same time, share it with
the community.

I recently read this on Twitter and I think it fits perfectly into this:

> "Start simple and grow with ideas and best practices"

My proposal is to build a ***Pointing Poker*** app, basic features and slowly
improve it over time.

I'd love to start with this repo by creating a REST API with Typescript + a FE
app in a separate repo with React and [Tailwind].

The next step, or at the same time if you wish, is to create the same app but
using GraphQL. Once we have both GraphQL and REST API back-end and fron-tend
implementations it will be very simple to try new technologies like Go, Rust,
Elm, VueJS and plug in the already created BE's or FE's for our new apps.

This will be our space to learn, experiment, discuss and work with incredible
passionate developers.

# How to run

After cloning the repo:

1. Install dependencies `yarn install`
2. Run the dev server `yarn start:dev`
3. Start building 🚀 

## Ideas

These are some things that we can discuss and add over time:

- Add users
- Rooms created by users are permanents where others are ephemeral
- Add tests
- Add pagination
- Add migrations + use postgres with configurations for different envs
- Add a `request-id` to every request and log it
- Use docker 
- Use a tool to analyze log entries
- Add monitoring
- Call 3rd party services and add tracing
- Figure out what's the best way to handle the case when there are multiple
  errors, i.e. multiple validation errors (Twitter way by returning an array of
  errors? or maybe return one error at a time like Facebook's Opengraph API)

[code generation]: https://graphql-code-generator.com/
[Tailwind]: https://tailwindcss.com/
