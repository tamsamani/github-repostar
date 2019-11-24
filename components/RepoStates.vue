<template>
  <div class="flex rounded border border-gray-600 border-solid ">
    <div
      class="px-2 rounded-l border-r boder-solid border-gray-600 bg-gray-300"
    >
      <slot name="left" />
    </div>
    <div class="px-2 bg-white rounded-r font-bold">
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {};
</script>
