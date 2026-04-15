<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import "./assets/css/main.css";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");
</script>
