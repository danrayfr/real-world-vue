<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>It looks like you're experiencing some network issues, please click the button and try again</h3>
    <router-link :to="{name: 'event-list' }">Back to the home page</router-link>
  </div>
</template>