<template>
  <div class="about">
    <h1>About</h1><br>
    <p>
       WoPien is a simple web app that makes it easy for you and your friends to plan upcoming piener sessions, where
       you will go completly knocki. The app offers convenient features for agreeing on piener items you need and also
       allows you to equally split the costs between the members. WoPien has and is being programmed by me, Frederik Schier.
       The stabile piener responsible for the creation of this app however is S9, since he is the one that introduced the
       word pien to our friends group in the first place. The project was initiated in february of 2022 and the first
       production ready release took place around 3 months later in Mae. As of now, the app is not completed and still
       needs improvements as well as additional features which are planned for the future. I created this app to build
       something useful for me and my friends while expanding my expertise in Front-End development at the same time,
       which I'm still new to.
    </p>
  </div>

</template>

<script>
export default {
  name: 'About'
}
</script>

<style>
.about {
  width: 65%;
  margin: 5% auto;
  overflow-wrap: break-word;
  text-align: justify;
}

@media only screen and (max-width: 700px) {
    .about {
        margin: 25% auto;
    }
}

</style>
