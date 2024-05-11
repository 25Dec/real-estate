<script setup>
import { baseUrl } from "~/constants";

const { visible } = defineProps(["visible"]);

const { currentBlock } = storeToRefs(useBlocksStore());
const { editBlock } = useBlocksStore();
const { zones } = storeToRefs(useZonesStore());

const myVisible = ref(visible);
const zoneID = ref(currentBlock.value["zone_id"]);
const currentZone = ref(zones.value.find((zone) => zone["id"] == zoneID.value));
const numberOfFloor = ref(currentBlock.value["number_of_floor"]);
const lat = ref(currentBlock.value["lat"]);
const long = ref(currentBlock.value["long"]);
const isService = ref(currentBlock.value["is_service"]);
const desc = ref(currentBlock.value["desc"]);
const type = ref(currentBlock.value["type"]);
const progress = ref(currentBlock.value["progress"]);
const startedDay = ref(getYearMonthDay(currentBlock.value["started_day"]));
const createdAt = ref(currentBlock.value["created_at"]);
const updatedAt = ref(currentBlock.value["updated_at"]);

const onSave = async () => {
  const newBlockData = {
    ...currentBlock.value,
    zone_id: zoneID.value,
    number_of_floor: numberOfFloor.value,
    lat: lat.value,
    long: long.value,
    is_service: isService.value,
    desc: desc.value,
    type: type.value,
    progress: progress.value,
    started_day: startedDay.value,
    updated_at: new Date().toLocaleString(),
  };

  const response = await editBlock(newBlockData);
  myVisible.value = false;

  if (response != null && response["result"] == "ok") {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Edit New Block Successfully!",
      group: "bl",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "warning",
      summary: "Error",
      detail: "Failed to Edit New Block",
      group: "bl",
      life: 3000,
    });
  }
};
</script>

<template>
  <Dialog
    v-model:visible="myVisible"
    modal
    maximizable
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="inline-flex items-center justify-center gap-2">
        <span class="font-bold text-xl">Block Details</span>
      </div>
    </template>

    <template class="flex flex-col gap-3">
      <div class="flex flex-1 flex-col gap-2">
        <label for="desc">Name</label>
        <InputText id="desc" placeholder="Name" v-model="desc" />
      </div>

      <div class="flex flex-1 flex-col gap-2">
        <label for="zone_id">Zone</label>
        <Dropdown
          id="zone_id"
          placeholder="Select zone"
          v-model="currentZone"
          :options="zones"
          optionLabel="name"
          optionValue="value"
        />
      </div>

      <div class="flex gap-3">
        <div class="flex flex-1 flex-col gap-2">
          <label for="lat">Latitude</label>
          <InputNumber
            id="lat"
            placeholder="Latitude"
            mode="decimal"
            showButtons
            v-model="lat"
          />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <label for="long">Longitude</label>
          <InputNumber
            id="long"
            placeholder="Longitude"
            mode="decimal"
            showButtons
            v-model="long"
          />
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-2">
        <label for="type">Type</label>
        <InputText id="type" v-model="type" />
      </div>

      <div class="flex flex-1 flex-col gap-2">
        <label for="numberOfFloor">Number of floor</label>
        <InputNumber
          id="numberOfFloor"
          mode="decimal"
          showButtons
          v-model="numberOfFloor"
        />
      </div>

      <div class="flex gap-3">
        <div class="flex flex-1 flex-col gap-2">
          <label for="progress">Progress</label>
          <InputNumber
            id="progress"
            v-model="progress"
            mode="decimal"
            prefix="%"
          />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <label for="startedDay">Started Day</label>
          <Calendar v-model="startedDay" showIcon iconDisplay="input" />
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-2 items-end">
        <label for="isService">Is Service</label>
        <InputSwitch id="isService" v-model="isService" />
      </div>

      <div class="flex flex-row gap-3 justify-between">
        <span class="text-xs text-gray-400">
          Created at: {{ convertDateTime(createdAt) }}
        </span>
        <span class="text-xs text-gray-400">
          Updated at: {{ convertDateTime(updatedAt) }}
        </span>
      </div>
    </template>
    <template #footer>
      <Button
        type="button"
        label="Cancel"
        text
        severity="secondary"
        @click="myVisible = false"
      />
      <Button type="submit" label="Save" @click="onSave" />
    </template>
  </Dialog>
</template>
