<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="add-client">Add Client</RouterLink>
    </div>
    <Heading>{{ title }}</Heading>

    <div
      v-if="existClients"
      class="flow-root mx-auto mt-10 p-5 bg-white shadow rounded-md"
    >
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Company
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  State
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <Client
                v-for="client in clients"
                :key="client.id"
                :client="client"
                @updateState="updateState"
                @deleteClient="deleteClient"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p v-else class="text-center mt-10">There are not clients yet.</p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import ClientService from "../services/ClientService";

import RouterLink from "../components/UI/RouterLink.vue";
import Heading from "../components/UI/Heading.vue";
import Client from "../components/Client.vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
const clients = ref([]);

onMounted(() => {
  ClientService.getClients()
    .then(({ data }) => (clients.value = data))
    .catch((err) => console.log(`Error fetching clients: ${err}`));
});
defineProps({
  title: {
    type: String,
  },
});

const existClients = computed(() => {
  return clients.value.length > 0;
});
const updateState = ({ id, state }) => {
  ClientService.changeState(id, { state: !state })
    .then(() => {
      const i = clients.value.findIndex((client) => client.id === id);
      clients.value[i].state = !state;
      $toast.success("State Updated!");
    })
    .catch((err) => console.log(`Error fetching clients: ${err}`));
};
const deleteClient = (id) => {
  ClientService.deleteClient(id)
    .then(() => {
      clients.value = clients.value.filter((client) => client.id !== id);
      $toast.success("Client Deleted Successfully!");
    })
    .catch((err) => console.log(`Error fetching clients: ${err}`));
};
</script>

<style scoped></style>
