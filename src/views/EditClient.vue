<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="home">Come Back</RouterLink>
    </div>
    <Heading>{{ title }}</Heading>
    <div class="mx-auto mt-10 bg-white shadow rounded-md">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Update Client"
          incomplete-message="Could not send, check the messages."
          @submit="handleSubmit"
          :value="formData"
        >
          <!-- Name -->
          <FormKit
            type="text"
            name="name"
            label="Name"
            placeholder="Client Name"
            validation="required"
            :validation-messages="{ required: 'Please enter a name.' }"
            v-model="formData.name"
          />
          <FormKit
            type="text"
            name="lastname"
            label="Last Name"
            placeholder="Client Last Name"
            validation="required"
            :validation-messages="{ required: 'Please enter a last name.' }"
            v-model="formData.lastname"
          />
          <FormKit
            type="email"
            name="email"
            label="Email"
            placeholder="Client Email"
            validation="required|email"
            :validation-messages="{ required: 'Please enter a email.' }"
            v-model="formData.email"
          />
          <FormKit
            type="text"
            name="phonenumber"
            label="Phone Number"
            placeholder="Phone Number XXXX-XXXX"
            validation="*matches:/^[0-9]{4}-[0-9]{4}$/"
            v-model="formData.phonenumber"
          />
          <FormKit
            type="text"
            label="Company"
            placeholder="Client Company"
            name="company"
            v-model="formData.company"
          />
          <FormKit
            type="text"
            label="Position"
            placeholder="Client Position"
            name="position"
            v-model="formData.position"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import ClientService from "../services/ClientService";
import { FormKit } from "@formkit/vue";
import RouterLink from "../components/UI/RouterLink.vue";
import Heading from "../components/UI/Heading.vue";
import { useToast } from "vue-toast-notification";
import { useRouter, useRoute } from "vue-router";

const $toast = useToast();
const router = useRouter();
const route = useRoute();

const { id } = route.params;
const formData = reactive({});
onMounted(() => {
  ClientService.getClient(id)
    .then(({ data }) => {
      Object.assign(formData, data);
    })
    .catch((err) => console.log(`Error fetching clients: ${err}`));
});
defineProps({
  title: {
    type: String,
  },
});
const handleSubmit = (data) => {
  ClientService.updateClient(id, data)
    .then(() => {
      $toast.success("Client updated successfully");
      router.push({ name: "home" });
    })
    .catch((err) => console.log(`Error fetching clients: ${err}`));
};
</script>
<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>
