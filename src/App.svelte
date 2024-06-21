<script>
  import "./app.css"

  import Question from "./lib/Question.svelte"
</script>

<main>
  <Question number={1} question="Do you like Svelte?" />
  <Question number={2} question="Do you like Tailwind CSS?" />
  <Question number={3} question="Do you like Snowpack?" />
  <Question number={4} question="Do you like Vite?" />
  <Question
    number={5}
    question="Do you like the combination of Svelte, Tailwind CSS, Snowpack, and Vite?"
  />
  <Question
    number={6}
    question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, odio?"
  />
</main>
