<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">
        {{ nameClient }}
      </p>
      <p class="text-gray-500">{{ client.email }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ client.company }}</p>
      <p class="text-gray-600">{{ client.position }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button
        class="inline-flex text-xs font-semibold rounded-full leading-5 px-2"
        :class="[
          stateClient
            ? ' bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800',
        ]"
        @click="$emit('updateState', { id: client.id, state: client.state })"
      >
        {{ stateClient ? "Active" : "Inactive" }}
      </button>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <RouterLink
        :to="{ name: 'edit-client', params: { id: client.id } }"
        class="text-indigo-600 hover:text-indigo-900 mr-5"
        >Edit</RouterLink
      >
      <button
        class="text-red-600 hover:text-red-900"
        @click="$emit('deleteClient', client.id)"
      >
        Delete
      </button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

defineEmits(["updateState", "deleteClient"]);
const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
});
const nameClient = computed(() => {
  return props.client.name + " " + props.client.lastname;
});
const stateClient = computed(() => {
  return props.client.state;
});
</script>

<style scoped></style>
