<script lang="ts" setup>
const emits = defineEmits(["update:checked", "updateValue"]);

const props = defineProps({
  label: {
    type: String,
    default: "Checkbox",
  },
  name: {
    type: String,
    default: "checkbox",
  },
  id: {
    type: [String],
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  group: {
    type: Boolean,
    default: false,
  },
  privacy: {
    type: Boolean,
    default: false,
  },
  privacyLabel: {
    type: String,
    default: "privacy policy",
  },
});

function toggleCheckbox(event: Event) {
  const target = event?.target as HTMLInputElement;
  if (props.group) {
    if (target) {
      emits("updateValue", { id: props.id, checked: target["checked"] });
    }
  } else {
    if (target) {
      emits("update:checked", target["checked"]);
    }
  }
}
</script>
<template>
  <div class="checkbox prevent-select">
    <input
      :name="name"
      type="checkbox"
      :id="id"
      :value="value"
      :checked="checked"
      @input="toggleCheckbox($event)"
    />
    <label class="checkbox--privacy" v-if="privacy" :for="id"
      >{{ label }}
      <router-link to="/privacy-policy">{{ privacyLabel }}</router-link>
    </label>
    <label v-else :for="id"
      ><span>{{ label }}</span></label
    >
  </div>
</template>
<style lang="scss">
.checkbox {
  position: relative;
  z-index: 1;
  display: block;
  min-height: 1.5rem;

  input {
    position: absolute;
    left: 0;
    z-index: -1;
    width: 1.6rem;
    height: 1.6rem;
    opacity: 0;
    &:focus {
      outline: 1px solid var(--accent);
    }

    &:checked + label {
      &::after {
        opacity: 1;
      }
    }
  }

  label {
    position: relative;
    display: block;
    margin-bottom: 0;
    padding-left: 2.8rem;
    min-height: 2rem;
    font-family: var(--font-1);
    font-size: 1.6rem;
    line-height: 1.4rem;
    font-weight: 500;
    overflow: hidden;
    cursor: pointer;

    span {
      position: relative;
      top: 3px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0.2rem;
      left: 0;
      display: block;
      width: 1.6rem;
      height: 1.6rem;
      pointer-events: none;
      border: 1px solid var(--accent);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0.6rem;
      left: 0.3rem;
      display: block;
      width: 0.9rem;
      height: 0.8rem;
      background: var(--accent);
      opacity: 0;
    }

    &.checkbox--privacy {
      a {
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
