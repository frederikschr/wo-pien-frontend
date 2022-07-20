<template>
  <div class="about">
    <h1>About</h1><br>
    <p>
       WoPien is a simple web app that makes it easy for you and your friends to plan upcoming piener sessions, where
       you will go completly knocki. The app offers convenient features for agreeing on piener items you need and also
       allows you to equally split the costs between the members. WoPien has and is being programmed by me, Frederik Schier.
       The stabile piener responsible for the creation of this app however is S9, since he is the one that introduced the
       word pien to our friends group in the first place. The project was initiated in february of 2022 and the first
       production ready release took place around 3 months later in May. As of now, the app is not completed and still
       needs improvements as well as additional features which are planned for the future. I also want to thank Westi
       for creating the beautiful looking logo and icon for this app. Lastly, the reason  why I created WoPien was to build
       something useful for me and my friends while expanding my skills in Front-End development at the same time. Have fun
       and plan some sessions!<br><br>

       Frederik
    </p><br>

    <h3><label style="border-bottom: 3px solid rgba(0, 136, 169, 1);">Technical Details</label></h3>
    <p>
      WoPien can just like most others web apps be split into frontend and backend. The frontend, which you are currently using as
      you are reading this, is build with the JavaScript Framework Vue and its only function is to display information that it
      receives from the backend. The backend is written in Python and relies on the microframework Flask. It provides REST
      endpoints which allow communication with the apps resources and are then called by the Frontend. The user authorization happens
      via JWT. The requests to the backend from the frontend are not hitting it directly and fist go trough a NGINX Webserver which functions
      as a reverse proxy as well as a load balancer. The entire backend is containerized using the container service Docker which makes scaling
      easy, since more instances of the app can created basend on the amount of traffic, which is balanced by NGINX
      automatically. The Frontend is hosted on Netlify while the Backend is running on AWS.
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
  width: 20%;
  margin: 5% auto;
  overflow-wrap: break-word;
  text-align: justify;
}

@media only screen and (max-width: 700px) {
    .about {
        margin: 25% auto;
        width: 65%;
    }
}

</style>
