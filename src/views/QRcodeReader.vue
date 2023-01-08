<template>
  <qrcode-stream :key="_uid" @init="onInit" @decode="onDecode" />
  <br />
  <p>{{ text }}</p>
</template>


<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";

let text = ref("");

function onDecode(decodedString) {
  text.value = decodedString;
}

async function onInit(promise) {
  try {
    const { capabilities } = await promise;
    console.log(capabilities);
    // successfully initialized
  } catch (error) {
    if (error.name === "NotAllowedError") {
      text.value = "Denied! No permission";
      // user denied camera access permisson
    } else if (error.name === "NotFoundError") {
      text.value = "NotFoundError";
      // no suitable camera device installed
    } else if (error.name === "NotSupportedError") {
      text.value = "NotSupportedError";
      // page is not served over HTTPS (or localhost)
    } else if (error.name === "NotReadableError") {
      text.value = "NotReadableError";
      // maybe camera is already in use
    } else if (error.name === "OverconstrainedError") {
      text.value = "OverconstrainedError";
      // did you requested the front camera although there is none?
    } else if (error.name === "StreamApiNotSupportedError") {
      text.value = "StreamApiNotSupportedError";
      // browser seems to be lacking features
    }
  } finally {
    // hide loading indicator
  }
}
</script>