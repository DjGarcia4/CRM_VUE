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
          submit-label="Add Client"
          incomplete-message="Could not send, check the messages."
          @submit="handleSubmit"
        >
          <!-- Name -->
          <FormKit
            type="text"
            name="name"
            label="Name"
            placeholder="Client Name"
            validation="required"
            :validation-messages="{ required: 'Please enter a name.' }"
          />
          <FormKit
            type="text"
            name="lastname"
            label="Last Name"
            placeholder="Client Last Name"
            validation="required"
            :validation-messages="{ required: 'Please enter a last name.' }"
          />
          <FormKit
            type="email"
            name="email"
            label="Email"
            placeholder="Client Email"
            validation="required|email"
            :validation-messages="{ required: 'Please enter a email.' }"
          />
          <FormKit
            type="text"
            name="phonenumber"
            label="Phone Number"
            placeholder="Phone Number XXXX-XXXX"
            validation="*matches:/^[0-9]{4}-[0-9]{4}$/"
          />
          <FormKit
            type="text"
            label="Company"
            placeholder="Client Company"
            name="company"
          />
          <FormKit
            type="text"
            label="Position"
            placeholder="Client Position"
            name="position"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup>
import ClientService from "../services/ClientService";
import { FormKit } from "@formkit/vue";
import RouterLink from "../components/UI/RouterLink.vue";
import Heading from "../components/UI/Heading.vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

const $toast = useToast();
const router = useRouter();
defineProps({
  title: {
    type: String,
  },
});
const handleSubmit = (data) => {
  data.state = 1;
  ClientService.addClient(data)
    .then(() => {
      $toast.success("Client added successfully");
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
